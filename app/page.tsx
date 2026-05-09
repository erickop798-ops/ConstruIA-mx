"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

/* ─────────────────────────────────────────
   Animation constants
   ───────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─────────────────────────────────────────
   Types
   ───────────────────────────────────────── */
type ToolData = {
  bg: string;
  textColor: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  watermark?: string;
  badge?: string;
};

/* ─────────────────────────────────────────
   Data
   ───────────────────────────────────────── */
const TOOLS: ToolData[] = [
  {
    bg: "linear-gradient(135deg, #847dff 0%, #6059e8 100%)",
    textColor: "#000",
    tag: "HERRAMIENTA PRINCIPAL",
    title: "Presupuestador Profesional",
    description:
      "5 pasos. Precios CMIC 2026 con factores por estado. Tres escenarios: económico, estándar y premium.",
    href: "/presupuesto",
    watermark: "$1,112,100",
  },
  {
    bg: "linear-gradient(135deg, #00c9e0 0%, #0085b3 100%)",
    textColor: "#000",
    tag: "REMODELACIÓN",
    title: "Simulador de Remodelación",
    description:
      "Describe tu proyecto en lenguaje natural. El agente IA hace máximo 3 preguntas y genera el estimado.",
    href: "/simulador",
    badge: "IA INCLUIDA",
  },
  {
    bg: "linear-gradient(135deg, #e8e0ff 0%, #c4b8ff 100%)",
    textColor: "#000",
    tag: "ASISTENTE IA",
    title: "Agente ConstruIA",
    description:
      "Tu copiloto de construcción disponible 24/7. Preguntas sobre normas, materiales, costos y procesos constructivos.",
    href: "/agente",
    badge: "CLAUDE HAIKU",
  },
  {
    bg: "linear-gradient(135deg, #a8d4ff 0%, #5e9de8 100%)",
    textColor: "#000",
    tag: "EDUCACIÓN",
    title: "Tesis y Academia",
    description:
      "Estructura tesis de arquitectura e ingeniería. NTC-RCDF 2023, LOPSRM, memorias de cálculo incluidas.",
    href: "/tesis",
    badge: "ACADÉMICO",
  },
  {
    bg: "linear-gradient(135deg, #f0a8e8 0%, #c860be 100%)",
    textColor: "#000",
    tag: "DATOS REGIONALES",
    title: "Precios por Estado",
    description:
      "Precios unitarios actualizados en los 33 estados de México. Factores FIC SICT 2025 diferenciados por región.",
    href: "/precios",
    watermark: "33",
  },
  {
    bg: "linear-gradient(135deg, #6662cc 0%, #2d2b7a 100%)",
    textColor: "#fff",
    tag: "EXPORTACIÓN",
    title: "PDF Profesional LOPSRM",
    description:
      "Exporta con membrete profesional, tabla de partidas con cantidad y precio unitario. Tres escenarios de costo. Listo para firmar.",
    href: "/pdf",
  },
];


