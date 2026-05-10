"use client";

import { useState, useMemo } from "react";
import Navbar from "../_components/Navbar";

/* ─── Tipos de trabajo con recetas de materiales ─── */
type MaterialRow = { nombre: string; unidad: string; precio_base: number; cantidad_por_m2: number };
type TrabajoConfig = { id: string; icon: string; titulo: string; descripcion: string; inputLabel: string; inputUnidad: string; min: number; max: number; materiales: MaterialRow[] };

const TRABAJOS: TrabajoConfig[] = [
  {
    id: "excavacion",
    icon: "⛏️",
    titulo: "Excavación",
    descripcion: "Excavación manual o mecánica para cimentación",
    inputLabel: "Volumen a excavar",
    inputUnidad: "m³",
    min: 1, max: 500,
    materiales: [
      { nombre: "Excavación manual (mano de obra)", unidad: "m³", precio_base: 320, cantidad_por_m2: 1.0 },
      { nombre: "Excavación con retroexcavadora", unidad: "m³", precio_base: 180, cantidad_por_m2: 0.0 },
    ],
  },
  {
    id: "cimentacion",
    icon: "🪨",
    titulo: "Cimentación Corrida",
    descripcion: "Zapata corrida con concreto armado fc=200 kg/cm²",
    inputLabel: "Longitud de zapata",
    inputUnidad: "ml",
    min: 5, max: 500,
    materiales: [
      { nombre: "Concreto premezclado f'c=200", unidad: "m³", precio_base: 2250, cantidad_por_m2: 0.20 },
      { nombre: "Varilla corrugada No.3 (3/8\")", unidad: "pieza 12m", precio_base: 195, cantidad_por_m2: 2.5 },
      { nombre: "Varilla corrugada No.4 (1/2\")", unidad: "pieza 12m", precio_base: 310, cantidad_por_m2: 1.0 },
      { nombre: "Alambre recocido Cal.16", unidad: "kg", precio_base: 380 / 30, cantidad_por_m2: 0.3 },
      { nombre: "Cimbra madera triplay", unidad: "m²", precio_base: 420, cantidad_por_m2: 0.6 },
    ],
  },
  {
    id: "muros_block",
    icon: "🧱",
    titulo: "Muros de Block",
    descripcion: "Muro con block hueco 15×20×40 cm con mortero y cemento",
    inputLabel: "Área de muro",
    inputUnidad: "m²",
    min: 5, max: 1000,
    materiales: [
      { nombre: "Block hueco 15×20×40 cm", unidad: "pieza", precio_base: 18.50, cantidad_por_m2: 13.125 },
      { nombre: "Cemento Portland CPC 30R", unidad: "bolsa 50kg", precio_base: 255, cantidad_por_m2: 0.525 },
      { nombre: "Mortero premezclado", unidad: "bolsa 40kg", precio_base: 195, cantidad_por_m2: 1.26 },
      { nombre: "Arena fina cribada", unidad: "m³", precio_base: 400, cantidad_por_m2: 0.032 },
    ],
  },
  {
    id: "losa_maciza",
    icon: "🏗️",
    titulo: "Losa Maciza 10cm",
    descripcion: "Losa de concreto armado f'c=200, espesor 10cm con malla",
    inputLabel: "Área de losa",
    inputUnidad: "m²",
    min: 10, max: 2000,
    materiales: [
      { nombre: "Concreto premezclado f'c=200", unidad: "m³", precio_base: 2250, cantidad_por_m2: 0.105 },
      { nombre: "Malla electrosoldada 6×6-10/10", unidad: "rollo 9m²", precio_base: 850, cantidad_por_m2: 0.122 },
      { nombre: "Varilla corrugada No.3 (3/8\")", unidad: "pieza 12m", precio_base: 195, cantidad_por_m2: 0.5 },
      { nombre: "Cimbra madera triplay", unidad: "m²", precio_base: 420, cantidad_por_m2: 1.1 },
      { nombre: "Poste telescópico acero (renta/día)", unidad: "día-pieza", precio_base: 35, cantidad_por_m2: 0.55 },
    ],
  },
  {
    id: "pisos",
    icon: "🏁",
    titulo: "Pisos y Recubrimientos",
    descripcion: "Instalación de piso cerámico o porcelanato con adhesivo",
    inputLabel: "Área de piso",
    inputUnidad: "m²",
    min: 5, max: 2000,
    materiales: [
      { nombre: "Cerámica 45×45 cm (económico)", unidad: "m²", precio_base: 160, cantidad_por_m2: 1.1 },
      { nombre: "Mortero adhesivo (mezcla)", unidad: "bolsa 40kg", precio_base: 195, cantidad_por_m2: 0.4 },
      { nombre: "Fragua / junta", unidad: "bolsa 2kg", precio_base: 65, cantidad_por_m2: 0.5 },
      { nombre: "Firme concreto fc=150 e=8cm", unidad: "m²", precio_base: 320, cantidad_por_m2: 1.0 },
    ],
  },
  {
    id: "aplanados_pintura",
    icon: "🖌️",
    titulo: "Aplanados y Pintura",
    descripcion: "Aplanado de yeso interior + pintura vinílica 2 manos",
    inputLabel: "Área de muro",
    inputUnidad: "m²",
    min: 5, max: 2000,
    materiales: [
      { nombre: "Aplanado de yeso interior 15mm", unidad: "m²", precio_base: 180, cantidad_por_m2: 1.0 },
      { nombre: "Pintura vinílica interior (cub. 19L, rend. 35m²)", unidad: "cubeta 19L", precio_base: 650, cantidad_por_m2: 0.0286 * 2 },
      { nombre: "Yeso para construcción", unidad: "bolsa 20kg", precio_base: 85, cantidad_por_m2: 0.6 },
      { nombre: "Rodapié cerámico 8×45 cm", unidad: "ml", precio_base: 95, cantidad_por_m2: 0.4 },
    ],
  },
  {
    id: "hidraulica",
    icon: "🚿",
    titulo: "Instalación Hidráulica",
    descripcion: "Instalación de agua fría y caliente + drenaje sanitario",
    inputLabel: "Área de construcción",
    inputUnidad: "m²",
    min: 20, max: 2000,
    materiales: [
      { nombre: "Tubo PPR 1/2\" termofusión (agua)", unidad: "tramo 4m", precio_base: 108, cantidad_por_m2: 0.38 },
      { nombre: "Tubo PVC sanitario 4\" drenaje", unidad: "tramo 6m", precio_base: 215, cantidad_por_m2: 0.075 },
      { nombre: "Tubo PVC sanitario 2\" ramales", unidad: "tramo 6m", precio_base: 98, cantidad_por_m2: 0.12 },
      { nombre: "WC estándar blanco instalado", unidad: "pieza", precio_base: 2800, cantidad_por_m2: 0.02 },
      { nombre: "Lavabo de sobreponer instalado", unidad: "pieza", precio_base: 1800, cantidad_por_m2: 0.02 },
      { nombre: "Tinaco polietileno 1100L", unidad: "pieza", precio_base: 3200, cantidad_por_m2: 0.008 },
    ],
  },
  {
    id: "electrica",
    icon: "⚡",
    titulo: "Instalación Eléctrica",
    descripcion: "Instalación eléctrica básica: tablero, circuitos, iluminación y contactos",
    inputLabel: "Área de construcción",
    inputUnidad: "m²",
    min: 20, max: 2000,
    materiales: [
      { nombre: "Cable THW Cal.12 (iluminación)", unidad: "rollo 100m", precio_base: 650, cantidad_por_m2: 0.0175 },
      { nombre: "Cable THW Cal.10 (contactos)", unidad: "rollo 100m", precio_base: 950, cantidad_por_m2: 0.010 },
      { nombre: "Conduit PVC 13mm (1/2\")", unidad: "tramo 3m", precio_base: 35, cantidad_por_m2: 0.25 },
      { nombre: "Caja de registro octogonal", unidad: "pieza", precio_base: 18, cantidad_por_m2: 0.2 },
      { nombre: "Apagador sencillo instalado", unidad: "pieza", precio_base: 180, cantidad_por_m2: 0.05 },
      { nombre: "Contacto doble polarizado", unidad: "pieza", precio_base: 220, cantidad_por_m2: 0.08 },
    ],
  },
];

