'use client';
import Link from 'next/link';

const CHECK_G = '#34d399';
const CHECK_GOLD = '#C8973A';
const CROSS = 'rgba(255,255,255,0.25)';

function Row({ done, text, gold }: { done: boolean; text: string; gold?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '7px 0' }}>
      <span style={{ fontSize: '15px', color: done ? (gold ? CHECK_GOLD : CHECK_G) : CROSS, flexShrink: 0, marginTop: '1px' }}>
        {done ? '✓' : '✗'}
      </span>
      <span style={{ fontSize: '15px', color: done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
        {text}
      </span>
    </div>
  );
}

const FREE_ITEMS = [
  { done: true,  text: 'Presupuesto básico (1 escenario)' },
  { done: true,  text: 'Calculadora de materiales' },
  { done: true,  text: 'Checklist básico (5 estados)' },
  { done: true,  text: 'Copiloto IA (10 consultas/mes)' },
  { done: false, text: 'PDF profesional LOPSRM' },
  { done: false, text: 'Los 32 estados' },
  { done: false, text: '3 escenarios comparativos' },
  { done: false, text: 'Excel descargable' },
  { done: false, text: 'Soporte prioritario' },
];

const PRO_ITEMS = [
  'Todo lo de Gratis incluido',
  'PDF profesional LOPSRM completo',
  'Los 32 estados de México',
  '3 escenarios comparativos',
  'Excel descargable y editable',
  'Copiloto IA ilimitado',
  'Exportación a OPUS/Revit',
  'Soporte prioritario',
  'Actualizaciones CMIC automáticas',
];

const DIVIDER = <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '20px 0' }}/>;
const DIVIDER_GOLD = <div style={{ height: '1px', background: 'rgba(200,151,58,0.25)', margin: '20px 0' }}/>;

export function PricingPreview() {
  return (
    <section style={{ padding: '100px 40px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
        Planes
      </p>
      <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '48px' }}>
        Empieza gratis. Escala cuando crezcas.
      </h2>

      <div style={{ display: 'flex', gap: '20px', maxWidth: '800px', margin: '0 auto 24px', alignItems: 'stretch' }}>

        {/* Free card */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '20px',
          padding: '36px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '12px' }}>
            Gratis
          </span>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', lineHeight: 1, marginBottom: '4px' }}>$0</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Para siempre</div>
          {DIVIDER}
          <div style={{ flex: 1 }}>
            {FREE_ITEMS.map((item) => <Row key={item.text} done={item.done} text={item.text}/>)}
          </div>
          {DIVIDER}
          <Link href="/presupuesto" style={{ textDecoration: 'none', display: 'block', marginTop: 'auto' }}>
            <button style={{
              width: '100%', padding: '12px 24px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: '12px',
              color: '#ffffff', fontSize: '15px', fontWeight: 600,
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}>
              Empezar gratis &#8594;
            </button>
          </Link>
        </div>

        {/* Pro card */}
        <div style={{
          flex: 1,
          background: 'rgba(200,151,58,0.08)',
          border: '2px solid rgba(200,151,58,0.40)',
          borderRadius: '20px',
          padding: '36px',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Badge */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            background: '#C8973A', color: '#000',
            padding: '4px 16px', borderRadius: '0 0 10px 10px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            Más popular
          </div>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8973A', display: 'block', marginBottom: '12px', marginTop: '8px' }}>
            Pro
          </span>
          <div style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', lineHeight: 1, marginBottom: '4px' }}>$299</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>MXN / mes · Cancela cuando quieras</div>
          {DIVIDER_GOLD}
          <div style={{ flex: 1 }}>
            {PRO_ITEMS.map((text) => <Row key={text} done={true} text={text} gold={true}/>)}
          </div>
          {DIVIDER_GOLD}
          <Link href="/presupuesto" style={{ textDecoration: 'none', display: 'block', marginTop: 'auto' }}>
            <button style={{
              width: '100%', padding: '14px 24px',
              background: '#C8973A',
              border: 'none',
              borderRadius: '12px',
              color: '#000', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}>
              Comenzar Pro &#8594;
            </button>
          </Link>
        </div>

      </div>

      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
        &#128179; Pago seguro &nbsp;&#183;&nbsp; Facturación en MXN &nbsp;&#183;&nbsp; Sin contratos anuales forzados
      </p>
    </section>
  );
}
