"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../_components/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

/* ═══════════════════════════════════════════════════════
   TIPOS
══════════════════════════════════════════════════════ */
interface EngineResult {
  metros_cuadrados: number;
  niveles: number;
  estado: string;
  costo_directo_materiales: number;
  costo_directo_mano_obra: number;
  equipamiento_especial: number;
  desglose_especial: { concepto: string; costo: number }[];
  indirectos_y_ganancia: number;
  presupuesto_total_mxn: number;
  costo_parametrico_m2: number;
}
interface CalcResult {
  principal: EngineResult;
  economico: EngineResult;
  estandar: EngineResult;
  premium: EngineResult;
}

/* ═══════════════════════════════════════════════════════
   CATÁLOGOS (idénticos al original)
══════════════════════════════════════════════════════ */
const TIPOS = [
  {
    id: "vivienda_unifamiliar",
    emoji: "🏠",
    label: "Casa habitación",
    sub: "Vivienda unifamiliar nueva",
  },
  {
    id: "local_comercial",
    emoji: "🏪",
    label: "Local comercial",
    sub: "Tienda, oficina, restaurante",
  },
  {
    id: "departamentos",
    emoji: "🏢",
    label: "Departamentos",
    sub: "Edificio residencial 3–5 niveles",
  },
] as const;

const ESTADOS = [
  { id: "aguascalientes",      nombre: "Aguascalientes" },
  { id: "baja_california",     nombre: "Baja California" },
  { id: "baja_california_sur", nombre: "Baja California Sur" },
  { id: "campeche",            nombre: "Campeche" },
  { id: "chiapas",             nombre: "Chiapas" },
  { id: "chihuahua",           nombre: "Chihuahua" },
  { id: "cdmx",                nombre: "Ciudad de México (CDMX)" },
  { id: "coahuila",            nombre: "Coahuila" },
  { id: "colima",              nombre: "Colima" },
  { id: "durango",             nombre: "Durango" },
  { id: "estado_de_mexico",    nombre: "Estado de México" },
  { id: "guanajuato",          nombre: "Guanajuato" },
  { id: "guerrero",            nombre: "Guerrero" },
  { id: "hidalgo",             nombre: "Hidalgo" },
  { id: "jalisco",             nombre: "Jalisco" },
  { id: "michoacan",           nombre: "Michoacán" },
  { id: "morelos",             nombre: "Morelos" },
  { id: "nayarit",             nombre: "Nayarit" },
  { id: "nuevo_leon",          nombre: "Nuevo León" },
  { id: "oaxaca",              nombre: "Oaxaca" },
  { id: "puebla",              nombre: "Puebla" },
  { id: "queretaro",           nombre: "Querétaro" },
  { id: "quintana_roo",        nombre: "Quintana Roo" },
  { id: "san_luis_potosi",     nombre: "San Luis Potosí" },
  { id: "sinaloa",             nombre: "Sinaloa" },
  { id: "sonora",              nombre: "Sonora" },
  { id: "tabasco",             nombre: "Tabasco" },
  { id: "tamaulipas",          nombre: "Tamaulipas" },
  { id: "tlaxcala",            nombre: "Tlaxcala" },
  { id: "veracruz",            nombre: "Veracruz" },
  { id: "yucatan",             nombre: "Yucatán" },
  { id: "zacatecas",           nombre: "Zacatecas" },
] as const;

const FACTOR_SICT: Record<string, { mat: number; mo: number }> = {
  "aguascalientes":      { mat: 0.99, mo: 0.98 },
  "baja_california":     { mat: 1.38, mo: 1.46 },
  "baja_california_sur": { mat: 1.55, mo: 1.50 },
  "campeche":            { mat: 1.16, mo: 1.07 },
  "chiapas":             { mat: 1.07, mo: 1.00 },
  "chihuahua":           { mat: 1.12, mo: 1.16 },
  "cdmx":                { mat: 1.00, mo: 1.00 },
  "coahuila":            { mat: 1.11, mo: 1.14 },
  "colima":              { mat: 1.06, mo: 1.06 },
  "durango":             { mat: 0.99, mo: 0.99 },
  "estado_de_mexico":    { mat: 0.92, mo: 0.91 },
  "guanajuato":          { mat: 1.05, mo: 1.05 },
  "guerrero":            { mat: 1.15, mo: 1.08 },
  "hidalgo":             { mat: 0.99, mo: 0.98 },
  "jalisco":             { mat: 1.03, mo: 1.03 },
  "michoacan":           { mat: 1.19, mo: 1.13 },
  "morelos":             { mat: 1.10, mo: 1.10 },
  "nayarit":             { mat: 1.15, mo: 1.10 },
  "nuevo_leon":          { mat: 0.98, mo: 1.01 },
  "oaxaca":              { mat: 1.11, mo: 1.04 },
  "puebla":              { mat: 1.14, mo: 1.15 },
  "queretaro":           { mat: 1.07, mo: 1.06 },
  "quintana_roo":        { mat: 1.30, mo: 1.22 },
  "san_luis_potosi":     { mat: 1.12, mo: 1.08 },
  "sinaloa":             { mat: 1.08, mo: 1.10 },
  "sonora":              { mat: 0.95, mo: 0.98 },
  "tabasco":             { mat: 1.11, mo: 1.05 },
  "tamaulipas":          { mat: 1.11, mo: 1.14 },
  "tlaxcala":            { mat: 0.99, mo: 0.98 },
  "veracruz":            { mat: 1.19, mo: 1.14 },
  "yucatan":             { mat: 1.11, mo: 1.03 },
  "zacatecas":           { mat: 1.00, mo: 1.01 },
};

const ALTURAS = [
  { id: "2.30", label: "2.30 m (mínimo NTC)" },
  { id: "2.70", label: "2.70 m (estándar residencial)" },
  { id: "3.00", label: "3.00 m" },
  { id: "3.50", label: "3.50 m" },
] as const;

const CIMENTACIONES = [
  { id: "zapatas",  label: "Zapatas corridas + trabe de liga" },
  { id: "losa",     label: "Losa de cimentación" },
  { id: "pilotes",  label: "Pilotes + losa de cimentación" },
  { id: "ninguna",  label: "Sin cimentación (fit-out)" },
] as const;

const MUROS = [
  { id: "block15",   label: "Block 15×20×40 cm" },
  { id: "tabique",   label: "Tabique rojo recocido" },
  { id: "blockapl",  label: "Block + aplanado de cemento" },
  { id: "ninguno",   label: "Sin muros (estructura metálica)" },
] as const;

const LOSAS = [
  { id: "maciza",   label: "Losa maciza de concreto 10 cm" },
  { id: "vb",       label: "Vigueta y bovedilla prefabricada" },
  { id: "steeldeck",label: "Steel deck (losa colaborante)" },
  { id: "ninguna",  label: "Sin losa" },
] as const;

const MUROS_INT = [
  { id: "mamposteria", label: "Mampostería (block/tabique)" },
  { id: "tablaroca",   label: "Tablaroca / Drywall" },
  { id: "ninguno",     label: "Sin muros interiores" },
] as const;

const PLAFONES = [
  { id: "ninguno",  label: "Sin plafón" },
  { id: "tabla",    label: "Tablaroca lisa" },
  { id: "tablamol", label: "Tablaroca con molduras" },
  { id: "armstrong",label: "Armstrong (oficinas)" },
] as const;

const CALIDADES = [
  { id: "economico", label: "Económico", sub: "Interés social / Básico",   factor: "×0.70 en acabados" },
  { id: "estandar",  label: "Estándar",  sub: "Residencial / Medio",        factor: "×1.00 en acabados" },
  { id: "premium",   label: "Premium",   sub: "Lujo / Alta gama",            factor: "×1.60 en acabados" },
] as const;

