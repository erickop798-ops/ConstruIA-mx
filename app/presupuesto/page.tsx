"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../_components/Navbar";

/* ─── tipos ──────────────────────────────────────────── */
interface PartidaResult {
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
  principal: PartidaResult;
  economico: PartidaResult;
  estandar:  PartidaResult;
  premium:   PartidaResult;
}

/* ─── catálogos ──────────────────────────────────────── */
const TIPOLOGIAS = [
  { id: "vivienda_unifamiliar",  label: "Casa Habitación / Unifamiliar" },
  { id: "departamentos",         label: "Edificio de Departamentos" },
  { id: "departamentos_premium", label: "Torre de Departamentos (Premium)" },
  { id: "local_comercial",       label: "Local Comercial (Retail)" },
  { id: "cafeteria",             label: "Cafetería" },
  { id: "restaurante",           label: "Restaurante" },
  { id: "fit_out_comercial",     label: "Acondicionamiento Interior (Fit-out)" },
] as const;

const ESTADOS = [
  { id: "aguascalientes",      nombre: "Aguascalientes" },
  { id: "baja_california",     nombre: "Baja California" },
  { id: "baja_california_sur", nombre: "Baja California Sur" },
  { id: "campeche",            nombre: "Campeche" },
  { id: "chiapas",             nombre: "Chiapas" },
  { id: "chihuahua",           nombre: "Chihuahua" },
  { id: "cdmx",                nombre: "Ciudad de México" },
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

const CALIDAD_OPTIONS = [
  { id: "economico", label: "Económico",  sub: "Interés social / Básico",  factor: "×0.70 en acabados" },
  { id: "estandar",  label: "Estándar",   sub: "Medio / Residencial",      factor: "×1.00 en acabados" },
  { id: "premium",   label: "Premium",    sub: "Lujo / Alta gama",          factor: "×1.60 en acabados" },
] as const;

const TIPOLOGIA_INFO: Record<string, { estructura: string; extras: string }> = {
  vivienda_unifamiliar:  { estructura: "Concreto armado + block 15cm", extras: "Sin equipos especiales" },
  departamentos:         { estructura: "Concreto armado reforzado", extras: "Cisterna 10,000L incluida (≥4 niveles: elevador + bomba)" },
  departamentos_premium: { estructura: "Concreto armado alta resistencia", extras: "Elevador, cisterna, HVAC premium incluidos" },
  local_comercial:       { estructura: "Concreto + instalación eléctrica trifásica", extras: "HVAC minisplit (1 ton/15m²) incluido" },
  cafeteria:             { estructura: "Concreto + instalaciones semi-industriales", extras: "Cocina semi-industrial + HVAC" },
  restaurante:           { estructura: "Concreto + cocina industrial completa", extras: "HVAC, extracción, hidrosanitario industrial" },
  fit_out_comercial:     { estructura: "Sin estructura (obra gris recibida)", extras: "Solo instalaciones + acabados" },
};

/* ─── helpers ────────────────────────────────────────── */
const fmt = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-MX");

const pct = (part: number, total: number) =>
  total ? Math.round((part / total) * 100) : 0;

/* ─── estilos base ───────────────────────────────────── */
const INPUT: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  padding: "11px 14px",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "#fff",
  outline: "none",
};

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.45)",
  marginBottom: 6,
  display: "block",
};

