"use client";

import { useState, useMemo } from "react";
import Navbar from "../_components/Navbar";

/* ─── Data de permisos por estado (DB_PERMISOS) ─── */
type TipoDoc = "ambos" | "obra_nueva" | "remodelacion";
type Documento = { doc: string; descripcion: string; obligatorio: boolean; tipo: TipoDoc };
type EstadoPermiso = {
  nombre: string;
  dependencia: string;
  descripcion: string;
  tiempos: { obra_nueva: string; remodelacion: string };
  costos: { obra_nueva: string; remodelacion: string };
  documentos: Documento[];
};

const PERMISOS: Record<string, EstadoPermiso> = {
  aguascalientes: {
    nombre: "Aguascalientes",
    dependencia: "IMPLAN / Dirección de Desarrollo Urbano Municipal",
    descripcion: "Aguascalientes tiene tramites parcialmente digitalizados. Es uno de los estados con mejores tiempos de respuesta.",
    tiempos: { obra_nueva: "15–25 días hábiles", remodelacion: "10–15 días hábiles" },
    costos: { obra_nueva: "$1,500–$15,000 MXN según m²", remodelacion: "$600–$5,000 MXN" },
    documentos: [
      { doc: "Solicitud de licencia de construcción", descripcion: "Disponible en Desarrollo Urbano o plataforma digital del municipio.", obligatorio: true, tipo: "ambos" },
      { doc: "Dictamen de uso de suelo (IMPLAN)", descripcion: "Verifica compatibilidad y factibilidad.", obligatorio: true, tipo: "ambos" },
      { doc: "Planos arquitectónicos y estructurales con DRO", descripcion: "DRO registrado ante el Colegio de Arquitectos. Cédula profesional vigente.", obligatorio: true, tipo: "ambos" },
      { doc: "Comprobante predial al corriente", descripcion: "Del año en curso. Tesorería del Municipio.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura inscrita en RPP Aguascalientes", descripcion: "Registro Público de la Propiedad. Folio real vigente.", obligatorio: true, tipo: "ambos" },
      { doc: "Identificación oficial del propietario", descripcion: "INE/Pasaporte vigente.", obligatorio: true, tipo: "ambos" },
    ],
  },
  cdmx: {
    nombre: "Ciudad de México",
    dependencia: "SEDUVI / Alcaldías",
    descripcion: "Ciudad de México tiene el Registro en Línea de Obras (RELO) y el Sistema CONSTRU. Trámites parcialmente digitalizados. Requiere PMDP o DRO según el tipo de obra.",
    tiempos: { obra_nueva: "20–45 días hábiles", remodelacion: "15–30 días hábiles" },
    costos: { obra_nueva: "$2,000–$30,000 MXN según m²", remodelacion: "$800–$10,000 MXN" },
    documentos: [
      { doc: "Manifestación de Construcción Tipo A/B/C o Licencia", descripcion: "Tipo A: hasta 60m² sin sótano. Tipo B: 61–5000m². Tipo C: más de 5000m² o edificios especiales.", obligatorio: true, tipo: "ambos" },
      { doc: "Constancia de alineamiento y número oficial", descripcion: "Emitida por la Alcaldía. Necesaria para cualquier obra.", obligatorio: true, tipo: "obra_nueva" },
      { doc: "Certificado de Zonificación de Uso del Suelo (SEDUVI)", descripcion: "Acredita que el uso es compatible con el Programa Delegacional.", obligatorio: true, tipo: "obra_nueva" },
      { doc: "Planos estructurales firmados por DRO o PMDP", descripcion: "Director Responsable de Obra registrado ante SEDUVI. Obligatorio para Tipo B y C.", obligatorio: true, tipo: "ambos" },
      { doc: "Memoria descriptiva y de cálculo", descripcion: "Requerida para obras con más de 2 niveles o sótano.", obligatorio: false, tipo: "obra_nueva" },
      { doc: "Comprobante de pago de derechos", descripcion: "Pago realizado en la Tesorería de la Alcaldía.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura pública inscrita en RPP CDMX", descripcion: "Copia certificada con inscripción vigente.", obligatorio: true, tipo: "ambos" },
    ],
  },
  jalisco: {
    nombre: "Jalisco",
    dependencia: "SEPLADURA / SIAUT Guadalajara",
    descripcion: "Jalisco implementó el Sistema Integrado de Autorización Única de Trámites (SIAUT). Guadalajara tiene tramites digitalizados. Municipios del interior pueden variar.",
    tiempos: { obra_nueva: "15–30 días hábiles", remodelacion: "10–20 días hábiles" },
    costos: { obra_nueva: "$1,800–$20,000 MXN según m²", remodelacion: "$700–$8,000 MXN" },
    documentos: [
      { doc: "Solicitud de licencia SIAUT (Guadalajara en línea)", descripcion: "Disponible en jalisco.gob.mx/siaut para municipios con sistema digital.", obligatorio: true, tipo: "ambos" },
      { doc: "Constancia de factibilidad de uso de suelo", descripcion: "Emitida por SEPLADURA o el municipio. Verifica la aptitud del predio.", obligatorio: true, tipo: "ambos" },
      { doc: "Planos arquitectónicos y estructurales DRO/perito", descripcion: "DRO registrado ante el municipio. Cédula vigente ante Colegio de Arquitectos o CICJ.", obligatorio: true, tipo: "ambos" },
      { doc: "Comprobante predial y agua del año en curso", descripcion: "Tesorería Municipal y SIAPA.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura inscrita en RPP Jalisco", descripcion: "Copia certificada. Folio real vigente.", obligatorio: true, tipo: "ambos" },
      { doc: "Identificación oficial del propietario", descripcion: "INE/Pasaporte vigente.", obligatorio: true, tipo: "ambos" },
      { doc: "Estudio de mecánica de suelos", descripcion: "Requerido para obras de más de 3 niveles o más de 500m².", obligatorio: false, tipo: "obra_nueva" },
    ],
  },
  nuevo_leon: {
    nombre: "Nuevo León",
    dependencia: "SEDUR / Municipios (San Pedro, Monterrey, etc.)",
    descripcion: "Nuevo León tiene alta actividad constructiva. Municipios como San Pedro Garza García y Monterrey tienen tramites digitalizados. MIIA (Manifestación de Impacto Ambiental) requerida en ciertos casos.",
    tiempos: { obra_nueva: "15–30 días hábiles", remodelacion: "10–20 días hábiles" },
    costos: { obra_nueva: "$2,500–$25,000 MXN según m²", remodelacion: "$1,000–$8,000 MXN" },
    documentos: [
      { doc: "Solicitud de licencia o permiso de construcción", descripcion: "Formato municipal. Algunos municipios tienen sistema en línea.", obligatorio: true, tipo: "ambos" },
      { doc: "Certificado de uso de suelo compatible", descripcion: "Emitido por Planeación Urbana del municipio o SEDUR.", obligatorio: true, tipo: "ambos" },
      { doc: "Planos arquitectónicos con firma del director o perito", descripcion: "Director responsable registrado ante el municipio.", obligatorio: true, tipo: "ambos" },
      { doc: "Comprobante predial al corriente", descripcion: "Del año en curso.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura inscrita en RPP Nuevo León", descripcion: "Copia certificada con folio real.", obligatorio: true, tipo: "ambos" },
      { doc: "Visto bueno de Bomberos (obras mayores)", descripcion: "Para edificios de más de 3 niveles o usos comerciales/industriales.", obligatorio: false, tipo: "obra_nueva" },
    ],
  },
  puebla: {
    nombre: "Puebla",
    dependencia: "SIVU / Secretaría de Desarrollo Urbano Municipal",
    descripcion: "Puebla tiene el sistema SIVU para trámites de construcción. El centro histórico tiene restricciones adicionales de INAH y INBA. Verificar con el municipio.",
    tiempos: { obra_nueva: "20–40 días hábiles", remodelacion: "15–25 días hábiles" },
    costos: { obra_nueva: "$1,500–$18,000 MXN según m²", remodelacion: "$600–$6,000 MXN" },
    documentos: [
      { doc: "Licencia de construcción (SIVU)", descripcion: "Sistema de Ventanilla Única Puebla. Disponible en línea.", obligatorio: true, tipo: "ambos" },
      { doc: "Dictamen de uso de suelo", descripcion: "Emitido por Desarrollo Urbano Municipal. INDAABIN en zona federal.", obligatorio: true, tipo: "ambos" },
      { doc: "Planos con DRO certificado ante Colegio", descripcion: "Arquitecto o ingeniero con registro vigente.", obligatorio: true, tipo: "ambos" },
      { doc: "Comprobante predial vigente", descripcion: "Del año en curso. Tesorería Municipal.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura inscrita en RPP Puebla", descripcion: "Copia certificada.", obligatorio: true, tipo: "ambos" },
      { doc: "Autorización INAH (zona histórica)", descripcion: "Para predios en el centro histórico o zonas de monumentos.", obligatorio: false, tipo: "ambos" },
    ],
  },
  quintana_roo: {
    nombre: "Quintana Roo",
    dependencia: "SEDUMA / Ayuntamiento Cancún/Solidaridad/Tulum",
    descripcion: "Quintana Roo tiene alta actividad constructiva turística. Requiere autorizaciones SEMARNAT para zona costera y áreas naturales. Costo de vida más alto, reflejado en los factores SICT.",
    tiempos: { obra_nueva: "25–50 días hábiles", remodelacion: "15–35 días hábiles" },
    costos: { obra_nueva: "$3,000–$40,000 MXN según m²", remodelacion: "$1,200–$15,000 MXN" },
    documentos: [
      { doc: "Licencia de construcción municipal", descripcion: "Cada municipio tiene su propio formato. Cancún: plataforma en línea.", obligatorio: true, tipo: "ambos" },
      { doc: "Constancia de factibilidad de uso de suelo (SEDUMA)", descripcion: "Secretaría de Desarrollo Urbano y Medio Ambiente de QR.", obligatorio: true, tipo: "ambos" },
      { doc: "Autorización SEMARNAT / ZOFEMAT (zona costera)", descripcion: "Para predios en franja de 20m de la línea de marea alta. Zona Federal Marítimo Terrestre.", obligatorio: false, tipo: "obra_nueva" },
      { doc: "Planos con DRO o perito registrado", descripcion: "Registro ante el municipio. Se recomienda DRO con experiencia en zona tropical.", obligatorio: true, tipo: "ambos" },
      { doc: "Comprobante predial al corriente", descripcion: "Tesorería Municipal.", obligatorio: true, tipo: "ambos" },
      { doc: "Escritura inscrita en RPP Quintana Roo", descripcion: "Copia certificada.", obligatorio: true, tipo: "ambos" },
    ],
  },
};

