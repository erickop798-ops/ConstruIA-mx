'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const bullets = [
  'Presupuesto autom&#225;tico con precios CMIC 2026',
  'Checklist de permisos para los 32 estados',
  'Agente IA entrenado en construcci&#243;n mexicana',
];

export function DashboardSection() {
  return (
    <section
      style={{
        background: '#121212',
        padding: '120px 60px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '80px',
        }}
      >
        {/* ── Left: editorial text ── */}
        <div style={{ flex: '0 0 45%' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6e6e6e',
              marginBottom: '20px',
            }}
          >
            Plataforma
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.022em',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Todo tu flujo de obra en un solo lugar
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            Desde el primer croquis hasta la entrega final.
            ConstruIA centraliza presupuestos CMIC, listas
            de materiales, tr&#225;mites de permisos y el copiloto
            IA en una plataforma pensada para el mercado mexicano.
          </p>

          {/* Bullet points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
            {bullets.map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span
                  style={{
                    color: '#C8973A',
                    fontSize: '14px',
                    marginTop: '1px',
                    flexShrink: 0,
                  }}
                >
                  ✦
                </span>
                <span
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.70)',
                    lineHeight: 1.5,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Outline button */}
          <Link href="#herramientas" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '11px 24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
              }}
            >
              Ver todas las herramientas &#8594;
            </button>
          </Link>
        </div>

        {/* ── Right: dashboard image with perspective ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: '0 0 55%',
            perspective: '1000px',
          }}
        >
          <img
            src="/dashboard-preview.jpg.jpg"
            alt="Dashboard ConstruIA — vista de la plataforma"
            draggable={false}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '12px',
              boxShadow:
                '0 32px 64px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.06)',
              transform: 'rotateY(-3deg)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotateY(0deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateY(-3deg)';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
