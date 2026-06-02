'use client';

const ITEMS = [
  'Presupuesto vivienda unifamiliar 120m² con acabados estándar · Tlaxcala · $1,872,000 MXN',
  'Verificación de requisitos licencia construcción · Municipio de Puebla · 6 documentos',
  'Cálculo varilla #4 y concreto fc=250 para cimentación 12 zapatas · 847kg varilla',
  'Remodelación cocina integral con isla · 3 escenarios · desde $38,000 MXN',
  'Calibre cable AWG para circuito iluminación 20A · Cal.12 según NTC-ANCE 2023',
  'Lista materiales losa vigueta T-12 para 94m² · 147 viguetas · 188 bovedillas',
  'Checklist uso de suelo comercial local · Jalisco · 8 trámites requeridos',
  'Presupuesto nave industrial estructura metálica 800m² · Querétaro · $4,240,000',
  'Marco normativo NTC-RCDF 2023 Capítulo 4 · Tesis arquitectura · APA 7',
  'Checklist obra nueva unifamiliar 2 plantas · Puebla · Protección Civil',
  'Factor desperdicio tabique rojo recocido · 312m² muros · 10% = 34,320 pzas',
  'Instalación eléctrica 24 circuitos · Tablero 200A · NTC-ANCE calibres',
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
          animation: ticker-scroll 55s linear infinite;
          white-space: nowrap;
        }
        .dot-live {
          animation: dot-live 2s ease-in-out infinite;
        }
      `}</style>
      <div style={{
        height: '56px',
        background: '#C8973A',
        borderTop: 'none',
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '128px',
          flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.20)',
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
              background: '#000000',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: '#000000',
            margin: 0,
          }}>EN VIVO</span>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="ticker-marquee">
            {doubled.map((text, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#000000',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {text}
                </span>
                <span style={{ color: 'rgba(0,0,0,0.35)', padding: '0 28px', flexShrink: 0 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
