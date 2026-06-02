'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

function CountStat({
  to,
  prefix = '',
  suffix = '',
  color = '#ECECEC',
  fontSize = '72px',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    return spring.on('change', (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, motionVal, to]);

  return (
    <div ref={ref}>
      <span style={{
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontSize,
        fontWeight: 400,
        color,
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {prefix}{display}{suffix}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      width: '1px',
      height: '60px',
      background: 'rgba(255,255,255,0.10)',
      alignSelf: 'center',
    }} />
  );
}

export function AnimatedStats() {
  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '80px 40px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'center',
          gap: '0 40px',
        }}>

          {/* Stat 1 — < 2 min */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <CountStat to={2} prefix="< " suffix=" min" color="#ECECEC" fontSize="72px" />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.50)',
              marginTop: '14px',
              lineHeight: 1.4,
            }}>
              Tiempo promedio de generación
            </p>
          </motion.div>

          <Divider />

          {/* Stat 2 — +32 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <CountStat to={32} prefix="+" color="#C8973A" fontSize="72px" />
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.50)',
              marginTop: '14px',
              lineHeight: 1.4,
            }}>
              Estados de México cubiertos
            </p>
          </motion.div>

          <Divider />

          {/* Stat 3 — CMIC 2026 (static) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: '52px',
              fontWeight: 400,
              color: '#ECECEC',
              lineHeight: 1.1,
            }}>
              CMIC<br />2026
            </span>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.50)',
              marginTop: '14px',
              lineHeight: 1.4,
            }}>
              Catálogo oficial actualizado
            </p>
          </motion.div>
        </div>

        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.25)',
          marginTop: '48px',
        }}>
          *Basado en promedio de usuarios activos de la plataforma
        </p>
      </div>
    </section>
  );
}
