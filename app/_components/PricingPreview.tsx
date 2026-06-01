'use client';
import { Check, X } from 'lucide-react';

const FREE_ITEMS = [
  { done: true,  text: 'Presupuesto básico (1 escenario)' },
  { done: true,  text: 'Calculadora de materiales' },
  { done: true,  text: 'Checklist básico (5 estados)' },
  { done: true,  text: 'Copiloto IA (10 consultas/mes)' },
  { done: false, text: 'PDF profesional LOPSRM' },
  { done: false, text: '32 estados completos' },
  { done: false, text: '3 escenarios comparativos' },
  { done: false, text: 'Excel descargable' },
  { done: false, text: 'Soporte prioritario' },
];

const PRO_ITEMS = [
  'Todo lo de Gratis incluido',
  'PDF profesional LOPSRM completo',
  '32 estados de México',
  '3 escenarios comparativos',
  'Excel descargable y editable',
  'Copiloto IA ilimitado',
  'Exportación formato OPUS',
  'Actualizaciones CMIC automáticas',
  'Soporte prioritario',
];

function Row({ done, text }: { done: boolean; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '7px 0' }}>
      {done
        ? <Check size={14} strokeWidth={2} color="var(--text-1)" style={{ flexShrink: 0, marginTop: '2px' }} />
        : <X size={14} strokeWidth={2} color="var(--text-3)" style={{ flexShrink: 0, marginTop: '2px' }} />
      }
      <span style={{ fontSize: '15px', color: done ? 'var(--text-2)' : 'var(--text-3)', lineHeight: 1.4 }}>
        {text}
      </span>
    </div>
  );
}

export function PricingPreview() {
  return (
    <section style={{ padding: '100px 0', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }}>
        <p className="label" style={{ textAlign: 'center', marginBottom: '16px' }}>PLANES</p>
        <h2 style={{ fontSize: '56px', fontWeight: 500, lineHeight: 1.1, color: 'var(--text-1)', marginBottom: '56px' }}>
          Empieza gratis.
        </h2>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>

          {/* Free */}
          <div style={{
            flex: 1,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '36px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span className="label" style={{ marginBottom: '8px' }}>Gratis</span>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '56px',
              fontWeight: 400,
              color: 'var(--text-1)',
              lineHeight: 1,
              marginBottom: '4px',
            }}>
              $0
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-3)', marginBottom: '24px' }}>
              Para siempre
            </div>
            <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />
            <div style={{ flex: 1 }}>
              {FREE_ITEMS.map((item) => <Row key={item.text} done={item.done} text={item.text} />)}
            </div>
            <button style={{
              width: '100%',
              height: '44px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-1)',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              marginTop: '28px',
              fontFamily: 'Inter, sans-serif',
              transition: 'border-color 0.2s',
            }}>
              Empezar gratis
            </button>
          </div>

          {/* Pro */}
          <div style={{
            flex: 1,
            background: 'var(--surface)',
            border: '1px solid var(--gold)',
            borderRadius: '12px',
            padding: '36px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--gold)',
              color: '#000',
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '4px 14px',
              borderRadius: '0 0 8px 8px',
              whiteSpace: 'nowrap',
            }}>
              MAS POPULAR
            </div>
            <span className="label" style={{ marginBottom: '8px', color: 'var(--gold)' }}>Pro</span>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '56px',
              fontWeight: 400,
              color: 'var(--text-1)',
              lineHeight: 1,
              marginBottom: '4px',
            }}>
              $299
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-3)', marginBottom: '24px' }}>
              MXN / mes · Cancela cuando quieras
            </div>
            <div style={{ height: '1px', background: 'rgba(200,151,58,0.2)', marginBottom: '24px' }} />
            <div style={{ flex: 1 }}>
              {PRO_ITEMS.map((text) => <Row key={text} done={true} text={text} />)}
            </div>
            <button style={{
              width: '100%',
              height: '44px',
              background: 'var(--gold)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '28px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Comenzar con Pro
            </button>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '20px', textAlign: 'center' }}>
          Pago seguro · Facturación en MXN · Sin contratos anuales
        </p>
      </div>
    </section>
  );
}
