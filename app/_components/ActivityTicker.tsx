'use client';

const ITEMS = [
  '🏗 Presupuesto generado en Guadalajara hace 8s',
  '📋 Permiso validado en CDMX hace 23s',
  '⚡ Ahorro promedio: 14 hrs/semana',
  '🏢 12,400+ obras gestionadas en México',
  '🔧 Cálculo de materiales en Monterrey hace 41s',
  '👷 847 arquitectos presupuestando ahora',
  '📐 Checklist completado en Puebla hace 1min',
  '💰 Ahorro promedio: $180,000 por proyecto',
  '🎓 Tesis generada en Tlaxcala hace 2min',
  '✅ 99.8% precisión vs CMIC oficial verificada',
];

const doubled = [...ITEMS, ...ITEMS];

export function ActivityTicker() {
  return (
    <div style={{
      height: '44px',
      background: 'rgba(255,255,255,0.03)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fixed left label */}
      <div style={{
        width: '220px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 20px',
        borderRight: '1px solid rgba(255,255,255,0.10)',
        height: '100%',
        background: 'rgba(255,255,255,0.03)',
        zIndex: 3,
      }}>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#4ade80', flexShrink: 0,
          animation: 'dot-pulse 1.5s ease infinite',
          display: 'inline-block',
        }}/>
        <span style={{
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          whiteSpace: 'nowrap',
        }}>
          Actividad en Tiempo Real
        </span>
      </div>

      {/* Scrolling track */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="ticker-track">
          {doubled.map((text, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', paddingRight: '0' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap' }}>{text}</span>
              <span style={{ color: '#C8973A', margin: '0 18px', fontSize: '13px' }}>·</span>
            </span>
          ))}
        </div>
        {/* Fade right */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, transparent, #080810)',
          pointerEvents: 'none', zIndex: 2,
        }}/>
      </div>
    </div>
  );
}
