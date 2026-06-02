import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    eyebrow: 'PRESUPUESTADOR PRO',
    title: '¿Sigues presupuestando en Excel?',
    desc: 'Genera presupuestos CMIC 2026 completos en menos de 2 minutos. Tres escenarios comparativos — Económico, Estándar y Premium — con PDF LOPSRM listo para entregar. Sin fórmulas, sin errores, sin horas perdidas.',
    cta: 'Ver Presupuestador',
    href: '/presupuesto',
    imageLeft: false,
  },
  {
    eyebrow: 'CHECKLIST DE PERMISOS',
    title: '¿Confundido con los trámites de tu estado?',
    desc: 'Requisitos actualizados para los 32 estados de México. Licencia de construcción, dictamen de uso de suelo, visto bueno de Protección Civil. Sabe exactamente qué presentar y dónde. Sin buscar en internet.',
    cta: 'Ver Checklist',
    href: '/checklist',
    imageLeft: true,
  },
  {
    eyebrow: 'COPILOTO IA',
    title: '¿Tus preguntas técnicas sin respuesta inmediata?',
    desc: 'El Copiloto conoce el NTC-RCDF 2023, CMIC 2026, NTC-ANCE y LOPSRM. Pregunta calibres de cable, resistencias mínimas de concreto, factores de desperdicio o costos por m². Respuesta técnica verificada en segundos.',
    cta: 'Ver Copiloto IA',
    href: '/agente',
    imageLeft: false,
  },
];

export function FeatureSections() {
  return (
    <div style={{ background: '#0a0a0a' }}>
      {features.map((f, i) => (
        <section
          key={f.eyebrow}
          style={{
            borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '100px 40px',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
              }}
            >
              {/* Text block */}
              <div style={{ order: f.imageLeft ? 1 : 0 }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '12px',
                }}>
                  {f.eyebrow}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '48px',
                  fontWeight: 500,
                  color: '#ECECEC',
                  lineHeight: 1.1,
                  maxWidth: '460px',
                  marginBottom: '0',
                }}>
                  {f.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                  margin: '20px 0 28px',
                }}>
                  {f.desc}
                </p>
                <Link
                  href={f.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#C8973A',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {f.cta} →
                </Link>
              </div>

              {/* Image block */}
              <div style={{
                order: f.imageLeft ? 0 : 1,
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                aspectRatio: '16/10',
                position: 'relative',
              }}>
                <Image
                  src="/dashboard-preview.jpg.jpg"
                  alt={f.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
