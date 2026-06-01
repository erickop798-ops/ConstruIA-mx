'use client';
import {
  Calculator, Package, ClipboardCheck, Check, Circle,
  MessageSquare, Home, BookOpen, MapPin, Cpu, Zap, ArrowRight,
} from 'lucide-react';

const CARD: React.CSSProperties = {
  background: '#171717',
  border: '1px solid #282828',
  borderRadius: '10px',
  overflow: 'hidden',
};

function CardLink({ href, label = 'Ver herramienta' }: { href: string; label?: string }) {
  return (
    <a href={href} className="bento-link" style={{ marginTop: '20px' }}>
      {label} <ArrowRight size={13} />
    </a>
  );
}

/* ─── Row 1: Presupuestador ─── */
function CardPresupuestador() {
  return (
    <div className="bento-card" style={{ ...CARD, padding: '28px', display: 'flex', flexDirection: 'column' }}>
      <Calculator size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
      <div style={{ fontSize: '20px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
        Presupuestador Pro
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
        Presupuesto CMIC 2026 con 3 escenarios comparativos y exportación PDF LOPSRM.
      </p>
      <svg width="100%" height="70" viewBox="0 0 200 70" preserveAspectRatio="none">
        {[
          { x: 10, h: 32, opacity: 0.5 },
          { x: 60, h: 46, opacity: 0.7 },
          { x: 110, h: 60, opacity: 0.9 },
          { x: 160, h: 39, opacity: 0.6 },
        ].map(({ x, h, opacity }, i) => (
          <rect key={i} x={x} y={70 - h} width={30} height={h}
            fill={`rgba(200,120,60,${opacity})`} rx="3" ry="3" />
        ))}
      </svg>
      <CardLink href="/presupuesto" />
    </div>
  );
}

/* ─── Row 1: Materiales ─── */
function CardMateriales() {
  const rows: [string, string][] = [
    ['Cemento CPC 30R', '48 bolsas'],
    ['Varilla #4',      '24 pzas'],
    ['Block 15×20×40',  '890 pzas'],
  ];
  return (
    <div className="bento-card" style={{ ...CARD, padding: '28px', display: 'flex', flexDirection: 'column' }}>
      <Package size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
      <div style={{ fontSize: '20px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
        Calculadora de Materiales
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        Lista exacta de insumos con cantidades y factor de desperdicio incluido.
      </p>
      <div style={{ marginTop: '16px' }}>
        {rows.map(([nombre, cantidad]) => (
          <div key={nombre} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{nombre}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#f0f0f0', fontWeight: 500 }}>{cantidad}</span>
          </div>
        ))}
      </div>
      <CardLink href="/materiales" />
    </div>
  );
}

/* ─── Row 1: Checklist ─── */
function CardChecklist() {
  const items = [
    { done: true,  t: 'Licencia de construcción' },
    { done: true,  t: 'Planos firmados DRO' },
    { done: false, t: 'Dictamen uso suelo' },
    { done: false, t: 'Visto bueno PC' },
  ];
  return (
    <div className="bento-card" style={{ ...CARD, padding: '28px', display: 'flex', flexDirection: 'column' }}>
      <ClipboardCheck size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
      <div style={{ fontSize: '20px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
        Checklist de Permisos
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        Requisitos actualizados para licencias en los 32 estados de México.
      </p>
      <div style={{ marginTop: '16px' }}>
        {items.map(({ done, t }) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {done
              ? <Check size={13} color="#f0f0f0" strokeWidth={2} style={{ flexShrink: 0 }} />
              : <Circle size={13} color="rgba(255,255,255,0.25)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
            }
            <span style={{ fontSize: '13px', color: done ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', marginTop: '16px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '50%', background: '#f0f0f0', borderRadius: '1px' }} />
      </div>
      <CardLink href="/checklist" />
    </div>
  );
}

/* ─── Row 2: Copiloto IA (2 cols) ─── */
function CardCopiloto() {
  return (
    <div className="bento-card" style={{ ...CARD, gridColumn: 'span 2', padding: '32px', display: 'flex', flexDirection: 'column' }}>
      <MessageSquare size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '16px' }} />
      <div style={{ fontSize: '24px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '8px' }}>
        Copiloto IA
      </div>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        Respuestas técnicas con normativa mexicana NTC-RCDF 2023 y CMIC 2026 vigente.
      </p>
      <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: '14px' }}>
          CONSULTA NORMATIVA
        </p>
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', padding: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '10px' }}>
          &iquest;Calibre de cable para circuito de 20A?
        </div>
        <div style={{ borderLeft: '2px solid rgba(200,151,58,0.6)', paddingLeft: '12px', marginBottom: '10px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#f0f0f0', fontWeight: 500 }}>Cal. 12 AWG</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>NTC-ANCE 2023 &middot; Tabla 310.15</div>
        </div>
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', padding: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '10px' }}>
          &iquest;Resistencia m&iacute;nima concreto habitacional?
        </div>
        <div style={{ borderLeft: '2px solid rgba(200,151,58,0.6)', paddingLeft: '12px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#f0f0f0', fontWeight: 500 }}>f&prime;c = 250 kg/cm&sup2;</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>NTC-RCDF 2023 &middot; Art. 4.2.1</div>
        </div>
      </div>
      <CardLink href="/agente" />
    </div>
  );
}

/* ─── Row 2: Simulador (1 col) ─── */
function CardSimulador() {
  const bars = [
    { l: 'Demolición',    pct: 20 },
    { l: 'Instalaciones', pct: 55 },
    { l: 'Acabados',      pct: 100 },
  ];
  return (
    <div className="bento-card" style={{ ...CARD, padding: '28px', display: 'flex', flexDirection: 'column' }}>
      <Home size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '16px' }} />
      <p className="label" style={{ marginBottom: '8px' }}>ESTIMADO REMODELACION</p>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 400, color: '#f0f0f0', lineHeight: 1, marginBottom: '6px' }}>
        $45,000
      </div>
      <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif', marginBottom: '24px' }}>
        Cocina integral &middot; 3&ndash;4 semanas
      </p>
      {bars.map(({ l, pct }) => (
        <div key={l} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif' }}>{l}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.40)' }}>{pct}%</span>
          </div>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'rgba(200,151,58,0.7)', borderRadius: '1px' }} />
          </div>
        </div>
      ))}
      <CardLink href="/simulador" />
    </div>
  );
}

