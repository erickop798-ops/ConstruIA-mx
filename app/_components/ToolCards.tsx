'use client';
import { motion } from 'framer-motion';
import { Calculator, Package, ClipboardCheck, Home, MessageSquare, BookOpen } from 'lucide-react';

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(200,151,58,0.08)',
  border: '1px solid rgba(200,151,58,0.15)',
  borderRadius: '16px',
  padding: '32px 28px',
  display: 'flex',
  flexDirection: 'column',
};

const STAT_NUM: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '18px',
  fontWeight: 700,
  color: '#ECECEC',
  display: 'block',
  textAlign: 'center',
};

const STAT_LABEL: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '12px',
  color: 'rgba(255,255,255,0.40)',
  marginTop: '4px',
  display: 'block',
  textAlign: 'center',
};

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ flex: 1, padding: '0 12px', textAlign: 'center' }}>
      <span style={STAT_NUM}>{num}</span>
      <span style={STAT_LABEL}>{label}</span>
    </div>
  );
}

const CARDS = [
  {
    icon: <Calculator size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Presupuestador Pro',
    desc: 'Genera presupuestos CMIC 2026 con partidas reales, tres escenarios de costo y PDF LOPSRM en menos de 2 minutos.',
    cta: 'Crear presupuesto →',
    href: '/presupuesto',
    stats: [
      { num: '+67%', label: 'Menos tiempo' },
      { num: '3', label: 'Escenarios' },
      { num: 'PDF', label: 'LOPSRM listo' },
    ],
  },
  {
    icon: <Package size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Calculadora de Materiales',
    desc: 'Lista exacta de insumos con cantidades precisas y factor de desperdicio incluido por tipo de material y obra.',
    cta: 'Calcular materiales →',
    href: '/materiales',
    stats: [
      { num: '86', label: 'Insumos' },
      { num: '+10%', label: 'Desperdicio' },
      { num: '8', label: 'Tipos de obra' },
    ],
  },
  {
    icon: <ClipboardCheck size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Checklist de Permisos',
    desc: 'Requisitos actualizados para licencias en los 32 estados. Documentos, instancias y orden de presentación.',
    cta: 'Ver mi estado →',
    href: '/checklist',
    stats: [
      { num: '32', label: 'Estados' },
      { num: '100%', label: 'Actualizado' },
      { num: '3', label: 'Tipos obra' },
    ],
  },
  {
    icon: <Home size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Simulador de Remodelación',
    desc: 'Estima costos reales por espacio y nivel de acabado. Cocina, baño, sala, fachada — en segundos.',
    cta: 'Simular remodelación →',
    href: '/simulador',
    stats: [
      { num: '$45k', label: 'Costo promedio' },
      { num: '3-4', label: 'Semanas est.' },
      { num: '6', label: 'Espacios' },
    ],
  },
  {
    icon: <MessageSquare size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Copiloto IA',
    desc: 'Respuestas técnicas verificadas con NTC-RCDF 2023, CMIC 2026, NTC-ANCE y LOPSRM. Al instante, sin buscar manuales.',
    cta: 'Hacer una pregunta →',
    href: '/agente',
    stats: [
      { num: '< 3s', label: 'Respuesta' },
      { num: 'NTC', label: 'Verificado' },
      { num: '∞', label: 'Consultas Pro' },
    ],
  },
  {
    icon: <BookOpen size={28} color="rgba(200,151,58,0.8)" strokeWidth={1.5} />,
    name: 'Asistente de Tesis',
    desc: 'Marco normativo, estado del arte y redacción académica en APA 7 con normativa vigente. Para arquitectura e ingeniería.',
    cta: 'Generar capítulo →',
    href: '/tesis',
    stats: [
      { num: 'APA 7', label: 'Formato' },
      { num: 'NTC', label: '2023' },
      { num: '0%', label: 'Plagio est.' },
    ],
  },
];

export function ToolCards() {
  return (
    <section style={{
      background: '#111111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 40px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '0.06em',
            color: '#C8973A',
            display: 'block',
            marginBottom: '16px',
          }}>
            Únete a los mejores
          </span>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '52px',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#ECECEC',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            847 arquitectos e ingenieros usan ConstruIA para trabajar más inteligente
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.07 }}
              style={CARD_STYLE}
            >
              {/* Top */}
              <div style={{ flex: 1 }}>
                {card.icon}
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#ECECEC',
                  marginTop: '16px',
                  marginBottom: '10px',
                }}>
                  {card.name}
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {card.desc}
                </p>
                <a
                  href={card.href}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#C8973A',
                    textDecoration: 'none',
                    marginTop: '16px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {card.cta}
                </a>
              </div>

              {/* Separator */}
              <div style={{
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
                margin: '24px 0',
              }} />

              {/* Stats row */}
              <div style={{
                display: 'flex',
                alignItems: 'stretch',
              }}>
                {card.stats.map((s, si) => (
                  <div key={s.label} style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: si > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    padding: '0 12px',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={STAT_NUM}>{s.num}</span>
                      <span style={STAT_LABEL}>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
