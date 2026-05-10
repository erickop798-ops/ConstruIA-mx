"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../_components/Navbar";

type SubHerramienta = { id: string; icon: string; titulo: string; descripcion: string; placeholder: string; system: string };

const SUB_HERRAMIENTAS: SubHerramienta[] = [
  {
    id: "tesis_arq",
    icon: "🏛️",
    titulo: "Tesis de Arquitectura",
    descripcion: "Estructuración de tesis: capítulos, marco teórico, análogos, memoria descriptiva, normativa NTC-RCDF 2023.",
    placeholder: "Mi tesis es sobre arquitectura bioclimática en zonas áridas. Dame la estructura de capítulos...",
    system: `Eres un asesor académico especializado en tesis de arquitectura en México.
Ayudas a estructurar tesis, memorias de proyecto, marcos teóricos y análisis de análogos.
Conoces: NTC-RCDF 2023, SEDUVI, INFONAVIT, lineamientos UAM/UNAM/IPN, CONACYT.
Referencias en formato APA. Responde en español, máximo 300 palabras por respuesta.`,
  },
  {
    id: "tesis_ing",
    icon: "⚙️",
    titulo: "Tesis de Ingeniería",
    descripcion: "Memorias de cálculo estructural, hidráulico, análisis de sitio, metodología de investigación técnica.",
    placeholder: "Necesito estructurar una tesis sobre análisis sísmico de marcos de concreto reforzado...",
    system: `Eres un asesor académico especializado en tesis de ingeniería civil y estructural en México.
Conoces: NTC-RCDF 2023 (sismo, viento, concreto, acero), CFE, SCFI, ASTM, ACI 318, ASCE 7.
Ayudas con: memorias de cálculo, metodología, análisis de resultados, referencias técnicas.
Responde en español. Incluye fórmulas cuando sea útil. Máximo 300 palabras por respuesta.`,
  },
  {
    id: "memorias",
    icon: "📐",
    titulo: "Memorias de Cálculo",
    descripcion: "Generación de memorias descriptivas y de cálculo para proyecto ejecutivo LOPSRM.",
    placeholder: "Necesito una memoria de cálculo para una losa de concreto maciza de 10cm, fc=200 kg/cm², 80m²...",
    system: `Eres un ingeniero calculista especializado en memorias de cálculo para proyectos de construcción en México.
Conoces: NTC-RCDF 2023, LOPSRM, ACI 318, NMX-C-407, NOMs aplicables.
Genera memorias de cálculo: losas, trabes, columnas, cimentaciones, instalaciones.
Incluye: hipótesis de diseño, cargas, fórmulas, resultados, verificaciones.
Responde en español con notación técnica correcta. Máximo 350 palabras.`,
  },
  {
    id: "residencia",
    icon: "🎓",
    titulo: "Residencia Profesional",
    descripcion: "Reportes de residencia, bitácoras de obra, informes de avance y documentación profesional.",
    placeholder: "Estoy haciendo mi residencia en una constructora y necesito estructurar mi reporte final...",
    system: `Eres un asesor de residencias profesionales en ingeniería y arquitectura en México.
Ayudas con: estructura de reportes, bitácoras de obra, informes de avance, presentaciones técnicas.
Conoces los formatos de: IPN, UNAM, TEC, UV, UAM, BUAP, ITESM.
Incluye: objetivo general, justificación, desarrollo, resultados, conclusiones, bibliografía.
Responde en español. Máximo 300 palabras por respuesta.`,
  },
];

type Msg = { role: "user" | "assistant"; content: string };