/* ─── Factores SICT (para ajuste regional) ─── */
const FACTORES: Record<string, number> = {
  cdmx: 1.00, jalisco: 1.03, nuevo_leon: 0.98, puebla: 1.14, estado_de_mexico: 0.92,
  guanajuato: 1.05, queretaro: 1.07, baja_california: 1.38, sonora: 0.95, chihuahua: 1.12,
  veracruz: 1.19, yucatan: 1.11, quintana_roo: 1.30, aguascalientes: 0.99, tamaulipas: 1.11,
  coahuila: 1.11, durango: 0.99, sinaloa: 1.08, oaxaca: 1.11, chiapas: 1.07,
  michoacan: 1.19, guerrero: 1.15, morelos: 1.10, hidalgo: 0.99, tlaxcala: 0.99,
  san_luis_potosi: 1.12, tabasco: 1.11, nayarit: 1.15, colima: 1.06, zacatecas: 1.00,
  baja_california_sur: 1.55, campeche: 1.16,
};
const ESTADOS_NOMBRES: Record<string, string> = {
  cdmx: "CDMX", jalisco: "Jalisco", nuevo_leon: "Nuevo León", puebla: "Puebla",
  estado_de_mexico: "Estado de México", guanajuato: "Guanajuato", queretaro: "Querétaro",
  baja_california: "Baja California", sonora: "Sonora", chihuahua: "Chihuahua",
  veracruz: "Veracruz", yucatan: "Yucatán", quintana_roo: "Quintana Roo",
  aguascalientes: "Aguascalientes", tamaulipas: "Tamaulipas", coahuila: "Coahuila",
  durango: "Durango", sinaloa: "Sinaloa", oaxaca: "Oaxaca", chiapas: "Chiapas",
  michoacan: "Michoacán", guerrero: "Guerrero", morelos: "Morelos", hidalgo: "Hidalgo",
  tlaxcala: "Tlaxcala", san_luis_potosi: "San Luis Potosí", tabasco: "Tabasco",
  nayarit: "Nayarit", colima: "Colima", zacatecas: "Zacatecas",
  baja_california_sur: "Baja California Sur", campeche: "Campeche",
};

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");

