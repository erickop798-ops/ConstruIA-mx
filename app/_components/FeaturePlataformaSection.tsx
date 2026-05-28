'use client';
import { motion } from 'framer-motion';

const GREEN  = '#34d399';
const GREENA = 'rgba(52,211,153,0.6)';
const GREENB = 'rgba(52,211,153,0.15)';
const GREENC = 'rgba(52,211,153,0.3)';

const CARD: React.CSSProperties = {
  background: 'rgba(16,185,129,0.06)',
  border: '1px solid rgba(16,185,129,0.20)',
  borderRadius: '24px',
  padding: '48px 56px',
  maxWidth: '1100px',
  margin: '0 auto',
};

const TAG: React.CSSProperties = {
  padding: '5px 16px',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '20px',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.5)',
  fontWeight: 500,
};

type StageStatus = 'done' | 'active' | 'pending';

interface Stage {
  name: string;
  pct: number;
  subData: string;
  badge: string;
  status: StageStatus;
}

const STAGES: Stage[] = [
  { name: 'Anteproyecto',        pct: 100, subData: '',                               badge: 'Completado',  status: 'done'    },
  { name: 'Presupuesto CMIC',    pct: 100, subData: '$2,340,000 · 24 partidas',       badge: 'Completado',  status: 'done'    },
  { name: 'Permisos',            pct: 100, subData: 'Licencia · Estructural · Uso suelo', badge: 'Completado', status: 'done' },
  { name: 'Cimentación',         pct: 75,  subData: 'Semana 3 de 4',                  badge: 'En proceso',  status: 'active'  },
  { name: 'Estructura',          pct: 0,   subData: 'Inicio estimado: 2 jun',         badge: 'Pendiente',   status: 'pending' },
  { name: 'Acabados y entrega',  pct: 0,   subData: 'Estimado: 15 ago',               badge: 'Pendiente',   status: 'pending' },
];

function badgeStyles(status: StageStatus): React.CSSProperties {
  if (status === 'done')    return { color: GREEN, background: 'transparent', border: 'none' };
  if (status === 'active')  return { color: GREEN, background: GREENB, border: `1px solid ${GREENC}`, padding: '2px 10px', borderRadius: '20px' };
  return { color: 'rgba(255,255,255,0.3)', background: 'transparent', border: 'none' };
}

function dotStyle(status: StageStatus): React.CSSProperties {
  if (status === 'done')    return { background: GREEN, border: `2px solid ${GREEN}` };
  if (status === 'active')  return { background: GREEN, border: `2px solid ${GREEN}`, animation: 'dot-pulse 1.5s ease infinite' };
  return { background: 'transparent', border: '2px solid rgba(255,255,255,0.2)' };
}

function lineColor(status: StageStatus, nextStatus: StageStatus): string {
  if (status === 'done' && nextStatus === 'active') return `linear-gradient(to bottom, ${GREENA}, rgba(255,255,255,0.08))`;
  if (status === 'done') return GREENA;
  return 'rgba(255,255,255,0.08)';
}

function TimelineStage({ stage, isLast, index }: { stage: Stage; isLast: boolean; index: number }) {
  const delay = index * 0.12;
  const nextStatus = !isLast ? STAGES[index + 1].status : 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'flex', gap: '14px' }}
    >
      {/* Dot + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '16px', flexShrink: 0 }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, ...dotStyle(stage.status) }}/>
        {!isLast && (
          <div style={{ flex: 1, width: '2px', minHeight: '24px', background: lineColor(stage.status, nextStatus), margin: '4px 0' }}/>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '15px', color: stage.status === 'pending' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
            {stage.name}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 500, ...badgeStyles(stage.status) }}>
            {stage.badge}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden', marginBottom: '5px' }}>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: `${stage.pct}%` }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: '2px', background: stage.pct > 0 ? GREEN : 'transparent' }}
          />
        </div>

        {stage.subData && (
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{stage.subData}</div>
        )}
      </div>
    </motion.div>
  );
}

export function FeaturePlataformaSection() {
  return (
    <motion.section
      className="cia-section"
      id="nosotros"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <div style={CARD}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

          {/* Text column (40%) */}
          <div style={{ flex: '0 0 40%' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '16px' }}>
              Gestión de Proyecto
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '20px' }}>
              <em className="serif-em">De</em> la idea a<br />la entrega final
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '28px' }}>
              Visualiza el avance real de tu obra.
              ConstruIA conecta presupuesto, materiales y
              permisos en una línea de tiempo inteligente
              que se actualiza sola.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Tiempo real', 'Sin Excel', 'PDF automático'].map(t => (
                <span key={t} style={TAG}>{t}</span>
              ))}
            </div>
          </div>

          {/* Timeline visual (60%) */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
              Avance de Obra · Residencial Los Pinos
            </div>
            <div>
              {STAGES.map((stage, i) => (
                <TimelineStage
                  key={stage.name}
                  stage={stage}
                  isLast={i === STAGES.length - 1}
                  index={i}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
