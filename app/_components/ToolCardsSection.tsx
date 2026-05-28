'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CardProps {
  accent: string;
  accentA: string;
  accentB: string;
}

const CARD_BASE: React.CSSProperties = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '20px',
  padding: '28px',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const EYEBROW: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '14px',
};

const BIG_NUM: React.CSSProperties = {
  fontSize: '44px',
  fontWeight: 800,
  lineHeight: 1,
  marginBottom: '4px',
};

const SUB: React.CSSProperties = {
  fontSize: '15px',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '16px',
};

const DIVIDER: React.CSSProperties = {
  height: '1px',
  background: 'rgba(255,255,255,0.08)',
  margin: '16px 0',
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#ECECEC',
  marginBottom: '5px',
};

const CARD_DESC: React.CSSProperties = {
  fontSize: '15px',
  color: 'rgba(255,255,255,0.45)',
  marginBottom: '12px',
  lineHeight: 1.5,
};

const TAG_BASE: React.CSSProperties = {
  padding: '5px 14px',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '20px',
  fontSize: '13px',
  color: 'rgba(255,255,255,0.5)',
  fontWeight: 500,
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '2px' }}>
      {tags.map((t) => <span key={t} style={TAG_BASE}>{t}</span>)}
    </div>
  );
}

/* ─── Card 1: Presupuestador Pro ─── */
function Card1({ accent, accentA, accentB }: CardProps) {
  const barH = 72;
  const bars = [
    { label: 'Eco', price: '$1.87M', pct: 55, fill: accentB,  w: 68, x: 15  },
    { label: 'Est', price: '$2.34M', pct: 75, fill: accent,   w: 74, x: 115 },
    { label: 'Pre', price: '$3.12M', pct: 100, fill: accentA, w: 68, x: 218 },
  ];
  return (
    <>
      <p style={EYEBROW}>Estimado CMIC 2026</p>
      <div style={{ ...BIG_NUM, color: accent }}>$2,340,000</div>
      <div style={SUB}>Residencial · 187 m² · Tlaxcala</div>
      <svg width="100%" height="90" viewBox="0 0 300 90" preserveAspectRatio="xMidYMax meet" style={{ marginBottom: '12px' }}>
        <line x1="0" y1={barH} x2="300" y2={barH} stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        {bars.map((bar) => {
          const h = Math.round(bar.pct * barH / 100);
          return (
            <g key={bar.label}>
              <rect x={bar.x} y={barH - h} width={bar.w} height={h} fill={bar.fill} rx="2"/>
              <text x={bar.x + bar.w / 2} y="85" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">{bar.price}</text>
            </g>
          );
        })}
      </svg>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Presupuestador Pro</div>
      <div style={CARD_DESC}>CMIC 2026 · 3 escenarios · PDF LOPSRM</div>
      <Tags tags={['CMIC 2026', 'PDF', '33 estados']}/>
    </>
  );
}

/* ─── Card 2: Calculadora de Materiales ─── */
function Card2({ accent, accentA, accentB }: CardProps) {
  const r = 22;
  const C = 2 * Math.PI * r;
  const segs = [
    { pct: 0.40, stroke: accent },
    { pct: 0.35, stroke: accentA },
    { pct: 0.25, stroke: accentB },
  ];
  const starts = [0, 0.40, 0.75];
  const rows = [
    ['Cemento CPC 30R', '48 bolsas'],
    ['Varilla 3/8"',    '24 pzas'],
    ['Block 15×20×40', '890 pzas'],
  ];
  return (
    <>
      <p style={EYEBROW}>Lista de Materiales</p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
        <div style={{ flex: 1 }}>
          {rows.map(([mat, cant], i) => (
            <div key={mat}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '7px 0' }}>
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', flex: 1 }}>{mat}</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>···</span>
                <span style={{ fontSize: '15px', color: accent, fontWeight: 600, marginLeft: '4px' }}>{cant}</span>
              </div>
              {i < rows.length - 1 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }}/>}
            </div>
          ))}
        </div>
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ flexShrink: 0, marginTop: '4px' }}>
          <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
          {segs.map((seg, i) => (
            <circle key={i} cx="30" cy="30" r={r} fill="none" stroke={seg.stroke} strokeWidth="8"
              strokeDasharray={`${seg.pct * C} ${(1 - seg.pct) * C}`}
              strokeDashoffset={i === 0 ? 0 : C * (1 - starts[i])}
              transform="rotate(-90 30 30)"
            />
          ))}
          <text x="30" y="35" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">3</text>
        </svg>
      </div>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Calculadora de Materiales</div>
      <div style={CARD_DESC}>Lista exacta con factor de desperdicio</div>
      <Tags tags={['Precios 2026', 'PDF', '8 tipos']}/>
    </>
  );
}