export default function MaterialesPage() {
  const [trabajoId, setTrabajoId] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState<number | "">("");
  const [estadoId, setEstadoId] = useState("cdmx");

  const trabajo = TRABAJOS.find(t => t.id === trabajoId);
  const factor = FACTORES[estadoId] ?? 1.0;

  const resultados = useMemo(() => {
    if (!trabajo || !cantidad || typeof cantidad !== "number" || cantidad <= 0) return null;
    return trabajo.materiales.map(m => {
      const cantidadTotal = m.cantidad_por_m2 * cantidad;
      const precioAjustado = m.precio_base * factor;
      const subtotal = cantidadTotal * precioAjustado;
      return { ...m, cantidadTotal, precioAjustado, subtotal };
    });
  }, [trabajo, cantidad, factor]);

  const total = resultados ? resultados.reduce((s, r) => s + r.subtotal, 0) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "88px 32px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span style={{ display: "inline-block", background: "rgba(0,179,221,0.15)", border: "1px solid rgba(0,179,221,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "var(--font-body)", fontSize: 11, color: "#00b3dd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Catálogo de Insumos
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12 }}>
            Calculadora de <em style={{ fontStyle: "italic" }}>Materiales</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.65 }}>
            Selecciona el tipo de trabajo, ingresa el área y obtén la lista de materiales con cantidades y precios CMIC 2026.
          </p>
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Left — selectors */}
          <div style={{ flex: "1 1 440px" }}>
            {/* Work type grid */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Tipo de trabajo</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 }}>
              {TRABAJOS.map(t => {
                const active = trabajoId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setTrabajoId(t.id); setCantidad(""); }}
                    style={{
                      padding: "16px 14px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                      border: active ? "1px solid #00b3dd" : "1px solid #333",
                      background: active ? "rgba(0,179,221,0.10)" : "#111216",
                      transition: "all 150ms",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: active ? "#00b3dd" : "#fff", marginBottom: 4 }}>{t.titulo}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.4 }}>{t.descripcion}</div>
                  </button>
                );
              })}
            </div>

            {trabajo && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {/* Quantity input */}
                <div style={{ flex: "1 1 200px" }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>
                    {trabajo.inputLabel} ({trabajo.inputUnidad})
                  </label>
                  <input
                    type="number"
                    min={trabajo.min}
                    max={trabajo.max}
                    placeholder={`Ej. ${trabajo.min * 5}`}
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value === "" ? "" : Number(e.target.value))}
                    style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, outline: "none" }}
                  />
                </div>
                {/* State selector */}
                <div style={{ flex: "1 1 200px" }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>
                    Estado (factor regional)
                  </label>
                  <select
                    value={estadoId}
                    onChange={e => setEstadoId(e.target.value)}
                    style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, outline: "none" }}
                  >
                    {Object.entries(ESTADOS_NOMBRES).map(([id, nombre]) => <option key={id} value={id}>{nombre}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Right — results */}
          <div style={{ flex: "1 1 380px" }}>
            {!trabajoId && (
              <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", padding: "60px 32px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🧱</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "rgba(255,255,255,0.35)", letterSpacing: "-0.01em" }}>Selecciona un tipo de trabajo</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>y el área para calcular materiales</p>
              </div>
            )}

            {trabajoId && !resultados && (
              <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", padding: 24 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Lista de materiales · {trabajo?.titulo}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
                  Ingresa {trabajo?.inputLabel.toLowerCase()} en {trabajo?.inputUnidad} para calcular
                </p>
                {trabajo?.materiales.map((m, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: i < (trabajo.materiales.length - 1) ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", marginBottom: 2 }}>{m.nombre}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{fmt(m.precio_base)} / {m.unidad}</p>
                  </div>
                ))}
              </div>
            )}

            {resultados && (
              <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                {/* Total header */}
                <div style={{ background: "rgba(0,179,221,0.08)", borderBottom: "1px solid rgba(0,179,221,0.15)", padding: "20px 24px" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                    Total estimado · {trabajo?.titulo} · {cantidad} {trabajo?.inputUnidad}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 36, color: "#00b3dd", letterSpacing: "-0.02em" }}>{fmt(total)}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                    MXN sin IVA · Factor {ESTADOS_NOMBRES[estadoId]} {(factor * 100 - 100).toFixed(1) >= "0" ? "+" : ""}{((factor - 1) * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Table */}
                <div style={{ padding: "0 24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr", gap: "0 12px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Material", "Cantidad", "P. Unitario", "Subtotal"].map(h => (
                      <span key={h} style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
                    ))}
                  </div>
                  {resultados.map((r, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr", gap: "0 12px", padding: "12px 0", borderBottom: i < resultados.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "start" }}>
                      <div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", lineHeight: 1.4 }}>{r.nombre}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{r.unidad}</p>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.7)", paddingTop: 2 }}>
                        {r.cantidadTotal < 1 ? r.cantidadTotal.toFixed(3) : r.cantidadTotal.toFixed(1)}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)", paddingTop: 2 }}>{fmt(r.precioAjustado)}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#00b3dd", fontWeight: 600, paddingTop: 2 }}>{fmt(r.subtotal)}</span>
                    </div>
                  ))}
                  {/* Total row */}
                  <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr 1fr", gap: "0 12px", padding: "14px 0", borderTop: "2px solid rgba(0,179,221,0.2)", marginTop: 2 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#fff" }}>TOTAL MATERIALES</span>
                    <span />
                    <span />
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "#00b3dd", fontWeight: 600 }}>{fmt(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 10 }}>
                  <button
                    onClick={() => window.print()}
                    style={{ flex: 1, padding: "12px", borderRadius: 9999, border: "none", background: "#00b3dd", color: "#000", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                  >
                    🖨️ Imprimir lista
                  </button>
                  <button
                    onClick={() => { setTrabajoId(null); setCantidad(""); }}
                    style={{ padding: "12px 20px", borderRadius: 9999, border: "1px solid #333", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", fontSize: 13, cursor: "pointer" }}
                  >
                    Nueva
                  </button>
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.2)", padding: "0 24px 16px", lineHeight: 1.55 }}>
                  Solo materiales, sin mano de obra · CEICO-CMIC 2026 · Factor regional SICT 2025
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        select option { background: #1a1a2e; color: #fff; }
        input::-webkit-inner-spin-button { opacity: .4; }
        @media print { nav { display: none !important; } }
      `}</style>
    </div>
  );
}
