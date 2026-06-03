import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    eyebrow: 'Presupuestador Pro · CMIC 2026',
    title: '¿Sigues calculando en Excel y saliendo del presupuesto?',
    desc: 'El 78% de los proyectos de construcción en México superan el presupuesto inicial. ConstruIA elimina ese riesgo: genera automáticamente el desglose completo de partidas con precios CMIC 2026 diferenciados por estado, tres escenarios de costo comparativos y el PDF en formato LOPSRM listo para presentar a clientes y dependencias. De concepto a entregable profesional en 2 minutos.',
    cta: 'Generar mi primer presupuesto',
    href: '/presupuesto',
    imageLeft: false,
    bg: '#0a0a0a',
  },
  {
    eyebrow: 'Checklist de Permisos · 32 Estados',
    title: '¿Cuánto tiempo pierdes averiguando qué trámites necesitas?',
    desc: 'Cada estado tiene requisitos diferentes y las dependencias los cambian constantemente. ConstruIA mantiene actualizado el checklist oficial de licencias, dictámenes y visto buenos para los 32 estados — con los documentos exactos, las instancias correctas y el orden en que debes presentarlos. Arranca tu obra sin sorpresas.',
    cta: 'Ver checklist de mi estado',
    href: '/checklist',
    imageLeft: true,
    bg: '#111111',
  },
  {
    eyebrow: 'Copiloto IA · Normativa Mexicana',
    title: '¿Buscas respuestas técnicas que confías en manos del cliente?',
    desc: 'El Copiloto está entrenado en NTC-RCDF 2023, CMIC 2026, NTC-ANCE, LOPSRM y los reglamentos de construcción estatales. Calibres de cable por circuito, resistencias mínimas de concreto, factores de desperdicio por material, costos por metro cuadrado por región — respuestas de referencia normativa al instante, sin buscar en manuales.',
    cta: 'Hacer mi primera pregunta',
    href: '/agente',
    imageLeft: false,
    bg: '#0a0a0a',
  },
];

export function FeatureSections() {
  return (
    <div>
      {features.map((f, i) => {
        const isEven = i % 2 === 0;
        return (
          <motion.section
            key={f.eyebrow}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.01 }}
            style={{
              background: f.bg,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              overflowX: 'hidden',
            }}
          >
            <div style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '100px 40px',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'center',
              }}>
                {/* Text block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ order: f.imageLeft ? 1 : 0 }}
                >
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    color: '#C8973A',
                    marginBottom: '16px',
                  }}>
                    {f.eyebrow}
                  </p>
                  <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '48px',
                    fontWeight: 700,
                    color: '#ECECEC',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    maxWidth: '460px',
                    margin: 0,
                  }}>
                    {f.title}
                  </h2>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.60)',
                    lineHeight: 1.65,
                    margin: '20px 0 28px',
                  }}>
                    {f.desc}
                  </p>
                  <Link
                    href={f.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#C8973A',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {f.cta} →
                  </Link>
                </motion.div>

                {/* Image block */}
                <div style={{
                  order: f.imageLeft ? 0 : 1,
                  position: 'relative',
                  overflow: 'visible',
                }}>
                  <motion.div
                    initial={{ opacity: 0, y: -48, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                    style={{
                      marginTop: '-60px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
                      overflow: 'hidden',
                      aspectRatio: '16/10',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src="/dashboard-preview.jpg.jpg"
                      alt={f.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