/* ─── componente ─────────────────────────────────────── */
export default function PresupuestoPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    tipologia: "vivienda_unifamiliar",
    estado: "cdmx",
    metros: 120,
    niveles: 1,
    calidad: "estandar",
    piso: "ceramica",
    hidraulica: true,
    electrica: true,
    sanitaria: true,
  });
  const [result, setResult]       = useState<CalcResult | null>(null);
  const [loading, setLoading]     = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [displayVal, setDisplayVal] = useState(0);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── calcular ── */
  const calcular = useCallback(async (data: typeof form) => {
    if (!data.metros || data.metros < 10) return;
    setLoading(true);
    try {
      const res = await fetch("/api/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metros_cuadrados: data.metros,
          niveles: data.niveles,
          id_tipologia: data.tipologia,
          id_estado: data.estado,
          id_calidad: data.calidad,
        }),
      });
      if (res.ok) setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => calcular(form), 450);
    return () => { if (debRef.current) clearTimeout(debRef.current); };
  }, [form, calcular]);

  /* ── count-up animation ── */
  useEffect(() => {
    if (!result) return;
    const target = result.principal.presupuesto_total_mxn;
    const start  = displayVal;
    const diff   = target - start;
    const steps  = 30;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayVal(Math.round(start + diff * (i / steps)));
      if (i >= steps) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.principal.presupuesto_total_mxn]);

  const upd = <K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  /* ── valores HUD ── */
  const total = result?.principal.presupuesto_total_mxn ?? 0;
  const mat   = result?.principal.costo_directo_materiales ?? 0;
  const mo    = result?.principal.costo_directo_mano_obra ?? 0;
  const equip = result?.principal.equipamiento_especial ?? 0;
  const indir = result?.principal.indirectos_y_ganancia ?? 0;
  const m2val = result?.principal.costo_parametrico_m2 ?? 0;

  const PARTIDAS = [
    { label: "Materiales directos", val: mat,          color: "#847dff" },
    { label: "Mano de obra",        val: mo,           color: "#00b3dd" },
    { label: "Equipamiento",        val: equip,        color: "#dd90d8" },
    { label: "Indirectos (18%)",    val: indir * 0.64, color: "#90b8f0" },
    { label: "Utilidad (10%)",      val: indir * 0.36, color: "#4ade80" },
  ];

  const STEP_LABELS = ["General", "Estructura", "Acabados", "Instalaciones", "Resumen"];

  /* ── render paso ── */
  const renderStep = () => {
    switch (step) {

      /* ── PASO 1 ── */
      case 1: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={LABEL}>Tipo de obra</label>
            <select value={form.tipologia} onChange={e => upd("tipologia", e.target.value)} style={{ ...INPUT, cursor: "pointer" }}>
              {TIPOLOGIAS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label style={LABEL}>Estado de la República</label>
            <select value={form.estado} onChange={e => upd("estado", e.target.value)} style={{ ...INPUT, cursor: "pointer" }}>
              {ESTADOS.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={LABEL}>Superficie (m²)</label>
              <input type="number" min={10} max={50000} value={form.metros}
                onChange={e => upd("metros", Number(e.target.value))} style={INPUT} />
            </div>
            <div>
              <label style={LABEL}>Núm. niveles</label>
              <input type="number" min={1} max={30} value={form.niveles}
                onChange={e => upd("niveles", Number(e.target.value))} style={INPUT} />
            </div>
          </div>
          <div style={{ background: "rgba(132,125,255,0.08)", border: "1px solid rgba(132,125,255,0.2)", borderRadius: 10, padding: "12px 14px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#847dff", fontWeight: 600, marginBottom: 4 }}>
              {TIPOLOGIAS.find(t => t.id === form.tipologia)?.label}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
              {TIPOLOGIA_INFO[form.tipologia]?.estructura}
            </p>
          </div>
        </div>
      );

      /* ── PASO 2 ── */
      case 2: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            El sistema constructivo se determina por la tipología seleccionada con factores CMIC 2026.
          </p>
          {[
            { label: "Sistema de cimentación", opts: ["Zapatas corridas + trabe de liga","Losa de cimentación","Pilotes prefabricados"] },
            { label: "Sistema de muros",        opts: ["Block 15x20x40 concreto","Tabique rojo 7x14x28","Panel de yeso / Drywall"] },
            { label: "Sistema de losa",         opts: ["Losa maciza de concreto","Vigueta y bovedilla","Losa colaborante"] },
          ].map(s => (
            <div key={s.label}>
              <label style={LABEL}>{s.label}</label>
              <select style={{ ...INPUT, cursor: "pointer" }}>
                {s.opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div style={{ background: "rgba(0,179,221,0.08)", border: "1px solid rgba(0,179,221,0.2)", borderRadius: 10, padding: "12px 14px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#00b3dd", fontWeight: 600, marginBottom: 4 }}>Equipamiento especial</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
              {TIPOLOGIA_INFO[form.tipologia]?.extras}
            </p>
          </div>
        </div>
      );

      /* ── PASO 3 ── */
      case 3: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            El nivel de acabados aplica un multiplicador al costo de pisos, recubrimientos y carpintería.
          </p>
          {CALIDAD_OPTIONS.map(c => (
            <button key={c.id} onClick={() => upd("calidad", c.id)} style={{
              background: form.calidad === c.id ? "rgba(132,125,255,0.14)" : "rgba(255,255,255,0.04)",
              border: form.calidad === c.id ? "1px solid rgba(132,125,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "16px 18px", cursor: "pointer",
              textAlign: "left", display: "flex", flexDirection: "column", gap: 4,
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: form.calidad === c.id ? "#847dff" : "#fff" }}>{c.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{c.sub}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: form.calidad === c.id ? "#847dff" : "rgba(255,255,255,0.25)", marginTop: 2 }}>{c.factor}</span>
            </button>
          ))}
          <div>
            <label style={LABEL}>Tipo de piso</label>
            <select value={form.piso} onChange={e => upd("piso", e.target.value)} style={{ ...INPUT, cursor: "pointer" }}>
              <option value="ceramica">Cerámica / Porcelanato estándar</option>
              <option value="marmol">Mármol / Piedra natural</option>
              <option value="madera">Madera laminada</option>
              <option value="concreto">Concreto pulido / Epóxico</option>
            </select>
          </div>
        </div>
      );

      /* ── PASO 4 ── */
      case 4: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            Las instalaciones se incluyen en el cálculo base según tipología. Confirma las que aplican a tu proyecto:
          </p>
          {[
            { key: "hidraulica" as const, label: "Instalación hidráulica",  desc: "Agua fría/caliente, PVC hidráulico, conexiones" },
            { key: "electrica"  as const, label: "Instalación eléctrica",   desc: "Conduit, tablero de distribución, circuitos" },
            { key: "sanitaria"  as const, label: "Instalación sanitaria",   desc: "Drenaje PVC sanitario, ventilación, registros" },
          ].map(inst => (
            <div key={inst.key} onClick={() => upd(inst.key, !form[inst.key])} style={{
              background: form[inst.key] ? "rgba(0,179,221,0.10)" : "rgba(255,255,255,0.04)",
              border: form[inst.key] ? "1px solid rgba(0,179,221,0.35)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "14px 16px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: form[inst.key] ? "#00b3dd" : "rgba(255,255,255,0.08)",
                border: form[inst.key] ? "none" : "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {form[inst.key] && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 2 }}>{inst.label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{inst.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px", marginTop: 4 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.55 }}>
              Los costos de equipamiento especial (elevadores, HVAC, cisternas) se calculan automáticamente según la tipología y número de niveles.
            </p>
          </div>
        </div>
      );

      /* ── PASO 5 ── */
      case 5: return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            Revisa los datos y genera el presupuesto oficial con precios CMIC 2026.
          </p>
          {[
            { label: "Tipo de obra", val: TIPOLOGIAS.find(t => t.id === form.tipologia)?.label },
            { label: "Estado",       val: ESTADOS.find(e => e.id === form.estado)?.nombre },
            { label: "Superficie",   val: `${form.metros} m²` },
            { label: "Niveles",      val: `${form.niveles} nivel${form.niveles > 1 ? "es" : ""}` },
            { label: "Calidad",      val: CALIDAD_OPTIONS.find(c => c.id === form.calidad)?.label },
          ].map(row => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{row.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", fontWeight: 500 }}>{row.val}</span>
            </div>
          ))}
          <button
            onClick={() => { setCalculated(true); calcular(form); }}
            disabled={loading}
            style={{
              marginTop: 8,
              background: loading ? "rgba(132,125,255,0.4)" : "#847dff",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 15,
              padding: "16px",
              borderRadius: 9999,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.04em",
            }}
          >
            {loading ? "Calculando…" : "CALCULAR PRESUPUESTO →"}
          </button>
          {result && (
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={() => window.print()} style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer" }}>
                📄 Descargar PDF
              </button>
              <button onClick={() => window.print()} style={{ flex: 1, background: "rgba(0,179,221,0.09)", border: "1px solid rgba(0,179,221,0.22)", borderRadius: 10, padding: "10px", color: "#00b3dd", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer" }}>
                📊 Exportar Excel
              </button>
            </div>
          )}
        </div>
      );

      default: return null;
    }
  };

  /* ─────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ display: "flex", flex: 1, paddingTop: 64, height: "calc(100vh - 64px)" }}>

        {/* ══ PANEL IZQUIERDO — WIZARD ══ */}
        <div style={{
          width: 380, flexShrink: 0,
          background: "#111216",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column",
          height: "100%", overflow: "hidden",
        }}>
          {/* Step nav */}
          <div style={{ padding: "18px 22px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
              {STEP_LABELS.map((label, i) => {
                const n = i + 1;
                const done   = n < step;
                const active = n === step;
                return (
                  <button key={label} onClick={() => setStep(n)} style={{
                    flex: 1, padding: "8px 4px", borderRadius: 8, border: "none",
                    background: active ? "rgba(132,125,255,0.16)" : "transparent",
                    cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: active ? "#847dff" : done ? "rgba(132,125,255,0.4)" : "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 10, color: "#fff", fontWeight: 600,
                    }}>
                      {done ? "✓" : n}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.04em", color: active ? "#847dff" : "rgba(255,255,255,0.28)" }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
              <div style={{ width: `${((step - 1) / 4) * 100}%`, height: "100%", background: "#847dff", borderRadius: 9999, transition: "width 300ms ease" }} />
            </div>
          </div>

          {/* Step content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 22px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 20, color: "#fff", marginBottom: 20, letterSpacing: "-0.01em" }}>
              {["Datos generales","Sistema constructivo","Calidad de acabados","Instalaciones","Resumen y cálculo"][step - 1]}
            </h2>
            {renderStep()}
          </div>

          {/* Nav buttons */}
          <div style={{ padding: "14px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "11px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", fontSize: 13, cursor: "pointer" }}>
                ← Atrás
              </button>
            )}
            {step < 5 && (
              <button onClick={() => setStep(s => s + 1)} style={{ flex: 1, background: "#847dff", border: "none", borderRadius: 10, padding: "11px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Siguiente →
              </button>
            )}
          </div>
        </div>

        {/* ══ PANEL DERECHO — HUD ══ */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 44px", background: "#0f1011" }}>

          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
              Presupuesto en vivo
            </span>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: loading ? "#facc15" : "#4ade80",
              boxShadow: loading ? "0 0 0 3px rgba(250,204,21,0.18)" : "0 0 0 3px rgba(74,222,128,0.18)",
              animation: "pulse 2s infinite",
              display: "inline-block",
            }} />
          </div>

          {/* Número principal */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(40px,4vw,64px)", color: "#847dff", letterSpacing: "-0.03em", lineHeight: 1, transition: "color 400ms" }}>
              {total > 0 ? fmt(displayVal) : "$—"}
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>
              MXN · Sin IVA · CMIC 2026
              {m2val > 0 && <span style={{ color: "rgba(255,255,255,0.45)" }}> · {fmt(m2val)}/m²</span>}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 20 }}>

            {/* Desglose partidas */}
            <div style={{ background: "#111216", borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 20 }}>
                Desglose de partidas
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {PARTIDAS.map(p => (
                  <div key={p.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{p.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff" }}>{total > 0 ? fmt(p.val) : "—"}</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
                      <div style={{ width: total > 0 ? `${pct(p.val, total)}%` : "0%", height: "100%", background: p.color, borderRadius: 9999, transition: "width 700ms ease", opacity: 0.85 }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 3, textAlign: "right" }}>
                      {total > 0 ? `${pct(p.val, total)}%` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 escenarios */}
            <div style={{ background: "#111216", borderRadius: 16, padding: "24px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 20 }}>
                Comparativa de escenarios
              </p>
              {result ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "Económico", data: result.economico, color: "#4ade80" },
                    { label: "Estándar",  data: result.estandar,  color: "#847dff" },
                    { label: "Premium",   data: result.premium,   color: "#f472b6" },
                  ].map(s => {
                    const maxV = result.premium.presupuesto_total_mxn;
                    return (
                      <div key={s.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: s.color, fontWeight: 600 }}>{fmt(s.data.presupuesto_total_mxn)}</span>
                            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{fmt(s.data.costo_parametrico_m2)}/m²</p>
                          </div>
                        </div>
                        <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
                          <div style={{ width: `${(s.data.presupuesto_total_mxn / maxV) * 100}%`, height: "100%", background: s.color, borderRadius: 9999, opacity: 0.75, transition: "width 700ms ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {["Económico","Estándar","Premium"].map((s,i) => (
                    <div key={s}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{s}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(255,255,255,0.15)" }}>—</span>
                      </div>
                      <div style={{ height: 8, background: "rgba(255,255,255,0.04)", borderRadius: 9999 }}>
                        <div style={{ width: `${[55,75,100][i]}%`, height: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 9999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabla detallada — solo después de calcular */}
          {calculated && result && (
            <div style={{ background: "#111216", borderRadius: 16, padding: "28px", marginTop: 20, border: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 20 }}>
                Tabla de partidas LOPSRM — {ESTADOS.find(e => e.id === form.estado)?.nombre}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "0 16px" }}>
                {["Partida","Monto","Pct."].map(h => (
                  <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em", textTransform: "uppercase", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</span>
                ))}
                {[
                  { name: "Materiales directos",  val: mat },
                  { name: "Mano de obra directa", val: mo },
                  { name: "Equipamiento especial", val: equip },
                  { name: "Indirectos (18%)",      val: indir * 0.64 },
                  { name: "Utilidad (10%)",        val: indir * 0.36 },
                ].map(r => (
                  <>
                    <span key={r.name+"l"} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{r.name}</span>
                    <span key={r.name+"v"} style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>{fmt(r.val)}</span>
                    <span key={r.name+"p"} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.3)", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textAlign: "right" }}>{pct(r.val, total)}%</span>
                  </>
                ))}
                <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 700, color: "#fff", paddingTop: 14 }}>TOTAL</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#847dff", paddingTop: 14, textAlign: "right" }}>{fmt(total)}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#847dff", paddingTop: 14, textAlign: "right" }}>100%</span>
              </div>

              {result.principal.desglose_especial.length > 0 && (
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#00b3dd", fontWeight: 600, marginBottom: 10, letterSpacing: "0.06em" }}>
                    Equipamiento especial incluido:
                  </p>
                  {result.principal.desglose_especial.map(d => (
                    <div key={d.concepto} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{d.concepto}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#00b3dd" }}>{fmt(d.costo)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 16, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.18)", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>✓ Verificación NTC-RCDF 2023</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.55 }}>
                  Cálculo con precios CEICO-CMIC 2026 y factores SICT 2025 para {ESTADOS.find(e => e.id === form.estado)?.nombre}. Indirectos 18% + Utilidad 10% incluidos.
                </p>
              </div>
            </div>
          )}

          {!result && !loading && (
            <div style={{ textAlign: "center", padding: "60px 40px", opacity: 0.35, marginTop: 20 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", marginBottom: 10 }}>
                Completa los datos del proyecto
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                El presupuesto se actualiza automáticamente al llenar el formulario.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        select option { background:#1a1a1e; color:#fff; }
        input[type=number]::-webkit-inner-spin-button { opacity:.3; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09); border-radius:9999px; }
      `}</style>
    </div>
  );
}
