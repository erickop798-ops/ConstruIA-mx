'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.10, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    const nav = document.querySelector('.cia-nav') as HTMLElement;
    const onScroll = () => {
      const container = document.querySelector('.landing-page');
      const scrollY = container ? (container as HTMLElement).scrollTop : window.scrollY;
      nav?.classList.toggle('scrolled', scrollY > 20);
    };
    const container = document.querySelector('.landing-page');
    container?.addEventListener('scroll', onScroll);
    return () => {
      obs.disconnect();
      container?.removeEventListener('scroll', onScroll);
    };
  }, []);

  const tools = [
    { name: 'Presupuestador Pro', desc: 'CMIC 2026 · 3 escenarios · PDF LOPSRM', href: '/presupuesto', tags: ['CMIC 2026', 'PDF', '33 estados'], visual: 'presupuesto' },
    { name: 'Calculadora de Materiales', desc: 'Lista exacta con factor de desperdicio', href: '/materiales', tags: ['Precios 2026', 'PDF', '8 tipos'], visual: 'materiales' },
    { name: 'Checklist de Permisos', desc: 'Documentos por estado y tipo de obra', href: '/checklist', tags: ['32 estados', 'Oficial', 'PDF'], visual: 'checklist' },
    { name: 'Simulador de Remodelaci&#243;n', desc: 'Estimado en minutos con IA', href: '/simulador', tags: ['IA', '10 tipos', 'Desglose'], visual: 'simulador' },
    { name: 'Agente ConstruIA', desc: 'Copiloto IA para tu obra', href: '/agente', tags: ['IA', 'CMIC', 'NTC-RCDF'], visual: 'agente' },
    { name: 'Asistente de Tesis', desc: 'Tesis, memorias y residencia profesional', href: '/tesis', tags: ['Tesis', 'Memorias', 'NTC-RCDF'], visual: 'tesis' }
  ];

  const ToolVisual = ({ type }: { type: string }) => {
    const gradients: Record<string, string> = {
      presupuesto: 'linear-gradient(135deg, #1a0f00 0%, #2d1a00 40%, #1a0f00 100%)',
      materiales:  'linear-gradient(135deg, #001a2d 0%, #002d4a 40%, #001a2d 100%)',
      checklist:   'linear-gradient(135deg, #001a12 0%, #002d1f 40%, #001a12 100%)',
      simulador:   'linear-gradient(135deg, #0f0020 0%, #1a0035 40%, #0f0020 100%)',
      agente:      'linear-gradient(135deg, #1a0010 0%, #2d001a 40%, #1a0010 100%)',
      tesis:       'linear-gradient(135deg, #0f1000 0%, #1a1a00 40%, #0f1000 100%)'
    };
    const accentColors: Record<string, string> = {
      presupuesto: '#C8973A',
      materiales:  '#3B82F6',
      checklist:   '#10A37F',
      simulador:   '#8B5CF6',
      agente:      '#EC4899',
      tesis:       '#F59E0B'
    };
    const color    = accentColors[type] || '#C8973A';
    const gradient = gradients[type]    || gradients['presupuesto'];

    return (
      <div style={{ position: 'absolute', inset: 0, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${color}08 1px, transparent 1px), linear-gradient(90deg, ${color}08 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '80%', maxWidth: '200px' }}>

          {type === 'presupuesto' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '8px' }}>PRESUPUESTO</div>
              <div style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'monospace', color, lineHeight: 1, letterSpacing: '-2px' }}>$1.1M</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>CMIC 2026 · 3 escenarios</div>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' as const, gap: '5px' }}>
                {[['Materiales', '58%'], ['Mano de obra', '27%'], ['Indirectos', '15%']].map(([l, w]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', width: '72px', textAlign: 'right' as const, flexShrink: 0 }}>{l}</span>
                    <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: w, background: color, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'materiales' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '10px' }}>MATERIALES</div>
              {[
                ['Cemento CPC 30R', '48 bolsas'],
                ['Varilla 3/8"',    '24 pzas'],
                ['Block 15×20×40', '890 pzas'],
                ['Arena',           '2.4 m³'],
                ['Grava',           '1.8 m³']
              ].map(([m, c]) => (
                <div key={m} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '5px', marginBottom: '5px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{m}</span>
                  <span style={{ fontFamily: 'monospace', color, fontWeight: 600 }}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {type === 'checklist' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '10px' }}>PERMISOS</div>
              {[
                { done: true,  t: 'Licencia de construcción' },
                { done: true,  t: 'Planos estructurales' },
                { done: true,  t: 'Manifestación de obra' },
                { done: false, t: 'Dictamen uso de suelo' },
                { done: false, t: 'Alineamiento oficial' }
              ].map(({ done, t }) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: done ? `${color}20` : 'rgba(255,255,255,0.05)', border: `1px solid ${done ? color : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: done ? color : 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{done ? '✓' : ''}</div>
                  <span style={{ fontSize: '10px', color: done ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.30)' }}>{t}</span>
                </div>
              ))}
            </div>
          )}

          {type === 'simulador' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '10px' }}>SIMULADOR IA</div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Quiero remodelar mi cocina...</div>
              <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '9px', color: `${color}80`, marginBottom: '4px' }}>Estimado IA · Tu ciudad</div>
                <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'monospace', color, lineHeight: 1 }}>$45,000</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>3-4 semanas de obra</div>
              </div>
            </div>
          )}

          {type === 'agente' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color }}>C</div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>Agente ConstruIA</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px 6px 6px 2px', padding: '8px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.55)', marginBottom: '6px' }}>&#191;Qu&#233; calibre de cable para instalaci&#243;n el&#233;ctrica?</div>
              <div style={{ background: `${color}12`, border: `1px solid ${color}25`, borderRadius: '2px 6px 6px 6px', padding: '8px 10px', fontSize: '10px', color: 'rgba(255,255,255,0.70)' }}>
                <strong style={{ color }}>Cal. 12 AWG</strong> m&#237;nimo para circuitos de 20A seg&#250;n NTC-ANCE 2023.
              </div>
            </div>
          )}

          {type === 'tesis' && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '10px' }}>ACAD&#201;MICO</div>
              <div style={{ background: `${color}10`, border: `1px solid ${color}25`, borderRadius: '8px', padding: '10px 12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: `${color}80`, marginBottom: '6px' }}>TESIS DE ARQUITECTURA</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>Cap. 3: Marco Normativo</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', marginTop: '3px' }}>NTC-RCDF 2023 · &#167;4.2</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
                {['Tesis', 'Memorias', 'Residencia'].map(t => (
                  <span key={t} style={{ padding: '3px 7px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>{t}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="landing-page">

      {/* ═══ NAV ═══ */}
      <nav className="cia-nav">
        <div className="cia-nav-logo">CONSTRUIA<span>.</span></div>
        <ul className="cia-nav-links">
          <li><a href="#herramientas">Herramientas</a></li>
          <li><a href="#precios">Precios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="cia-btn-login">Iniciar sesi&#243;n</button>
          <Link href="/presupuesto" style={{ textDecoration: 'none' }}>
            <button className="cia-btn-cta">Crear presupuesto &#8594;</button>
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="cia-hero">
        <span className="reveal" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(200,151,58,0.8)', marginBottom: '16px', display: 'block' }}>
          El copiloto de construcci&#243;n para M&#233;xico
        </span>
        <h1 className="cia-hero-h1 reveal reveal-d1">
          Desc&#237;belo.<br />
          ConstruIA lo calcula.
        </h1>
        <p className="cia-hero-sub reveal reveal-d2">
          Presupuestos, materiales, permisos y remodelaciones.
          Precios CMIC 2026 para los 33 estados de M&#233;xico.
        </p>

        {/* INPUT */}
        <div className="cia-hero-input-wrap reveal reveal-d3">
          <div style={{ flex: 1 }}>
            <textarea
              className="cia-hero-input"
              placeholder="Presupuesta una casa de 120m² en Tu Estado con acabados estándar..."
              rows={2}
            />
            <div className="cia-hero-input-bottom">
              <span className="cia-hero-input-hint">
                CMIC 2026 &nbsp;&#183;&nbsp; 33 estados &nbsp;&#183;&nbsp; PDF LOPSRM
              </span>
              <Link href="/presupuesto" style={{ textDecoration: 'none' }}>
                <button className="cia-hero-send" aria-label="Ir al presupuestador">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* MOCKUP — 3 paneles IA Copilot */}
        <div className="cia-hero-mockup reveal reveal-d4">
          <div className="cia-hero-mockup-img" style={{
            background: '#0E0E0E',
            minHeight: '460px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr 1fr',
            gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.06)'
          }}>

            {/* PANEL IZQUIERDA — Chat del Agente IA */}
            <div style={{ background: '#111111', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#C8973A', fontWeight: 700, flexShrink: 0 }}>C</div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Agente ConstruIA</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10A37F' }} />
                    <span style={{ fontSize: '9px', color: 'rgba(16,163,127,0.8)' }}>En l&#237;nea</span>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              {([
                { user: true,  text: '¿Cuánto cuesta construir 120m² en Jalisco?' },
                { user: false, text: 'Para Jalisco, el costo estándar CMIC 2026 es de $11,400/m². Para 120m²:' },
                { user: false, isResult: true, text: '' }
              ] as { user: boolean; text: string; isResult?: boolean }[]).map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.user ? 'flex-end' : 'flex-start' }}>
                  {msg.isResult ? (
                    <div style={{ background: 'rgba(200,151,58,0.08)', border: '1px solid rgba(200,151,58,0.20)', borderRadius: '8px', padding: '10px 12px', width: '100%' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(200,151,58,0.7)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Estimado calculado</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'monospace', color: '#C8973A', lineHeight: 1 }}>$1,368,000</div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        {[['Eco', '$1.02M'], ['Est', '$1.37M'], ['Pre', '$1.92M']].map(([l, v]) => (
                          <div key={l} style={{ flex: 1, padding: '4px', background: l === 'Est' ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${l === 'Est' ? 'rgba(200,151,58,0.30)' : 'rgba(255,255,255,0.06)'}`, borderRadius: '4px', textAlign: 'center' as const }}>
                            <div style={{ fontSize: '8px', color: l === 'Est' ? 'rgba(200,151,58,0.7)' : 'rgba(255,255,255,0.3)' }}>{l}</div>
                            <div style={{ fontSize: '10px', fontFamily: 'monospace', color: l === 'Est' ? '#C8973A' : 'rgba(255,255,255,0.4)', fontWeight: l === 'Est' ? 700 : 400 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ maxWidth: '90%', padding: '8px 10px', borderRadius: msg.user ? '8px 8px 2px 8px' : '8px 8px 8px 2px', background: msg.user ? 'rgba(200,151,58,0.10)' : 'rgba(255,255,255,0.05)', border: `1px solid ${msg.user ? 'rgba(200,151,58,0.20)' : 'rgba(255,255,255,0.07)'}`, fontSize: '10px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Input chat */}
              <div style={{ marginTop: 'auto', padding: '8px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
                <span style={{ flex: 1 }}>Pregunta sobre tu obra...</span>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="#C8973A" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* PANEL CENTRAL — Dashboard principal */}
            <div style={{ background: '#131313', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>ConstruIA<span style={{ color: '#C8973A' }}>.</span></span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Presupuesto', 'Materiales', 'Agente'].map(t => (
                    <span key={t} style={{ padding: '3px 8px', background: t === 'Presupuesto' ? 'rgba(200,151,58,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${t === 'Presupuesto' ? 'rgba(200,151,58,0.25)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '4px', fontSize: '9px', color: t === 'Presupuesto' ? 'rgba(200,151,58,0.9)' : 'rgba(255,255,255,0.35)', fontWeight: t === 'Presupuesto' ? 600 : 400 }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>ESTIMADO TOTAL · M&#201;XICO</div>
                <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'monospace', color: '#C8973A', lineHeight: 1, letterSpacing: '-1px' }}>$1,368,000</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '6px' }}>120 m&#178; · Jalisco · Est&#225;ndar · CMIC 2026</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { l: 'Materiales',   v: '$795,440', w: '58%', c: 'rgba(200,151,58,0.7)' },
                  { l: 'Mano de obra', v: '$368,160', w: '27%', c: 'rgba(59,130,246,0.7)' },
                  { l: 'Indirectos',   v: '$136,800', w: '10%', c: 'rgba(16,163,127,0.7)' },
                  { l: 'Imprevistos',  v: '$67,600',  w: '5%',  c: 'rgba(139,92,246,0.7)' }
                ].map(({ l, v, w, c }) => (
                  <div key={l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</span>
                      <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.70)', fontWeight: 500 }}>{v}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: w, background: c, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', marginBottom: '4px' }}>3 ESCENARIOS SIMULT&#193;NEOS</div>
                {[
                  { l: 'Económico', v: '$1,025,000', w: '67%', active: false },
                  { l: 'Estándar',  v: '$1,368,000', w: '89%', active: true  },
                  { l: 'Premium',        v: '$1,915,000', w: '100%',active: false }
                ].map(({ l, v, w, active }) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 8px', borderRadius: '5px', background: active ? 'rgba(200,151,58,0.08)' : 'transparent', border: active ? '1px solid rgba(200,151,58,0.18)' : '1px solid transparent' }}>
                    <span style={{ fontSize: '10px', color: active ? 'rgba(200,151,58,0.9)' : 'rgba(255,255,255,0.35)', width: '68px', flexShrink: 0 }}>{l}</span>
                    <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: w, background: active ? '#C8973A' : 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: active ? '#C8973A' : 'rgba(255,255,255,0.25)', fontWeight: active ? 700 : 400, width: '72px', textAlign: 'right' as const, flexShrink: 0 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PANEL DERECHA — Agentes activos */}
            <div style={{ background: '#0F0F0F', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', marginBottom: '4px' }}>AGENTES ACTIVOS</div>
              {[
                { name: 'Presupuestador CMIC',    status: 'Calculando', color: '#C8973A', prog: 85  },
                { name: 'Verificador NTC-RCDF',   status: 'Activo',     color: '#10A37F', prog: 60  },
                { name: 'Generador PDF LOPSRM',   status: 'En espera',  color: '#6E6E6E', prog: 0   },
                { name: 'Agente Consulta IA',     status: 'Completado', color: '#3B82F6', prog: 100 }
              ].map(({ name, status, color, prog }) => (
                <div key={name} style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{name}</span>
                    </div>
                    <span style={{ fontSize: '9px', color, fontWeight: 600 }}>{status}</span>
                  </div>
                  {prog > 0 && (
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prog}%`, background: color, borderRadius: '1px' }} />
                    </div>
                  )}
                </div>
              ))}
              <div style={{ marginTop: 'auto', padding: '8px 10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' as const }}>
                {['CMIC', 'NTC-RCDF', 'LOPSRM', 'SICT', 'CENAPRED'].map(s => (
                  <span key={s} style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '3px', fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em' }}>{s}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ HERRAMIENTAS ═══ */}
      <section className="cia-section" id="herramientas">
        <span className="cia-section-label reveal">Plataforma</span>
        <h2 className="cia-section-h2 reveal reveal-d1">Todo lo que necesitas para tu obra</h2>
        <div className="cia-tools-grid">
          {tools.map((tool, i) => (
            <Link href={tool.href} key={tool.name} style={{ textDecoration: 'none' }}>
              <div className={`cia-tool-card reveal reveal-d${(i % 4) + 1}`}>
                <div className="cia-tool-card-visual">
                  <ToolVisual type={tool.visual} />
                </div>
                <div className="cia-tool-card-overlay">
                  <div className="cia-tool-card-name">{tool.name}</div>
                  <div className="cia-tool-card-desc">{tool.desc}</div>
                  <div className="cia-tool-card-tags">
                    {tool.tags.map(t => (
                      <span key={t} className="cia-tool-card-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FEATURE 1 — texto izq, mockup der ═══ */}
      <section className="cia-section" id="precios">
        <div className="cia-feature">
          <div className="cia-feature-text reveal">
            <span className="cia-feature-label">PRESUPUESTO PRECISO</span>
            <h2 className="cia-feature-h2">Precios reales,<br />por tu estado</h2>
            <p className="cia-feature-p">
              No un promedio nacional. ConstruIA aplica el &#237;ndice FIC SICT 2025
              con factores diferenciados para materiales y mano de obra en los 33 estados.
              Cada estado tiene su costo real.
            </p>
            <div className="cia-feature-tags">
              {['CEICO-CMIC 2026', 'FIC SICT 2025', '33 estados', 'Sin IVA'].map(t => (
                <span key={t} className="cia-feature-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="cia-feature-visual reveal reveal-d2">
            <div className="cia-feature-mockup" style={{ padding: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dimmed)' }}>FACTOR REGIONAL · TU ESTADO</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                {[
                  { l: 'Factor materiales',   v: '0.98', d: '-2.0%'      },
                  { l: 'Factor mano de obra', v: '0.94', d: '-6.0%'      },
                  { l: 'Precio base CDMX',    v: '1.00', d: 'referencia' },
                  { l: 'Variación vs media', v: '-3.8%', d: 'por debajo' }
                ].map(({ l, v, d }) => (
                  <div key={l} style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dimmed)', marginBottom: '6px' }}>{l}</div>
                    <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--gold)' }}>{v}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-dimmed)', marginTop: '2px' }}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '8px', padding: '10px 12px', background: 'rgba(200,151,58,0.06)', border: '1px solid rgba(200,151,58,0.15)', borderRadius: 'var(--radius-md)', fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                Fuente: FIC SICT 2025 &nbsp;&#183;&nbsp; Actualizado mar 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE 2 — mockup izq, texto der ═══ */}
      <section className="cia-section" id="nosotros">
        <div className="cia-feature reverse">
          <div className="cia-feature-visual reveal">
            <div className="cia-feature-mockup" style={{ padding: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dimmed)' }}>AGENTES ACTIVOS</div>
              {[
                { name: 'Presupuestador CMIC',  status: 'Calculando', color: '#C8973A' },
                { name: 'Verificador Normativo', status: 'Activo',     color: '#10A37F' },
                { name: 'Generador PDF',         status: 'En espera',  color: '#6E6E6E' },
                { name: 'Agente Consulta',       status: 'Completado', color: '#3B82F6' }
              ].map(({ name, status, color }) => (
                <div key={name} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color, fontWeight: 500 }}>{status}</span>
                </div>
              ))}
              <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', fontSize: '11px', color: 'var(--text-dimmed)', textAlign: 'center' }}>
                4 agentes &nbsp;&#183;&nbsp; 2 tareas activas
              </div>
            </div>
          </div>
          <div className="cia-feature-text reveal reveal-d2">
            <span className="cia-feature-label">PLATAFORMA INTEGRADA</span>
            <h2 className="cia-feature-h2">Todas tus herramientas,<br />en un modelo conectado</h2>
            <p className="cia-feature-p">
              El presupuestador alimenta al Agente IA. El Agente responde con
              contexto real de tu obra. El PDF toma los datos de ambos.
              Todo conectado, sin copiar y pegar entre herramientas.
            </p>
            <div className="cia-feature-tags">
              {['Presupuestador', 'Agente IA', 'Simulador', 'Checklist', 'Materiales', 'Tesis'].map(t => (
                <span key={t} className="cia-feature-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="cia-cta-section">
        <span className="reveal" style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dimmed)', marginBottom: '16px' }}>
          Sin tarjeta de cr&#233;dito &nbsp;&#183;&nbsp; Gratis para empezar
        </span>
        <h2 className="cia-cta-h2 reveal reveal-d1">
          Empieza a construir<br />con precisi&#243;n.
        </h2>
        <p className="cia-cta-sub reveal reveal-d2">
          Arquitectos e ingenieros en los 33 estados de M&#233;xico
          ya usan ConstruIA para ganar tiempo y ganar clientes.
        </p>
        <Link href="/presupuesto" style={{ textDecoration: 'none' }}>
          <button className="cia-btn-cta reveal reveal-d3" style={{ padding: '12px 28px', fontSize: '15px' }}>
            Crear presupuesto gratis &#8594;
          </button>
        </Link>
        <p className="reveal reveal-d4" style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-dimmed)', letterSpacing: '.06em' }}>
          CMIC 2026 &nbsp;&#183;&nbsp; NTC-RCDF 2023 &nbsp;&#183;&nbsp; LOPSRM &nbsp;&#183;&nbsp; SICT 2025
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="cia-nav-logo">CONSTRUIA<span>.</span></div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            ['Presupuestador', '/presupuesto'],
            ['Materiales',     '/materiales'],
            ['Checklist',      '/checklist'],
            ['Simulador',      '/simulador'],
            ['Agente',         '/agente'],
            ['Tesis',          '/tesis']
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{ fontSize: '13px', color: 'var(--text-dimmed)', transition: 'color .2s' }}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-dimmed)' }}>
          &#169; 2026 ConstruIA.mx &nbsp;&#183;&nbsp; Hecho en M&#233;xico
        </p>
      </footer>

    </div>
  );
}
