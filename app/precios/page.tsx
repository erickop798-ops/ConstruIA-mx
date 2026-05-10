"use client";

import { useState, useMemo } from "react";
import Navbar from "../_components/Navbar";

/* ─── Factores SICT 2025 ─── */
const ESTADOS = [
  { id: "aguascalientes",      nombre: "Aguascalientes",      factor_mat: 0.99, factor_mo: 0.98 },
  { id: "baja_california",     nombre: "Baja California",     factor_mat: 1.38, factor_mo: 1.46 },
  { id: "baja_california_sur", nombre: "Baja California Sur", factor_mat: 1.55, factor_mo: 1.50 },
  { id: "campeche",            nombre: "Campeche",            factor_mat: 1.16, factor_mo: 1.07 },
  { id: "chiapas",             nombre: "Chiapas",             factor_mat: 1.07, factor_mo: 1.00 },
  { id: "chihuahua",           nombre: "Chihuahua",           factor_mat: 1.12, factor_mo: 1.16 },
  { id: "cdmx",                nombre: "Ciudad de México",    factor_mat: 1.00, factor_mo: 1.00 },
  { id: "coahuila",            nombre: "Coahuila",            factor_mat: 1.11, factor_mo: 1.14 },
  { id: "colima",              nombre: "Colima",              factor_mat: 1.06, factor_mo: 1.06 },
  { id: "durango",             nombre: "Durango",             factor_mat: 0.99, factor_mo: 0.99 },
  { id: "estado_de_mexico",    nombre: "Estado de México",    factor_mat: 0.92, factor_mo: 0.91 },
  { id: "guanajuato",          nombre: "Guanajuato",          factor_mat: 1.05, factor_mo: 1.05 },
  { id: "guerrero",            nombre: "Guerrero",            factor_mat: 1.15, factor_mo: 1.08 },
  { id: "hidalgo",             nombre: "Hidalgo",             factor_mat: 0.99, factor_mo: 0.98 },
  { id: "jalisco",             nombre: "Jalisco",             factor_mat: 1.03, factor_mo: 1.03 },
  { id: "michoacan",           nombre: "Michoacán",           factor_mat: 1.19, factor_mo: 1.13 },
  { id: "morelos",             nombre: "Morelos",             factor_mat: 1.10, factor_mo: 1.10 },
  { id: "nayarit",             nombre: "Nayarit",             factor_mat: 1.15, factor_mo: 1.10 },
  { id: "nuevo_leon",          nombre: "Nuevo León",          factor_mat: 0.98, factor_mo: 1.01 },
  { id: "oaxaca",              nombre: "Oaxaca",              factor_mat: 1.11, factor_mo: 1.04 },
  { id: "puebla",              nombre: "Puebla",              factor_mat: 1.14, factor_mo: 1.15 },
  { id: "queretaro",           nombre: "Querétaro",           factor_mat: 1.07, factor_mo: 1.06 },
  { id: "quintana_roo",        nombre: "Quintana Roo",        factor_mat: 1.30, factor_mo: 1.22 },
  { id: "san_luis_potosi",     nombre: "San Luis Potosí",     factor_mat: 1.12, factor_mo: 1.08 },
  { id: "sinaloa",             nombre: "Sinaloa",             factor_mat: 1.08, factor_mo: 1.10 },
  { id: "sonora",              nombre: "Sonora",              factor_mat: 0.95, factor_mo: 0.98 },
  { id: "tabasco",             nombre: "Tabasco",             factor_mat: 1.11, factor_mo: 1.05 },
  { id: "tamaulipas",          nombre: "Tamaulipas",          factor_mat: 1.11, factor_mo: 1.14 },
  { id: "tlaxcala",            nombre: "Tlaxcala",            factor_mat: 0.99, factor_mo: 0.98 },
  { id: "veracruz",            nombre: "Veracruz",            factor_mat: 1.19, factor_mo: 1.14 },
  { id: "yucatan",             nombre: "Yucatán",             factor_mat: 1.11, factor_mo: 1.03 },
  { id: "zacatecas",           nombre: "Zacatecas",           factor_mat: 1.00, factor_mo: 1.01 },
];

