export function MonographStats() {
  const stats = [
    { value: '< 2 min', label: 'Tiempo de generación' },
    { value: '+32', label: 'Estados cubiertos' },
    { value: 'CMIC 2026', label: 'Actualizado' },
  ];

  return (
    <section style={{ background: '#ffffff', padding: '60px 5.2rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{
          background: '#ebede9',
          borderRadius: '16px',
          padding: '31px 40px 44px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '37px' }}>
            <p style={{
              fontSize: '18px',
              color: '#2c2d2a',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>
              Los constructores en México logran con ConstruIA:
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {stats.map((stat) => (
              <div key={stat.value} style={{
                background: '#ffffff',
                borderRadius: '25px',
                padding: '35px 27px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '56px',
                  fontWeight: 700,
                  lineHeight: '112.5%',
                  color: '#5840e0',
                  marginBottom: '15px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '20px',
                  fontWeight: 400,
                  opacity: 0.75,
                  color: '#2c2d2a',
                  lineHeight: 1,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
