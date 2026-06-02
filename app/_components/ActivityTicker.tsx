'use client';

const ITEMS = [
  'Presupuesto vivienda 120m² · Tlaxcala · CMIC 2026',
  'Checklist permisos licencia construcción · Jalisco',
  'Calcular varilla y concreto para cimentación 200m²',
  'Presupuesto remodelación cocina · 3 escenarios',
  '¿Resistencia mínima concreto habitacional? · f\'c 250',
  'Lista materiales losa vigueta T-12 · 94m²',
  'Checklist uso de suelo comercial · CDMX',
  'Presupuesto nave industrial 800m² · Querétaro',
  'Calibre cable circuito 20A · NTC-ANCE 2023',
  'Presupuesto acabados premium · 187m²',
  'Tesis marco normativo NTC-RCDF 2023 · Cap. 3',
  'Checklist obra nueva unifamiliar · Puebla',
  'Factor desperdicio tabique rojo · 312m²',
  'Presupuesto instalaciones eléctricas · 24 circuitos',
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
          animation: ticker-scroll 45s linear infinite;
          white-space: nowrap;
        }
        .dot-live {
          animation: dot-live 2s ease-in-out infinite;
        }
      `}</style>
      <div style={{
        height: '52px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '120px',
          flexShrink: 0,
          borderRight: '1px solid var(--border)',
          padding: '0 24px',
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
            {doubled.map((text, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                  {text}
                </span>
                <span style={{ color: '#C8973A', padding: '0 24px', flexShrink: 0 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