/* ─── Insumos base CMIC 2026 ─── */
type Insumo = { id: string; nombre: string; precio_base: number; unidad: string; categoria: string };
const INSUMOS: Insumo[] = [
  { id: "cemento_cpc30r",        nombre: "Cemento Portland CPC 30R",       precio_base: 255,   unidad: "bolsa 50kg",  categoria: "Materiales base" },
  { id: "mortero_premezclado",   nombre: "Mortero / mezcla premezclada",   precio_base: 195,   unidad: "bolsa 40kg",  categoria: "Materiales base" },
  { id: "arena_fina",            nombre: "Arena de río cribada",           precio_base: 400,   unidad: "m³",          categoria: "Materiales base" },
  { id: "grava_19mm",            nombre: "Grava triturada 19mm (3/4\")",   precio_base: 430,   unidad: "m³",          categoria: "Materiales base" },
  { id: "block_15x20x40",        nombre: "Block hueco 15×20×40 cm",        precio_base: 18.50, unidad: "pieza",       categoria: "Materiales base" },
  { id: "tabique_rojo",          nombre: "Tabique rojo recocido 7×14×28", precio_base: 6.50,  unidad: "pieza",       categoria: "Materiales base" },
  { id: "panel_yeso_estandar",   nombre: "Tablaroca estándar 1.22×2.44m", precio_base: 190,   unidad: "pieza",       categoria: "Materiales base" },
  { id: "concreto_f200",         nombre: "Concreto premezclado f'c=200",  precio_base: 2250,  unidad: "m³",          categoria: "Estructura" },
  { id: "concreto_f250",         nombre: "Concreto premezclado f'c=250",  precio_base: 2450,  unidad: "m³",          categoria: "Estructura" },
  { id: "varilla_3_8",           nombre: "Varilla corrugada No.3 (3/8\")", precio_base: 195,   unidad: "pieza 12m",   categoria: "Acero" },
  { id: "varilla_1_2",           nombre: "Varilla corrugada No.4 (1/2\")", precio_base: 310,   unidad: "pieza 12m",   categoria: "Acero" },
  { id: "acero_tonelada",        nombre: "Acero de refuerzo Grado 42",    precio_base: 27000, unidad: "tonelada",    categoria: "Acero" },
  { id: "malla_6x6_10_10",       nombre: "Malla electrosoldada 6×6-10/10", precio_base: 850,  unidad: "rollo 9m²",   categoria: "Acero" },
  { id: "losa_maciza_10cm",      nombre: "Losa maciza e=10cm fc=200 (M+MO)", precio_base: 980, unidad: "m²",         categoria: "Estructura" },
  { id: "losa_vigueta_bovedilla",nombre: "Losa vigueta y bovedilla",      precio_base: 750,   unidad: "m²",          categoria: "Estructura" },
  { id: "excavacion_manual",     nombre: "Excavación manual",             precio_base: 320,   unidad: "m³",          categoria: "Estructura" },
  { id: "castillo_12x12",        nombre: "Castillo 12×12 cm (M+MO)",      precio_base: 185,   unidad: "ml",          categoria: "Estructura" },
  { id: "columna_20x20",         nombre: "Columna 20×20 cm (M+MO)",       precio_base: 850,   unidad: "ml",          categoria: "Estructura" },
  { id: "piso_economico",        nombre: "Piso cerámica 45×45 cm",        precio_base: 160,   unidad: "m²",          categoria: "Acabados" },
  { id: "piso_estandar",         nombre: "Porcelanato 60×60 cm",          precio_base: 310,   unidad: "m²",          categoria: "Acabados" },
  { id: "piso_premium",          nombre: "Mármol / gran formato lujo",    precio_base: 950,   unidad: "m²",          categoria: "Acabados" },
  { id: "aplanado_yeso_interior",nombre: "Aplanado de yeso interior",     precio_base: 180,   unidad: "m²",          categoria: "Acabados" },
  { id: "aplanado_cemento_ext",  nombre: "Aplanado cemento-arena exterior",precio_base: 220,  unidad: "m²",          categoria: "Acabados" },
  { id: "pintura_vinilica",      nombre: "Pintura vinílica interior 2m",  precio_base: 650,   unidad: "cubeta 19L",  categoria: "Acabados" },
  { id: "impermeabilizante",     nombre: "Impermeabilizante acrílico 5a", precio_base: 850,   unidad: "cubeta 19L",  categoria: "Acabados" },
  { id: "tubo_pvc_hid_1_2",      nombre: "Tubo PVC hidráulico 1/2\"",    precio_base: 98,    unidad: "tramo 4m",    categoria: "Hidráulica" },
  { id: "tubo_pvc_san_4",        nombre: "Tubo PVC sanitario 4\"",       precio_base: 215,   unidad: "tramo 6m",    categoria: "Hidráulica" },
  { id: "tubo_ppr_1_2",          nombre: "Tubo PPR 1/2\" (termofusión)", precio_base: 108,   unidad: "tramo 4m",    categoria: "Hidráulica" },
  { id: "wc_estandar",           nombre: "WC estándar instalado",         precio_base: 2800,  unidad: "pieza",       categoria: "Hidráulica" },
  { id: "lavabo_estandar",       nombre: "Lavabo de sobreponer",          precio_base: 1800,  unidad: "pieza",       categoria: "Hidráulica" },
  { id: "tinaco_1100l",          nombre: "Tinaco polietileno 1100L",      precio_base: 3200,  unidad: "pieza",       categoria: "Hidráulica" },
  { id: "ventana_aluminio_sencilla", nombre: "Ventana aluminio vidrio 6mm", precio_base: 1850, unidad: "m²",        categoria: "Carpintería" },
  { id: "puerta_madera_estandar",nombre: "Puerta madera sólida 0.90×2.10", precio_base: 3800, unidad: "pieza",     categoria: "Carpintería" },
  { id: "cocina_integral_ml",    nombre: "Cocina integral MDF",           precio_base: 8500,  unidad: "ml",          categoria: "Carpintería" },
];

