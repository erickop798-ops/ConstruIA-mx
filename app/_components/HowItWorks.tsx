'use client';
import { PenLine, Cpu, Download } from 'lucide-react';

const STEPS = [
  { Icon: PenLine, num: '01', title: 'Describe',     desc: 'Tipo, m² y estado' },
  { Icon: Cpu,     num: '02', title: 'La IA genera', desc: 'CMIC, materiales, permisos' },
  { Icon: Download,num: '03', title: 'Descarga',     desc: 'PDF, Excel y Copiloto' },
];

export function HowItWorks() {
  return (
    <section style={{ padding: '80px 40px' }}>
      <style>{`
        .hiw-btn { transition: background 0.2s; }
        .hiw-btn:hover { background: rgba(200,151,58,0.25) !important; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          background: '#171717',
          border: '1px solid #282828',
          borderRadius: '10px',
          padding: '56px 60px',
          display: 'flex',
          gap: '48px',
          alignItems: 'flex-start',
        }}>

          {/* Left: text */}
          <div style={{ flex: '0 0 42%' }}>
            <p className="label" style={{ marginBottom: '16px' }}>PROCESO</p>
            <h2 style={{ fontSize: '48px', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-1)', marginBottom: '16px' }}>
              Tres pasos.<br />Tu presupuesto listo.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.65, fontFamily: 'Inter, sans-serif', margin: '24px 0' }}>
              Sin curva de aprendizaje. Sin Excel manual. Sin errores de c&aacute;lculo.
            </p>
            <a href="/presupuesto" className="hiw-btn" style={{
              display: 'inline-block',
              background: 'rgba(200,151,58,0.15)',
              border: '1px solid rgba(200,151,58,0.40)',
              color: '#C8973A',
              padding: '10px 22px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
            }}>
              Crear presupuesto gratis
            </a>
          </div>

          {/* Right: steps */}
          <div style={{ flex: '0 0 55%', display: 'flex', gap: '12px' }}>
            {STEPS.map(({ Icon, num, title, desc }) => (
              <div key={num} style={{
                flex: 1,
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Icon size={24} strokeWidth={1.5} color="rgba(255,255,255,0.60)" style={{ marginBottom: '12px' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>
                  {num}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }}>
                  {title}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif' }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
