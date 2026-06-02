'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

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
    <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <p className="label" style={{ textAlign: 'center', marginBottom: '16px' }}>FAQ</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-1)', marginBottom: '48px', textAlign: 'center' }}>
          Preguntas frecuentes
        </h2>

        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: '1px solid var(--border)', padding: '22px 0', cursor: 'pointer' }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '17px',
                fontWeight: 500,
                color: 'var(--text-1)',
                lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <span style={{ flexShrink: 0, color: 'var(--text-3)', marginTop: '2px' }}>
                {open === i
                  ? <Minus size={16} strokeWidth={1.5} />
                  : <Plus size={16} strokeWidth={1.5} />
                }
              </span>
            </div>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'var(--text-2)', paddingTop: '14px' }}>
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