const PISOS = [
  { id: "concreto",     label: "Concreto pulido" },
  { id: "ceramica33",   label: "Cerámica 33×33 cm" },
  { id: "ceramica45",   label: "Cerámica 45×45 cm" },
  { id: "porcelanato",  label: "Porcelanato 60×60 cm" },
  { id: "madera",       label: "Madera laminada" },
  { id: "marmol",       label: "Mármol / Piedra natural" },
] as const;

const APLANADOS = [
  { id: "cementoarena", label: "Cemento-arena" },
  { id: "yeso",         label: "Yeso fino" },
  { id: "mixto",        label: "Mixto" },
  { id: "ninguno",      label: "Sin aplanados" },
] as const;

const PINTURAS = [
  { id: "vinilica",  label: "Vinílica estándar" },
  { id: "plastica",  label: "Plástica lavable" },
  { id: "ninguna",   label: "Sin pintura" },
] as const;

const HIDROSANITARIO = [
  { id: "pvc",     label: "PVC completo (agua fría/caliente + drenaje)" },
  { id: "ninguno", label: "Sin instalaciones" },
] as const;

const ELECTRICO = [
  { id: "basica",   label: "Básica (iluminación + contactos)" },
  { id: "completa", label: "Completa (tablero + circuitos)" },
  { id: "ninguna",  label: "Sin instalación eléctrica" },
] as const;

const CALENTADORES = [
  { id: "gas",     label: "Gas estándar" },
  { id: "solar",   label: "Solar (termosifón)" },
  { id: "ninguno", label: "Sin calentador" },
] as const;

const CISTERNAS = [
  { id: "ninguna", label: "Sin cisterna" },
  { id: "5000",    label: "5,000 litros" },
  { id: "10000",   label: "10,000 litros" },
] as const;

const AC_OPTS = [
  { id: "ninguno",   label: "Sin A/C" },
  { id: "minisplit", label: "Minisplits" },
  { id: "central",   label: "Central (ductos)" },
] as const;

/* ═══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");
const pct = (p: number, t: number) => (t ? Math.round((p / t) * 100) : 0);

/* ═══════════════════════════════════════════════════════
   ESTILOS COMPARTIDOS
══════════════════════════════════════════════════════ */
const SELECT: React.CSSProperties = {
  width: "100%",
  background: "#1a1a2e",
  border: "1px solid #333",
  borderRadius: 8,
  padding: "11px 14px",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "#fff",
  outline: "none",
};

const INPUT_NUM: React.CSSProperties = {
  width: "100%",
  background: "#1a1a2e",
  border: "1px solid #333",
  borderRadius: 8,
  padding: "11px 14px",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "#fff",
  outline: "none",
};

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: 14,
  color: "#fff",
  marginBottom: 4,
  display: "block",
};

const SUBLABEL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  color: "rgba(255,255,255,0.4)",
  marginBottom: 12,
  display: "block",
  lineHeight: 1.5,
};