const ESTADOS_LIST = [
  "aguascalientes","baja_california","baja_california_sur","campeche","chiapas","chihuahua",
  "cdmx","coahuila","colima","durango","estado_de_mexico","guanajuato","guerrero","hidalgo",
  "jalisco","michoacan","morelos","nayarit","nuevo_leon","oaxaca","puebla","queretaro",
  "quintana_roo","san_luis_potosi","sinaloa","sonora","tabasco","tamaulipas","tlaxcala",
  "veracruz","yucatan","zacatecas",
];

const NOMBRES_ESTADOS: Record<string, string> = {
  aguascalientes:"Aguascalientes", baja_california:"Baja California", baja_california_sur:"Baja California Sur",
  campeche:"Campeche", chiapas:"Chiapas", chihuahua:"Chihuahua", cdmx:"Ciudad de México",
  coahuila:"Coahuila", colima:"Colima", durango:"Durango", estado_de_mexico:"Estado de México",
  guanajuato:"Guanajuato", guerrero:"Guerrero", hidalgo:"Hidalgo", jalisco:"Jalisco",
  michoacan:"Michoacán", morelos:"Morelos", nayarit:"Nayarit", nuevo_leon:"Nuevo León",
  oaxaca:"Oaxaca", puebla:"Puebla", queretaro:"Querétaro", quintana_roo:"Quintana Roo",
  san_luis_potosi:"San Luis Potosí", sinaloa:"Sinaloa", sonora:"Sonora", tabasco:"Tabasco",
  tamaulipas:"Tamaulipas", tlaxcala:"Tlaxcala", veracruz:"Veracruz", yucatan:"Yucatán",
  zacatecas:"Zacatecas",
};

