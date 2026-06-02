'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const QUESTIONS = [
  '¿Cuánto cuesta construir 120m² en Tlaxcala?',
  '¿Qué permisos necesito para obra en Puebla?',
  '¿Cuánto material para losa de 50m²?',
  '¿Precio de columna de concreto armado?',
];

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const VH = 900;

export function HeroScrollSection({ containerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let active = true;
    let qIdx = 0;
    let charIdx = 0;
    let typing = true;
    function tick() {
      if (!active) return;
      const q = QUESTIONS[qIdx];
      if (typing) {
        if (charIdx < q.length) {
          charIdx++;
          setTypedText(q.slice(0, charIdx));
          timeout = setTimeout(tick, 45);
        } else {
          timeout = setTimeout(() => { typing = false; tick(); }, 1800);
        }
      } else {
        if (charIdx > 0) {
          charIdx--;
          setTypedText(q.slice(0, charIdx));
          timeout = setTimeout(tick, 25);
        } else {
          qIdx = (qIdx + 1) % QUESTIONS.length;
          timeout = setTimeout(() => { typing = true; tick(); }, 400);
        }
      }
    }
    tick();
    return () => { active = false; clearTimeout(timeout); };
  }, []);

  const { scrollY } = useScroll({ container: containerRef as React.RefObject<HTMLElement> });

  const rawLeftX  = useTransform(scrollY, [0, VH * 0.5], [0, -420]);
  const rawRightX = useTransform(scrollY, [0, VH * 0.5], [0,  420]);
  const leftX  = useSpring(rawLeftX,  { stiffness: 80, damping: 20 });
  const rightX = useSpring(rawRightX, { stiffness: 80, damping: 20 });

  const overlayOpacity = useTransform(scrollY, [0, VH * 0.28], [1, 0]);
  const arrowOpacity   = useTransform(scrollY, [0, VH * 0.08], [1, 0]);
  const chatOpacity    = useTransform(scrollY, [VH * 0.20, VH * 0.38], [0, 1]);
  const chatScale      = useTransform(scrollY, [VH * 0.20, VH * 0.38], [0.95, 1]);
  const chatYAnim      = useTransform(scrollY, [VH * 0.20, VH * 0.38], [24, 0]);

  return (
    <section ref={sectionRef} style={{ height: '200vh', position: 'relative', background: '#0a0a0a' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>

        {/* ── Left image half ── */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            clipPath: 'inset(0 50% 0 0)',
            x: leftX, zIndex: 2,
            overflow: 'hidden', background: '#0a0a0a',
          }}
        >
          <img
            src="/hero-casa.png"
            alt="Casa ConstruIA"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>

        {/* ── Right image half ── */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            clipPath: 'inset(0 0 0 50%)',
            x: rightX, zIndex: 2,
            overflow: 'hidden', background: '#0a0a0a',
          }}
        >
          <img
            src="/hero-casa.png"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>

        {/* ── Overlay: eyebrow + h1 + subtitle + CTA ── */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 4,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 24px', textAlign: 'center',
            opacity: overlayOpacity, pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', marginBottom: '20px', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
            Plataforma IA para Construcci&#243;n Mexicana
          </p>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '20px', textShadow: '0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)' }}>
            Deja el Excel.<br />Construye con IA.
          </h1>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.72)', maxWidth: '520px', lineHeight: 1.65, marginBottom: '32px', textShadow: '0 1px 20px rgba(0,0,0,0.9)' }}>
            Presupuesta en minutos con precios CMIC 2026,
            gestiona permisos de los 32 estados y deja que
            la IA haga el trabajo pesado.
          </p>
          <a
            href="/presupuesto"
            style={{ display: 'inline-block', padding: '14px 32px', background: '#C8973A', color: '#000', borderRadius: '100px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', pointerEvents: 'auto', transition: 'opacity 0.2s', marginBottom: '12px' }}
          >
            Crear mi presupuesto gratis &#8594;
          </a>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
            Sin registro &nbsp;&#183;&nbsp; Sin tarjeta de cr&#233;dito
          </p>
        </motion.div>

        {/* ── Bounce arrow ── */}
        <motion.div
          style={{ position: 'absolute', bottom: '40px', left: '50%', x: '-50%', zIndex: 11, opacity: arrowOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 13l7 7 7-7" stroke="rgba(255,255,255,0.60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* ── Floating chat widget ── */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, pointerEvents: 'none', width: 'min(720px, calc(100vw - 40px))' }}>
          <motion.div
            style={{ opacity: chatOpacity, scale: chatScale, y: chatYAnim, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >

            {/* A: Slogan */}
            <div style={{ fontSize: '22px', fontWeight: 300, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.08em', marginBottom: '20px', textAlign: 'center' }}>
              Presupuesta. Calcula. Construye.
            </div>

            {/* B: Input bar */}
            <div style={{ width: '100%', height: '64px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '32px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#C8973A" style={{ flexShrink: 0 }}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span style={{ flex: 1, fontSize: '16px', color: 'rgba(255,255,255,0.40)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {typedText}<span className="typewriter-cursor"/>
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#C8973A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* C: Subtext */}
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.28)', textAlign: 'center', marginTop: '14px' }}>
              Pregunta sobre tu obra &nbsp;&#183;&nbsp; Respuesta en segundos
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