/* ─────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────── */
function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/agente?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed photo */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85&auto=format"
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>
      {/* Color tint — enfría la paleta para tono atmosférico */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(8,18,38,0.45)", mixBlendMode: "multiply" }} />
      {/* Overlay gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.15) 42%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          textAlign: "center",
        }}
      >
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: "9999px",
              padding: "7px 18px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "11px",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4fc3f7", flexShrink: 0 }} />
            Copiloto Arquitectónico · México
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px, 9vw, 80px)",
            lineHeight: 0.9,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          <em style={{ fontStyle: "italic" }}>Construye</em>
          <br />
          con precisión.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "18px",
            color: "#f5f5f7",
            maxWidth: "480px",
            lineHeight: 1.7,
            margin: "0 auto",
          }}
        >
          ConstruIA es tu copiloto de inteligencia para la industria de la construcción en México.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.52 }}
        >
          <a
            href="/presupuesto"
            style={{
              display: "inline-block",
              background: "#000",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "18px",
              padding: "16px 40px",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "opacity 200ms",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            Iniciar presupuesto →
          </a>
        </motion.div>

        {/* Input pill */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
        >
          <div
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "9999px",
              padding: "6px 6px 6px 32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backdropFilter: "blur(12px)",
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Cuánto cuesta construir 120m² en Tlaxcala?"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "16px",
                color: "#fff",
                caretColor: "var(--color-ocean-glimmer)",
              }}
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 200ms",
                color: "#000",
                fontSize: "16px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.9)")
              }
            >
              ↑
            </button>
          </div>

          {/* Input sub-label */}
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "12px",
              color: "var(--color-subtle-ash)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Presupuesta. Calcula. Construye.
          </span>
        </motion.form>

        {/* Trust badges with laurels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {([
            { title: "CMIC", sub: "PRECIOS OFICIALES 2026" },
            { title: "NTC-RCDF", sub: "NORMATIVA VIGENTE 2023" },
          ] as const).map((badge) => (
            <div
              key={badge.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Left laurel */}
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden>
                <path d="M9 26 C9 26 2 20 2 12 C2 7 5 3.5 9 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M5.5 16 C3.5 13 3.5 10 6 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M6 21 C4 18.5 4 16 6.5 14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Badge text */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.2,
                  }}
                >
                  {badge.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.4,
                    marginTop: "2px",
                  }}
                >
                  {badge.sub}
                </div>
              </div>
              {/* Right laurel (mirrored) */}
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" style={{ transform: "scaleX(-1)" }} aria-hidden>
                <path d="M9 26 C9 26 2 20 2 12 C2 7 5 3.5 9 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M5.5 16 C3.5 13 3.5 10 6 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M6 21 C4 18.5 4 16 6.5 14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Tool Card
   ───────────────────────────────────────── */
function ToolCard({ tool, index, inView }: { tool: ToolData; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      style={{ height: "100%" }}
    >
      <a
        href={tool.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "32px",
          borderRadius: "16px",
          background: tool.bg,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          textDecoration: "none",
          boxShadow: hovered ? "var(--shadow-card)" : "none",
          transition: "box-shadow 200ms",
        }}
      >
        {/* Tag */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:
              tool.textColor === "#fff"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.5)",
          }}
        >
          {tool.tag}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "24px",
            color: tool.textColor,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {tool.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "14px",
            color:
              tool.textColor === "#fff"
                ? "rgba(255,255,255,0.75)"
                : "rgba(0,0,0,0.65)",
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {tool.description}
        </p>

        {/* Badge pill */}
        {tool.badge && (
          <span
            style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              borderRadius: "9999px",
              padding: "4px 12px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {tool.badge}
          </span>
        )}

        {/* Link */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "14px",
            color: tool.textColor,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "auto",
          }}
        >
          Explorar{" "}
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </span>

        {/* Watermark */}
        {tool.watermark && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-8px",
              right: "16px",
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: tool.watermark.length > 5 ? "28px" : "80px",
              color:
                tool.textColor === "#fff"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(0,0,0,0.12)",
              userSelect: "none",
              pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            {tool.watermark}
          </span>
        )}
      </a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Tools Section
   ───────────────────────────────────────── */
function ToolsSection() {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="herramientas"
      ref={ref}
      style={{
        background: "#080a0c",
        padding: "120px 40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            textAlign: "center",
            marginBottom: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 38px)",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Todo lo que necesitas en un solo lugar.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--color-subtle-ash)",
              maxWidth: "540px",
              lineHeight: 1.65,
            }}
          >
            Seis herramientas especializadas para el ciclo completo de un proyecto de construcción.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.title} tool={tool} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA Section
   ───────────────────────────────────────── */
