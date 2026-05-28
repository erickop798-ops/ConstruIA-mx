'use client';
import { motion } from 'framer-motion';

const STATES = [
  { name: 'CDMX',        val: 1.00, isRef: true,  hl: false },
  { name: 'Jalisco',     val: 0.97, isRef: false, hl: false },
  { name: 'Nuevo León',  val: 1.02, isRef: false, hl: false },
  { name: 'Puebla',      val: 0.95, isRef: false, hl: false },
  { name: 'Tlaxcala',    val: 0.94, isRef: false, hl: true  },
  { name: 'Querétaro',   val: 0.98, isRef: false, hl: false },
  { name: 'Oaxaca',      val: 0.91, isRef: false, hl: false },
  { name: 'Chihuahua',   val: 1.05, isRef: false, hl: false },
];
const MAX_VAL = 1.05;

function barColor(s: typeof STATES[0]) {
  if (s.isRef) return 'rgba(255,255,255,0.3)';
  if (s.hl)   return '#60a5fa';
  return 'rgba(147,197,253,0.45)';
}

const CARD: React.CSSProperties = {
  background: 'rgba(59,130,246,0.06)',
  border: '1px solid rgba(59,130,246,0.20)',
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

export function FeaturePreciosSection() {
  return (
    <motion.section
      className="cia-section"
      id="precios"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <div style={CARD}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

          {/* Text column */}
          <div style={{ flex: '0 0 38%' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '16px' }}>
              Precios Regionales
            </span>
            <h2 style={{ fontSize: '64px', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '20px' }}>
              <em className="serif-em">Precios</em> reales,<br />por tu estado
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: '28px' }}>
              No un promedio nacional. ConstruIA aplica el índice FIC SICT 2025
              con factores diferenciados para materiales y mano de obra en los 33 estados.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['CEICO-CMIC 2026', 'FIC SICT 2025', '33 estados', 'Sin IVA'].map(t => (
                <span key={t} style={TAG}>{t}</span>
              ))}
            </div>
          </div>

          {/* Bar chart column */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
              Factor Regional · Comparativa
            </div>
            {STATES.map((s, i) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  width: '92px', fontSize: '15px', textAlign: 'right', flexShrink: 0,
                  color: s.hl ? '#60a5fa' : 'rgba(255,255,255,0.5)',
                  fontWeight: s.hl ? 600 : 400,
                }}>
                  {s.name}
                </span>
                <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${(s.val / MAX_VAL * 100).toFixed(1)}%` }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: '5px', background: barColor(s) }}
                  />
                </div>
                <span style={{
                  width: '40px', fontSize: '16px', fontFamily: 'monospace', flexShrink: 0,
                  fontWeight: 700,
                  color: '#93c5fd',
                }}>
                  {s.val.toFixed(2)}
                </span>
              </div>
            ))}
            <div style={{ marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
              Fuente: FIC SICT 2025 · Actualizado mar 2026
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
