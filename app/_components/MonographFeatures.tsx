import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    eyebrow: 'Presupuestador',
    question: '¿Sigues presupuestando en Excel?',
    desc: 'Genera presupuestos CMIC 2026 en menos de 2 minutos. Tres escenarios, PDF LOPSRM, sin fórmulas ni errores.',
    cta: 'Ver Presupuestador',
    href: '/presupuesto',
    reverse: false,
    bg: '#ffffff',
  },
  {
    eyebrow: 'Checklist de Trámites',
    question: '¿Confundido con los trámites?',
    desc: 'Checklist actualizado para los 32 estados. Requisitos exactos por dependencia. Sin buscar en internet.',
    cta: 'Ver Checklist',
    href: '/checklist',
    reverse: true,
    bg: '#ebede9',
  },
  {
    eyebrow: 'Copiloto IA',
    question: '¿Tus preguntas técnicas sin respuesta?',
    desc: 'Copiloto IA con NTC-RCDF 2023, CMIC y LOPSRM. Calibres, resistencias, costos por m² en segundos.',
    cta: 'Ver Copiloto IA',
    href: '/agente',
    reverse: false,
    bg: '#ffffff',
  },
];

export function MonographFeatures() {
  return (
    <>
      {features.map((f) => (
        <section key={f.question} style={{ background: f.bg, padding: '0 5.2rem' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '5rem 0' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '5rem',
              alignItems: 'center',
            }}>
              {/* Text */}
              <div style={{
                order: f.reverse ? 1 : 0,
                maxWidth: '24.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  marginBottom: '1rem',
                  fontWeight: 400,
                }}>
                  {f.eyebrow}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '3rem',
                  fontWeight: 600,
                  lineHeight: '112.5%',
                  color: '#2c2d2a',
                  marginBottom: '1rem',
                }}>
                  {f.question}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontWeight: 400,
                }}>
                  {f.desc}
                </p>
                <Link href={f.href} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#2c2d2a',
                  letterSpacing: '0.375px',
                  textDecoration: 'none',
                  padding: '0.25rem 0',
                  lineHeight: 1,
                  display: 'inline-block',
                  transition: 'opacity 0.2s',
                }}>
                  {f.cta} →
                </Link>
              </div>

              {/* Image */}
              <div style={{
                order: f.reverse ? 0 : 1,
                borderRadius: '8px',
                overflow: 'hidden',
              }}>
                <Image
                  src="/dashboard-preview.jpg.jpg"
                  alt={f.question}
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
