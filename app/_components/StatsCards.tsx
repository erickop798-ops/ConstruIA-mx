'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function useCounter(target: number, isInView: boolean) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 15 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  return display;
}

function MiniStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div style={{ display: 'flex' }}>
      {items.map((ms, i) => (
        <div key={ms.label} style={{
          flex: 1,
          borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          paddingRight: i < items.length - 1 ? '16px' : '0',
          paddingLeft: i > 0 ? '16px' : '0',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 700,
            color: '#ECECEC',
            lineHeight: 1,
          }}>
            {ms.value}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.40)',
            marginTop: '4px',
          }}>
            {ms.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  isInView,
  target,
  prefix = '',
  suffix = '',
  label,
  miniStats,
  delay = 0,
}: {
  isInView: boolean;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  miniStats: { value: string; label: string }[];
  delay?: number;
}) {
  const count = useCounter(target, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      style={{
        background: '#141418',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '36px 32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    >
      {/* Main stat number */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '64px',
        fontWeight: 500,
        color: '#C8973A',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {prefix}{count}{suffix}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
        color: 'rgba(255,255,255,0.55)',
        marginTop: '8px',
        lineHeight: 1.4,
        marginBottom: 0,
      }}>
        {label}
      </p>

      {/* Separator — same as monograph.com stats-breakline */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

      {/* Mini-stats row */}
      <MiniStats items={miniStats} />
    </motion.div>
  );
}

export function StatsCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <section
      ref={sectionRef}
      style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 40px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          En promedio, los usuarios de ConstruIA logran:
        </p>

        {/* Cards grid — same 3-col layout as monograph.com stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          <StatCard
            isInView={isInView}
            target={67}
            prefix="+"
            suffix="%"
            label="Menos tiempo presupuestando"
            delay={0}
            miniStats={[
              { value: '+2x', label: 'Más rápido' },
              { value: '+50%', label: 'Menos errores' },
              { value: '< 2min', label: 'Por proyecto' },
            ]}
          />
          <StatCard
            isInView={isInView}
            target={32}
            prefix="+"
            label="Estados de México cubiertos"
            delay={0.1}
            miniStats={[
              { value: '32', label: 'Estados' },
              { value: '100%', label: 'Actualizado' },
              { value: '2026', label: 'CMIC vigente' },
            ]}
          />
          <StatCard
            isInView={isInView}
            target={12}
            prefix="+"
            suffix=",400"
            label="Obras gestionadas en México"
            delay={0.2}
            miniStats={[
              { value: '847', label: 'Activos hoy' },
              { value: '+180k', label: 'MXN ahorrados' },
              { value: '99.8%', label: 'Precisión CMIC' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
