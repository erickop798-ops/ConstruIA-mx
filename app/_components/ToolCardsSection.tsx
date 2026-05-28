'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CARD_STYLE: React.CSSProperties = {
  background: '#141414',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '20px',
  padding: '28px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  transition: 'border-color 0.3s, transform 0.3s',
  height: '100%',
};

const EYEBROW: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'rgba(200,151,58,0.80)',
  marginBottom: '14px',
};

const CARD_TITLE: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  color: '#f5f5f7',
  marginBottom: '6px',
  lineHeight: 1.25,
};

const CARD_DESC: React.CSSProperties = {
  fontSize: '13px',
  color: 'rgba(255,255,255,0.40)',
  marginBottom: '12px',
  lineHeight: 1.5,
};

const TAG: React.CSSProperties = {
  padding: '3px 9px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '5px',
  fontSize: '10px',
  color: 'rgba(255,255,255,0.38)',
  fontWeight: 500,
};

const DIVIDER: React.CSSProperties = {
  height: '1px',
  background: 'rgba(255,255,255,0.07)',
  margin: '14px 0',
};

function Tags({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
      {tags.map((t) => (
        <span key={t} style={TAG}>{t}</span>
      ))}
    </div>
  );
}

/* ─── Card 1: Presupuestador ─── */
function Card1() {
  return (
    <>
      <p style={EYEBROW}>Estimado CMIC 2026</p>
      <div style={{ marginBottom: '4px' }}>
        <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'monospace', color: '#ffffff', lineHeight: 1 }}>
          $2,340,000
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '5px' }}>
          Residencial 187m&#178; &nbsp;&#183;&nbsp; Tlaxcala
        </div>
      </div>
      <div style={DIVIDER} />
      <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
        {[
          { l: 'Eco',  v: '$1.87M', gold: false },
          { l: 'Est',  v: '$2.34M', gold: true  },
          { l: 'Pre',  v: '$3.12M', gold: false },
        ].map(({ l, v, gold }) => (
          <div
            key={l}
            style={{
              flex: 1,
              padding: '6px 8px',
              background: gold ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${gold ? 'rgba(200,151,58,0.30)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '7px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '9px', color: gold ? 'rgba(200,151,58,0.65)' : 'rgba(255,255,255,0.28)', marginBottom: '3px' }}>{l}</div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: gold ? 700 : 400, color: gold ? '#C8973A' : 'rgba(255,255,255,0.40)' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Presupuestador Pro</div>
      <div style={CARD_DESC}>CMIC 2026 &nbsp;&#183;&nbsp; 3 escenarios &nbsp;&#183;&nbsp; PDF LOPSRM</div>
      <Tags tags={['CMIC 2026', 'PDF', '33 estados']} />
    </>
  );
}

/* ─── Card 2: Materiales ─── */
function Card2() {
  const rows = [
    ['Cemento CPC 30R', '48 bolsas'],
    ['Varilla 3/8"',    '24 pzas'],
    ['Block 15×20×40',  '890 pzas'],
  ];
  return (
    <>
      <p style={EYEBROW}>Lista de Materiales</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
        {rows.map(([mat, cant]) => (
          <div key={mat} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.52)', flex: 1 }}>{mat}</span>
            <span style={{ borderBottom: '1px dotted rgba(255,255,255,0.12)', flex: 1 }} />
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#C8973A', fontWeight: 600 }}>{cant}</span>
          </div>
        ))}
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Calculadora de Materiales</div>
      <div style={CARD_DESC}>Lista exacta con factor de desperdicio</div>
      <Tags tags={['Precios 2026', 'PDF', '8 tipos']} />
    </>
  );
}

/* ─── Card 3: Checklist ─── */
function Card3() {
  const items = [
    { done: true,  t: 'Licencia de construcci&#243;n' },
    { done: true,  t: 'Planos estructurales' },
    { done: false, t: 'Dictamen uso de suelo' },
    { done: false, t: 'Manifestaci&#243;n de impacto' },
  ];
  return (
    <>
      <p style={EYEBROW}>Permisos &nbsp;&#183;&nbsp; 32 Estados</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {items.map(({ done, t }) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: done ? '#C8973A' : 'rgba(255,255,255,0.22)', flexShrink: 0 }}>
              {done ? '✓' : '○'}
            </span>
            <span
              dangerouslySetInnerHTML={{ __html: t }}
              style={{ fontSize: '12px', color: done ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.28)' }}
            />
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
          <span>Progreso</span>
          <span>2 de 4 completados</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '50%', background: '#C8973A', borderRadius: '2px' }} />
        </div>
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Checklist de Permisos</div>
      <div style={CARD_DESC}>Documentos por estado y tipo de obra</div>
      <Tags tags={['32 estados', 'Oficial', 'PDF']} />
    </>
  );
}

