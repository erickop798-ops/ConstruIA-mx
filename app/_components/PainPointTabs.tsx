'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const tabs = [
  {
    question: '¿Siempre terminas gastando más de lo que presupuestaste?',
    answer: 'El Presupuestador usa precios CMIC 2026 reales por estado. Antes de iniciar obra ya sabes el costo aproximado en tres escenarios — económico, estándar y premium — para que puedas tomar decisiones con información real, no con estimados a ojo.',
  },
  {
    question: '¿Pierdes semanas averiguando qué trámite va primero?',
    answer: 'El Checklist organiza los requisitos por dependencia y en el orden correcto de presentación para tu estado. Saber qué pedir, dónde y cuándo puede ser la diferencia entre iniciar obra en 2 semanas o en 3 meses.',
  },
  {
    question: '¿Tu lista de materiales nunca cuadra con lo que realmente usas en obra?',
    answer: 'La Calculadora estima las cantidades de cada insumo incluyendo el factor de desperdicio por tipo de material. Es un punto de partida sólido para tu orden de compra, basado en los rendimientos estándar del CMIC.',
  },
  {
    question: '¿Buscas en varios manuales para responder una pregunta técnica?',
    answer: 'El Copiloto consulta NTC-RCDF 2023, CMIC 2026, NTC-ANCE y LOPSRM para darte una respuesta de referencia en segundos. Úsala como punto de partida y verifica siempre con el especialista responsable del proyecto.',
  },
];

export function PainPointTabs() {
  const [active, setActive] = useState(0);

  return (
    <section style={{
      background: '#0d1117',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
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
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: '#C8973A',
            marginBottom: '16px',
          }}>
            ENCUENTRA TU SOLUCIÓN
          </p>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '48px',
            fontWeight: 700,
            color: '#ECECEC',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Cada problema de obra<br />tiene una respuesta aquí.
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
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px',
                  fontWeight: 600,
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
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16px',
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
