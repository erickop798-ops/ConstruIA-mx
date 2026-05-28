'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Baseline viewport height for pixel-based transforms.
// At 900 px the animation uses this range exactly; on taller/shorter
// viewports the pacing scales proportionally—still looks correct.
const VH = 900;

export function HeroScrollSection({ containerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use scrollY (real scrollTop px) directly — more reliable than the
  // normalised scrollYProgress when the container is position:fixed.
  const { scrollY } = useScroll({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    container: containerRef as any,
  });

  // Image split — completes over the first 50 % of the hero scroll range
  const rawLeftX  = useTransform(scrollY, [0, VH * 0.5], [0, -420]);
  const rawRightX = useTransform(scrollY, [0, VH * 0.5], [0,  420]);
  const leftX  = useSpring(rawLeftX,  { stiffness: 80, damping: 20 });
  const rightX = useSpring(rawRightX, { stiffness: 80, damping: 20 });

  // Overlay fades out in the first 28 % of scroll
  const overlayOpacity = useTransform(scrollY, [0, VH * 0.28], [1, 0]);
  // Arrow disappears on the very first movement
  const arrowOpacity   = useTransform(scrollY, [0, VH * 0.08], [1, 0]);
  // Chat widget: appears when halves are ~40 % through their split
  const chatOpacity    = useTransform(scrollY, [VH * 0.20, VH * 0.38], [0, 1]);
  const chatScale      = useTransform(scrollY, [VH * 0.20, VH * 0.38], [0.9, 1]);
  const chatYAnim      = useTransform(scrollY, [VH * 0.20, VH * 0.38], [20, 0]);

  return (
    <section ref={sectionRef} style={{ height: '200vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#121212',
        }}
      >
        {/* ── Left image half ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(0 50% 0 0)',
            x: leftX,
            zIndex: 2,
          }}
        >
          <img
            src="/hero-casa.png.png"
            alt="Casa ConstruIA"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>

        {/* ── Right image half ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(0 0 0 50%)',
            x: rightX,
            zIndex: 2,
          }}
        >
          <img
            src="/hero-casa.png.png"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>

        {/* ── Overlay: eyebrow + serif title + subtitle + CTA + subtext ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
            opacity: overlayOpacity,
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(200,151,58,0.85)',
              marginBottom: '20px',
              textShadow: '0 1px 8px rgba(0,0,0,0.9)',
            }}
          >
            Plataforma IA para Construcci&#243;n Mexicana
          </p>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '20px',
              textShadow: '0 2px 32px rgba(0,0,0,0.95)',
            }}
          >
            Tu obra m&#225;s rentable<br />empieza aqu&#237;
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: '520px',
              lineHeight: 1.65,
              marginBottom: '32px',
              textShadow: '0 1px 12px rgba(0,0,0,0.95)',
            }}
          >
            Presupuesta en minutos con precios CMIC 2026,
            gestiona permisos de los 32 estados y deja que
            la IA haga el trabajo pesado.
          </p>
          <a
            href="/presupuesto"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#C8973A',
              color: '#000',
              borderRadius: '100px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              pointerEvents: 'auto',
              transition: 'opacity 0.2s',
              marginBottom: '12px',
            }}
          >
            Crear mi presupuesto gratis &#8594;
          </a>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.04em',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            Sin registro &nbsp;&#183;&nbsp; Sin tarjeta de cr&#233;dito
          </p>
        </motion.div>

        {/* ── Bounce arrow ── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            x: '-50%',
            zIndex: 6,
            opacity: arrowOpacity,
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 13l7 7 7-7"
              stroke="rgba(255,255,255,0.60)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── Chat widget — appears through the gap as image splits ── */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            pointerEvents: 'none',
            width: '340px',
          }}
        >
          <motion.div
            style={{
              opacity: chatOpacity,
              scale: chatScale,
              y: chatYAnim,
              background: 'rgba(18,18,18,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '16px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#C8973A">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px', flex: 1 }}>
                Copiloto IA
              </span>
              <span
                style={{
                  fontSize: '10px',
                  color: '#C8973A',
                  border: '1px solid rgba(200,151,58,0.40)',
                  borderRadius: '4px',
                  padding: '2px 7px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                Claude
              </span>
            </div>

            {/* User bubble */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div
                style={{
                  background: '#2a2a2a',
                  borderRadius: '12px 12px 4px 12px',
                  padding: '9px 13px',
                  maxWidth: '90%',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.45,
                }}
              >
                &#191;Cu&#225;nto cuesta construir 120m&#178; en Tlaxcala?
              </div>
            </div>

            {/* IA bubble */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  background: '#1e1e1e',
                  border: '1px solid rgba(200,151,58,0.18)',
                  borderRadius: '12px 12px 12px 4px',
                  padding: '12px 14px',
                  width: '100%',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 1.45,
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  Para 120m&#178; en Tlaxcala, escenario est&#225;ndar:
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(200,151,58,0.28)',
                    marginBottom: '8px',
                  }}
                />
                {(
                  [
                    ['Económico', '$1,824,000', false],
                    ['Estándar',  '$2,280,000', true],
                    ['Premium',        '$3,120,000', false],
                  ] as [string, string, boolean][]
                ).map(([label, value, gold]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        color: gold ? '#C8973A' : 'rgba(255,255,255,0.50)',
                        fontWeight: gold ? 600 : 400,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        color: gold ? '#C8973A' : 'rgba(255,255,255,0.50)',
                        fontWeight: gold ? 700 : 400,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.03em',
                  }}
                >
                  Basado en CMIC 2026 &nbsp;&#183;&nbsp; Tlaxcala
                </div>
              </div>
            </div>

            {/* Input bar — visual only */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.28)',
                }}
              >
                Pregunta sobre tu proyecto...
              </span>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(200,151,58,0.15)',
                  border: '1px solid rgba(200,151,58,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="#C8973A" strokeWidth="2.5" strokeLinecap="round" />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="#C8973A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