/* ─── Row 3: Tesis (1 col) ─── */
function CardTesis() {
  return (
    <div className="bento-card" style={{ ...CARD, padding: '28px', display: 'flex', flexDirection: 'column' }}>
      <BookOpen size={22} color="rgba(255,255,255,0.5)" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
      <div style={{ fontSize: '20px', fontWeight: 500, color: '#f0f0f0', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
        Asistente de Tesis
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
        Marco normativo y redacci&oacute;n acad&eacute;mica con APA 7 y normativa vigente.
      </p>
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>
          CAP. 3 &mdash; MARCO NORMATIVO
        </p>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 500, color: '#f0f0f0', marginBottom: '12px' }}>
          An&aacute;lisis del Reglamento de Construcciones
        </div>
        {['100%', '88%', '62%'].map((w, i) => (
          <div key={i} style={{ height: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', margin: '6px 0', width: w }} />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
          <span className="zap-pulse" style={{ display: 'flex' }}>
            <Zap size={11} color="rgba(255,255,255,0.3)" />
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.30)', fontFamily: 'Inter, sans-serif' }}>
            Redactando &sect;4.2.1
          </span>
        </div>
      </div>
      <CardLink href="/tesis" />
    </div>
  );
}

/* ─── Row 3: Mini Card Precios ─── */
function MiniCardPrecios() {
  return (
    <div className="bento-card" style={{ ...CARD, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <MapPin size={18} color="rgba(255,255,255,0.4)" strokeWidth={1.5} style={{ marginBottom: '12px' }} />
      <p className="label" style={{ marginBottom: '8px' }}>ESTADOS CUBIERTOS</p>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', fontWeight: 400, color: '#f0f0f0', lineHeight: 1 }}>
        33
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif', marginTop: '8px', lineHeight: 1.5 }}>
        Precios CMIC diferenciados por regi&oacute;n
      </p>
      <svg width="100%" height="50" viewBox="0 0 320 50" preserveAspectRatio="none" style={{ marginTop: '16px' }}>
        <path
          d="M 0,40 C 30,35 50,20 80,25 S 130,10 160,15 S 210,30 240,20 S 290,5 320,10"
          stroke="rgba(200,151,58,0.6)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      <a href="/presupuesto" className="bento-link" style={{ marginTop: '16px' }}>
        Ver precios <ArrowRight size={13} />
      </a>
    </div>
  );
}

/* ─── Row 3: Mini Card Agentes ─── */
function MiniCardAgentes() {
  const agents = [
    { color: '#C8973A', pulse: true,  name: 'Presupuestador CMIC', status: 'Calculando',  statusColor: 'rgba(200,151,58,0.8)' },
    { color: '#4ade80', pulse: false, name: 'Verificador Normativo', status: 'Activo',     statusColor: 'rgba(74,222,128,0.8)' },
    { color: 'rgba(255,255,255,0.2)', pulse: false, name: 'Generador PDF',   status: 'En espera',  statusColor: 'rgba(255,255,255,0.35)' },
    { color: '#60a5fa', pulse: false, name: 'Agente Consulta',   status: 'Completado', statusColor: 'rgba(96,165,250,0.8)' },
  ];
  return (
    <div className="bento-card" style={{ ...CARD, padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <Cpu size={18} color="rgba(255,255,255,0.4)" strokeWidth={1.5} style={{ marginBottom: '12px' }} />
      <p className="label" style={{ marginBottom: '8px' }}>AGENTES ACTIVOS</p>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', fontWeight: 400, color: '#f0f0f0', lineHeight: 1 }}>
        4
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontFamily: 'Inter, sans-serif', marginTop: '8px', marginBottom: '12px', lineHeight: 1.5 }}>
        IA trabajando en tu proyecto ahora
      </p>
      {agents.map(({ color, pulse, name, status, statusColor }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <span
            className={pulse ? 'dot-pulse' : undefined}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}
          />
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', flex: 1 }}>{name}</span>
          <span style={{ fontSize: '12px', color: statusColor, fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>{status}</span>
        </div>
      ))}
    </div>
  );
}

export function ToolCardsSection() {
  return (
    <section id="herramientas" style={{ padding: '80px 40px' }}>
      <style>{`
        .bento-card { transition: border-color 0.25s, background 0.25s; }
        .bento-card:hover { background: #1f1f1f !important; border-color: #3a3a3a !important; }
        .bento-link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-family: Inter, sans-serif; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
        .bento-link:hover { color: rgba(255,255,255,0.80); }
        @keyframes dot-pulse-bento { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .dot-pulse { animation: dot-pulse-bento 1.5s ease-in-out infinite; }
        @keyframes zap-pulse-bento { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        .zap-pulse { animation: zap-pulse-bento 0.9s ease-in-out infinite; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p className="label" style={{ textAlign: 'center', marginBottom: '12px' }}>HERRAMIENTAS</p>
        <h2 style={{ textAlign: 'center', fontSize: '56px', fontWeight: 500, color: 'var(--text-1)', lineHeight: 1.1, marginBottom: '56px' }}>
          Construye m&aacute;s. Presupuesta mejor.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {/* Row 1 */}
          <CardPresupuestador />
          <CardMateriales />
          <CardChecklist />

          {/* Row 2 */}
          <CardCopiloto />
          <CardSimulador />

          {/* Row 3 */}
          <CardTesis />
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <MiniCardPrecios />
            <MiniCardAgentes />
          </div>
        </div>
      </div>
    </section>
  );
}
