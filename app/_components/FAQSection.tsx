'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: '¿Los precios CMIC son reales y actualizados?',
    a: 'Sí. ConstruIA utiliza el catálogo CEICO-CMIC 2026 oficialmente publicado, actualizado cada trimestre. Aplicamos el índice FIC SICT 2025 por estado para que el precio refleje el costo real de tu región, no un promedio nacional.',
  },
  {
    q: '¿Funciona para cualquier tipo de obra?',
    a: 'ConstruIA cubre vivienda unifamiliar, edificios multifamiliares, locales comerciales, oficinas, naves industriales y remodelaciones. El sistema adapta partidas y materiales según el tipo de proyecto seleccionado.',
  },
  {
    q: '¿El PDF tiene formato LOPSRM oficial?',
    a: 'El plan Pro genera un PDF con estructura LOPSRM lista para presentar ante dependencias gubernamentales, incluyendo número de partida, descripción, unidad, cantidad, precio unitario y totales con y sin IVA.',
  },
  {
    q: '¿Mis datos de proyecto están seguros?',
    a: 'Todos los datos se transmiten con cifrado TLS 1.3 y se almacenan en servidores con certificación SOC 2. No compartimos información de proyectos con terceros bajo ninguna circunstancia.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin penalizaciones ni períodos mínimos. Cancelas desde tu panel en cualquier momento y conservas acceso hasta el final del período ya pagado. La factura se emite automáticamente.',
  },
  {
    q: '¿El checklist de permisos está actualizado para mi estado?',
    a: 'Cubrimos los 32 estados de México con requisitos actualizados a 2025 para obra nueva, remodelación y uso de suelo. Incluimos links directos a las dependencias correspondientes en cada estado.',
  },
  {
    q: '¿Necesito saber de software para usar ConstruIA?',
    a: 'No. Si sabes usar WhatsApp, puedes usar ConstruIA. El wizard de presupuesto toma menos de 2 minutos y no requiere conocimientos técnicos de software. El Copiloto IA te guía en cada paso.',
  },
  {
    q: '¿Cómo se compara con contratar un presupuestador?',
    a: 'Un presupuestador profesional cobra entre $3,000 y $15,000 MXN por proyecto y tarda 3 a 7 días. ConstruIA genera el mismo resultado en menos de 2 minutos por $299/mes para proyectos ilimitados.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: '100px 40px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', textAlign: 'center' }}>
          FAQ
        </p>
        <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '48px', textAlign: 'center' }}>
          Preguntas frecuentes
        </h2>

        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', padding: '20px 0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                background: 'none', border: 'none', cursor: 'pointer', gap: '16px',
                textAlign: 'left', color: 'inherit', fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: '17px', fontWeight: 600, color: '#ECECEC', lineHeight: 1.4 }}>{faq.q}</span>
              <span style={{ color: '#C8973A', fontSize: '22px', flexShrink: 0, lineHeight: 1, marginTop: '2px', fontWeight: 300 }}>
                {open === i ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.60)', paddingBottom: '20px' }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
