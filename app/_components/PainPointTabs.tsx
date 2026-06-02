'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const tabs = [
  {
    question: '¿Te vas de presupuesto siempre?',
    answer: 'Controla partidas, cantidades y costos CMIC por estado. Detecta desvíos antes de que ocurran.',
  },
  {
    question: '¿Pierdes tiempo en trámites?',
    answer: 'Checklist completo para los 32 estados. Sabe exactamente qué presentar y en qué orden.',
  },
  {
    question: '¿Tu material siempre sale mal calculado?',
    answer: 'Lista exacta de insumos con factor de desperdicio incluido. Nunca te falte material.',
  },
  {
    question: '¿Sin respuestas normativas rápidas?',
    answer: 'Copiloto IA con NTC, CMIC y LOPSRM vigentes. Respuestas técnicas verificadas al instante.',
  },
];

export function PainPointTabs() {
  const [active, setActive] = useState(0);

  return (
    <section style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '100px 40px',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ marginBottom: '64px' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '12px',
          }}>
            SOLUCIONES
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 500,
            color: '#ECECEC',
            lineHeight: 1.1,
          }}>
            Respuestas para cada problema de obra.
          </h2>
        </motion.div>

        {/* Content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: '64px',
          alignItems: 'start',
        }}>

          {/* Left: tab list */}
          <div>
            {tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: active === i ? '24px 0 24px 18px' : '24px 0 24px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: active === i ? '2px solid #C8973A' : '2px solid transparent',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 500,
                  color: active === i ? '#ECECEC' : 'rgba(255,255,255,0.35)',
                  lineHeight: 1.3,
                  transition: 'color 0.2s',
                  margin: 0,
                }}>
                  {tab.question}
                </p>

                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.65,
                        marginTop: '10px',
                        marginBottom: 0,
                        overflow: 'hidden',
                      }}
                    >
                      {tab.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right: image */}
          <div style={{
            position: 'sticky',
            top: '100px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            height: '460px',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                <Image
                  src="/dashboard-preview.jpg.jpg"
                  alt={tabs[active].question}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
