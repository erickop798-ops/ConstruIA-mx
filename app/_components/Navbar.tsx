"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const NAV_LINKS = [
  { label: "Herramientas", href: "/#herramientas" },
  { label: "Precios",      href: "/#precios" },
  { label: "Nosotros",     href: "/#nosotros" },
  { label: "FAQ",          href: "/#faq" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(15,16,17,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        transition: "background 300ms, border-color 300ms, backdrop-filter 300ms",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "22px",
            color: "var(--color-ghost-white)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          CONSTRUIA
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            listStyle: "none",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "var(--color-subtle-ash)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
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

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="/presupuesto"
            className="hidden md:inline-flex"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.05em",
              color: "#fff",
              background: "#1a1a1a",
              padding: "10px 20px",
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
            INICIAR PRESUPUESTO →
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "#fff",
                  transition: "transform 250ms, opacity 250ms",
                  transform:
                    menuOpen && i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : menuOpen && i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: "hidden",
              background: "rgba(15,16,17,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: "20px 40px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "var(--color-subtle-ash)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/presupuesto"
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#fff",
                    background: "#1a1a1a",
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                  }}
                >
                  INICIAR PRESUPUESTO →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
