'use client';
import { Fragment } from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    icon: '🏠',
    title: 'Describe tu proyecto',
    desc: 'Tipo de obra, superficie, estado y nivel de acabados. En menos de 2 minutos.',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
    border: 'rgba(96,165,250,0.25)',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'La IA genera todo',
    desc: 'Presupuesto CMIC 2026, lista de materiales, checklist de permisos y análisis de 3 escenarios de costo.',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.12)',
    border: 'rgba(167,139,250,0.25)',
  },
  {
    num: '03',
    icon: '📄',
    title: 'Descarga y gestiona',
    desc: 'PDF profesional LOPSRM, Excel editable y acceso al Copiloto IA para ajustes en tiempo real.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.12)',
    border: 'rgba(52,211,153,0.25)',
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: '100px 40px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
        Proceso
      </p>
      <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '16px' }}>
        <em className="serif-em">Tres pasos.</em> Tu presupuesto listo.
      </h2>
      <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 60px' }}>
        Sin curva de aprendizaje. Sin Excel. Sin errores de cálculo manual.
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '960px', margin: '0 auto' }}>
        {STEPS.map((step, i) => (
          <Fragment key={step.num}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}
            >
              <div style={{ fontSize: '48px', fontWeight: 800, color: step.color, lineHeight: 1, marginBottom: '20px', opacity: 0.9 }}>
                {step.num}
              </div>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: step.bg, border: `1px solid ${step.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', marginBottom: '20px',
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ECECEC', marginBottom: '12px' }}>{step.title}</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, textAlign: 'center' }}>{step.desc}</p>
            </motion.div>

            {i < STEPS.length - 1 && (
              <div style={{
                flexShrink: 0, width: '48px', height: '1px',
                marginTop: '82px',
                background: `linear-gradient(to right, ${step.color}, ${STEPS[i + 1].color})`,
                opacity: 0.4,
              }}/>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
