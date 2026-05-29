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
    <section style={{ padding: '120px 60px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '80px',
      }}>

        {/* ── Left: editorial text (40%) ── */}
        <div style={{ flex: '0 0 40%' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6e6e6e', marginBottom: '20px' }}>
            Plataforma
          </p>
          <h2 style={{ fontSize: '56px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '20px' }}>
            <em className="serif-em">Todo</em> tu flujo de obra en un solo lugar
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, marginBottom: '32px' }}>
            Desde el primer croquis hasta la entrega final.
            ConstruIA centraliza presupuestos CMIC, listas
            de materiales, tr&#225;mites de permisos y el copiloto
            IA en una plataforma pensada para el mercado mexicano.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
            {bullets.map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: '#C8973A', fontSize: '16px', marginTop: '1px', flexShrink: 0 }}>✦</span>
                <span
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{ fontSize: '16px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
                />
              </div>
            ))}
          </div>

          <Link href="#herramientas" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '11px 24px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: '8px',
                color: '#C8973A',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,151,58,0.55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; }}
            >
              Ver todas las herramientas &#8594;
            </button>
          </Link>
        </div>

        {/* ── Right: device mockup (60%) ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: '0 0 55%', position: 'relative' }}
        >
          {/* Device frame */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
          }}>
            <img
              src="/dashboard-preview.jpg.jpg"
              alt="Dashboard ConstruIA — vista de la plataforma"
              draggable={false}
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          {/* Floating card — top right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', top: 0, right: 0,
              transform: 'translateX(30px) translateY(-20px)',
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              padding: '16px 20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 2,
              minWidth: '180px',
            }}
          >
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Presupuesto total</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#C8973A', lineHeight: 1 }}>$4,820,000</div>
          </motion.div>

          {/* Floating card — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0,
              transform: 'translateX(-30px) translateY(20px)',
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '14px',
              padding: '16px 20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              zIndex: 2,
              minWidth: '160px',
            }}
          >
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Proyectos activos</div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#ECECEC', lineHeight: 1, marginBottom: '4px' }}>31</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>esta semana</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