function BtnGroup({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            style={{
              padding: "9px 18px",
              borderRadius: 9999,
              border: active ? "1px solid #847dff" : "1px solid #444",
              background: active ? "rgba(132,125,255,0.15)" : "#2e2e2e",
              color: active ? "#847dff" : "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              cursor: "pointer",
              transition: "all 150ms",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function CardGroup({
  options,
  value,
  onChange,
  cols = 2,
}: {
  options: ReadonlyArray<{ id: string; label: string; sub?: string }>;
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 10,
      }}
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: active ? "1px solid #847dff" : "1px solid #444",
              background: active ? "rgba(132,125,255,0.10)" : "#2e2e2e",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              textAlign: "left",
              cursor: "pointer",
              transition: "all 150ms",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontWeight: active ? 600 : 500, color: active ? "#847dff" : "#fff" }}>
              {o.label}
            </span>
            {o.sub && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
                {o.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20 }}>
      <label style={LABEL}>{label}</label>
      {sub && <span style={SUBLABEL}>{sub}</span>}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WIZARD STATE
══════════════════════════════════════════════════════ */
type FormData = {
  // Step 1
  tipologia: string;
  estado: string;
  // Step 2
  metros: number | "";
  niveles: string;
  altura: string;
  recamaras: string;
  banos_completos: string;
  banos_medios: string;
  // Step 3
  cimentacion: string;
  muros: string;
  losa: string;
  muros_int: string;
  plafon: string;
  castillos: boolean;
  // Step 4
  calidad: string;
  piso: string;
  aplanado: string;
  pintura: string;
  impermeabilizacion: boolean;
  // Step 5
  hidrosanitario: string;
  electrico: string;
  calentador: string;
  cisterna: string;
  red_gas: boolean;
  ac: string;
  ac_equipos: string;
};

const DEFAULT: FormData = {
  tipologia: "",
  estado: "",
  metros: "",
  niveles: "1",
  altura: "2.70",
  recamaras: "",
  banos_completos: "",
  banos_medios: "",
  cimentacion: "zapatas",
  muros: "block15",
  losa: "maciza",
  muros_int: "mamposteria",
  plafon: "ninguno",
  castillos: true,
  calidad: "estandar",
  piso: "ceramica45",
  aplanado: "cementoarena",
  pintura: "vinilica",
  impermeabilizacion: true,
  hidrosanitario: "pvc",
  electrico: "completa",
  calentador: "gas",
  cisterna: "5000",
  red_gas: false,
  ac: "ninguno",
  ac_equipos: "2",
};

const STEP_LABELS = ["Tipo", "Generales", "Estructura", "Acabados", "Instalaciones"];

/* ═══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════ */
export default function PresupuestoPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(DEFAULT);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resultTab, setResultTab] = useState<"resumen" | "materiales" | "mano_obra" | "comparativa">("resumen");
  const [displayVal, setDisplayVal] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  /* ── cálculo en tiempo real ── */
  const calcular = useCallback(async (data: FormData) => {
    const m = typeof data.metros === "number" ? data.metros : 0;
    if (!data.tipologia || !data.estado || m < 20) return;
    setLoading(true);
    try {
      const res = await fetch("/api/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metros_cuadrados: m,
          niveles: parseInt(data.niveles) || 1,
          id_tipologia: data.tipologia,
          id_estado: data.estado,
          id_calidad: data.calidad || "estandar",
        }),
      });
      if (res.ok) setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => calcular(form), 500);
    return () => { if (debRef.current) clearTimeout(debRef.current); };
  }, [form.tipologia, form.estado, form.metros, form.niveles, form.calidad, calcular]);

  /* ── count-up ── */
  useEffect(() => {
    if (!result) return;
    const target = result.principal.presupuesto_total_mxn;
    const start = displayVal;
    const diff = target - start;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayVal(Math.round(start + diff * (i / 28)));
      if (i >= 28) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.principal.presupuesto_total_mxn]);

  /* ── validación ── */
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.tipologia) e.tipologia = "Selecciona el tipo de proyecto";
      if (!form.estado) e.estado = "Selecciona tu estado";
    }
    if (step === 2) {
      const m = typeof form.metros === "number" ? form.metros : 0;
      if (!m || m < 20 || m > 2000) e.metros = "El valor debe estar entre 20 y 2,000 m²";
      if (!form.recamaras) e.recamaras = "Requerido";
      if (!form.banos_completos) e.banos_completos = "Requerido";
      if (form.banos_medios === "") e.banos_medios = "Requerido";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, 5)); };
  const prev = () => { setErrors({}); setStep((s) => Math.max(s - 1, 1)); };

  const handleCalcular = () => {
    if (!validate()) return;
    setShowResults(true);
    calcular(form);
  };

  /* ─── PDF ─── */
  const generarPDF = () => {
    if (!result) return;
    type LastTable = { lastAutoTable: { finalY: number } };
    const lastY = () => (doc as unknown as LastTable).lastAutoTable.finalY;

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210, ML = 14, MR = 14;
    const metros = typeof form.metros === "number" ? form.metros : 0;
    const tipLabel = TIPOS.find(t => t.id === form.tipologia)?.label ?? "";
    const estLabel = ESTADOS.find(e => e.id === form.estado)?.nombre ?? "";
    const calLabel = CALIDADES.find(c => c.id === form.calidad)?.label ?? "";
    const factor   = FACTOR_SICT[form.estado];
    const fecha    = new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });

    const r = result.principal;
    const costo_base = r.costo_directo_materiales + r.costo_directo_mano_obra;
    const esp_total  = r.equipamiento_especial;
    const costo_dir  = costo_base + esp_total;
    const honor      = r.presupuesto_total_mxn * 0.08;
    const subtHon    = r.presupuesto_total_mxn + honor;
    const ivaTotal   = subtHon * 0.16;
    const totalIVA   = subtHon + ivaTotal;

    // Partidas con % del costo_base (sin especiales)
    const PARTS = [
      { code: "PRE", nombre: "Trabajos Preliminares",    pct: 0.03, items: [
          { sub: "Limpieza general y preparación del terreno",        cant: metros, split: 0.50 },
          { sub: "Trazo, nivelación y referencias topográficas",      cant: metros, split: 0.50 },
        ]},
      { code: "CIM", nombre: "Cimentación",               pct: 0.10, items: [
          { sub: "Excavación y plantilla de cimentación fc=100",      cant: metros, split: 0.40 },
          { sub: "Zapatas corridas + trabes de liga fc=200 kg/cm²",   cant: metros, split: 0.35 },
          { sub: "Relleno, compactación y drenaje perimetral",        cant: metros, split: 0.25 },
        ]},
      { code: "EST", nombre: "Estructura",                pct: 0.27, items: [
          { sub: "Acero de refuerzo corrugado No.3 (3/8\") y No.4 (1/2\")", cant: metros * 5, split: 0.55 },
          { sub: "Concreto premezclado fc=250 kg/cm² en columnas y trabes",  cant: Math.round(metros * 0.15), split: 0.30 },
          { sub: "Losa maciza e=10 cm fc=200 + cimbra y apuntalamiento",    cant: metros, split: 0.15 },
        ]},
      { code: "ALB", nombre: "Albañilería",               pct: 0.20, items: [
          { sub: "Block hueco de concreto 15×20×40 cm + mano de obra",      cant: metros, split: 0.55 },
          { sub: "Cemento, cal y arena para mezclas y morteros",             cant: metros, split: 0.30 },
          { sub: "Castillos, dalas y cerramientos de concreto armado",       cant: Math.round(metros * 0.8), split: 0.15 },
        ]},
      { code: "ACB", nombre: "Acabados",                  pct: 0.15, items: [
          { sub: `Piso ${calLabel} instalado (cerámico / porcelanato)`,      cant: metros, split: 0.45 },
          { sub: "Aplanados de cemento-arena + yeso fino interior",          cant: metros, split: 0.30 },
          { sub: "Pintura vinílica 2 manos + puertas, ventanas y herrería",  cant: metros, split: 0.25 },
        ]},
      { code: "HID", nombre: "Hidráulica y Sanitaria",    pct: 0.10, items: [
          { sub: "Instalación hidráulica PVC/PPR agua fría y caliente",      cant: metros, split: 0.55 },
          { sub: "Instalación sanitaria PVC drenaje + registros",            cant: metros, split: 0.45 },
        ]},
      { code: "ELE", nombre: "Instalación Eléctrica",     pct: 0.15, items: [
          { sub: "Cable THW cal.12 + poliducto y salidas eléctricas",        cant: metros, split: 0.55 },
          { sub: "Tablero de distribución + contactos y apagadores",         cant: metros, split: 0.25 },
          { sub: "Mano de obra electricista + verificación NOM-001-SEDE",    cant: metros, split: 0.20 },
        ]},
    ];

    // ─── PÁGINA 1: PORTADA ────────────────────────────────────
    doc.setFillColor(12, 12, 20);
    doc.rect(0, 0, W, 297, "F");

    doc.setFont("helvetica", "bold"); doc.setFontSize(30); doc.setTextColor(132, 125, 255);
    doc.text("ConstruIA.mx", W / 2, 48, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(120, 115, 170);
    doc.text("Plataforma de Estimación de Costos de Construcción · CEICO-CMIC 2026", W / 2, 58, { align: "center" });

    doc.setDrawColor(132, 125, 255); doc.setLineWidth(0.4);
    doc.line(ML, 65, W - MR, 65);

    doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.setTextColor(255, 255, 255);
    doc.text("PRESUPUESTO DE OBRA", W / 2, 80, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(170, 165, 210);
    doc.text("Estimación Paramétrica · Precios SICT 2025 · NTC-RCDF 2023", W / 2, 89, { align: "center" });

    // Tarjeta datos
    doc.setFillColor(18, 18, 32);
    doc.roundedRect(ML, 100, W - ML - MR, 82, 4, 4, "F");
    doc.setDrawColor(80, 75, 140); doc.setLineWidth(0.3);
    doc.roundedRect(ML, 100, W - ML - MR, 82, 4, 4, "S");

    const filas: [string, string][] = [
      ["Tipo de proyecto:", tipLabel],
      ["Estado / Región:", estLabel],
      ["Factor SICT mat/mo:", factor ? `${factor.mat.toFixed(2)} / ${factor.mo.toFixed(2)}` : "—"],
      ["Superficie construida:", `${metros} m²`],
      ["Número de niveles:", form.niveles],
      ["Nivel de acabados:", calLabel],
      ["Fecha de emisión:", fecha],
    ];
    let dy = 111;
    filas.forEach(([lb, vl]) => {
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(130, 125, 170);
      doc.text(lb, ML + 6, dy);
      doc.setFont("helvetica", "bold"); doc.setTextColor(220, 218, 255);
      doc.text(vl, 105, dy);
      dy += 9;
    });

    // Caja total sin IVA
    doc.setFillColor(50, 30, 100);
    doc.roundedRect(ML, 196, W - ML - MR, 32, 4, 4, "F");
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(190, 185, 240);
    doc.text("COSTO DE CONSTRUCCIÓN SIN IVA", W / 2, 207, { align: "center" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(21); doc.setTextColor(255, 255, 255);
    doc.text(fmt(r.presupuesto_total_mxn) + " MXN", W / 2, 220, { align: "center" });
    doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(190, 185, 240);
    doc.text(`${fmt(r.costo_parametrico_m2)}/m²  ·  Indirectos 18% + Utilidad 10% incluidos`, W / 2, 226, { align: "center" });

    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(132, 125, 255);
    doc.text(`TOTAL CON IVA (Hon. 8% + IVA 16%): ${fmt(totalIVA)} MXN`, W / 2, 243, { align: "center" });

    doc.setFont("helvetica", "italic"); doc.setFontSize(7); doc.setTextColor(60, 58, 90);
    doc.text("Sin terreno · Sin proyecto ejecutivo · Sin permisos · Vigencia 30 días", W / 2, 280, { align: "center" });
    doc.text("Precios de referencia para estimación inicial · Para contratos formales elaborar APUs analíticos", W / 2, 285, { align: "center" });

    // ─── PÁGINA 2: DESGLOSE POR PARTIDAS ─────────────────────
    doc.addPage();
    doc.setFillColor(12, 12, 20); doc.rect(0, 0, W, 297, "F");
    doc.setFillColor(22, 20, 45); doc.rect(0, 0, W, 20, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(132, 125, 255);
    doc.text("DESGLOSE POR PARTIDAS", ML, 13);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(140, 135, 185);
    doc.text(`${tipLabel} · ${metros} m² · ${estLabel} · ${calLabel}`, W - MR, 13, { align: "right" });

    let y = 24;

    PARTS.forEach(p => {
      const tp = costo_base * p.pct;

      // Cabecera de partida
      doc.setFillColor(42, 38, 75);
      doc.rect(ML, y, W - ML - MR, 7, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(190, 185, 240);
      doc.text(`${p.code} — ${p.nombre}`, ML + 3, y + 5);
      doc.setTextColor(132, 125, 255);
      doc.text(fmt(tp), W - MR - 2, y + 5, { align: "right" });
      y += 7;

      // Tabla de ítems
      autoTable(doc, {
        startY: y,
        head: [["CÓDIGO", "CONCEPTO", "UNIDAD", "CANTIDAD", "P.UNITARIO", "IMPORTE"]],
        body: p.items.map((it, i) => {
          const imp = tp * it.split;
          const pu  = it.cant > 0 ? imp / it.cant : 0;
          return [
            `${p.code}-${String(i + 1).padStart(3, "0")}`,
            it.sub,
            "m²",
            Math.round(it.cant).toLocaleString("es-MX"),
            "$" + Math.round(pu).toLocaleString("es-MX"),
            "$" + Math.round(imp).toLocaleString("es-MX"),
          ];
        }),
        headStyles:  { fillColor: [28, 25, 55], textColor: [150, 145, 205], fontSize: 7,   fontStyle: "bold", cellPadding: 1.8 },
        bodyStyles:  { fillColor: [16, 15, 28], textColor: [210, 208, 235], fontSize: 7.5, cellPadding: 1.8 },
        alternateRowStyles: { fillColor: [20, 19, 35] },
        columnStyles: {
          0: { halign: "center", cellWidth: 18 },
          2: { halign: "center", cellWidth: 14 },
          3: { halign: "right",  cellWidth: 20 },
          4: { halign: "right",  cellWidth: 25 },
          5: { halign: "right",  cellWidth: 28 },
        },
        theme: "plain",
        margin: { left: ML, right: MR },
      });
      y = lastY() + 4;
    });

    // ESP — Equipamiento Especial
    {
      doc.setFillColor(42, 38, 75); doc.rect(ML, y, W - ML - MR, 7, "F");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(190, 185, 240);
      doc.text("ESP — Equipamiento Especial", ML + 3, y + 5);
      doc.setTextColor(132, 125, 255);
      doc.text(fmt(esp_total), W - MR - 2, y + 5, { align: "right" });
      y += 7;

      const espBody = r.desglose_especial.length > 0
        ? r.desglose_especial.map((d, i) => [
            `ESP-${String(i + 1).padStart(3, "0")}`, d.concepto, "equipo", "1",
            "$" + Math.round(d.costo).toLocaleString("es-MX"),
            "$" + Math.round(d.costo).toLocaleString("es-MX"),
          ])
        : [["ESP-001", "Sin equipamiento especial requerido", "—", "—", "—", "$0"]];

      autoTable(doc, {
        startY: y,
        head: [["CÓDIGO", "CONCEPTO", "UNIDAD", "CANTIDAD", "P.UNITARIO", "IMPORTE"]],
        body: espBody,
        headStyles:  { fillColor: [28, 25, 55], textColor: [150, 145, 205], fontSize: 7,   fontStyle: "bold", cellPadding: 1.8 },
        bodyStyles:  { fillColor: [16, 15, 28], textColor: [210, 208, 235], fontSize: 7.5, cellPadding: 1.8 },
        columnStyles: {
          0: { halign: "center", cellWidth: 18 },
          2: { halign: "center", cellWidth: 14 },
          3: { halign: "right",  cellWidth: 20 },
          4: { halign: "right",  cellWidth: 25 },
          5: { halign: "right",  cellWidth: 28 },
        },
        theme: "plain",
        margin: { left: ML, right: MR },
      });
      y = lastY() + 5;
    }

    // Total Costo Directo
    doc.setFillColor(18, 16, 40); doc.rect(ML, y, W - ML - MR, 10, "F");
    doc.setDrawColor(132, 125, 255); doc.setLineWidth(0.3);
    doc.rect(ML, y, W - ML - MR, 10, "S");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(190, 185, 240);
    doc.text("COSTO DIRECTO TOTAL", ML + 4, y + 6.8);
    doc.setTextColor(132, 125, 255); doc.setFontSize(10);
    doc.text(fmt(costo_dir), W - MR - 4, y + 6.8, { align: "right" });

    // ─── PÁGINA 3: FINANCIERO + COMPARATIVA + FIRMAS ─────────
    doc.addPage();
    doc.setFillColor(12, 12, 20); doc.rect(0, 0, W, 297, "F");
    doc.setFillColor(22, 20, 45); doc.rect(0, 0, W, 20, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(132, 125, 255);
    doc.text("INTEGRACIÓN FINANCIERA", ML, 13);

    y = 26;

    // Tabla financiera
    autoTable(doc, {
      startY: y,
      head: [["Concepto", "Monto MXN sin IVA"]],
      body: [
        ["Costo Directo (materiales + mano de obra + equipamiento)", fmt(costo_dir)],
        [`Indirectos (18%)`, fmt(costo_dir * 0.18)],
        ["Utilidad del contratista (10%)", fmt(costo_dir * 1.18 * 0.10)],
        ["Costo de Construcción (sin honorarios)", fmt(r.presupuesto_total_mxn)],
        ["Honorarios Profesionales del Arquitecto / D.R.O. (8%)", fmt(honor)],
        ["Subtotal sin IVA", fmt(subtHon)],
        ["IVA 16%", fmt(ivaTotal)],
      ],
      foot: [["TOTAL CON IVA", fmt(totalIVA)]],
      headStyles: { fillColor: [42, 38, 75], textColor: [190, 185, 240], fontSize: 8.5, fontStyle: "bold" },
      bodyStyles: { fillColor: [16, 15, 28], textColor: [210, 208, 235], fontSize: 9 },
      alternateRowStyles: { fillColor: [20, 19, 35] },
      footStyles: { fillColor: [60, 30, 120], textColor: 255, fontSize: 12, fontStyle: "bold" },
      columnStyles: { 1: { halign: "right", fontStyle: "bold", cellWidth: 55 } },
      theme: "plain",
      margin: { left: ML, right: MR },
    });
    y = lastY() + 8;

    // Comparativa escenarios
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(170, 165, 215);
    doc.text("COMPARATIVA DE ESCENARIOS", ML, y); y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Escenario", "Costo Directo", "Costo de Obra", "TOTAL CON IVA", "Costo/m² c/IVA"]],
      body: (["economico", "estandar", "premium"] as const).map(k => {
        const rk = result[k];
        const base = rk.costo_directo_materiales + rk.costo_directo_mano_obra + rk.equipamiento_especial;
        const tot  = rk.presupuesto_total_mxn * 1.08 * 1.16;
        const labels: Record<string, string> = { economico: "Económico", estandar: "Estándar", premium: "Premium" };
        return [labels[k], fmt(base), fmt(rk.presupuesto_total_mxn), fmt(tot), fmt(tot / metros)];
      }),
      headStyles: { fillColor: [32, 30, 60], textColor: [160, 155, 210], fontSize: 8, fontStyle: "bold" },
      bodyStyles: { fillColor: [16, 15, 28], textColor: [210, 208, 235], fontSize: 8.5 },
      alternateRowStyles: { fillColor: [20, 19, 35] },
      columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" }, 4: { halign: "right" } },
      theme: "plain",
      margin: { left: ML, right: MR },
    });
    y = lastY() + 8;

    // Badge NTC
    doc.setFillColor(12, 35, 18); doc.roundedRect(ML, y, W - ML - MR, 14, 3, 3, "F");
    doc.setDrawColor(22, 163, 74); doc.setLineWidth(0.3);
    doc.roundedRect(ML, y, W - ML - MR, 14, 3, 3, "S");
    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(34, 197, 94);
    doc.text("✓ Verificación NTC-RCDF 2023 / CEICO-CMIC 2026 / SICT 2025", ML + 5, y + 5.5);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(80, 185, 100);
    doc.text("Indirectos 18% + Utilidad 10% incluidos · Sin terreno · Sin proyecto ejecutivo · Sin licencias", ML + 5, y + 10.5);
    y += 20;

    // Firmas
    y = Math.max(y, 228);
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(160, 155, 210);
    doc.text("FIRMAS DE ACEPTACIÓN", ML, y); y += 10;

    const fw2 = (W - ML - MR - 16) / 2;
    [["Elaboró — Director de Proyecto / Arquitecto", ML], ["Acepta — Propietario / Cliente", ML + fw2 + 16]].forEach(([label, x]) => {
      const xn = x as number;
      doc.setDrawColor(90, 85, 140); doc.setLineWidth(0.3);
      doc.line(xn, y + 18, xn + fw2, y + 18);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(130, 125, 170);
      doc.text(label as string, xn + fw2 / 2, y + 24, { align: "center" });
      doc.text("Nombre y firma", xn + fw2 / 2, y + 30, { align: "center" });
      doc.text("Fecha: ___________________", xn + fw2 / 2, y + 36, { align: "center" });
    });

    doc.setFont("helvetica", "italic"); doc.setFontSize(6.5); doc.setTextColor(55, 52, 80);
    doc.text(`ConstruIA.mx · ${fecha} · Vigencia 30 días · Precios sujetos a variaciones del mercado`, W / 2, 290, { align: "center" });

    doc.save(`presupuesto-${form.estado}-${metros}m2-construia.pdf`);
  };

  /* ─── Excel ─── */
  const generarExcel = () => {
    if (!result) return;
    const metros   = typeof form.metros === "number" ? form.metros : 0;
    const tipLabel = TIPOS.find(t => t.id === form.tipologia)?.label ?? "";
    const estLabel = ESTADOS.find(e => e.id === form.estado)?.nombre ?? "";
    const calLabel = CALIDADES.find(c => c.id === form.calidad)?.label ?? "";

    const r         = result.principal;
    const cb        = r.costo_directo_materiales + r.costo_directo_mano_obra;
    const esp       = r.equipamiento_especial;
    const cDir      = cb + esp;
    const honor     = r.presupuesto_total_mxn * 0.08;
    const subtHon   = r.presupuesto_total_mxn + honor;
    const totalIVA  = subtHon * 1.16;

    const PARTS_XLS = [
      { code: "PRE", nombre: "Trabajos Preliminares",  pct: 0.03 },
      { code: "CIM", nombre: "Cimentación",             pct: 0.10 },
      { code: "EST", nombre: "Estructura",              pct: 0.27 },
      { code: "ALB", nombre: "Albañilería",             pct: 0.20 },
      { code: "ACB", nombre: "Acabados",                pct: 0.15 },
      { code: "HID", nombre: "Hidráulica y Sanitaria",  pct: 0.10 },
      { code: "ELE", nombre: "Instalación Eléctrica",   pct: 0.15 },
    ];

    const wb = XLSX.utils.book_new();

    // ── Hoja 1: Presupuesto ─────────────────────────────────
    const ws1: (string | number)[][] = [
      ["PRESUPUESTO DE OBRA — ConstruIA.mx"],
      ["Precios CEICO-CMIC 2026 + Factores SICT 2025"],
      [],
      ["Tipo de proyecto:", tipLabel, "", "Estado:", estLabel],
      ["Superficie:", metros, "m²", "Niveles:", parseInt(form.niveles)],
      ["Acabados:", calLabel, "", "Fecha:", new Date().toLocaleDateString("es-MX")],
      [],
      ["CÓDIGO", "PARTIDA", "IMPORTE MXN"],
    ];

    PARTS_XLS.forEach(p => {
      ws1.push([p.code, p.nombre, Math.round(cb * p.pct)]);
    });

    if (esp > 0) {
      ws1.push(["ESP", "Equipamiento Especial", Math.round(esp)]);
      r.desglose_especial.forEach((d, i) => {
        ws1.push([`  ESP-${String(i + 1).padStart(3, "0")}`, `  ${d.concepto}`, Math.round(d.costo)]);
      });
    } else {
      ws1.push(["ESP", "Equipamiento Especial", 0]);
    }

    ws1.push([]);
    ws1.push(["", "COSTO DIRECTO TOTAL",              Math.round(cDir)]);
    ws1.push(["", "Indirectos 18%",                   Math.round(cDir * 0.18)]);
    ws1.push(["", "Utilidad del contratista 10%",     Math.round(cDir * 1.18 * 0.10)]);
    ws1.push(["", "Costo de Construcción (sin hon.)", Math.round(r.presupuesto_total_mxn)]);
    ws1.push(["", "Honorarios profesionales 8%",      Math.round(honor)]);
    ws1.push(["", "Subtotal sin IVA",                 Math.round(subtHon)]);
    ws1.push(["", "IVA 16%",                          Math.round(subtHon * 0.16)]);
    ws1.push(["", "TOTAL CON IVA",                    Math.round(totalIVA)]);
    ws1.push([]);
    ws1.push(["", "Costo paramétrico sin IVA (MXN/m²):", Math.round(r.costo_parametrico_m2)]);
    ws1.push(["", "Costo paramétrico con IVA (MXN/m²):", Math.round(totalIVA / metros)]);

    const ws1Sheet = XLSX.utils.aoa_to_sheet(ws1);
    ws1Sheet["!cols"] = [{ wch: 8 }, { wch: 36 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws1Sheet, "Presupuesto");

    // ── Hoja 2: Comparativa ─────────────────────────────────
    const ws2: (string | number)[][] = [
      ["COMPARATIVA DE ESCENARIOS"],
      [],
      ["Escenario", "Costo Directo", "Costo de Obra", "Total con IVA", "Costo/m² c/IVA"],
    ];
    (["economico", "estandar", "premium"] as const).forEach(k => {
      const rk   = result[k];
      const base = rk.costo_directo_materiales + rk.costo_directo_mano_obra + rk.equipamiento_especial;
      const tot  = rk.presupuesto_total_mxn * 1.08 * 1.16;
      const lbl  = k === "economico" ? "Económico" : k === "estandar" ? "Estándar" : "Premium";
      ws2.push([lbl, Math.round(base), Math.round(rk.presupuesto_total_mxn), Math.round(tot), Math.round(tot / metros)]);
    });
    const ws2Sheet = XLSX.utils.aoa_to_sheet(ws2);
    ws2Sheet["!cols"] = [{ wch: 12 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, ws2Sheet, "Comparativa");

    XLSX.writeFile(wb, `presupuesto-${form.estado}-${metros}m2-construia.xlsx`);
  };

  /* ─── HUD values ─── */
  const total = result?.principal.presupuesto_total_mxn ?? 0;
  const mat   = result?.principal.costo_directo_materiales ?? 0;
  const mo    = result?.principal.costo_directo_mano_obra ?? 0;
  const equip = result?.principal.equipamiento_especial ?? 0;
  const imprevistos = total > 0 ? total * 0.10 : 0;

  /* ─── RENDER STEPS ─── */
  const renderStep = () => {
    switch (step) {

      /* ════ PASO 1 ════ */
      case 1: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <label style={LABEL}>🏗️ Tipo de proyecto</label>
            <span style={SUBLABEL}>Selecciona el tipo de obra que deseas cotizar</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {TIPOS.map((t) => {
                const active = form.tipologia === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { upd("tipologia", t.id); setErrors((e) => ({ ...e, tipologia: "" })); }}
                    style={{
                      padding: "20px 14px",
                      borderRadius: 12,
                      border: active ? "2px solid #847dff" : "1px solid #444",
                      background: active ? "rgba(132,125,255,0.12)" : "#2e2e2e",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 150ms",
                      position: "relative",
                    }}
                  >
                    {active && (
                      <span style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: "50%", background: "#847dff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>✓</span>
                    )}
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: active ? "#847dff" : "#fff", marginBottom: 4 }}>{t.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{t.sub}</div>
                  </button>
                );
              })}
            </div>
            {errors.tipologia && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 6 }}>{errors.tipologia}</p>}
          </div>

          {/* Descripción del tipo */}
          {form.tipologia === "vivienda_unifamiliar" && (
            <div style={{ background: "rgba(0,179,221,0.08)", border: "1px solid rgba(0,179,221,0.2)", borderRadius: 10, padding: "12px 14px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
                🏠 <strong style={{ color: "#00b3dd" }}>Casa habitación nueva</strong> — Cotización completa de 5 pasos: estructura, acabados, instalaciones y extras. Superficies de 20 a 2,000 m². Precios base SICT 2025 + SOyS CDMX 2026.
              </p>
            </div>
          )}

          <div>
            <label style={LABEL}>📍 Estado o región donde se construirá</label>
            <span style={SUBLABEL}>Afecta los costos de materiales y mano de obra según el índice FIC SICT 2025</span>
            <select
              value={form.estado}
              onChange={(e) => { upd("estado", e.target.value); setErrors((er) => ({ ...er, estado: "" })); }}
              style={SELECT}
            >
              <option value="">-- Selecciona tu estado --</option>
              {ESTADOS.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
            {errors.estado && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 6 }}>{errors.estado}</p>}
            {form.estado && FACTOR_SICT[form.estado] && (
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <span style={{ padding: "4px 12px", borderRadius: 9999, background: "rgba(132,125,255,0.12)", border: "1px solid rgba(132,125,255,0.3)", fontFamily: "var(--font-mono)", fontSize: 11, color: "#847dff" }}>
                  Mat ×{FACTOR_SICT[form.estado].mat.toFixed(2)}
                </span>
                <span style={{ padding: "4px 12px", borderRadius: 9999, background: "rgba(0,179,221,0.10)", border: "1px solid rgba(0,179,221,0.25)", fontFamily: "var(--font-mono)", fontSize: 11, color: "#00b3dd" }}>
                  M.O. ×{FACTOR_SICT[form.estado].mo.toFixed(2)}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.3)", alignSelf: "center" }}>FIC SICT 2025</span>
              </div>
            )}
          </div>
        </div>
      );

      /* ════ PASO 2 ════ */
      case 2: return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Field
            label="Superficie total construida (m²)"
            sub="Área total de construcción cubierta en todos los niveles. No incluye terrazas descubiertas ni estacionamiento."
          >
            <input
              type="number"
              min={20}
              max={2000}
              placeholder="Ej. 120"
              value={form.metros}
              onChange={(e) => { const v = e.target.value === "" ? "" : Number(e.target.value); upd("metros", v); setErrors((er) => ({ ...er, metros: "" })); }}
              style={INPUT_NUM}
            />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Mínimo 20 m², máximo 2,000 m²</span>
            {errors.metros && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 4 }}>{errors.metros}</p>}
          </Field>

          <Field
            label="Número de niveles (pisos)"
            sub="Cada nivel adicional incrementa el costo estructural. A partir del nivel 3 se aplica factor de altura según NTC 2026."
          >
            <BtnGroup
              options={[{ id: "1", label: "1" }, { id: "2", label: "2" }, { id: "3", label: "3" }]}
              value={form.niveles}
              onChange={(v) => upd("niveles", v)}
            />
          </Field>

          <Field
            label="Altura libre de piso a techo"
            sub="Afecta el costo de muros, castillos y trabes. La NTC establece 2.30 m como mínimo habitable. El estándar residencial es 2.70 m."
          >
            <select value={form.altura} onChange={(e) => upd("altura", e.target.value)} style={SELECT}>
              {ALTURAS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </Field>

          <Field
            label="Número de recámaras"
            sub="Determina la cantidad de puertas interiores, ventanas y el factor de tabique/block calculado."
          >
            <BtnGroup
              options={[{id:"1",label:"1"},{id:"2",label:"2"},{id:"3",label:"3"},{id:"4",label:"4"},{id:"5",label:"5"}]}
              value={form.recamaras}
              onChange={(v) => { upd("recamaras", v); setErrors((e) => ({ ...e, recamaras: "" })); }}
            />
            {errors.recamaras && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 6 }}>{errors.recamaras}</p>}
          </Field>

          <Field
            label="Baños completos (WC + lavabo + regadera)"
            sub="Se calculan WC Lamosa, lavabo empotrado, regadera y tubería hidrosanitaria por cada baño."
          >
            <BtnGroup
              options={[{id:"1",label:"1"},{id:"2",label:"2"},{id:"3",label:"3"}]}
              value={form.banos_completos}
              onChange={(v) => { upd("banos_completos", v); setErrors((e) => ({ ...e, banos_completos: "" })); }}
            />
            {errors.banos_completos && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 6 }}>{errors.banos_completos}</p>}
          </Field>

          <Field
            label="Medios baños (WC + lavabo)"
            sub="Baño social o de visitas. No incluye regadera. Se usa en sala, área de trabajo o planta baja."
          >
            <BtnGroup
              options={[{id:"0",label:"0"},{id:"1",label:"1"},{id:"2",label:"2"}]}
              value={form.banos_medios}
              onChange={(v) => { upd("banos_medios", v); setErrors((e) => ({ ...e, banos_medios: "" })); }}
            />
            {errors.banos_medios && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#f87171", marginTop: 6 }}>{errors.banos_medios}</p>}
          </Field>
        </div>
      );

      /* ════ PASO 3 ════ */
      case 3: return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Field label="Sistema de cimentación">
            <CardGroup
              options={CIMENTACIONES}
              value={form.cimentacion}
              onChange={(v) => upd("cimentacion", v)}
              cols={2}
            />
          </Field>
          <Field label="Sistema de muros">
            <CardGroup options={MUROS} value={form.muros} onChange={(v) => upd("muros", v)} cols={2} />
          </Field>
          <Field label="Sistema de losa">
            <CardGroup options={LOSAS} value={form.losa} onChange={(v) => upd("losa", v)} cols={2} />
          </Field>
          <Field label="Muros interiores">
            <CardGroup options={MUROS_INT} value={form.muros_int} onChange={(v) => upd("muros_int", v)} cols={3} />
          </Field>
          <Field label="Plafones">
            <CardGroup options={PLAFONES} value={form.plafon} onChange={(v) => upd("plafon", v)} cols={2} />
          </Field>
          <Field label="¿Incluye castillos y trabes de concreto?">
            <div style={{ display: "flex", gap: 10 }}>
              {[{v:true,l:"Sí, incluir"},{v:false,l:"No incluir"}].map(o => (
                <button key={String(o.v)} type="button" onClick={() => upd("castillos", o.v)} style={{ padding: "9px 20px", borderRadius: 9999, border: form.castillos === o.v ? "1px solid #847dff" : "1px solid #444", background: form.castillos === o.v ? "rgba(132,125,255,0.15)" : "#2e2e2e", color: form.castillos === o.v ? "#847dff" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: form.castillos === o.v ? 600 : 400, cursor: "pointer" }}>
                  {o.l}
                </button>
              ))}
            </div>
          </Field>
        </div>
      );

      /* ════ PASO 4 ════ */
      case 4: return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Field label="Nivel de acabados" sub="Multiplica el costo de pisos, recubrimientos y carpintería.">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CALIDADES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => upd("calidad", c.id)}
                  style={{
                    padding: "16px 18px",
                    borderRadius: 12,
                    border: form.calidad === c.id ? "1px solid #847dff" : "1px solid #444",
                    background: form.calidad === c.id ? "rgba(132,125,255,0.10)" : "#2e2e2e",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 17, color: form.calidad === c.id ? "#847dff" : "#fff" }}>{c.label}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.sub}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: form.calidad === c.id ? "#847dff" : "rgba(255,255,255,0.25)" }}>{c.factor}</span>
                </button>
              ))}
            </div>
          </Field>
          <Field label="Tipo de piso">
            <CardGroup options={PISOS} value={form.piso} onChange={(v) => upd("piso", v)} cols={2} />
          </Field>
          <Field label="Aplanados (muros/plafones)">
            <CardGroup options={APLANADOS} value={form.aplanado} onChange={(v) => upd("aplanado", v)} cols={2} />
          </Field>
          <Field label="Pintura interior">
            <CardGroup options={PINTURAS} value={form.pintura} onChange={(v) => upd("pintura", v)} cols={3} />
          </Field>
          <Field label="¿Incluye impermeabilización en azotea?">
            <div style={{ display: "flex", gap: 10 }}>
              {[{v:true,l:"Sí, incluir"},{v:false,l:"No incluir"}].map(o => (
                <button key={String(o.v)} type="button" onClick={() => upd("impermeabilizacion", o.v)} style={{ padding: "9px 20px", borderRadius: 9999, border: form.impermeabilizacion === o.v ? "1px solid #847dff" : "1px solid #444", background: form.impermeabilizacion === o.v ? "rgba(132,125,255,0.15)" : "#2e2e2e", color: form.impermeabilizacion === o.v ? "#847dff" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 13, cursor: "pointer", fontWeight: form.impermeabilizacion === o.v ? 600 : 400 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </Field>
        </div>
      );

      /* ════ PASO 5 ════ */
      case 5: return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Field label="Instalación hidráulica y sanitaria">
            <CardGroup options={[...HIDROSANITARIO]} value={form.hidrosanitario} onChange={(v) => upd("hidrosanitario", v)} cols={2} />
          </Field>
          <Field label="Instalación eléctrica">
            <CardGroup options={[...ELECTRICO]} value={form.electrico} onChange={(v) => upd("electrico", v)} cols={2} />
          </Field>
          <Field label="Calentador de agua">
            <CardGroup options={[...CALENTADORES]} value={form.calentador} onChange={(v) => upd("calentador", v)} cols={3} />
          </Field>
          <Field label="Cisterna">
            <CardGroup options={[...CISTERNAS]} value={form.cisterna} onChange={(v) => upd("cisterna", v)} cols={3} />
          </Field>
          <Field label="¿Red de gas doméstico?">
            <div style={{ display: "flex", gap: 10 }}>
              {[{v:true,l:"Sí, incluir"},{v:false,l:"No incluir"}].map(o => (
                <button key={String(o.v)} type="button" onClick={() => upd("red_gas", o.v)} style={{ padding: "9px 20px", borderRadius: 9999, border: form.red_gas === o.v ? "1px solid #847dff" : "1px solid #444", background: form.red_gas === o.v ? "rgba(132,125,255,0.15)" : "#2e2e2e", color: form.red_gas === o.v ? "#847dff" : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 13, cursor: "pointer", fontWeight: form.red_gas === o.v ? 600 : 400 }}>
                  {o.l}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Aire acondicionado">
            <CardGroup options={[...AC_OPTS]} value={form.ac} onChange={(v) => upd("ac", v)} cols={3} />
            {form.ac === "minisplit" && (
              <div style={{ marginTop: 10 }}>
                <span style={SUBLABEL}>Número de equipos minisplit:</span>
                <BtnGroup
                  options={[{id:"1",label:"1 equipo"},{id:"2",label:"2 equipos"},{id:"3",label:"3 equipos"},{id:"4",label:"4 equipos"},{id:"6",label:"6 equipos"}]}
                  value={form.ac_equipos}
                  onChange={(v) => upd("ac_equipos", v)}
                />
              </div>
            )}
          </Field>
        </div>
      );

      default: return null;
    }
  };

  /* ─────────────────────────────────────────────────────── */
  /* PANTALLA DE RESULTADOS                                  */
  /* ─────────────────────────────────────────────────────── */
  if (showResults) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ paddingTop: 64, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "80px 40px" }}>
          {/* Result header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                Presupuesto generado · CMIC 2026 · {ESTADOS.find(e => e.id === form.estado)?.nombre}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(36px,4vw,56px)", color: "#847dff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {total > 0 ? fmt(total) : "Calculando…"}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
                MXN · Sin IVA · {result?.principal.costo_parametrico_m2 ? fmt(result.principal.costo_parametrico_m2) + "/m²" : ""}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowResults(false); setStep(5); }} style={{ padding: "11px 20px", borderRadius: 9999, border: "1px solid #444", background: "#2e2e2e", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 13, cursor: "pointer" }}>
                ← Nueva Cotización
              </button>
              <button onClick={generarPDF} style={{ padding: "11px 20px", borderRadius: 9999, border: "none", background: "#847dff", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                📄 Descargar PDF
              </button>
              <button onClick={generarExcel} style={{ padding: "11px 20px", borderRadius: 9999, border: "1px solid rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.10)", color: "#4ade80", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                📊 Descargar Excel
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 0 }}>
            {([["resumen","Resumen"],["materiales","Materiales"],["mano_obra","Mano de Obra"],["comparativa","📊 Comparativa"]] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setResultTab(id as typeof resultTab)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  background: "transparent",
                  color: resultTab === id ? "#847dff" : "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: resultTab === id ? 600 : 400,
                  cursor: "pointer",
                  borderBottom: resultTab === id ? "2px solid #847dff" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {resultTab === "resumen" && result && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {/* Desglose */}
              <div style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Desglose de partidas</p>
                {[
                  { label: "Materiales directos", val: mat,        color: "#847dff" },
                  { label: "Mano de obra directa", val: mo,        color: "#00b3dd" },
                  { label: "Equipamiento especial", val: equip,    color: "#dd90d8" },
                  { label: "Imprevistos (10%)",    val: imprevistos, color: "#90b8f0" },
                ].map(p => (
                  <div key={p.label} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{p.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff" }}>{total > 0 ? fmt(p.val) : "—"}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 9999 }}>
                      <div style={{ width: `${pct(p.val, total)}%`, height: "100%", background: p.color, borderRadius: 9999, opacity: 0.85, transition: "width 600ms ease" }} />
                    </div>
                  </div>
                ))}
                {result.principal.desglose_especial.length > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#00b3dd", fontWeight: 600, marginBottom: 8 }}>Equipamiento especial incluido:</p>
                    {result.principal.desglose_especial.map(d => (
                      <div key={d.concepto} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{d.concepto}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#00b3dd" }}>{fmt(d.costo)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "#111216", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Resumen del proyecto</p>
                  {[
                    { label: "Tipología", val: TIPOS.find(t=>t.id===form.tipologia)?.label },
                    { label: "Estado", val: ESTADOS.find(e=>e.id===form.estado)?.nombre },
                    { label: "Superficie", val: `${form.metros} m²` },
                    { label: "Niveles", val: `${form.niveles} nivel${parseInt(form.niveles)>1?"es":""}` },
                    { label: "Calidad", val: CALIDADES.find(c=>c.id===form.calidad)?.label },
                    { label: "Cimentación", val: CIMENTACIONES.find(c=>c.id===form.cimentacion)?.label },
                    { label: "Costo/m²", val: result ? fmt(result.principal.costo_parametrico_m2) : "—" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", fontWeight: 500 }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.18)", borderRadius: 10, padding: "12px 14px" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>✓ Verificación NTC-RCDF 2023</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.55 }}>Precios CEICO-CMIC 2026 + factores SICT 2025. Indirectos 18% + Utilidad 10% incluidos.</p>
                </div>
              </div>
            </div>
          )}

          {resultTab === "materiales" && result && (
            <div style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Tabla de materiales LOPSRM — {ESTADOS.find(e=>e.id===form.estado)?.nombre}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 20px" }}>
                {["Partida","Monto","Pct."].map(h => <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em", textTransform: "uppercase", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{h}</span>)}
                {[
                  { name: "Materiales directos", val: mat },
                  { name: "Mano de obra directa", val: mo },
                  { name: "Equipamiento especial", val: equip },
                  { name: "Indirectos (18%)", val: result.principal.indirectos_y_ganancia * 0.64 },
                  { name: "Utilidad (10%)", val: result.principal.indirectos_y_ganancia * 0.36 },
                ].map(r => (
                  <>
                    <span key={r.name+"l"} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.65)", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{r.name}</span>
                    <span key={r.name+"v"} style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>{fmt(r.val)}</span>
                    <span key={r.name+"p"} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.3)", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>{pct(r.val, total)}%</span>
                  </>
                ))}
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, color: "#fff", paddingTop: 14 }}>TOTAL</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#847dff", paddingTop: 14, textAlign: "right" }}>{fmt(total)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#847dff", paddingTop: 14, textAlign: "right" }}>100%</span>
              </div>
            </div>
          )}

          {resultTab === "mano_obra" && result && (
            <div style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>Mano de obra — Precios DOF-IMSS 2025 + FASAR 1.65</p>
              {[
                { label: "Oficial albañil",      note: "Rendimiento 2.2 m²/jornada" },
                { label: "Peón construcción",    note: "Rendimiento 2.2 m²/jornada" },
                { label: "Oficial electricista", note: "Rendimiento 6.0 m²/jornada" },
                { label: "Oficial plomero",      note: "Rendimiento 6.0 m²/jornada" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", marginBottom: 2 }}>{row.label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{row.note}</p>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#00b3dd" }}>Factor SICT 2025</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: "14px", background: "rgba(0,179,221,0.08)", borderRadius: 10, border: "1px solid rgba(0,179,221,0.2)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff" }}>
                  Total mano de obra: <strong style={{ color: "#00b3dd" }}>{fmt(mo)}</strong>
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                  Salarios reales DOF-IMSS Feb 2025 × Factor FASAR 1.65 × Factor regional SICT
                </p>
              </div>
            </div>
          )}

          {resultTab === "comparativa" && result && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { label: "Económico", data: result.economico, color: "#4ade80" },
                { label: "Estándar",  data: result.estandar,  color: "#847dff" },
                { label: "Premium",   data: result.premium,   color: "#f472b6" },
              ].map(s => (
                <div key={s.label} style={{ background: "#111216", borderRadius: 16, padding: 24, border: s.data.presupuesto_total_mxn === total ? "1px solid #847dff" : "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{s.label}</p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 28, color: s.color, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{fmt(s.data.presupuesto_total_mxn)}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{fmt(s.data.costo_parametrico_m2)}/m²</p>
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { l: "Materiales", v: s.data.costo_directo_materiales },
                      { l: "Mano de obra", v: s.data.costo_directo_mano_obra },
                      { l: "Equipamiento", v: s.data.equipamiento_especial },
                    ].map(p => (
                      <div key={p.l} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.l}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{fmt(p.v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────── */
  /* WIZARD PRINCIPAL                                        */
  /* ─────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ display: "flex", flex: 1, padding: "64px 0 0 0", height: "calc(100vh - 64px)" }}>

        {/* ══ 65% FORMULARIO ══ */}
        <div style={{ flex: "0 0 65%", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.07)" }}>

          {/* Step indicators */}
          <div style={{ padding: "20px 32px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#111216" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, color: "#fff", marginBottom: 16, letterSpacing: "-0.01em" }}>
              🔧 Tu proyecto de construcción
            </h1>
            <div style={{ display: "flex", gap: 0, position: "relative" }}>
              {/* Connector line */}
              <div style={{ position: "absolute", top: 16, left: 16, right: 16, height: 2, background: "rgba(255,255,255,0.06)", zIndex: 0 }} />
              <div style={{ position: "absolute", top: 16, left: 16, width: `${((step - 1) / 4) * (100 - 8)}%`, height: 2, background: "#847dff", zIndex: 1, transition: "width 300ms ease" }} />
              {STEP_LABELS.map((label, i) => {
                const n = i + 1;
                const done   = n < step;
                const active = n === step;
                return (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, position: "relative", zIndex: 2 }}>
                    <button
                      onClick={() => { if (done) setStep(n); }}
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        border: active ? "2px solid #847dff" : done ? "2px solid rgba(132,125,255,0.5)" : "2px solid rgba(255,255,255,0.15)",
                        background: active ? "#847dff" : done ? "rgba(132,125,255,0.2)" : "#111216",
                        color: "#fff",
                        fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                        cursor: done ? "pointer" : "default",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {done ? "✓" : n}
                    </button>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: active ? "#847dff" : "rgba(255,255,255,0.3)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            {renderStep()}
          </div>

          {/* Nav buttons */}
          <div style={{ padding: "16px 32px", borderTop: "1px solid rgba(255,255,255,0.07)", background: "#111216", display: "flex", gap: 12 }}>
            {step > 1 && (
              <button
                onClick={prev}
                style={{ padding: "12px 24px", borderRadius: 9999, border: "1px solid #444", background: "transparent", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer", letterSpacing: "0.04em" }}
              >
                ← ATRÁS
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={next}
                style={{ flex: 1, padding: "12px 24px", borderRadius: 9999, border: "none", background: "#847dff", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}
              >
                SIGUIENTE PASO →
              </button>
            ) : (
              <button
                onClick={handleCalcular}
                disabled={loading}
                style={{ flex: 1, padding: "12px 24px", borderRadius: 9999, border: "none", background: loading ? "rgba(132,125,255,0.5)" : "#847dff", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.04em" }}
              >
                {loading ? "Calculando…" : "CALCULAR TOTAL"}
              </button>
            )}
          </div>
        </div>

        {/* ══ 35% HUD ══ */}
        <div style={{ flex: "0 0 35%", background: "#0d0e12", overflowY: "auto", padding: "28px 28px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Presupuesto en vivo</span>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: loading ? "#facc15" : total > 0 ? "#4ade80" : "rgba(255,255,255,0.2)", display: "inline-block", animation: "pulse 2s infinite" }} />
          </div>

          {/* Estimado actual card */}
          <div style={{ background: "#1a1020", border: "1px solid rgba(132,125,255,0.2)", borderRadius: 14, padding: "20px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Estimado actual</p>
            {total > 0 ? (
              <>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,3vw,40px)", color: "#847dff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {fmt(displayVal)}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
                  MXN sin IVA · {result?.principal.costo_parametrico_m2 ? fmt(result.principal.costo_parametrico_m2) + "/m²" : ""}
                </p>
              </>
            ) : (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
                {!form.tipologia ? "Selecciona tipo de proyecto" : !form.estado ? "Selecciona tu estado" : "Ingresa superficie"}
              </p>
            )}
          </div>

          {/* Partidas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Materiales",          val: mat,         color: "#847dff" },
              { label: "Mano de obra",         val: mo,          color: "#00b3dd" },
              { label: "Imprevistos (10%)",    val: imprevistos, color: "#90b8f0" },
            ].map(p => (
              <div key={p.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{p.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: total > 0 ? "#fff" : "rgba(255,255,255,0.2)" }}>
                    {total > 0 ? fmt(p.val) : "Pendiente"}
                  </span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
                  <div style={{ width: total > 0 ? `${pct(p.val, total)}%` : "0%", height: "100%", background: p.color, borderRadius: 9999, transition: "width 600ms ease", opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Comparativa rápida */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 12 }}>Comparativa rápida</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {result ? (
                [
                  { label: "Económico", val: result.economico.presupuesto_total_mxn, color: "#4ade80" },
                  { label: "Estándar",  val: result.estandar.presupuesto_total_mxn,  color: "#847dff" },
                  { label: "Premium",   val: result.premium.presupuesto_total_mxn,   color: "#f472b6" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: s.color, fontWeight: 600 }}>{fmt(s.val)}</span>
                  </div>
                ))
              ) : (
                ["Económico","Estándar","Premium"].map(s => (
                  <div key={s} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{s}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.15)" }}>—</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Analizar con IA */}
          <button style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#847dff", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: "auto" }} onClick={() => { if (result) window.location.href = `/agente?presupuesto=${fmt(total)}`; }}>
            🤖 Analizar con Agente IA
          </button>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>Lee tu presupuesto en tiempo real</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
        select option { background:#1a1a2e; color:#fff; }
        input::-webkit-inner-spin-button { opacity:.3; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:9999px; }
      `}</style>
    </div>
  );
}
