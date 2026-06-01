'use client';

const ITEMS = [
  { text: 'Presupuesto generado en Guadalajara', time: ' · hace 8s' },
  { text: 'Permiso validado en CDMX', time: ' · hace 23s' },
  { text: '14 hrs/semana ahorradas en promedio', time: '' },
  { text: '12,400 obras gestionadas en México', time: '' },
  { text: 'Materiales calculados en Monterrey', time: ' · hace 41s' },
  { text: '847 profesionales activos en este momento', time: '' },
  { text: 'Checklist completado en Puebla', time: ' · hace 1min' },
  { text: '$180,000 MXN ahorro promedio por proyecto', time: '' },
  { text: 'Tesis generada en Tlaxcala', time: ' · hace 2min' },
  { text: '99.8% precisión vs catálogo CMIC oficial', time: '' },
];

const doubled = [...ITEMS, ...ITEMS];

export function ActivityTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes dot-live {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .ticker-marquee {
          display: inline-flex;
          align-items: center;
          animation: ticker-scroll 30s linear infinite;
          white-space: nowrap;
        }
        .dot-live {
          animation: dot-live 2s ease-in-out infinite;
        }
      `}</style>
      <div style={{
        height: '40px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '110px',
          flexShrink: 0,
          borderRight: '1px solid var(--border)',
          padding: '0 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '100%',
        }}>
          <span
            className="dot-live"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4ade80',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span className="label" style={{ margin: 0 }}>EN VIVO</span>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="ticker-marquee">
            {doubled.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                  {item.text}
                  {item.time && (
                    <span style={{ color: 'var(--text-3)' }}>{item.time}</span>
                  )}
                </span>
                <span style={{ color: 'var(--border-hover)', padding: '0 20px', flexShrink: 0 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