const CATEGORIAS = ["Todas", "Materiales base", "Estructura", "Acero", "Acabados", "Hidráulica", "Carpintería"];

const PAGE_SIZE = 10;

const fmt = (n: number) => "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pctFmt = (n: number) => (n >= 1 ? "+" : "") + ((n - 1) * 100).toFixed(1) + "%";

export default function PreciosPage() {
  const [estadoId, setEstadoId] = useState("cdmx");
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const estado = ESTADOS.find(e => e.id === estadoId)!;

  const filtrados = useMemo(() => {
    let list = INSUMOS;
    if (categoria !== "Todas") list = list.filter(i => i.categoria === categoria);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      list = list.filter(i => i.nombre.toLowerCase().includes(q) || i.categoria.toLowerCase().includes(q));
    }
    return list;
  }, [categoria, busqueda]);

  const totalPaginas = Math.ceil(filtrados.length / PAGE_SIZE);
  const pagActual = Math.min(pagina, Math.max(1, totalPaginas));
  const insumosPagina = filtrados.slice((pagActual - 1) * PAGE_SIZE, pagActual * PAGE_SIZE);

  const handleEstado = (id: string) => { setEstadoId(id); setPagina(1); };
  const handleCategoria = (c: string) => { setCategoria(c); setPagina(1); };
  const handleBusqueda = (v: string) => { setBusqueda(v); setPagina(1); };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "88px 32px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ display: "inline-block", background: "rgba(221,144,216,0.15)", border: "1px solid rgba(221,144,216,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "var(--font-body)", fontSize: 11, color: "#dd90d8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Datos Regionales
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12 }}>
            <em style={{ fontStyle: "italic" }}>Precios</em> por Estado
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.65 }}>
            Precios unitarios CEICO-CMIC 2026 ajustados con factores FIC SICT 2025 por estado. Sin IVA.
          </p>
        </div>

        {/* Factor banner */}
        <div style={{ background: "rgba(132,125,255,0.08)", border: "1px solid rgba(132,125,255,0.2)", borderRadius: 14, padding: "18px 24px", marginBottom: 32, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Estado seleccionado</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#fff" }}>{estado.nombre}</p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Factor materiales</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: estado.factor_mat > 1 ? "#f472b6" : estado.factor_mat < 1 ? "#4ade80" : "#fff" }}>
              {estado.factor_mat.toFixed(2)} <span style={{ fontSize: 13 }}>({pctFmt(estado.factor_mat)})</span>
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Factor mano de obra</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: estado.factor_mo > 1 ? "#f472b6" : estado.factor_mo < 1 ? "#4ade80" : "#fff" }}>
              {estado.factor_mo.toFixed(2)} <span style={{ fontSize: 13 }}>({pctFmt(estado.factor_mo)})</span>
            </p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "right" }}>
              Fuente: SICT 2025 · Base: CDMX = 1.00
            </p>
          </div>
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          {/* State selector */}
          <select
            value={estadoId}
            onChange={e => handleEstado(e.target.value)}
            style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 9999, padding: "10px 20px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, outline: "none", cursor: "pointer" }}
          >
            {ESTADOS.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>

          {/* Busqueda */}
          <input
            type="text"
            placeholder="Buscar material…"
            value={busqueda}
            onChange={e => handleBusqueda(e.target.value)}
            style={{ flex: 1, minWidth: 200, background: "#1a1a2e", border: "1px solid #333", borderRadius: 9999, padding: "10px 20px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, outline: "none" }}
          />
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {CATEGORIAS.map(c => (
            <button
              key={c}
              onClick={() => handleCategoria(c)}
              style={{
                padding: "7px 16px",
                borderRadius: 9999,
                border: categoria === c ? "1px solid #dd90d8" : "1px solid #333",
                background: categoria === c ? "rgba(221,144,216,0.15)" : "#1a1a2e",
                color: categoria === c ? "#dd90d8" : "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: categoria === c ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr", padding: "12px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", gap: 16 }}>
            {["Material / Insumo", "Unidad", "Precio base", `Precio ${estado.nombre}`, "Categoría"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
            ))}
          </div>

          {insumosPagina.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.3)" }}>Sin resultados para "{busqueda}"</p>
            </div>
          ) : (
            insumosPagina.map((ins, i) => {
              const precioAjustado = ins.precio_base * estado.factor_mat;
              return (
                <div
                  key={ins.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr",
                    padding: "14px 24px",
                    gap: 16,
                    borderBottom: i < insumosPagina.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff" }}>{ins.nombre}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{ins.unidad}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{fmt(ins.precio_base)}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#dd90d8", fontWeight: 600 }}>{fmt(precioAjustado)}</span>
                  <span style={{ display: "inline-block", background: "rgba(255,255,255,0.05)", borderRadius: 9999, padding: "3px 10px", fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                    {ins.categoria}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPaginas > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagActual === 1}
              style={{ padding: "8px 18px", borderRadius: 9999, border: "1px solid #333", background: "#1a1a2e", color: pagActual === 1 ? "rgba(255,255,255,0.2)" : "#fff", fontFamily: "var(--font-body)", fontSize: 13, cursor: pagActual === 1 ? "default" : "pointer" }}
            >
              ← Anterior
            </button>
            <span style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              {pagActual} / {totalPaginas}
            </span>
            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagActual === totalPaginas}
              style={{ padding: "8px 18px", borderRadius: 9999, border: "1px solid #333", background: "#1a1a2e", color: pagActual === totalPaginas ? "rgba(255,255,255,0.2)" : "#fff", fontFamily: "var(--font-body)", fontSize: 13, cursor: pagActual === totalPaginas ? "default" : "pointer" }}
            >
              Siguiente →
            </button>
          </div>
        )}

        {/* Footer note */}
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 32, lineHeight: 1.6 }}>
          Precios base zona Centro/Bajío · CEICO-CMIC Mar 2026 · Sin IVA · Precios de referencia, verificar antes de comprar.<br />
          Factor regional SICT 2025 aplicado sobre precio base.
        </p>
      </div>

      <style>{`
        select option { background: #1a1a2e; color: #fff; }
      `}</style>
    </div>
  );
}