const GENERIC_DOCS: Documento[] = [
  { doc: "Solicitud de licencia de construcción", descripcion: "Formato del municipio o dependencia estatal.", obligatorio: true, tipo: "ambos" },
  { doc: "Certificado / dictamen de uso de suelo", descripcion: "Emitido por Planeación Urbana o dependencia estatal.", obligatorio: true, tipo: "ambos" },
  { doc: "Planos arquitectónicos con firma de DRO o perito", descripcion: "Director Responsable de Obra con cédula profesional vigente.", obligatorio: true, tipo: "ambos" },
  { doc: "Comprobante predial al corriente", descripcion: "Del año en curso. Emitido por la Tesorería Municipal.", obligatorio: true, tipo: "ambos" },
  { doc: "Escritura inscrita en el Registro Público de la Propiedad", descripcion: "Copia certificada con inscripción vigente.", obligatorio: true, tipo: "ambos" },
  { doc: "Identificación oficial del propietario", descripcion: "INE / Pasaporte vigente.", obligatorio: true, tipo: "ambos" },
];

export default function ChecklistPage() {
  const [estadoId, setEstadoId] = useState("");
  const [tipo, setTipo] = useState<"obra_nueva" | "remodelacion">("obra_nueva");
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const datos: EstadoPermiso | null = useMemo(() => {
    if (!estadoId) return null;
    if (PERMISOS[estadoId]) return PERMISOS[estadoId];
    return {
      nombre: NOMBRES_ESTADOS[estadoId] ?? estadoId,
      dependencia: "Dirección de Desarrollo Urbano Municipal",
      descripcion: `Consulta directamente con el municipio de ${NOMBRES_ESTADOS[estadoId] ?? estadoId} para verificar los requisitos actualizados.`,
      tiempos: { obra_nueva: "15–30 días hábiles", remodelacion: "10–20 días hábiles" },
      costos: { obra_nueva: "$1,500–$20,000 MXN según m²", remodelacion: "$600–$8,000 MXN" },
      documentos: GENERIC_DOCS,
    };
  }, [estadoId]);

  const docsFiltrados = useMemo(() => {
    if (!datos) return [];
    return datos.documentos.filter(d => d.tipo === "ambos" || d.tipo === tipo);
  }, [datos, tipo]);

  const total = docsFiltrados.length;
  const completados = docsFiltrados.filter((_, i) => checked.has(i)).length;
  const pct = total > 0 ? Math.round((completados / total) * 100) : 0;

  const toggle = (i: number) => setChecked(prev => {
    const s = new Set(prev);
    s.has(i) ? s.delete(i) : s.add(i);
    return s;
  });

  const handleEstado = (id: string) => { setEstadoId(id); setChecked(new Set()); };
  const handleTipo = (t: "obra_nueva" | "remodelacion") => { setTipo(t); setChecked(new Set()); };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", padding: "88px 32px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span style={{ display: "inline-block", background: "rgba(209,201,255,0.15)", border: "1px solid rgba(209,201,255,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "var(--font-body)", fontSize: 11, color: "#d1c9ff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Trámites y Permisos
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12 }}>
            <em style={{ fontStyle: "italic" }}>Checklist</em> de Permisos
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 560, lineHeight: 1.65 }}>
            Requisitos de licencia de construcción por estado y tipo de obra. Selecciona tu estado y marca los documentos que ya tienes.
          </p>
        </div>

        {/* Selectors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Estado</label>
            <select
              value={estadoId}
              onChange={e => handleEstado(e.target.value)}
              style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: estadoId ? "#fff" : "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", fontSize: 14, outline: "none" }}
            >
              <option value="">— Selecciona tu estado —</option>
              {ESTADOS_LIST.map(id => <option key={id} value={id}>{NOMBRES_ESTADOS[id]}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Tipo de obra</label>
            <div style={{ display: "flex", gap: 8, height: 48 }}>
              {([["obra_nueva","Obra nueva"],["remodelacion","Remodelación"]] as const).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => handleTipo(id)}
                  style={{
                    flex: 1, borderRadius: 10, border: tipo === id ? "1px solid #d1c9ff" : "1px solid #333",
                    background: tipo === id ? "rgba(209,201,255,0.12)" : "#1a1a2e",
                    color: tipo === id ? "#d1c9ff" : "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: tipo === id ? 600 : 400, cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {datos && (
          <>
            {/* Estado info */}
            <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", padding: 24, marginBottom: 24 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>Dependencia</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#d1c9ff", fontWeight: 600, marginBottom: 8 }}>{datos.dependencia}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 16 }}>{datos.descripcion}</p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Tiempo estimado</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", marginTop: 2 }}>
                    {tipo === "obra_nueva" ? datos.tiempos.obra_nueva : datos.tiempos.remodelacion}
                  </p>
                </div>
                <div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Costo de trámite</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", marginTop: 2 }}>
                    {tipo === "obra_nueva" ? datos.costos.obra_nueva : datos.costos.remodelacion}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Progreso de documentos</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: pct === 100 ? "#4ade80" : "#d1c9ff", fontWeight: 600 }}>
                  {completados} / {total} ({pct}%)
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 9999 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#4ade80" : "#d1c9ff", borderRadius: 9999, transition: "width 400ms ease" }} />
              </div>
            </div>

            {/* Document list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {docsFiltrados.map((doc, i) => {
                const done = checked.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    style={{
                      display: "flex", gap: 14, alignItems: "flex-start",
                      padding: "16px 20px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                      border: done ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.07)",
                      background: done ? "rgba(74,222,128,0.06)" : "#111216",
                      transition: "all 150ms",
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                      border: done ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                      background: done ? "#4ade80" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done && <span style={{ fontSize: 12, color: "#000", fontWeight: 700 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: done ? "#4ade80" : "#fff", fontWeight: 600, textDecoration: done ? "line-through" : "none", textDecorationColor: "rgba(74,222,128,0.5)" }}>
                          {doc.doc}
                        </span>
                        {doc.obligatorio && (
                          <span style={{ background: "rgba(248,113,113,0.15)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 9999, padding: "2px 8px", fontFamily: "var(--font-body)", fontSize: 9, color: "#f87171", letterSpacing: "0.08em" }}>
                            OBLIGATORIO
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{doc.descripcion}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Complete badge */}
            {pct === 100 && (
              <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4ade80", fontWeight: 600 }}>¡Lista de documentos completa!</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Verifica con la dependencia local antes de tramitar.</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => window.print()}
                style={{ flex: 1, padding: "14px 24px", borderRadius: 9999, border: "none", background: "#d1c9ff", color: "#000", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                🖨️ Imprimir checklist
              </button>
              <button
                onClick={() => setChecked(new Set())}
                style={{ padding: "14px 24px", borderRadius: 9999, border: "1px solid #333", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer" }}
              >
                Reiniciar
              </button>
            </div>

            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 20, lineHeight: 1.65 }}>
              ⚠️ Requisitos referenciales. Verificar siempre con la dependencia local antes de tramitar. Reglamentos de construcción 2025–2026.
            </p>
          </>
        )}

        {!estadoId && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "rgba(255,255,255,0.4)", letterSpacing: "-0.01em" }}>Selecciona un estado para comenzar</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>Se mostrarán los documentos requeridos según el tipo de obra</p>
          </div>
        )}
      </div>

      <style>{`
        select option { background: #1a1a2e; color: #fff; }
        @media print { nav, button { display: none !important; } }
      `}</style>
    </div>
  );
}
