'use client';

const LOGOS = [
  { label: 'CMIC 2026' },
  { label: 'NTC-RCDF' },
  { label: 'LOPSRM' },
  { label: 'FIC SICT' },
  { label: 'CEICO-CMIC' },
  { label: '33 Estados' },
];

const BADGES = [
  { num: 'CMIC',  label: 'Referencia CMIC' },
  { num: '32',    label: 'Estados cubiertos' },
  { num: '< 2min', label: 'Tiempo promedio' },
];

export function SocialProofBand() {
  return (
    <section style={{ padding: '48px 40px', textAlign: 'center' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
        Respaldado por datos oficiales
      </div>

      {/* Logos row */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {LOGOS.map(({ label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {BADGES.map(({ num, label }) => (
          <div key={label} style={{
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>{num}</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
