const FOOTER_COLS = [
  {
    heading: "Herramientas",
    links: [
      { label: "Presupuestador Pro",        href: "/presupuesto" },
      { label: "Calculadora de Materiales", href: "/materiales" },
      { label: "Checklist de Permisos",     href: "/checklist" },
      { label: "Simulador Remodelación",    href: "/simulador" },
      { label: "Agente ConstruIA",          href: "/agente" },
    ],
  },
  {
    heading: "Recursos",
    links: [
      { label: "Normativa CMIC",  href: "#" },
      { label: "Datos SICT",      href: "#" },
      { label: "NTC-RCDF",        href: "#" },
      { label: "CENAPRED",        href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Aviso de Privacidad",    href: "#" },
      { label: "Términos y Condiciones", href: "#" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "60px 40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "40px",
            paddingBottom: "40px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "32px",
                color: "#fff",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              CONSTRUIA
            </a>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "12px",
                color: "var(--color-whisper-blue)",
                lineHeight: 1.6,
              }}
            >
              © 2026 ConstruIA.mx
              <br />
              Hecho en México 🇲🇽
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div
              key={col.heading}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-subtle-ash)",
                }}
              >
                {col.heading}
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "var(--color-subtle-ash)",
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "#fff")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "var(--color-subtle-ash)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "12px",
              color: "var(--color-whisper-blue)",
            }}
          >
            Precios de referencia CEICO-CMIC 2026 · Sin IVA
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: "11px",
              color: "var(--color-whisper-blue)",
            }}
          >
            v2.1.0 · Motor MotorNeodata
          </p>
        </div>
      </div>
    </footer>
  );
}