function CtaSection() {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      style={{
        background: "#080a0c",
        padding: "120px 40px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(40px, 5vw, 64px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Deja de presupuestar a ojo.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "18px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}
        >
          Tu tiempo vale más que 4 horas en Excel. Genera tu primer presupuesto profesional en 3 minutos, con datos reales de tu estado.
        </p>

        <a
          href="/presupuesto"
          style={{
            display: "inline-block",
            background: "#fff",
            color: "#000",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "15px",
            padding: "14px 32px",
            borderRadius: "9999px",
            textDecoration: "none",
            transition: "opacity 200ms",
            marginTop: "8px",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
          }
        >
          Crear presupuesto gratis →
        </a>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Simplify Section
   ───────────────────────────────────────── */
function SimplifySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      style={{ background: "#000", padding: "120px 40px 0", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 76px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: "72px",
          }}
        >
          <em style={{ fontStyle: "italic" }}>Simplifica</em> tu construcción
        </motion.h2>

        {/* CSS Mockup — presupuestador */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          style={{
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto",
            borderRadius: "20px 20px 0 0",
            background: "#111216",
            boxShadow: "0 -4px 80px rgba(132,125,255,0.18), 0 0 0 1px rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}
        >
          {/* Mockup top bar */}
          <div style={{
            background: "#0d0e10",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 12 }}>
              construia.mx/presupuesto
            </span>
          </div>

          {/* Mockup body — 2 panels */}
          <div style={{ display: "flex", minHeight: "420px" }}>
            {/* Left panel — form */}
            <div style={{
              width: "42%",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Paso 2 de 5
              </span>
              {/* Progress bar */}
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 9999 }}>
                <div style={{ width: "40%", height: "100%", background: "#847dff", borderRadius: 9999 }} />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#fff", fontWeight: 500, marginTop: 4 }}>
                ¿En qué estado construyes?
              </p>
              {/* State selector mock */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Ciudad de México</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>▼</span>
              </div>
              {[
                { label: "Jalisco", active: false },
                { label: "Nuevo León", active: false },
                { label: "Puebla", active: false },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{s.label}</span>
                </div>
              ))}
              {/* Next button */}
              <div style={{ marginTop: "auto", background: "#847dff", borderRadius: 10, padding: "13px", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "#fff" }}>Continuar →</span>
              </div>
            </div>

            {/* Right panel — PRESUPUESTO ACTIVO (Mockup 1) */}
            <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "#2e2e2e", borderRadius: 16, padding: "18px 18px 14px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    Presupuesto activo
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>⊞</span>
                    <span style={{ fontSize: 13, color: "#00b3dd", cursor: "pointer" }}>⬚</span>
                  </div>
                </div>
                {/* Big number */}
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>$1,112,100</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00b3dd", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Jun 2026 · CDMX</span>
                  </div>
                </div>
                {/* SVG mini chart — 2 lines */}
                <svg viewBox="0 0 280 72" width="100%" style={{ display: "block", margin: "0 -2px" }}>
                  <defs>
                    <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b3dd" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#00b3dd" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area */}
                  <path d="M0 55 C35 50 55 36 85 42 C115 48 130 28 165 22 C195 16 215 30 245 22 C258 18 272 12 280 8 L280 72 L0 72 Z" fill="url(#spendFill)" />
                  {/* Actual (ocean glimmer) */}
                  <path d="M0 55 C35 50 55 36 85 42 C115 48 130 28 165 22 C195 16 215 30 245 22 C258 18 272 12 280 8" fill="none" stroke="#00b3dd" strokeWidth="2" strokeLinecap="round" />
                  {/* Estimado (gray) */}
                  <path d="M0 62 C35 58 55 47 85 50 C115 53 130 40 165 38 C195 36 215 43 245 37 C258 33 272 29 280 26" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
                  {/* End dot */}
                  <circle cx="280" cy="8" r="4" fill="#00b3dd" />
                  <circle cx="280" cy="8" r="8" fill="rgba(0,179,221,0.2)" />
                </svg>
                {/* Period tabs */}
                <div style={{ display: "flex", gap: 6 }}>
                  {["1M","3M","6M","1A","ALL"].map((t,i) => (
                    <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: i===4 ? "#00b3dd" : "rgba(255,255,255,0.3)", background: i===4 ? "rgba(0,179,221,0.12)" : "transparent", borderRadius: 4, padding: "3px 7px", cursor: "pointer" }}>{t}</span>
                  ))}
                </div>
                {/* 2x2 partidas grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
                  {[
                    { label: "Cimentación", amt: "$150k", color: "#847dff" },
                    { label: "Estructura",  amt: "$280k", color: "#00b3dd" },
                    { label: "Instalaciones", amt: "$198k", color: "#dd90d8" },
                    { label: "Acabados",    amt: "$241k", color: "#90b8f0" },
                  ].map(p => (
                    <div key={p.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ width: 6, height: 2, background: p.color, borderRadius: 9999, marginBottom: 5 }} />
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{p.label}</p>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#fff", fontWeight: 500 }}>{p.amt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Track Section — 3 mini-cards
   ───────────────────────────────────────── */
function TrackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} style={{ background: "#000", padding: "140px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(44px, 5.5vw, 70px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}>
            <em style={{ fontStyle: "italic" }}>Calcula</em> todo
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.65 }}>
            Conecta tu proyecto con datos reales de construcción en México
          </p>
          <a
            href="/presupuesto"
            style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "10px 22px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              transition: "border-color 200ms, color 200ms",
            }}
          >
            MÁS SOBRE EL PRESUPUESTADOR →
          </a>
        </motion.div>

        {/* 3 cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {/* Card 1 — Presupuesto en tiempo real */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Partidas</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, color: "#fff", letterSpacing: "-0.01em", marginBottom: 10 }}>Presupuesto en tiempo real</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 24 }}>
              Precios unitarios CMIC 2026 actualizados por estado. Sin hojas de cálculo.
            </p>
            {/* Mini mockup — row bars */}
            <div style={{ background: "#0d0e10", borderRadius: 10, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Excavación", w: "45%", val: "$28,400" },
                { label: "Cimentación", w: "72%", val: "$200,178" },
                { label: "Estructura",  w: "90%", val: "$266,904" },
                { label: "Acabados",   w: "55%", val: "$145,200" },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{r.val}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
                    <div style={{ width: r.w, height: "100%", background: "linear-gradient(90deg,#847dff,#6059e8)", borderRadius: 9999 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 — Compara escenarios */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Costos</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, color: "#fff", letterSpacing: "-0.01em", marginBottom: 10 }}>Compara escenarios</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 24 }}>
              Económico, estándar y premium lado a lado para decidir con datos.
            </p>
            {/* Mockup 2 — DESGLOSE */}
            <div style={{ background: "#0d0e10", borderRadius: 12, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Desglose</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>74.1%</span>
              </div>
              {/* Total progress bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Presupuesto total  <span style={{ color: "#fff" }}>$1,112,100</span> de $1,500,000</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 9999 }}>
                  <div style={{ width: "74.1%", height: "100%", background: "linear-gradient(90deg,#00b3dd,#847dff)", borderRadius: 9999 }} />
                </div>
              </div>
              {/* 3 categorías */}
              {[
                { label: "Materiales directos", pct: "58.2%", w: "58.2%", color: "#00b3dd", amt: "$647,040" },
                { label: "Mano de obra",        pct: "22.4%", w: "22.4%", color: "#847dff", amt: "$249,110" },
                { label: "Indirectos",          pct: "19.4%", w: "19.4%", color: "#dd90d8", amt: "$215,950" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{s.label}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{s.pct}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{s.amt}</span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 9999 }}>
                    <div style={{ width: s.w, height: "100%", background: s.color, borderRadius: 9999, opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 — Exporta profesional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            style={{ background: "#111216", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Programa</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, color: "#fff", letterSpacing: "-0.01em", marginBottom: 10 }}>Próximas entregas</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 24 }}>
              Hitos críticos de obra con fecha y monto. Control del programa de ejecución.
            </p>
            {/* Mockup 3 — PRÓXIMAS ENTREGAS */}
            <div style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a2a4a 100%)", borderRadius: 12, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 0, border: "1px solid rgba(144,184,240,0.12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(144,184,240,0.6)" }}>Próximas entregas</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(144,184,240,0.45)" }}>3 hitos</span>
              </div>
              {[
                { icon: "⬡", label: "Cimentación",   fecha: "15 Jun", amt: "$150,000", color: "#847dff", done: false },
                { icon: "⬡", label: "Estructura",     fecha: "30 Jul", amt: "$280,000", color: "#00b3dd", done: false },
                { icon: "⬡", label: "Instalaciones",  fecha: "20 Sep", amt: "$198,000", color: "#dd90d8", done: false },
              ].map((h, i) => (
                <div key={h.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  {/* Timeline dot */}
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${h.color}22`, border: `1.5px solid ${h.color}66`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: h.color, opacity: 0.8 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", fontWeight: 500, marginBottom: 2 }}>{h.label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(144,184,240,0.5)" }}>{h.fecha} · 2026</p>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: h.color, fontWeight: 600 }}>{h.amt}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 9999 }}>
                <div style={{ width: "33%", height: "100%", background: "linear-gradient(90deg,#847dff,#00b3dd)", borderRadius: 9999 }} />
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(144,184,240,0.4)", marginTop: 6, textAlign: "right", letterSpacing: "0.05em" }}>1 de 3 hitos completados</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Ask Section — Agente IA
   ───────────────────────────────────────── */
function AskSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [askQuery, setAskQuery] = useState("");

  return (
    <section ref={ref} style={{ background: "#000", minHeight: "80vh", padding: "120px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(64px, 8vw, 96px)",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <em style={{ fontStyle: "italic" }}>Pregunta</em> todo.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
        style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: 480, lineHeight: 1.65, marginBottom: 48 }}
      >
        El agente ConstruIA convierte tus dudas en respuestas técnicas con datos reales — normas, precios y especificaciones al instante.
      </motion.p>

      {/* Large input */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        style={{ width: "100%", maxWidth: 680 }}
      >
        <div style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 9999,
          padding: "10px 10px 10px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          backdropFilter: "blur(12px)",
        }}>
          <input
            type="text"
            value={askQuery}
            onChange={e => setAskQuery(e.target.value)}
            placeholder="¿Cuánto cuesta una losa de 80m² en Puebla?"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-body)",
              fontSize: 17,
              color: "#fff",
              caretColor: "#847dff",
            }}
          />
          <button
            type="button"
            onClick={() => { if (askQuery.trim()) window.location.href = `/agente?q=${encodeURIComponent(askQuery.trim())}`; }}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, color: "#000", transition: "background 200ms",
            }}
          >
            ↑
          </button>
        </div>
      </motion.div>

      {/* 2 gradient cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, width: "100%", maxWidth: 680, marginTop: 28 }}>
        {/* Card left — instant insights */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
            borderRadius: 16,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, color: "#fff", letterSpacing: "-0.01em", marginBottom: 12 }}>
            <em style={{ fontStyle: "italic" }}>Respuestas</em> instantáneas
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 20 }}>
            Precios CMIC, normas NTC-RCDF y especificaciones técnicas al instante, basado en datos reales de tu estado.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["CMIC 2026", "NTC-RCDF", "LOPSRM", "SICT"].map(tag => (
              <span key={tag} style={{ background: "rgba(132,125,255,0.2)", borderRadius: 9999, padding: "4px 10px", fontFamily: "var(--font-body)", fontSize: 11, color: "#847dff", letterSpacing: "0.05em" }}>{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Card right — response mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          style={{
            background: "#0d0e10",
            borderRadius: 16,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* User message */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: "#847dff", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", maxWidth: "80%" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff", margin: 0 }}>¿Precio m² construcción en Monterrey?</p>
            </div>
          </div>
          {/* Agent response */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#847dff,#00b3dd)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>C</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "2px 12px 12px 12px", padding: "10px 14px", flex: 1 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6 }}>
                En Nuevo León, el costo estándar CMIC 2026 es <strong style={{ color: "#847dff" }}>$12,400–$15,800/m²</strong>, con factor regional FIC 1.08.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#847dff,#00b3dd)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>C</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "2px 12px 12px 12px", padding: "10px 14px", flex: 1 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6 }}>
                Para 80m²: estimado <strong style={{ color: "#4ade80" }}>$992,000–$1,264,000 MXN</strong> sin IVA.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Monitor Section — Mockups 4 y 5
   ───────────────────────────────────────── */
function MonitorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  /* SVG line for Mockup 4 */
  const W4 = 260, H4 = 90;
  const pts4: [number,number][] = [[0,80],[52,65],[104,48],[156,30],[208,16],[260,5]];
  const path4 = pts4.map(([x,y],i) => `${i===0?"M":"L"} ${x} ${y}`).join(" ");
  const area4 = `${path4} L ${W4} ${H4} L 0 ${H4} Z`;

  return (
    <section ref={ref} style={{ background: "#080a0c", padding: "140px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 20 }}>

          {/* LEFT — Monitorea tu proyecto + Mockup 4 (Portfolio/Proyección) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ background: "#111216", borderRadius: 20, padding: 36, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,3vw,38px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10 }}>
                <em style={{ fontStyle: "italic" }}>Monitorea</em> tu proyecto
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 340 }}>
                Rastrea el costo real de tu obra en tiempo real y compáralo con el estimado original.
              </p>
            </div>

            {/* Mockup 4 — PROYECCIÓN DE COSTOS (Portfolio style) */}
            <div style={{ background: "#0d0e10", borderRadius: 14, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Proyección de costos</span>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#fff", letterSpacing: "-0.02em" }}>$1,112,100</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#00b3dd", fontWeight: 600 }}>+$156,800 ↑</span>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Costo base · +14.1% inflación a 5 años</p>
              </div>
              {/* SVG chart */}
              <div style={{ position: "relative" }}>
                <svg viewBox={`0 0 ${W4} ${H4+12}`} width="100%" style={{ display: "block", overflow: "visible" }}>
                  <defs>
                    <linearGradient id="portFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b3dd" stopOpacity="0.20" />
                      <stop offset="100%" stopColor="#00b3dd" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid */}
                  {[20,50,80].map(y => <line key={y} x1={0} y1={y} x2={W4} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />)}
                  {/* Area */}
                  <path d={area4} fill="url(#portFill)" />
                  {/* Line */}
                  <path d={path4} fill="none" stroke="#00b3dd" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  {/* Dots */}
                  {pts4.map(([x,y],i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r={3.5} fill="#00b3dd" />
                      {i===pts4.length-1 && <circle cx={x} cy={y} r={7} fill="rgba(0,179,221,0.2)" />}
                    </g>
                  ))}
                  {/* X labels */}
                  {(["HOY","6M","1A","2A","3A","5A"] as const).map((l,i) => (
                    <text key={l} x={pts4[i][0]} y={H4+11} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={8} fill="rgba(255,255,255,0.28)" letterSpacing="0.06em">{l}</text>
                  ))}
                </svg>
              </div>
              {/* Period tabs */}
              <div style={{ display: "flex", gap: 6 }}>
                {["1M","3M","6M","1A","5A"].map((t,i) => (
                  <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: i===4 ? "#00b3dd" : "rgba(255,255,255,0.28)", background: i===4 ? "rgba(0,179,221,0.12)" : "rgba(255,255,255,0.04)", borderRadius: 4, padding: "3px 8px", cursor: "pointer" }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Visualiza distribución + Mockup 5 (Asset & Risk) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            style={{ background: "#111216", borderRadius: 20, padding: 36, border: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px,3vw,38px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 10 }}>
                <em style={{ fontStyle: "italic" }}>Visualiza</em> tu distribución
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 340 }}>
                Conoce si tu presupuesto está alineado con los estándares CMIC por tipo de partida.
              </p>
            </div>

            {/* Mockup 5 — DISTRIBUCIÓN DE PARTIDAS (Asset & Risk style) */}
            <div style={{ background: "#0d0e10", borderRadius: 14, padding: "18px 16px", display: "flex", flexDirection: "column", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Distribución de partidas</span>
              {[
                { label: "Materiales",    actual: 58, modelo: 62, color: "#847dff" },
                { label: "Mano de obra",  actual: 22, modelo: 20, color: "#00b3dd" },
                { label: "Instalaciones", actual: 11, modelo: 10, color: "#dd90d8" },
                { label: "Acabados",      actual:  9, modelo:  8, color: "#90b8f0" },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#fff" }}>{r.label}</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Actual ({r.actual}%)</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.28)" }}>Modelo ({r.modelo}%)</span>
                    </div>
                  </div>
                  {/* Solid bar — actual */}
                  <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 9999, marginBottom: 4, position: "relative" }}>
                    <div style={{ width: `${r.actual}%`, height: "100%", background: r.color, borderRadius: 9999, opacity: 0.85 }} />
                  </div>
                  {/* Dashed bar — modelo */}
                  <div style={{ height: 4, background: "rgba(255,255,255,0.03)", borderRadius: 9999, position: "relative", overflow: "hidden" }}>
                    <div style={{
                      width: `${r.modelo}%`, height: "100%", borderRadius: 9999,
                      background: `repeating-linear-gradient(90deg, ${r.color}55 0px, ${r.color}55 6px, transparent 6px, transparent 10px)`,
                    }} />
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div style={{ display: "flex", gap: 16, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 16, height: 3, background: "rgba(255,255,255,0.4)", borderRadius: 9999 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Actual</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 16, height: 3, background: "repeating-linear-gradient(90deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 4px,transparent 4px,transparent 7px)", borderRadius: 9999 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Modelo CMIC</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Testimonials Section
   ───────────────────────────────────────── */
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const TESTIMONIALS = [
    {
      quote: "Generé mi primer presupuesto profesional en 3 minutos. Ya no uso Excel para nada.",
      name: "Arq. Marco R.",
      location: "CDMX",
      gradient: "linear-gradient(135deg, #0f4c75 0%, #1b6ca8 50%, #16a085 100%)",
    },
    {
      quote: "El desglose por partidas con precios CMIC me salvó en una licitación pública. Gané el contrato.",
      name: "Ing. Sofía M.",
      location: "Guadalajara",
      gradient: "linear-gradient(135deg, #1a3a5c 0%, #2980b9 100%)",
    },
    {
      quote: "El agente IA resolvió mis dudas sobre NTC-RCDF en segundos. Tardaba horas buscando en PDFs.",
      name: "Arq. Carlos V.",
      location: "Monterrey",
      gradient: "linear-gradient(135deg, #2d1b69 0%, #6c5ce7 60%, #a29bfe 100%)",
    },
  ] as const;

  return (
    <section ref={ref} style={{ background: "#080a0c", padding: "140px 40px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            color: "#fff",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <em style={{ fontStyle: "italic" }}>Lo que dicen</em> nuestros usuarios
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              style={{
                background: t.gradient,
                borderRadius: 16,
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                minHeight: 220,
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3 }}>
                {[0,1,2,3,4].map(s => (
                  <span key={s} style={{ color: "#fff", fontSize: 14 }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.7,
                flex: 1,
                fontStyle: "italic",
              }}>
                "{t.quote}"
              </p>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "#fff", marginBottom: 2 }}>{t.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Forecast Section — Proyección de costos
   ───────────────────────────────────────── */
function ForecastSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const W = 680;
  const H = 180;
  const points: [number, number][] = [
    [0, 140], [120, 115], [240, 95], [360, 70], [480, 38], [600, 10],
  ];
  const pathD = points.map(([x,y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const labels = ["HOY", "6 MESES", "1 AÑO", "2 AÑOS", "3 AÑOS", "5 AÑOS"];
  const values = ["$1.1M", "$1.18M", "$1.27M", "$1.38M", "$1.51M", "$1.85M"];

  return (
    <section ref={ref} style={{
      background: "linear-gradient(160deg, #06061a 0%, #0a0a2e 40%, #0d1a4e 100%)",
      padding: "140px 40px",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 76px)",
            color: "#fff",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <em style={{ fontStyle: "italic" }}>Proyecta</em> tu obra.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: 440, margin: "0 auto 56px", lineHeight: 1.65 }}
        >
          Modela escenarios de inflación y ajustes de materiales para estimar cómo evoluciona el costo de tu proyecto.
        </motion.p>

        {/* Cost labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Costo actual</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#fff", letterSpacing: "-0.02em" }}>$1,112,100</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>En 5 años</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#847dff", letterSpacing: "-0.02em" }}>$1,854,200 <span style={{ fontSize: 14, color: "#4ade80" }}>↑</span></p>
          </div>
        </motion.div>

        {/* SVG chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 24px 0", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <svg viewBox={`0 0 ${W} ${H + 40}`} width="100%" style={{ display: "block", overflow: "visible" }}>
            {/* Grid lines */}
            {[0, 60, 120].map(y => (
              <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            ))}
            {/* Area fill */}
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#847dff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#847dff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${pathD} L ${points[points.length-1][0]} ${H} L ${points[0][0]} ${H} Z`}
              fill="url(#areaFill)"
            />
            {/* Line */}
            <path d={pathD} fill="none" stroke="#847dff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            {/* Dots + labels */}
            {points.map(([x,y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={5} fill="#847dff" />
                <circle cx={x} cy={y} r={9} fill="rgba(132,125,255,0.2)" />
                <text x={x} y={H + 22} textAnchor="middle" fontFamily="var(--font-body)" fontSize={9} fill="rgba(255,255,255,0.35)" letterSpacing="0.08em">
                  {labels[i]}
                </text>
                <text x={x} y={y - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="rgba(255,255,255,0.7)">
                  {values[i]}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          style={{ textAlign: "center", marginTop: 36 }}
        >
          <a
            href="/presupuesto"
            style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "11px 28px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
            }}
          >
            MÁS SOBRE PROYECCIÓN →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Final CTA Section (reemplaza CtaSection)
   ───────────────────────────────────────── */
function FinalCtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
        alt=""
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "120px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px", textAlign: "center" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(0,179,221,0.15)", border: "1px solid rgba(0,179,221,0.3)",
            borderRadius: 9999, padding: "7px 18px",
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 11,
            color: "var(--color-ocean-glimmer)", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-ocean-glimmer)", flexShrink: 0 }} />
            Sin tarjeta de crédito · Gratis para empezar
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(56px, 7vw, 96px)",
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          <em style={{ fontStyle: "italic" }}>Empieza</em> hoy.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 480, lineHeight: 1.7 }}
        >
          Tu primer presupuesto profesional listo en 3 minutos, con precios reales CMIC 2026 del estado donde construyes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          <a
            href="/presupuesto"
            style={{
              display: "inline-block",
              background: "#1a1a1a",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 16,
              padding: "16px 40px",
              borderRadius: 9999,
              textDecoration: "none",
              transition: "opacity 200ms",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            CREAR PRESUPUESTO GRATIS →
          </a>
        </motion.div>

        {/* CMIC + NTC badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}
        >
          {([
            { title: "CMIC", sub: "PRECIOS OFICIALES 2026" },
            { title: "NTC-RCDF", sub: "NORMATIVA VIGENTE 2023" },
          ] as const).map(badge => (
            <div key={badge.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden>
                <path d="M9 26 C9 26 2 20 2 12 C2 7 5 3.5 9 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M5.5 16 C3.5 13 3.5 10 6 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M6 21 C4 18.5 4 16 6.5 14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              </svg>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", lineHeight: 1.2 }}>{badge.title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{badge.sub}</div>
              </div>
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" style={{ transform: "scaleX(-1)" }} aria-hidden>
                <path d="M9 26 C9 26 2 20 2 12 C2 7 5 3.5 9 2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                <path d="M5.5 16 C3.5 13 3.5 10 6 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M6 21 C4 18.5 4 16 6.5 14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Page
   ───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SimplifySection />
        <TrackSection />
        <AskSection />
        <MonitorSection />
        <ToolsSection />
        <TestimonialsSection />
        <ForecastSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
