"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../_components/Navbar";

const QUICK_QUESTIONS = [
  "¿Cuánto cuesta construir 120m² en Jalisco?",
  "¿Qué dice la NTC-RCDF 2023 sobre cimentaciones?",
  "¿Cuál es el precio del cemento CPC 30R en 2026?",
  "¿Cuáles son los pasos para obtener licencia de construcción?",
  "¿Diferencia entre losa maciza y vigueta-bovedilla?",
  "¿Qué es el factor FIC SICT y cómo afecta el presupuesto?",
  "¿Cómo calculo la cantidad de block para una pared de 30m²?",
  "¿Qué documentos necesito para obra nueva en CDMX?",
];

type Msg = { role: "user" | "assistant"; content: string };

function AgenteContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialPresupuesto = searchParams.get("presupuesto") ?? "";

  const [mensajes, setMensajes] = useState<Msg[]>([]);
  const [input, setInput] = useState(initialQ);
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  // Auto-send initial query
  useEffect(() => {
    if (initialQ.trim()) {
      const timer = setTimeout(() => {
        setInput("");
        enviarMensaje(initialQ);
      }, 300);
      return () => clearTimeout(timer);
    }
    if (initialPresupuesto) {
      const timer = setTimeout(() => {
        const pregunta = `Analiza este presupuesto de construcción: ${initialPresupuesto} MXN. ¿Es un valor razonable? ¿Qué factores debo considerar?`;
        setInput("");
        enviarMensaje(pregunta);
      }, 300);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enviarMensaje = async (texto: string) => {
    if (!texto.trim() || cargando) return;
    const msgUser: Msg = { role: "user", content: texto };
    setMensajes(prev => {
      const historial = [...prev, msgUser];
      setCargando(true);
      (async () => {
        try {
          const res = await fetch("/api/agente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: historial }),
          });
          const data = await res.json() as { content?: string; error?: string };
          const reply = data.content ?? data.error ?? "Error al conectar.";
          setMensajes(h => [...h, { role: "assistant", content: reply }]);
        } catch {
          setMensajes(h => [...h, { role: "assistant", content: "Error de conexión. Verifica tu internet." }]);
        } finally {
          setCargando(false);
        }
      })();
      return historial;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = input.trim();
    if (!txt) return;
    setInput("");
    enviarMensaje(txt);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const reset = () => { setMensajes([]); setInput(""); inputRef.current?.focus(); };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "80px 32px 100px", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        {mensajes.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0 48px" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #847dff, #00b3dd)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 22, color: "#fff", fontWeight: 700 }}>C</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,5vw,56px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 12 }}>
              <em style={{ fontStyle: "italic" }}>Pregunta</em> todo.
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, maxWidth: 460, margin: "0 auto 40px" }}>
              El agente ConstruIA responde sobre costos, normas, materiales y procesos constructivos en México.
            </p>

            {/* Quick questions */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 8, textAlign: "left" }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                  style={{
                    padding: "12px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                    border: "1px solid rgba(255,255,255,0.08)", background: "#111216",
                    transition: "border-color 150ms, background 150ms",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(132,125,255,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(132,125,255,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.background = "#111216"; }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {mensajes.length > 0 && (
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 8 }}>
              {mensajes.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #847dff, #00b3dd)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>C</span>
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%", padding: "12px 16px",
                    borderRadius: m.role === "user" ? "16px 16px 2px 16px" : "2px 16px 16px 16px",
                    background: m.role === "user" ? "#847dff" : "#111216",
                    border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.88)", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
                      {m.content}
                    </p>
                  </div>
                  {m.role === "user" && (
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(132,125,255,0.2)", border: "1px solid rgba(132,125,255,0.4)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <span style={{ fontSize: 12, color: "#847dff", fontWeight: 700 }}>T</span>
                    </div>
                  )}
                </div>
              ))}

              {cargando && (
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #847dff, #00b3dd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>C</span>
                  </div>
                  <div style={{ padding: "12px 16px", borderRadius: "2px 16px 16px 16px", background: "#111216", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#847dff", animation: `bounce 1.4s ${i * 0.2}s infinite both` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* Reset button when has messages */}
        {mensajes.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <button onClick={reset} style={{ padding: "6px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer" }}>
              Nueva conversación
            </button>
          </div>
        )}
      </div>

      {/* Fixed input bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(15,16,17,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", padding: "16px 32px 20px" }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9999,
            padding: "8px 8px 8px 24px", display: "flex", alignItems: "center", gap: 12,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Pregunta sobre costos, normas, materiales, procesos constructivos…"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-body)", fontSize: 15, color: "#fff", caretColor: "#847dff" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || cargando}
              style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "none",
                background: input.trim() && !cargando ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
                cursor: input.trim() && !cargando ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: input.trim() && !cargando ? "#000" : "rgba(255,255,255,0.2)",
                transition: "all 150ms",
              }}
            >
              ↑
            </button>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 8 }}>
            ConstruIA · Claude Haiku · Datos CMIC 2026 · SICT 2025 · NTC-RCDF 2023
          </p>
        </form>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 9999px; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
      `}</style>
    </div>
  );
}

export default function AgentePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#0f1011", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Cargando…</div>
      </div>
    }>
      <AgenteContent />
    </Suspense>
  );
}
