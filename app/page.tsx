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
    bg: "#847dff",
    textColor: "#000",
    tag: "HERRAMIENTA PRINCIPAL",
    title: "Presupuestador Profesional",
    description:
      "5 pasos. Precios CMIC 2026 con factores por estado. Tres escenarios: económico, estándar y premium.",
    href: "/presupuesto",
    watermark: "$1,112,100",
  },
  {
    bg: "#00b3dd",
    textColor: "#000",
    tag: "REMODELACIÓN",
    title: "Simulador de Remodelación",
    description:
      "Describe tu proyecto en lenguaje natural. El agente IA hace máximo 3 preguntas y genera el estimado.",
    href: "/simulador",
    badge: "IA INCLUIDA",
  },
  {
    bg: "#d1c9ff",
    textColor: "#000",
    tag: "ASISTENTE IA",
    title: "Agente ConstruIA",
    description:
      "Tu copiloto de construcción disponible 24/7. Preguntas sobre normas, materiales, costos y procesos constructivos.",
    href: "/agente",
    badge: "CLAUDE HAIKU",
  },
  {
    bg: "#90b8f0",
    textColor: "#000",
    tag: "EDUCACIÓN",
    title: "Tesis y Academia",
    description:
      "Estructura tesis de arquitectura e ingeniería. NTC-RCDF 2023, LOPSRM, memorias de cálculo incluidas.",
    href: "/tesis",
    badge: "ACADÉMICO",
  },
  {
    bg: "#dd90d8",
    textColor: "#000",
    tag: "DATOS REGIONALES",
    title: "Precios por Estado",
    description:
      "Precios unitarios actualizados en los 33 estados de México. Factores FIC SICT 2025 diferenciados por región.",
    href: "/precios",
    watermark: "33",
  },
  {
    bg: "#4b49aa",
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
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format"
          alt=""
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      {/* Overlay gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(10,12,16,0.3) 0%, rgba(10,12,16,0.5) 50%, rgba(10,12,16,0.7) 100%)",
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
              display: "inline-block",
              background: "rgba(0,179,221,0.15)",
              border: "1px solid rgba(0,179,221,0.3)",
              borderRadius: "9999px",
              padding: "7px 18px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "11px",
              color: "var(--color-ocean-glimmer)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Copiloto Arquitectónico para México
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
              background: "#fff",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "16px",
              padding: "14px 36px",
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
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "9999px",
              padding: "6px 6px 6px 32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
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
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 200ms",
                color: "#fff",
                fontSize: "18px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.32)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.2)")
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
          {(["CMIC 2026", "NTC-RCDF 2023"] as const).map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Left laurel */}
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden>
                <path d="M7 18 C7 18 2 14 2 9 C2 5.5 4 3 7 2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M4.5 11.5 C3 9.5 3 7.5 5 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none"/>
                <path d="M5 15 C3.5 13 3.5 11 5 9.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {label}
              </span>
              {/* Right laurel (mirrored) */}
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ transform: "scaleX(-1)" }} aria-hidden>
                <path d="M7 18 C7 18 2 14 2 9 C2 5.5 4 3 7 2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
                <path d="M4.5 11.5 C3 9.5 3 7.5 5 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none"/>
                <path d="M5 15 C3.5 13 3.5 11 5 9.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none"/>
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
        background: "#0f1011",
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
        background: "#0f1011",
        padding: "0 40px 120px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "var(--color-deep-indigo)",
          borderRadius: "30px",
          padding: "80px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Overlay glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(132,125,255,0.1)",
            borderRadius: "30px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#fff",
              lineHeight: 1.1,
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
              color: "var(--color-lavender-mist)",
              lineHeight: 1.65,
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
              fontWeight: 500,
              fontSize: "16px",
              padding: "14px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "opacity 200ms",
              marginTop: "8px",
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
        </div>
      </motion.div>
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
        <ToolsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
