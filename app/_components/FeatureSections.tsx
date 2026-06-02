import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    eyebrow: 'PRESUPUESTADOR PRO · CMIC 2026',
    title: '¿Sigues calculando en Excel y saliendo del presupuesto?',
    desc: 'El 78% de los proyectos de construcción en México superan el presupuesto inicial. ConstruIA elimina ese riesgo: genera automáticamente el desglose completo de partidas con precios CMIC 2026 diferenciados por estado, tres escenarios de costo comparativos y el PDF en formato LOPSRM listo para presentar a clientes y dependencias. De concepto a entregable profesional en 2 minutos.',
    cta: 'Generar mi primer presupuesto',
    href: '/presupuesto',
    imageLeft: false,
  },
  {
    eyebrow: 'CHECKLIST DE PERMISOS · 32 ESTADOS',
    title: '¿Cuánto tiempo pierdes averiguando qué trámites necesitas?',
    desc: 'Cada estado tiene requisitos diferentes y las dependencias los cambian constantemente. ConstruIA mantiene actualizado el checklist oficial de licencias, dictámenes y visto buenos para los 32 estados — con los documentos exactos, las instancias correctas y el orden en que debes presentarlos. Arranca tu obra sin sorpresas.',
    cta: 'Ver checklist de mi estado',
    href: '/checklist',
    imageLeft: true,
  },
  {
    eyebrow: 'COPILOTO IA · NORMATIVA MEXICANA',
    title: '¿Buscas respuestas técnicas que confías en manos del cliente?',
    desc: 'El Copiloto está entrenado en NTC-RCDF 2023, CMIC 2026, NTC-ANCE, LOPSRM y los reglamentos de construcción estatales. Calibres de cable por circuito, resistencias mínimas de concreto, factores de desperdicio por material, costos por metro cuadrado por región — respuestas verificadas y citadas al instante, sin buscar en manuales.',
    cta: 'Hacer mi primera pregunta',
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
