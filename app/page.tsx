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
    { name: 'Presupuestador Pro',         desc: 'CMIC 2026 · 3 escenarios · PDF LOPSRM',    href: '/presupuesto', tags: ['CMIC 2026', 'PDF', '33 estados'], visual: 'presupuesto', photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=480&fit=crop&q=85' },
    { name: 'Calculadora de Materiales',  desc: 'Lista exacta con factor de desperdicio',     href: '/materiales',  tags: ['Precios 2026', 'PDF', '8 tipos'], visual: 'materiales',  photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=480&fit=crop&q=85' },
    { name: 'Checklist de Permisos',      desc: 'Documentos por estado y tipo de obra',       href: '/checklist',   tags: ['32 estados', 'Oficial', 'PDF'],    visual: 'checklist',   photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=480&fit=crop&q=85' },
    { name: 'Simulador de Remodelación', desc: 'Estimado en minutos con IA',             href: '/simulador',   tags: ['IA', '10 tipos', 'Desglose'],      visual: 'simulador',   photo: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=480&fit=crop&q=85' },
    { name: 'Agente ConstruIA',           desc: 'Copiloto IA para tu obra',                   href: '/agente',      tags: ['IA', 'CMIC', 'NTC-RCDF'],          visual: 'agente',      photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=480&fit=crop&q=85' },
    { name: 'Asistente de Tesis',         desc: 'Tesis, memorias y residencia profesional',   href: '/tesis',       tags: ['Tesis', 'Memorias', 'NTC-RCDF'],   visual: 'tesis',       photo: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=480&fit=crop&q=85' }
  ];

  const ToolPanel = ({ type }: { type: string }) => {
    if (type === 'presupuesto') return (
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(200,151,58,0.65)', marginBottom: '5px' }}>Estimado CMIC 2026</div>
        <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace', color: '#C8973A', lineHeight: 1, marginBottom: '6px' }}>$1,368,000</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[['Eco','$1.02M'],['Est','$1.37M'],['Pre','$1.92M']].map(([l,v]) => (
            <div key={l} style={{ flex: 1, padding: '3px 4px', background: l==='Est'?'rgba(200,151,58,0.15)':'rgba(255,255,255,0.06)', border: `1px solid ${l==='Est'?'rgba(200,151,58,0.30)':'rgba(255,255,255,0.08)'}`, borderRadius: '4px', textAlign: 'center' as const }}>
              <div style={{ fontSize: '7px', color: l==='Est'?'rgba(200,151,58,0.7)':'rgba(255,255,255,0.30)' }}>{l}</div>
              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: l==='Est'?'#C8973A':'rgba(255,255,255,0.40)', fontWeight: l==='Est'?700:400 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
    if (type === 'materiales') return (
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(59,130,246,0.65)', marginBottom: '6px' }}>Lista de materiales</div>
        {[['Cemento CPC 30R','48 bolsas'],['Varilla 3/8"','24 pzas'],['Block 15×20×40','890 pzas']].map(([m,c]) => (
          <div key={m} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>{m}</span>
            <span style={{ fontFamily: 'monospace', color: '#3B82F6', fontWeight: 600 }}>{c}</span>
          </div>
        ))}
      </div>
    );
    if (type === 'checklist') return (
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(16,163,127,0.65)', marginBottom: '6px' }}>Permisos · Tu Estado</div>
        {[{done:true,t:'Licencia de construcción'},{done:true,t:'Planos estructurales'},{done:false,t:'Dictamen uso de suelo'}].map(({done,t}) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
            <span style={{ fontSize: '9px', color: done?'#10A37F':'rgba(255,255,255,0.20)' }}>{done?'✓':'○'}</span>
            <span style={{ fontSize: '10px', color: done?'rgba(255,255,255,0.65)':'rgba(255,255,255,0.30)' }}>{t}</span>
          </div>
        ))}
      </div>
    );
    if (type === 'simulador') return (
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(139,92,246,0.65)', marginBottom: '5px' }}>Estimado IA · Tu ciudad</div>
        <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'monospace', color: '#8B5CF6', lineHeight: 1, marginBottom: '4px' }}>$45,000</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>3–4 semanas de obra estimadas</div>
      </div>
    );
    if (type === 'agente') return (
      <div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.50)', marginBottom: '6px', fontStyle: 'italic' }}>¿Calibre de cable para 20A?</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
          <span style={{ color: '#EC4899', fontWeight: 600 }}>Cal. 12 AWG</span> según NTC-ANCE 2023
        </div>
      </div>
    );
    return (
      <div>
        <div style={{ fontSize: '8px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(245,158,11,0.65)', marginBottom: '5px' }}>Tesis de Arquitectura</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4 }}>Cap. 3: Marco Normativo</div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.30)', marginTop: '3px' }}>NTC-RCDF 2023 · §4.2</div>
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

        {/* INPUT — estructura exacta omma: bg #1E1E1E, radius 20px, sin border */}
        <div className="cia-hero-input-wrap reveal reveal-d3">
          <div className="cia-hero-input-inner">
            <textarea
              className="cia-hero-input"
              placeholder="Presupuesta una casa de 120m&#178; en Tu Estado con acabados est&#225;ndar..."
              rows={1}
            />
          </div>
          <div className="cia-hero-input-bottom">
            <button className="cia-hero-plus" aria-label="Adjuntar">+</button>
            <span className="cia-hero-input-hint">
              CMIC 2026 &nbsp;&#183;&nbsp; 33 estados &nbsp;&#183;&nbsp; PDF LOPSRM
            </span>
            <Link href="/presupuesto" style={{ textDecoration: 'none' }}>
              <button className="cia-hero-send" aria-label="Ir al presupuestador">
                {/* avión — mismo ícono de send que omma */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* MOCKUP — 3 paneles IA Copilot (máxima densidad) */}
        <div className="cia-hero-mockup reveal reveal-d4">
          <div className="cia-hero-mockup-img" style={{
            background: 'linear-gradient(135deg, #0F0F0F 0%, #111111 100%)',
            minHeight: '500px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr 1fr',
            gap: '0',
          }}>

            {/* PANEL IZQUIERDA — Chat del Agente IA */}
            <div style={{ background: '#111111', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#C8973A', fontWeight: 700, flexShrink: 0 }}>C</div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Agente ConstruIA</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10A37F' }} />
                    <span style={{ fontSize: '9px', color: 'rgba(16,163,127,0.8)' }}>En l&#237;nea</span>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              {([
                { user: true,  text: '¿Cuánto cuesta construir 120m² en Jalisco?' },
                { user: false, text: 'Para Jalisco, el costo estándar CMIC 2026 es $11,400/m². Para 120m²:' },
                { user: false, isResult: true, text: '' }
              ] as { user: boolean; text: string; isResult?: boolean }[]).map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.user ? 'flex-end' : 'flex-start' }}>
                  {msg.isResult ? (
                    <div style={{ background: 'rgba(200,151,58,0.08)', border: '1px solid rgba(200,151,58,0.20)', borderRadius: '8px', padding: '8px 10px', width: '100%' }}>
                      <div style={{ fontSize: '8px', color: 'rgba(200,151,58,0.7)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Estimado calculado</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#C8973A', lineHeight: 1 }}>$1,368,000</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                        {[['Eco','$1.02M'],['Est','$1.37M'],['Pre','$1.92M']].map(([l,v]) => (
                          <div key={l} style={{ flex: 1, padding: '3px', background: l==='Est'?'rgba(200,151,58,0.12)':'rgba(255,255,255,0.04)', border: `1px solid ${l==='Est'?'rgba(200,151,58,0.30)':'rgba(255,255,255,0.06)'}`, borderRadius: '3px', textAlign: 'center' as const }}>
                            <div style={{ fontSize: '7px', color: l==='Est'?'rgba(200,151,58,0.7)':'rgba(255,255,255,0.3)' }}>{l}</div>
                            <div style={{ fontSize: '9px', fontFamily: 'monospace', color: l==='Est'?'#C8973A':'rgba(255,255,255,0.4)', fontWeight: l==='Est'?700:400 }}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ maxWidth: '90%', padding: '7px 9px', borderRadius: msg.user?'7px 7px 2px 7px':'7px 7px 7px 2px', background: msg.user?'rgba(200,151,58,0.10)':'rgba(255,255,255,0.05)', border: `1px solid ${msg.user?'rgba(200,151,58,0.20)':'rgba(255,255,255,0.07)'}`, fontSize: '10px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.45 }}>
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Fuentes activas */}
              <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', marginBottom: '4px' }}>Fuentes activas</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' as const }}>
                  {['CMIC','NTC-RCDF','LOPSRM','SICT'].map(s => (
                    <span key={s} style={{ padding: '2px 5px', background: 'rgba(200,151,58,0.08)', border: '1px solid rgba(200,151,58,0.15)', borderRadius: '3px', fontSize: '8px', color: 'rgba(200,151,58,0.7)', letterSpacing: '.05em' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Progreso */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10A37F', flexShrink: 0 }} />
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>3 preguntas m&#225;s para cerrar presupuesto</span>
              </div>

              {/* Input chat */}
              <div style={{ marginTop: 'auto', padding: '7px 9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '7px', fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>
                <span style={{ flex: 1 }}>Pregunta sobre tu obra...</span>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(200,151,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="#C8973A" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#C8973A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* PANEL CENTRAL — Dashboard principal */}
            <div style={{ background: '#131313', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Barra app */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>ConstruIA<span style={{ color: '#C8973A' }}>.</span></span>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  {['Presupuesto','Materiales','Agente'].map(t => (
                    <span key={t} style={{ padding: '2px 7px', background: t==='Presupuesto'?'rgba(200,151,58,0.12)':'rgba(255,255,255,0.04)', border: `1px solid ${t==='Presupuesto'?'rgba(200,151,58,0.25)':'rgba(255,255,255,0.07)'}`, borderRadius: '4px', fontSize: '8px', color: t==='Presupuesto'?'rgba(200,151,58,0.9)':'rgba(255,255,255,0.35)', fontWeight: t==='Presupuesto'?600:400 }}>{t}</span>
                  ))}
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.20)', marginLeft: '4px' }}>Auto-guardando...</span>
                </div>
              </div>

              {/* Steps completados */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {['✓ Tipo','✓ Generales','✓ Estructura'].map(s => (
                  <span key={s} style={{ fontSize: '8px', color: 'rgba(16,163,127,0.8)', background: 'rgba(16,163,127,0.08)', border: '1px solid rgba(16,163,127,0.18)', padding: '2px 6px', borderRadius: '3px' }}>{s}</span>
                ))}
                <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', padding: '2px 6px', borderRadius: '3px' }}>Acabados</span>
              </div>

              {/* Número principal */}
              <div style={{ textAlign: 'center', padding: '4px 0' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>ESTIMADO TOTAL · M&#201;XICO</div>
                <div style={{ fontSize: '44px', fontWeight: 800, fontFamily: 'monospace', color: '#C8973A', lineHeight: 1, letterSpacing: '-1px' }}>$1,368,000</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '5px' }}>120 m&#178; · Jalisco · Est&#225;ndar · CMIC 2026</div>
              </div>

              {/* Barras de partidas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  {l:'Materiales',  v:'$795,440',w:'58%',c:'rgba(200,151,58,0.7)'},
                  {l:'Mano de obra',v:'$368,160',w:'27%',c:'rgba(59,130,246,0.7)'},
                  {l:'Indirectos',  v:'$136,800',w:'10%',c:'rgba(16,163,127,0.7)'},
                  {l:'Imprevistos', v:'$67,600', w:'5%', c:'rgba(139,92,246,0.7)'}
                ].map(({ l, v, w, c }) => (
                  <div key={l}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '3px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.50)' }}>{l}</span>
                      <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{v}</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: w, background: c, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabla de partidas principales */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)' }}>PARTIDA</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)' }}>UNIT.</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)' }}>IMPORTE</span>
                </div>
                {[
                  ['Cimentación','m³','$95,200'],
                  ['Muros',         'm²','$163,840'],
                  ['Losa',          'm²','$218,880']
                ].map(([p, u, v], idx, arr) => (
                  <div key={p} style={{ padding: '5px 10px', borderBottom: idx < arr.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>{p}</span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{u}</span>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Badge PDF listo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: 'rgba(200,151,58,0.06)', border: '1px solid rgba(200,151,58,0.18)', borderRadius: '6px' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#C8973A" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="#C8973A" strokeWidth="2"/>
                </svg>
                <span style={{ fontSize: '10px', color: '#C8973A', fontWeight: 600 }}>PDF LOPSRM listo para descargar</span>
              </div>
            </div>

            {/* PANEL DERECHA — Agentes activos */}
            <div style={{ background: '#0F0F0F', padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', marginBottom: '2px' }}>AGENTES ACTIVOS</div>
              {[
                {name:'Presupuestador CMIC',  status:'Calculando',color:'#C8973A',prog:85,  pulse:true},
                {name:'Verificador NTC-RCDF', status:'Activo',    color:'#10A37F',prog:60,  pulse:false},
                {name:'Generador PDF LOPSRM', status:'En espera', color:'#6E6E6E',prog:0,   pulse:false},
                {name:'Agente Consulta IA',   status:'Completado',color:'#3B82F6',prog:100, pulse:false}
              ].map(({ name, status, color, prog, pulse }) => (
                <div key={name} style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: prog > 0 ? '5px' : '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.60)', fontWeight: 500 }}>{name}</span>
                    </div>
                    <span style={{ fontSize: '8px', color, fontWeight: 600 }}>{status}</span>
                  </div>
                  {prog > 0 && (
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prog}%`, background: color, borderRadius: '1px', animation: pulse ? 'progress-pulse 1.5s ease-in-out infinite' : 'none' }} />
                    </div>
                  )}
                </div>
              ))}

              {/* Normativa verificada */}
              <div style={{ marginTop: '4px', padding: '8px', background: 'rgba(16,163,127,0.04)', border: '1px solid rgba(16,163,127,0.12)', borderRadius: '7px' }}>
                <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(16,163,127,0.6)', marginBottom: '6px' }}>Normativa verificada</div>
                {[
                  'NTC-RCDF 2023 Sección 4',
                  'LOPSRM Art. 32',
                  'Uso de suelo confirmado'
                ].map(n => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '9px', color: '#10A37F', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)' }}>{n}</span>
                  </div>
                ))}
              </div>

              {/* Badges de normas */}
              <div style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '5px', display: 'flex', gap: '4px', flexWrap: 'wrap' as const }}>
                {['CMIC','NTC-RCDF','LOPSRM','SICT','CENAPRED'].map(s => (
                  <span key={s} style={{ padding: '2px 5px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '3px', fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '.07em' }}>{s}</span>
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
                <div className="cia-tool-card-photo">
                  <img src={tool.photo} alt={tool.name} />
                  <div className="cia-tool-card-panel">
                    <ToolPanel type={tool.visual} />
                  </div>
                </div>
                <div className="cia-tool-card-text">
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

      {/* ═══ FEATURE 1 ═══ */}
      <section className="cia-section" id="precios">
        <div className="cia-feature">
          <div className="cia-feature-text reveal">
            <span className="cia-feature-label">PRESUPUESTO PRECISO</span>
            <h2 className="cia-feature-h2"><em style={{ fontStyle: 'italic', fontFamily: 'Georgia,serif' }}>Precios</em> reales,<br />por tu estado</h2>
            <p className="cia-feature-p">
              No un promedio nacional. ConstruIA aplica el &#237;ndice FIC SICT 2025
              con factores diferenciados para materiales y mano de obra en los 33 estados.
              Cada estado tiene su costo real.
            </p>
            <div className="cia-feature-tags">
              {['CEICO-CMIC 2026','FIC SICT 2025','33 estados','Sin IVA'].map(t => (
                <span key={t} className="cia-feature-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="cia-feature-visual reveal reveal-d2">
            <div className="cia-feature-mockup" style={{ padding: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dimmed)' }}>FACTOR REGIONAL · TU ESTADO</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                {[
                  {l:'Factor materiales',  v:'0.98',d:'-2.0%'},
                  {l:'Factor mano de obra',v:'0.94',d:'-6.0%'},
                  {l:'Precio base CDMX',   v:'1.00',d:'referencia'},
                  {l:'Variación vs media',v:'-3.8%',d:'por debajo'}
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

      {/* ═══ FEATURE 2 ═══ */}
      <section className="cia-section" id="nosotros">
        <div className="cia-feature reverse">
          <div className="cia-feature-visual reveal">
            <div className="cia-feature-mockup" style={{ padding: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-dimmed)' }}>AGENTES ACTIVOS</div>
              {[
                {name:'Presupuestador CMIC',  status:'Calculando',color:'#C8973A'},
                {name:'Verificador Normativo', status:'Activo',    color:'#10A37F'},
                {name:'Generador PDF',         status:'En espera', color:'#6E6E6E'},
                {name:'Agente Consulta',       status:'Completado',color:'#3B82F6'}
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
            <h2 className="cia-feature-h2"><em style={{ fontStyle: 'italic', fontFamily: 'Georgia,serif' }}>Todas</em> tus herramientas,<br />en un modelo conectado</h2>
            <p className="cia-feature-p">
              El presupuestador alimenta al Agente IA. El Agente responde con
              contexto real de tu obra. El PDF toma los datos de ambos.
              Todo conectado, sin copiar y pegar entre herramientas.
            </p>
            <div className="cia-feature-tags">
              {['Presupuestador','Agente IA','Simulador','Checklist','Materiales','Tesis'].map(t => (
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
          {[['Presupuestador','/presupuesto'],['Materiales','/materiales'],['Checklist','/checklist'],['Simulador','/simulador'],['Agente','/agente'],['Tesis','/tesis']].map(([label,href]) => (
            <Link key={label} href={href} style={{ fontSize: '13px', color: 'var(--text-dimmed)', transition: 'color .2s' }}>{label}</Link>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-dimmed)' }}>
          &#169; 2026 ConstruIA.mx &nbsp;&#183;&nbsp; Hecho en M&#233;xico
        </p>
      </footer>

    </div>
  );
}
