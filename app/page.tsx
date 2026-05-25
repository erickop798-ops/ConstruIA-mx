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
    {
      name: 'Presupuestador Pro',
      desc: 'CMIC 2026 · 3 escenarios · PDF LOPSRM',
      href: '/presupuesto',
      tags: ['CMIC 2026', 'PDF', '33 estados'],
      color: '#C8973A',
      visual: 'presupuesto'
    },
    {
      name: 'Calculadora de Materiales',
      desc: 'Lista exacta con factor de desperdicio',
      href: '/materiales',
      tags: ['Precios 2026', 'PDF', '8 tipos'],
      color: '#3B82F6',
      visual: 'materiales'
    },
    {
      name: 'Checklist de Permisos',
      desc: 'Documentos por estado y tipo de obra',
      href: '/checklist',
      tags: ['32 estados', 'Oficial', 'PDF'],
      color: '#10A37F',
      visual: 'checklist'
    },
    {
      name: 'Simulador de Remodelación',
      desc: 'Estimado en minutos con IA',
      href: '/simulador',
      tags: ['IA', '10 tipos', 'Desglose'],
      color: '#8B5CF6',
      visual: 'simulador'
    },
    {
      name: 'Agente ConstruIA',
      desc: 'Copiloto IA para tu obra',
      href: '/agente',
      tags: ['IA', 'CMIC', 'NTC-RCDF'],
      color: '#EC4899',
      visual: 'agente'
    },
    {
      name: 'Asistente de Tesis',
      desc: 'Tesis, memorias y residencia profesional',
      href: '/tesis',
      tags: ['Tesis', 'Memorias', 'NTC-RCDF'],
      color: '#F59E0B',
      visual: 'tesis'
    }
  ];

  function ToolVisual({ type }: { type: string }) {
    if (type === 'presupuesto') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.3)'}}>PRESUPUESTO EN VIVO</div>
        <div style={{fontSize:'28px',fontWeight:800,color:'#C8973A',fontFamily:'monospace',lineHeight:1}}>$1,112,100</div>
        <div style={{fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>Jun 2026 · Tlaxcala · CMIC</div>
        <div style={{height:'1px',background:'rgba(255,255,255,0.08)',margin:'4px 0'}}/>
        {[['Materiales','$578,292'],['Mano de obra','$422,598'],['Imprevistos','$111,210']].map(([k,v])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:'11px'}}>
            <span style={{color:'rgba(255,255,255,0.4)'}}>{k}</span>
            <span style={{fontFamily:'monospace',color:'rgba(255,255,255,0.7)'}}>{v}</span>
          </div>
        ))}
        <div style={{height:'1px',background:'rgba(255,255,255,0.08)',margin:'4px 0'}}/>
        {[{l:'Económico',v:'$834K',a:false},{l:'Estándar',v:'$1.1M',a:true},{l:'Premium',v:'$1.5M',a:false}].map(({l,v,a})=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'4px 8px',borderRadius:'4px',background:a?'rgba(200,151,58,0.12)':'transparent',border:a?'1px solid rgba(200,151,58,0.25)':'1px solid transparent',fontSize:'10px'}}>
            <span style={{color:a?'#C8973A':'rgba(255,255,255,0.35)'}}>{l}</span>
            <span style={{fontFamily:'monospace',color:a?'#C8973A':'rgba(255,255,255,0.3)',fontWeight:a?700:400}}>{v}</span>
          </div>
        ))}
      </div>
    );

    if (type === 'materiales') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'6px'}}>
        <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.3)'}}>LISTA DE COMPRA</div>
        <div style={{fontSize:'11px',color:'rgba(59,130,246,0.8)',marginBottom:'4px'}}>Losa nervada 120 m²</div>
        {[
          ['Cemento CPC 30R','48 bolsas','$12,240'],
          ['Varilla 3/8"','24 piezas','$4,680'],
          ['Block 15×20×40','890 pzas','$16,465'],
          ['Arena','2.4 m³','$960'],
          ['Grava','1.8 m³','$774']
        ].map(([m,c,p])=>(
          <div key={m} style={{display:'flex',justifyContent:'space-between',fontSize:'10px',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:'4px'}}>
            <span style={{color:'rgba(255,255,255,0.6)',flex:1}}>{m}</span>
            <span style={{color:'rgba(255,255,255,0.3)',marginRight:'8px'}}>{c}</span>
            <span style={{fontFamily:'monospace',color:'rgba(59,130,246,0.8)'}}>{p}</span>
          </div>
        ))}
        <div style={{marginTop:'4px',fontSize:'11px',fontWeight:600,color:'rgba(59,130,246,0.9)'}}>Total: $35,119</div>
      </div>
    );

    if (type === 'checklist') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.3)'}}>CHECKLIST DE PERMISOS</div>
        <div style={{fontSize:'11px',color:'rgba(16,163,127,0.8)',marginBottom:'4px'}}>Tlaxcala · Obra Nueva</div>
        {[
          {done:true,text:'Licencia de construcción'},
          {done:true,text:'Planos estructurales'},
          {done:true,text:'Manifestación de obra'},
          {done:false,text:'Dictamen uso de suelo'},
          {done:false,text:'Alineamiento y número'}
        ].map(({done,text})=>(
          <div key={text} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'11px'}}>
            <div style={{width:'16px',height:'16px',borderRadius:'50%',background:done?'rgba(16,163,127,0.20)':'rgba(255,255,255,0.05)',border:`1px solid ${done?'rgba(16,163,127,0.5)':'rgba(255,255,255,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'8px',color:done?'#10a37f':'rgba(255,255,255,0.2)'}}>
              {done ? '✓' : ''}
            </div>
            <span style={{color:done?'rgba(255,255,255,0.7)':'rgba(255,255,255,0.3)'}}>{text}</span>
          </div>
        ))}
        <div style={{marginTop:'6px',padding:'6px 10px',background:'rgba(16,163,127,0.08)',border:'1px solid rgba(16,163,127,0.2)',borderRadius:'6px',fontSize:'10px',color:'rgba(16,163,127,0.8)'}}>
          32 documentos identificados
        </div>
      </div>
    );

    if (type === 'simulador') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.3)'}}>SIMULADOR</div>
        <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'10px 12px',fontSize:'12px',color:'rgba(255,255,255,0.5)'}}>Quiero remodelar mi baño de 4m²...</div>
        <div style={{display:'flex',flexWrap:'wrap' as const,gap:'4px',marginTop:'2px'}}>
          {['Cocina','Baño','Fachada','Piso'].map(t=>(
            <span key={t} style={{padding:'3px 9px',background:t==='Baño'?'rgba(139,92,246,0.15)':'rgba(255,255,255,0.05)',border:`1px solid ${t==='Baño'?'rgba(139,92,246,0.4)':'rgba(255,255,255,0.08)'}`,borderRadius:'100px',fontSize:'10px',color:t==='Baño'?'rgba(139,92,246,0.9)':'rgba(255,255,255,0.35)'}}>{t}</span>
          ))}
        </div>
        <div style={{background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.2)',borderRadius:'8px',padding:'10px 12px',marginTop:'4px'}}>
          <div style={{fontSize:'10px',color:'rgba(139,92,246,0.7)',marginBottom:'4px'}}>Estimado IA</div>
          <div style={{fontSize:'16px',fontWeight:700,fontFamily:'monospace',color:'rgba(139,92,246,0.9)'}}>$32,000 – $45,000</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.3)',marginTop:'2px'}}>2-3 semanas · Monterrey</div>
        </div>
      </div>
    );

    if (type === 'agente') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(200,151,58,0.15)',border:'1px solid rgba(200,151,58,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700,color:'#C8973A',flexShrink:0}}>C</div>
          <div>
            <div style={{fontSize:'11px',fontWeight:600,color:'rgba(255,255,255,0.8)'}}>Agente ConstruIA</div>
            <div style={{fontSize:'9px',color:'rgba(16,163,127,0.8)'}}>● En línea</div>
          </div>
        </div>
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'6px 6px 6px 2px',padding:'8px 10px',fontSize:'11px',color:'rgba(255,255,255,0.6)'}}>¿Cuánto cuesta el cemento Cruz Azul en Tlaxcala?</div>
        <div style={{background:'rgba(200,151,58,0.08)',border:'1px solid rgba(200,151,58,0.15)',borderRadius:'2px 6px 6px 6px',padding:'8px 10px',fontSize:'11px',color:'rgba(255,255,255,0.7)'}}>
          <strong style={{color:'#C8973A'}}>$255/bolsa</strong> · CEICO-CMIC mar 2026
          <br/><span style={{fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>Factor Tlaxcala: 0.98</span>
        </div>
        <div style={{display:'flex',gap:'4px',flexWrap:'wrap' as const,marginTop:'2px'}}>
          {['CMIC','NTC-RCDF','LOPSRM'].map(s=>(
            <span key={s} style={{padding:'2px 7px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'4px',fontSize:'9px',color:'rgba(255,255,255,0.3)',letterSpacing:'.06em'}}>{s}</span>
          ))}
        </div>
      </div>
    );

    if (type === 'tesis') return (
      <div style={{width:'100%',padding:'12px',display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' as const,color:'rgba(255,255,255,0.3)'}}>ASISTENTE ACADÉMICO</div>
        <div style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:'8px',padding:'10px 12px'}}>
          <div style={{fontSize:'9px',fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'rgba(245,158,11,0.7)',marginBottom:'6px'}}>TESIS DE ARQUITECTURA</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',lineHeight:1.4}}>Capítulo 3: Marco Normativo</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.3)',marginTop:'3px'}}>NTC-RCDF 2023 · Sección 4.2...</div>
        </div>
        <div style={{display:'flex',flexWrap:'wrap' as const,gap:'4px'}}>
          {['Tesis','Memorias de cálculo','Residencia','Protocolo'].map(t=>(
            <span key={t} style={{padding:'3px 8px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'4px',fontSize:'10px',color:'rgba(255,255,255,0.35)'}}>{t}</span>
          ))}
        </div>
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'8px',padding:'8px 12px',fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>Ayúdame con mi protocolo...</div>
      </div>
    );

    return null;
  }

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
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <button className="cia-btn-login">Iniciar sesi&#243;n</button>
          <Link href="/presupuesto" style={{textDecoration:'none'}}>
            <button className="cia-btn-cta">Crear presupuesto &#8594;</button>
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="cia-hero">
        <span className="reveal" style={{fontSize:'12px',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(200,151,58,0.8)',marginBottom:'16px',display:'block'}}>
          El copiloto de construcci&#243;n para M&#233;xico
        </span>
        <h1 className="cia-hero-h1 reveal reveal-d1">
          Desc&#237;belo.<br/>
          ConstruIA lo calcula.
        </h1>
        <p className="cia-hero-sub reveal reveal-d2">
          Presupuestos, materiales, permisos y remodelaciones.
          Precios CMIC 2026 para los 33 estados de M&#233;xico.
        </p>

        {/* INPUT */}
        <div className="cia-hero-input-wrap reveal reveal-d3">
          <div style={{flex:1}}>
            <textarea
              className="cia-hero-input"
              placeholder="Presupuesta una casa de 120m² en Tlaxcala con acabados estándar..."
              rows={2}
            />
            <div className="cia-hero-input-bottom">
              <span className="cia-hero-input-hint">
                CMIC 2026 &nbsp;&#183;&nbsp; 33 estados &nbsp;&#183;&nbsp; PDF LOPSRM
              </span>
              <Link href="/presupuesto" style={{textDecoration:'none'}}>
                <button className="cia-hero-send" aria-label="Ir al presupuestador">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* MOCKUP CSS DEL WIZARD */}
        <div className="cia-hero-mockup reveal reveal-d4">
          <div className="cia-hero-mockup-img" style={{background:'#F0EDE6',minHeight:'420px',overflow:'hidden'}}>
            {/* Barra superior */}
            <div style={{display:'flex',alignItems:'center',padding:'10px 16px',gap:'8px',borderBottom:'1px solid rgba(0,0,0,0.07)',background:'#ECEAE2'}}>
              <div style={{display:'flex',gap:'5px'}}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c=><div key={c} style={{width:'10px',height:'10px',borderRadius:'50%',background:c}}/>)}
              </div>
              <span style={{fontSize:'12px',color:'#999',fontFamily:'inherit',marginLeft:'8px'}}>ConstruIA &nbsp;&#183;&nbsp; Presupuesto &nbsp;&#183;&nbsp; Tlaxcala 2026</span>
            </div>
            {/* 3 columnas */}
            <div style={{display:'grid',gridTemplateColumns:'180px 1fr 220px',height:'380px'}}>
              {/* Sidebar pasos */}
              <div style={{borderRight:'1px solid rgba(0,0,0,0.06)',padding:'20px 14px',background:'#E8E4DC',display:'flex',flexDirection:'column',gap:'4px'}}>
                {[{n:1,l:'Tipo',done:true},{n:2,l:'Generales',active:true},{n:3,l:'Estructura'},{n:4,l:'Acabados'},{n:5,l:'Instalaciones'}].map(({n,l,done,active})=>(
                  <div key={n} style={{display:'flex',alignItems:'center',gap:'8px',padding:'7px 10px',borderRadius:'6px',background:active?'rgba(200,151,58,0.12)':'transparent',border:active?'1px solid rgba(200,151,58,0.25)':'1px solid transparent'}}>
                    <div style={{width:'18px',height:'18px',borderRadius:'50%',background:done?'rgba(200,151,58,0.15)':active?'rgba(200,151,58,0.10)':'rgba(0,0,0,0.05)',border:`1px solid ${done||active?'rgba(200,151,58,0.35)':'rgba(0,0,0,0.10)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8px',color:done||active?'#C8973A':'#999',fontWeight:600,flexShrink:0}}>
                      {done ? '✓' : n}
                    </div>
                    <span style={{fontSize:'11px',color:active?'#C8973A':done?'#666':'#AAA',fontWeight:active?600:400}}>{l}</span>
                  </div>
                ))}
              </div>
              {/* Formulario */}
              <div style={{padding:'24px 20px',display:'flex',flexDirection:'column',gap:'16px',background:'#F0EDE6'}}>
                <div style={{fontSize:'14px',fontWeight:600,color:'#1A1A1A',textAlign:'center'}}>&#191;Qu&#233; vas a construir?</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px'}}>
                  {[{l:'Casa',e:'🏠',a:true},{l:'Local',e:'🏪',a:false},{l:'Deptos',e:'🏢',a:false}].map(({l,e,a})=>(
                    <div key={l} style={{padding:'12px 8px',background:a?'rgba(200,151,58,0.08)':'rgba(255,255,255,0.6)',border:`1px solid ${a?'rgba(200,151,58,0.45)':'rgba(0,0,0,0.07)'}`,borderRadius:'8px',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',cursor:'pointer'}}>
                      <span style={{fontSize:'18px'}}>{e}</span>
                      <span style={{fontSize:'11px',color:a?'#C8973A':'#666',fontWeight:a?600:400}}>{l}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                  <label style={{fontSize:'11px',color:'#888',fontWeight:500}}>Estado</label>
                  <div style={{padding:'9px 12px',background:'rgba(255,255,255,0.8)',border:'1px solid rgba(0,0,0,0.09)',borderRadius:'7px',display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#333'}}>
                    <span>Tlaxcala</span><span style={{color:'#AAA'}}>▾</span>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                  <label style={{fontSize:'11px',color:'#888',fontWeight:500}}>Superficie</label>
                  <div style={{padding:'9px 12px',background:'rgba(255,255,255,0.8)',border:'1px solid rgba(200,151,58,0.35)',borderRadius:'7px',display:'flex',justifyContent:'space-between',fontSize:'13px',color:'#333'}}>
                    <span>120 m&#178;</span>
                    <span style={{fontSize:'10px',color:'#C8973A',fontWeight:600}}>CMIC 2026</span>
                  </div>
                </div>
              </div>
              {/* Panel en vivo */}
              <div style={{borderLeft:'1px solid rgba(0,0,0,0.06)',padding:'20px 16px',background:'#E4E0D8',display:'flex',flexDirection:'column',gap:'10px'}}>
                <div style={{fontSize:'9px',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#AAA'}}>PRESUPUESTO EN VIVO</div>
                <div>
                  <div style={{fontSize:'22px',fontWeight:800,color:'#C8973A',lineHeight:1}}>$1,112,100</div>
                  <div style={{fontSize:'10px',color:'#AAA',marginTop:'3px'}}>Jun 2026 · Tlaxcala</div>
                </div>
                <div style={{height:'1px',background:'rgba(0,0,0,0.07)'}}/>
                {[['Materiales','$578,292'],['Mano de obra','$422,598'],['Imprevistos','$111,210']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:'11px'}}>
                    <span style={{color:'#888'}}>{k}</span>
                    <span style={{fontFamily:'monospace',color:'#444',fontWeight:500}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HERRAMIENTAS — community grid de omma ═══ */}
      <section className="cia-section" id="herramientas">
        <span className="cia-section-label reveal">Plataforma</span>
        <h2 className="cia-section-h2 reveal reveal-d1">
          Todo lo que necesitas para tu obra
        </h2>
        <div className="cia-tools-grid">
          {tools.map((tool, i) => (
            <Link href={tool.href} key={tool.name} style={{textDecoration:'none'}}>
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
            <h2 className="cia-feature-h2">Precios reales,<br/>por tu estado</h2>
            <p className="cia-feature-p">
              No un promedio nacional. ConstruIA aplica el &#237;ndice FIC SICT 2025
              con factores diferenciados para materiales y mano de obra en los 33 estados.
              Tlaxcala no cuesta igual que Monterrey.
            </p>
            <div className="cia-feature-tags">
              {['CEICO-CMIC 2026','FIC SICT 2025','33 estados','Sin IVA'].map(t=>(
                <span key={t} className="cia-feature-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="cia-feature-visual reveal reveal-d2">
            <div className="cia-feature-mockup" style={{padding:'20px',minHeight:'260px',display:'flex',flexDirection:'column',gap:'8px'}}>
              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-dimmed)'}}>FACTOR REGIONAL · TLAXCALA</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'4px'}}>
                {[
                  {l:'Factor materiales',v:'0.98',d:'-2.0%'},
                  {l:'Factor mano de obra',v:'0.94',d:'-6.0%'},
                  {l:'Precio base CDMX',v:'1.00',d:'referencia'},
                  {l:'Variación vs media',v:'-3.8%',d:'por debajo'}
                ].map(({l,v,d})=>(
                  <div key={l} style={{padding:'12px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-md)'}}>
                    <div style={{fontSize:'9px',textTransform:'uppercase',letterSpacing:'.1em',color:'var(--text-dimmed)',marginBottom:'6px'}}>{l}</div>
                    <div style={{fontSize:'20px',fontWeight:700,fontFamily:'monospace',color:'var(--gold)'}}>{v}</div>
                    <div style={{fontSize:'10px',color:'var(--text-dimmed)',marginTop:'2px'}}>{d}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'8px',padding:'10px 12px',background:'rgba(200,151,58,0.06)',border:'1px solid rgba(200,151,58,0.15)',borderRadius:'var(--radius-md)',fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>
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
            <div className="cia-feature-mockup" style={{padding:'20px',minHeight:'260px',display:'flex',flexDirection:'column',gap:'10px'}}>
              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-dimmed)'}}>AGENTES ACTIVOS</div>
              {[
                {name:'Presupuestador CMIC',status:'Calculando',color:'#C8973A'},
                {name:'Verificador Normativo',status:'Activo',color:'#10A37F'},
                {name:'Generador PDF',status:'En espera',color:'#6E6E6E'},
                {name:'Agente Consulta',status:'Completado',color:'#3B82F6'}
              ].map(({name,status,color})=>(
                <div key={name} style={{padding:'10px 14px',background:'rgba(255,255,255,0.03)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-md)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:color,flexShrink:0}}/>
                    <span style={{fontSize:'12px',color:'var(--text-primary)'}}>{name}</span>
                  </div>
                  <span style={{fontSize:'11px',color:color,fontWeight:500}}>{status}</span>
                </div>
              ))}
              <div style={{padding:'8px 12px',background:'rgba(255,255,255,0.02)',borderRadius:'var(--radius-md)',fontSize:'11px',color:'var(--text-dimmed)',textAlign:'center'}}>
                4 agentes &nbsp;&#183;&nbsp; 2 tareas activas
              </div>
            </div>
          </div>
          <div className="cia-feature-text reveal reveal-d2">
            <span className="cia-feature-label">PLATAFORMA INTEGRADA</span>
            <h2 className="cia-feature-h2">Todas tus herramientas,<br/>en un modelo conectado</h2>
            <p className="cia-feature-p">
              El presupuestador alimenta al Agente IA. El Agente responde con
              contexto real de tu obra. El PDF toma los datos de ambos.
              Todo conectado, sin copiar y pegar entre herramientas.
            </p>
            <div className="cia-feature-tags">
              {['Presupuestador','Agente IA','Simulador','Checklist','Materiales','Tesis'].map(t=>(
                <span key={t} className="cia-feature-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="cia-cta-section">
        <span className="reveal" style={{display:'block',fontSize:'12px',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--text-dimmed)',marginBottom:'16px'}}>
          Sin tarjeta de cr&#233;dito &nbsp;&#183;&nbsp; Gratis para empezar
        </span>
        <h2 className="cia-cta-h2 reveal reveal-d1">
          Empieza a construir<br/>con precisi&#243;n.
        </h2>
        <p className="cia-cta-sub reveal reveal-d2">
          Arquitectos e ingenieros en los 33 estados de M&#233;xico
          ya usan ConstruIA para ganar tiempo y ganar clientes.
        </p>
        <Link href="/presupuesto" style={{textDecoration:'none'}}>
          <button className="cia-btn-cta reveal reveal-d3" style={{padding:'12px 28px',fontSize:'15px'}}>
            Crear presupuesto gratis &#8594;
          </button>
        </Link>
        <p className="reveal reveal-d4" style={{marginTop:'16px',fontSize:'12px',color:'var(--text-dimmed)',letterSpacing:'.06em'}}>
          CMIC 2026 &nbsp;&#183;&nbsp; NTC-RCDF 2023 &nbsp;&#183;&nbsp; LOPSRM &nbsp;&#183;&nbsp; SICT 2025
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{borderTop:'1px solid var(--border-subtle)',padding:'40px',maxWidth:'1200px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <div className="cia-nav-logo">CONSTRUIA<span>.</span></div>
        <div style={{display:'flex',gap:'24px',flexWrap:'wrap'}}>
          {[
            ['Presupuestador','/presupuesto'],
            ['Materiales','/materiales'],
            ['Checklist','/checklist'],
            ['Simulador','/simulador'],
            ['Agente','/agente'],
            ['Tesis','/tesis']
          ].map(([label,href])=>(
            <Link key={label} href={href} style={{fontSize:'13px',color:'var(--text-dimmed)',transition:'color .2s'}}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{fontSize:'12px',color:'var(--text-dimmed)'}}>
          &#169; 2026 ConstruIA.mx &nbsp;&#183;&nbsp; Hecho en M&#233;xico
        </p>
      </footer>

    </div>
  );
}