/* ─── Card 4: Simulador ─── */
function Card4() {
  const bars = [
    { l: 'Demolici&#243;n', pct: 20,  gold: false },
    { l: 'Instalac.',        pct: 60,  gold: true  },
    { l: 'Acabados',         pct: 100, gold: false },
  ];
  return (
    <>
      <p style={EYEBROW}>Estimado Remodelaci&#243;n</p>
      <div style={{ marginBottom: '4px' }}>
        <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'monospace', color: '#ffffff', lineHeight: 1 }}>
          $45,000
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '5px' }}>
          Cocina integral &nbsp;&#183;&nbsp; 3&#8211;4 semanas
        </div>
      </div>
      <div style={DIVIDER} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
        {bars.map(({ l, pct, gold }) => (
          <div key={l}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
              <span dangerouslySetInnerHTML={{ __html: l }} style={{ color: gold ? '#C8973A' : 'rgba(255,255,255,0.45)' }} />
              <span style={{ fontFamily: 'monospace', color: gold ? '#C8973A' : 'rgba(255,255,255,0.30)' }}>{pct}%</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: gold ? '#C8973A' : 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Simulador de Remodelaci&#243;n</div>
      <div style={CARD_DESC}>Costos reales por espacio y acabado</div>
      <Tags tags={['IA', 'Instantáneo', 'PDF']} />
    </>
  );
}

/* ─── Card 5: Agente IA ─── */
function Card5() {
  const convo = [
    { user: true,  text: '&#191;Calibre de cable para 20A?' },
    { user: false, text: '<span style="color:#C8973A;font-weight:600">Cal. 12 AWG</span> seg&#250;n NTC-ANCE 2023' },
    { user: true,  text: '&#191;Resistencia m&#237;nima de concreto?' },
    { user: false, text: "f'c = <span style=\"color:#C8973A;font-weight:600\">200 kg/cm&#178;</span> uso habitacional" },
  ];
  return (
    <>
      <p style={EYEBROW}>Copiloto IA</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '18px' }}>
        {convo.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.user ? 'flex-end' : 'flex-start' }}>
            <div
              dangerouslySetInnerHTML={{ __html: msg.text }}
              style={{
                maxWidth: '88%',
                padding: '7px 11px',
                borderRadius: msg.user ? '10px 10px 3px 10px' : '10px 10px 10px 3px',
                background: msg.user ? '#1e1e1e' : 'rgba(200,151,58,0.07)',
                border: `1px solid ${msg.user ? 'rgba(255,255,255,0.07)' : 'rgba(200,151,58,0.18)'}`,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.45,
              }}
            />
          </div>
        ))}
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Copiloto IA</div>
      <div style={CARD_DESC}>Respuestas t&#233;cnicas al instante</div>
      <Tags tags={['Claude AI', 'NTC 2023', 'CMIC']} />
    </>
  );
}

/* ─── Card 6: Tesis ─── */
function Card6() {
  return (
    <>
      <p style={EYEBROW}>Tesis de Arquitectura</p>
      {/* Chapter progress */}
      <div
        style={{
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          marginBottom: '10px',
        }}
      >
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: '4px' }}>
          Cap. 3: Marco Normativo
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(200,151,58,0.65)' }}>
          NTC-RCDF 2023 &nbsp;&#183;&nbsp; &#167;4.2
        </div>
      </div>
      {/* Simulated academic text */}
      <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {[90, 100, 70].map((w, i) => (
          <div
            key={i}
            style={{
              height: '6px',
              width: `${w}%`,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '3px',
            }}
          />
        ))}
      </div>
      {/* Generating badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '18px' }}>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#C8973A',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
          Generando...
        </span>
      </div>
      <div style={DIVIDER} />
      <div style={CARD_TITLE}>Asistente de Tesis</div>
      <div style={CARD_DESC}>Redacci&#243;n acad&#233;mica con normativa vigente</div>
      <Tags tags={['APA 7', 'NTC 2023', 'Plagio 0%']} />
    </>
  );
}

const CARDS: { href: string; Content: React.FC }[] = [
  { href: '/presupuesto', Content: Card1 },
  { href: '/materiales',  Content: Card2 },
  { href: '/checklist',   Content: Card3 },
  { href: '/simulador',   Content: Card4 },
  { href: '/agente',      Content: Card5 },
  { href: '/tesis',       Content: Card6 },
];

export function ToolCardsSection() {
  return (
    <section
      id="herramientas"
      style={{
        padding: '100px 40px',
        background: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse at bottom left, rgba(30,40,80,0.40) 0%, transparent 60%)',
      }}
    >
      {/* Section header */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#6e6e6e',
          marginBottom: '16px',
        }}
      >
        Plataforma
      </p>
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.022em',
          color: '#ffffff',
          marginBottom: '56px',
        }}
      >
        Todo lo que necesitas para tu obra
      </h2>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {CARDS.map(({ href, Content }, i) => (
          <Link href={href} key={href} style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.10 }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.10,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={CARD_STYLE}
              whileHover={{
                y: -4,
                borderColor: 'rgba(200,151,58,0.30)',
                transition: { duration: 0.2 },
              }}
            >
              <Content />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
