"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../_components/Navbar";

const TIPOS_REMODELACION = [
  { id: "cocina", icon: "🍳", label: "Cocina integral" },
  { id: "bano", icon: "🚿", label: "Baño completo" },
  { id: "sala", icon: "🛋️", label: "Sala / comedor" },
  { id: "recamara", icon: "🛏️", label: "Recámara" },
  { id: "fachada", icon: "🏠", label: "Fachada" },
  { id: "azotea", icon: "🏗️", label: "Azotea / techo" },
  { id: "piso", icon: "🏁", label: "Pisos generales" },
  { id: "otro", icon: "🔧", label: "Otro tipo" },
];

const SYSTEM_REMODELACION = `Eres ConstruIA, asistente especializado en presupuestos de remodelación en México.

Cuando el usuario describe un proyecto de remodelación:
1. Identifica el tipo de remodelación
2. Haz MÁXIMO 3 preguntas de clarificación (dimensiones, calidad de materiales, estado actual)
3. Con esa información, genera un estimado detallado en MXN (sin IVA)

Formato de respuesta para el estimado:
- Costo estimado: RANGO en MXN (ej: $45,000–$65,000 MXN)
- Tiempo estimado: X semanas
- Materiales principales con precios referencia CMIC 2026
- Mano de obra incluida

Precios de referencia (por m²):
- Piso cerámico instalado: $400–$600
- Pintura interior: $80–$150
- Baño completo estándar: $35,000–$55,000
- Cocina integral (por ml): $8,500–$22,000
- Impermeabilización: $180–$350/m²

Siempre en español. Responde en máximo 250 palabras por mensaje.`;

type Msg = { role: "user" | "assistant"; content: string };

const PLACEHOLDERS = [
  "Quiero remodelar mi cocina de 12m². Es del año 2000 y quiero darle un look moderno con isla...",
  "Tengo un baño de 4m² que necesita renovación completa. Presupuesto de unos $50k MXN...",
  "La fachada de mi casa en Guadalajara necesita pintura y cambio de ventanas...",
  "Quiero impermeabilizar la azotea de 80m² antes de la temporada de lluvias...",
];

export default function SimuladorPage() {
  const [tipoSel, setTipoSel] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState<Msg[]>([]);
  const [cargando, setCargando] = useState(false);
  const [placeholder] = useState(() => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  const enviar = async () => {
    const texto = input.trim();
    if (!texto || cargando) return;

    const prefijo = tipoSel ? `[Tipo: ${TIPOS_REMODELACION.find(t => t.id === tipoSel)?.label ?? tipoSel}] ` : "";
    const msgUser: Msg = { role: "user", content: prefijo + texto };
    const historial = [...mensajes, msgUser];
    setMensajes(historial);
    setInput("");
    setCargando(true);

    try {
      const res = await fetch("/api/agente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historial, system: SYSTEM_REMODELACION }),
      });
      const data = await res.json() as { content?: string; error?: string };
      const reply = data.content ?? data.error ?? "Error al conectar con el agente.";
      setMensajes(h => [...h, { role: "assistant", content: reply }]);
    } catch {
      setMensajes(h => [...h, { role: "assistant", content: "Error de conexión. Verifica tu internet e intenta de nuevo." }]);
    } finally {
      setCargando(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); }
  };

  const reset = () => { setMensajes([]); setInput(""); setTipoSel(null); };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "80px 32px 40px", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <span style={{ display: "inline-block", background: "rgba(0,179,221,0.15)", border: "1px solid rgba(0,179,221,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "var(--font-body)", fontSize: 11, color: "#00b3dd", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            IA Incluida
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,4vw,46px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
            Simulador de <em style={{ fontStyle: "italic" }}>Remodelación</em>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            Describe tu proyecto. El agente hace máximo 3 preguntas y genera el estimado con precios reales.
          </p>
        </div>

        {/* Tipo selector */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Tipo de remodelación (opcional)</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TIPOS_REMODELACION.map(t => (
              <button
                key={t.id}
                onClick={() => setTipoSel(s => s === t.id ? null : t.id)}
                style={{
                  padding: "7px 14px", borderRadius: 9999, cursor: "pointer",
                  border: tipoSel === t.id ? "1px solid #00b3dd" : "1px solid #333",
                  background: tipoSel === t.id ? "rgba(0,179,221,0.12)" : "#1a1a2e",
                  color: tipoSel === t.id ? "#00b3dd" : "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: tipoSel === t.id ? 600 : 400,
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main layout */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, minHeight: 400 }}>

          {/* Left — input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Describe tu proyecto
                </p>
              </div>
              <textarea
                ref={textRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={placeholder}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  padding: "20px", fontFamily: "var(--font-body)", fontSize: 14, color: "#fff",
                  resize: "none", lineHeight: 1.7, minHeight: 200,
                }}
              />
              <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                  Enter para enviar · Shift+Enter para nueva línea
                </span>
                <button
                  onClick={enviar}
                  disabled={!input.trim() || cargando}
                  style={{
                    padding: "10px 22px", borderRadius: 9999, border: "none",
                    background: input.trim() && !cargando ? "#00b3dd" : "rgba(0,179,221,0.3)",
                    color: input.trim() && !cargando ? "#000" : "rgba(255,255,255,0.3)",
                    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, cursor: input.trim() && !cargando ? "pointer" : "default",
                  }}
                >
                  {cargando ? "Analizando…" : "Enviar →"}
                </button>
              </div>
            </div>

            {/* Quick examples */}
            <div style={{ background: "#111216", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Ejemplos de preguntas</p>
              {[
                "¿Cuánto cuesta remodelar un baño de 4m² en Monterrey?",
                "Quiero renovar la cocina, isla central y gabinetes nuevos",
                "Impermeabilizar azotea de 60m² antes de temporada de lluvias",
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer" }}
                >
                  → {q}
                </button>
              ))}
            </div>
          </div>

          {/* Right — chat */}
          <div style={{ background: "#111216", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #00b3dd, #847dff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>C</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#fff", fontWeight: 600 }}>ConstruIA</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Agente de Remodelación</p>
                </div>
              </div>
              {mensajes.length > 0 && (
                <button onClick={reset} style={{ padding: "5px 12px", borderRadius: 9999, border: "1px solid #333", background: "transparent", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer" }}>
                  Nueva consulta
                </button>
              )}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {mensajes.length === 0 && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 20px" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🏠</div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "rgba(255,255,255,0.3)", letterSpacing: "-0.01em" }}>Describe tu proyecto</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>El agente te dará un estimado detallado</p>
                </div>
              )}

              {mensajes.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#00b3dd,#847dff)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>C</span>
                    </div>
                  )}
                  <div style={{
                    maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "2px 14px 14px 14px",
                    background: m.role === "user" ? "#00b3dd" : "rgba(255,255,255,0.06)",
                  }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: m.role === "user" ? "#000" : "rgba(255,255,255,0.88)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                      {m.content}
                    </p>
                  </div>
                </div>
              ))}

              {cargando && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#00b3dd,#847dff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>C</span>
                  </div>
                  <div style={{ padding: "10px 16px", borderRadius: "2px 14px 14px 14px", background: "rgba(255,255,255,0.06)" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Analizando proyecto…</span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        textarea::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 9999px; }
      `}</style>
    </div>
  );
}