/* ─── Card 3: Checklist de Permisos ─── */
function Card3({ accent, accentB }: CardProps) {
  const items = [
    { done: true,  t: 'Licencia de construcción' },
    { done: true,  t: 'Planos estructurales' },
    { done: false, t: 'Dictamen uso de suelo' },
    { done: false, t: 'Manifestación de impacto' },
  ];
  return (
    <>
      <p style={EYEBROW}>Permisos · 32 Estados</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '14px' }}>
        {items.map(({ done, t }) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px', color: done ? accent : 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{done ? '✓' : '○'}</span>
            <span style={{ fontSize: '15px', color: done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.28)' }}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
          <div style={{ height: '100%', width: '50%', background: accent, borderRadius: '3px' }}/>
        </div>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>2 de 4 completados</span>
      </div>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Checklist de Permisos</div>
      <div style={CARD_DESC}>Documentos por estado y tipo de obra</div>
      <Tags tags={['32 estados', 'Oficial', 'PDF']}/>
    </>
  );
}

/* ─── Card 4: Simulador de Remodelación ─── */
function Card4({ accent, accentA, accentB }: CardProps) {
  const bars = [
    { l: 'Demolición',    pct: 20,  fill: accentB },
    { l: 'Instalaciones', pct: 55,  fill: accent  },
    { l: 'Acabados',      pct: 100, fill: accentA },
  ];
  return (
    <>
      <p style={EYEBROW}>Estimado Remodelación</p>
      <div style={{ ...BIG_NUM, color: accent }}>$45,000</div>
      <div style={SUB}>Cocina integral · 3–4 semanas</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {bars.map(({ l, pct, fill }) => (
          <div key={l}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>{l}</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{pct}%</span>
            </div>
            <div style={{ height: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: fill, borderRadius: '2px' }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Simulador de Remodelación</div>
      <div style={CARD_DESC}>Costos reales por espacio y acabado</div>
      <Tags tags={['IA', 'Instantáneo', 'PDF']}/>
    </>
  );
}

/* ─── Card 5: Copiloto IA ─── */
function Card5({ accent, accentA, accentB }: CardProps) {
  const msgs = [
    { user: true,  main: '¿Calibre de cable para 20A?' },
    { user: false, main: 'Cal. 12 AWG', sub: 'según NTC-ANCE 2023' },
    { user: true,  main: '¿Resistencia mínima concreto habitacional?' },
    { user: false, main: "f'c = 200 kg/cm²", sub: 'NTC-RCDF uso habitacional' },
  ];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <p style={{ ...EYEBROW, marginBottom: 0 }}>Copiloto IA</p>
        <span style={{ fontSize: '11px', color: accent, border: `1px solid ${accentA}`, borderRadius: '4px', padding: '2px 7px', fontWeight: 600, letterSpacing: '0.05em' }}>Claude</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {msgs.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.user ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '90%', padding: '8px 12px',
              borderRadius: msg.user ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.user ? 'rgba(255,255,255,0.08)' : accentB,
              border: `1px solid ${msg.user ? 'rgba(255,255,255,0.07)' : accentA}`,
            }}>
              <div style={{ fontSize: msg.user ? '13px' : '15px', color: msg.user ? 'rgba(255,255,255,0.8)' : accent, fontWeight: msg.user ? 400 : 600 }}>
                {msg.main}
              </div>
              {msg.sub && <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{msg.sub}</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Copiloto IA</div>
      <div style={CARD_DESC}>Respuestas técnicas normativas al instante</div>
      <Tags tags={['Claude AI', 'NTC 2023', 'CMIC 2026']}/>
    </>
  );
}

/* ─── Card 6: Asistente de Tesis ─── */
function Card6({ accent, accentA }: CardProps) {
  const caps = [100, 100, 60, 0, 0];
  return (
    <>
      <p style={EYEBROW}>Tesis de Arquitectura</p>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
          Capítulo en proceso
        </div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: '#ECECEC', marginBottom: '3px' }}>Cap. 3 — Marco Normativo</div>
        <div style={{ fontSize: '14px', color: accent }}>NTC-RCDF 2023 · §4.2</div>
      </div>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
        {caps.map((fill, i) => (
          <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${fill}%`, background: accent, borderRadius: '3px' }}/>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: '12px' }}>
        {[
          'NTC · RCDF · normativa · reglamento · artículo · fracción · disposición',
          'construcción · habitacional · resistencia · concreto · NTC-RCDF 2023',
          'fracción IV · artículo 78 · uso de suelo · dictamen normativo',
        ].map((line, i) => (
          <div key={i} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{line}</div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '7px', height: '7px', borderRadius: '50%', background: accent, display: 'inline-block', flexShrink: 0 }}
        />
        <span style={{ fontSize: '13px', color: accentA }}>Generando...</span>
      </div>
      <div style={DIVIDER}/>
      <div style={CARD_TITLE}>Asistente de Tesis</div>
      <div style={CARD_DESC}>Redacción académica con normativa vigente</div>
      <Tags tags={['APA 7', 'NTC 2023', 'Plagio 0%']}/>
    </>
  );
}

const CARDS_CONFIG = [
  {
    href: '/presupuesto',
    bg: 'rgba(59,130,246,0.10)',
    border: 'rgba(59,130,246,0.25)',
    hoverBorder: 'rgba(59,130,246,0.50)',
    accent: '#60a5fa',
    accentA: 'rgba(96,165,250,0.6)',
    accentB: 'rgba(96,165,250,0.25)',
    Content: Card1,
  },
  {
    href: '/materiales',
    bg: 'rgba(16,185,129,0.10)',
    border: 'rgba(16,185,129,0.25)',
    hoverBorder: 'rgba(16,185,129,0.50)',
    accent: '#34d399',
    accentA: 'rgba(52,211,153,0.6)',
    accentB: 'rgba(52,211,153,0.25)',
    Content: Card2,
  },
  {
    href: '/checklist',
    bg: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.25)',
    hoverBorder: 'rgba(139,92,246,0.50)',
    accent: '#a78bfa',
    accentA: 'rgba(167,139,250,0.6)',
    accentB: 'rgba(167,139,250,0.25)',
    Content: Card3,
  },
  {
    href: '/simulador',
    bg: 'rgba(249,115,22,0.10)',
    border: 'rgba(249,115,22,0.25)',
    hoverBorder: 'rgba(249,115,22,0.50)',
    accent: '#fb923c',
    accentA: 'rgba(251,146,60,0.6)',
    accentB: 'rgba(251,146,60,0.25)',
    Content: Card4,
  },
  {
    href: '/agente',
    bg: 'rgba(6,182,212,0.10)',
    border: 'rgba(6,182,212,0.25)',
    hoverBorder: 'rgba(6,182,212,0.50)',
    accent: '#22d3ee',
    accentA: 'rgba(34,211,238,0.6)',
    accentB: 'rgba(34,211,238,0.25)',
    Content: Card5,
  },
  {
    href: '/tesis',
    bg: 'rgba(244,63,94,0.10)',
    border: 'rgba(244,63,94,0.25)',
    hoverBorder: 'rgba(244,63,94,0.50)',
    accent: '#fb7185',
    accentA: 'rgba(251,113,133,0.6)',
    accentB: 'rgba(251,113,133,0.25)',
    Content: Card6,
  },
];

export function ToolCardsSection() {
  return (
    <section id="herramientas" style={{ padding: '100px 40px' }}>
      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
        Plataforma
      </p>
      <h2 style={{ textAlign: 'center', fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '56px' }}>
        Todo lo que necesitas para tu obra
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        {CARDS_CONFIG.map(({ href, bg, border, hoverBorder, accent, accentA, accentB, Content }, i) => (
          <Link href={href} key={href} style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.10 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: hoverBorder, transition: { duration: 0.3 } }}
              style={{ ...CARD_BASE, background: bg, border: `1px solid ${border}` }}
            >
              <Content accent={accent} accentA={accentA} accentB={accentB}/>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
