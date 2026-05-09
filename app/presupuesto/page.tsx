"use client";

import { motion } from "framer-motion";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function PresupuestoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(to bottom, #0f1011 0%, #0d1a2e 60%, #0f1011 100%)",
            position: "relative",
            overflow: "hidden",
            padding: "120px 40px 80px",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(132,125,255,0.08) 0%, transparent 60%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            style={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-violet-haze)",
                background: "rgba(132,125,255,0.15)",
                border: "1px solid rgba(132,125,255,0.3)",
                borderRadius: "9999px",
                padding: "6px 16px",
              }}
            >
              Herramienta Principal
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(40px, 7vw, 56px)",
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Presupuestador
              <br />
              Profesional
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "16px",
                color: "var(--color-subtle-ash)",
                maxWidth: "460px",
                lineHeight: 1.65,
              }}
            >
              Genera presupuestos paramétricos por tipología de obra, estado y calidad de acabados.
            </p>
          </motion.div>
        </section>

        {/* Under construction */}
        <section
          style={{
            background: "var(--color-midnight-ink)",
            padding: "100px 40px",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "var(--color-violet-haze)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              📊
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "28px",
                color: "#fff",
              }}
            >
              Herramienta en construcción
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "15px",
                color: "var(--color-subtle-ash)",
                lineHeight: 1.65,
              }}
            >
              Estamos configurando el motor de cálculo CEICO-CMIC 2026 con los 33 estados. Vuelve pronto.
            </p>
            <a
              href="/"
              style={{
                background: "#fff",
                color: "#000",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "14px",
                padding: "12px 28px",
                borderRadius: "8px",
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
              ← Volver al inicio
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