export default function TesisPage() {
  const [herramienta, setHerramienta] = useState<SubHerramienta | null>(null);
  const [tema, setTema] = useState("");
  const [mensajes, setMensajes] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  const seleccionar = (h: SubHerramienta) => {
    if (herramienta?.id !== h.id) {
      setHerramienta(h);
      setMensajes([]);
      setInput("");
      setTema("");
    }
  };

  const enviar = async () => {
    if (!herramienta) return;
    const texto = input.trim();
    if (!texto || cargando) return;

    const prefijo = tema.trim() ? `[Tema: ${tema.trim()}] ` : "";
    const msgUser: Msg = { role: "user", content: prefijo + texto };
    const historial = [...mensajes, msgUser];
    setMensajes(historial);
    setInput("");
    setCargando(true);

    try {
      const res = await fetch("/api/agente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial, system: herramienta.system }),
      });
      const data = await res.json() as { content?: string; error?: string };
      const reply = data.content ?? data.error ?? "Error al conectar.";
      setMensajes(h => [...h, { role: "assistant", content: reply }]);
    } catch {
      setMensajes(h => [...h, { role: "assistant", content: "Error de conexión." }]);
    } finally {
      setCargando(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "80px 32px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <span style={{ display: "inline-block", background: "rgba(144,184,240,0.15)", border: "1px solid rgba(144,184,240,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "var(--font-body)", fontSize: 11, color: "#90b8f0", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Académico
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,4vw,46px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
            Tesis y <em style={{ fontStyle: "italic" }}>Academia</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            Asistente especializado para tesis, memorias de cálculo y residencia profesional en arquitectura e ingeniería.
          </p>
        </div>

        {/* Sub-tool selector */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12, marginBottom: 24 }}>
          {SUB_HERRAMIENTAS.map(h => {
            const active = herramienta?.id === h.id;
            return (
              <button
                key={h.id}
                onClick={() => seleccionar(h)}
                style={{
                  padding: "18px 16px", borderRadius: 14, cursor: "pointer", textAlign: "left",
                  border: active ? "1px solid #90b8f0" : "1px solid #333",
                  background: active ? "rgba(144,184,240,0.10)" : "#111216",
                  transition: "all 150ms",
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{h.icon}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: active ? "#90b8f0" : "#fff", marginBottom: 4 }}>{h.titulo}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{h.descripcion}</div>
              </button>
            );
          })}
        </div>

        {herramienta && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Left — input panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Tema field */}
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                  Tema o título de tu proyecto (opcional)
                </label>
                <input
                  type="text"
                  value={tema}
                  onChange={e => setTema(e.target.value)}
                  placeholder="Ej. Análisis sísmico de marcos de concreto reforzado en zona IVa"
                  style={{ width: "100%", background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "11px 16px", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, outline: "none" }}
                />
              </div>

              {/* Message input */}
              <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#90b8f0", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {herramienta.icon} {herramienta.titulo}
                  </p>
                </div>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={herramienta.placeholder}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    padding: "16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#fff",
                    resize: "none", lineHeight: 1.7, minHeight: 160,
                  }}
                />
                <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>Enter para enviar</span>
                  <button
                    onClick={enviar}
                    disabled={!input.trim() || cargando}
                    style={{
                      padding: "9px 20px", borderRadius: 9999, border: "none",
                      background: input.trim() && !cargando ? "#90b8f0" : "rgba(144,184,240,0.3)",
                      color: input.trim() && !cargando ? "#000" : "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, cursor: input.trim() && !cargando ? "pointer" : "default",
                    }}
                  >
                    {cargando ? "Generando…" : "Enviar →"}
                  </button>
                </div>
              </div>

              {/* Quick prompts */}
              <div style={{ background: "#111216", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Preguntas frecuentes</p>
                {herramienta.id === "tesis_arq" && [
                  "Dame la estructura de capítulos para mi tesis",
                  "¿Qué análogos debo incluir y cómo analizarlos?",
                  "¿Cómo redacto el planteamiento del problema?",
                ].map((q, i, arr) => (
                  <button key={i} onClick={() => setInput(q)} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>→ {q}</button>
                ))}
                {herramienta.id === "tesis_ing" && [
                  "Dame la estructura de capítulos para tesis estructural",
                  "¿Cómo planteo la hipótesis de mi investigación?",
                  "¿Qué normativa debo citar para análisis sísmico?",
                ].map((q, i, arr) => (
                  <button key={i} onClick={() => setInput(q)} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>→ {q}</button>
                ))}
                {herramienta.id === "memorias" && [
                  "Genera memoria de cálculo para losa maciza 10cm, 80m²",
                  "¿Qué incluye una memoria de cálculo completa LOPSRM?",
                  "Calcula la carga viva y muerta para vivienda 2 niveles",
                ].map((q, i, arr) => (
                  <button key={i} onClick={() => setInput(q)} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>→ {q}</button>
                ))}
                {herramienta.id === "residencia" && [
                  "Dame la estructura del reporte final de residencia",
                  "¿Cómo redacto la bitácora de obra semanal?",
                  "¿Qué incluye el capítulo de resultados?",
                ].map((q, i, arr) => (
                  <button key={i} onClick={() => setInput(q)} style={{ display: "block", width: "100%", textAlign: "left", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>→ {q}</button>
                ))}
              </div>
            </div>

            {/* Right — chat */}
            <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 480 }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #90b8f0, #847dff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>C</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", fontWeight: 600 }}>ConstruIA Académico</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#90b8f0" }}>{herramienta.titulo}</p>
                  </div>
                </div>
                {mensajes.length > 0 && (
                  <button onClick={() => setMensajes([])} style={{ padding: "5px 12px", borderRadius: 9999, border: "1px solid #333", background: "transparent", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>
                    Limpiar
                  </button>
                )}
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                {mensajes.length === 0 && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 20px" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{herramienta.icon}</div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "rgba(255,255,255,0.3)", letterSpacing: "-0.01em" }}>{herramienta.titulo}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.2)", marginTop: 6, maxWidth: 260 }}>{herramienta.descripcion}</p>
                  </div>
                )}

                {mensajes.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    {m.role === "assistant" && (
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#90b8f0,#847dff)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>C</span>
                      </div>
                    )}
                    <div style={{ maxWidth: "84%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "2px 14px 14px 14px", background: m.role === "user" ? "#90b8f0" : "rgba(255,255,255,0.06)" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: m.role === "user" ? "#000" : "rgba(255,255,255,0.88)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                        {m.content}
                      </p>
                    </div>
                  </div>
                ))}

                {cargando && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#90b8f0,#847dff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>C</span>
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: "2px 14px 14px 14px", background: "rgba(255,255,255,0.06)" }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Generando respuesta…</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>
          </div>
        )}

        {!herramienta && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "rgba(255,255,255,0.3)", letterSpacing: "-0.01em" }}>Selecciona una herramienta para comenzar</p>
          </div>
        )}
      </div>

      <style>{`
        textarea::placeholder { color: rgba(255,255,255,0.2); }
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 9999px; }
      `}</style>
    </div>
  );
}
