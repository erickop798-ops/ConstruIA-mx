'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll('.snap-reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));

    // Section dividers
    const secs = document.querySelectorAll('.sec');
    const secObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.05 }
    );
    secs.forEach((s) => secObs.observe(s));

    // Navbar scroll
    const nav = document.querySelector('.nav') as HTMLElement;
    const handleScroll = () => {
      if (window.scrollY > 20) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      obs.disconnect();
      secObs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const accToggle = (el: HTMLElement) => {
    const items = el.parentElement?.querySelectorAll('.acc-item');
    items?.forEach((i) => i.classList.remove('active'));
    el.classList.add('active');
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announce">
        <div className="announce-pill">
          Precios CMIC 2026 actualizados &#183; Factor SICT por estado &#183; Descarga PDF LOPSRM &#8594;
        </div>
      </div>

      {/* Navbar */}
      <nav className="nav">
        <div className="nav-logo">CONSTRUIA<b>.</b></div>
        <div className="nav-center">
          <a href="#how">Herramientas</a>
          <a href="#table-sec">Blog</a>
          <a href="#table-sec">Precios</a>
          <a href="#acc-sec">M&#225;s</a>
        </div>
        <div className="nav-right">
          <button className="btn-login">Login</button>
          <button className="btn-gold">Crear presupuesto</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero-badge">Precios CMIC 2026 &#183; 33 estados &#183; PDF LOPSRM</div>
        <h1 className="hero-h1">
          Del brief al presupuesto,<br />en un modelo conectado
        </h1>
        <p className="hero-sub">
          Deja de presupuestar con Excel. ConstruIA aplica precios CEICO-CMIC 2026
          con factores regionales SICT, genera tres escenarios y produce el PDF
          LOPSRM en minutos, no en d&#237;as.
        </p>
        <button className="hero-cta">Iniciar presupuesto gratis &#8594;</button>

        {/* Mockup estilo Snaptrude */}
        <div className="hero-mockup-wrap">
          <img
            src="/screenshots/hero-mockup.jpeg"
            alt="ConstruIA &#8212; Presupuestador profesional"
            className="hero-mockup-img"
          />
        </div>
      </section>

      {/* ═══ TRUST BAND ═══ */}
      <div className="trust-band">
        <span className="trust-label">Datos verificados de</span>
        <span className="trust-badge">CMIC 2026</span>
        <span className="trust-badge">CENAPRED</span>
        <span className="trust-badge">SICT 2025</span>
        <span className="trust-badge">NTC&#8209;RCDF</span>
        <span className="trust-badge">LOPSRM</span>
      </div>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="sec" id="how">
        <div className="sec-header">
          <div>
            <h2 className="sec-h2 sec-h2-left snap-reveal">C&#243;mo funciona</h2>
            <p className="sec-h2-sub sec-h2-left snap-reveal snap-d1">Del brief al presupuesto en 3 pasos</p>
          </div>
          <button className="btn-gold snap-reveal snap-d1">Empezar gratis</button>
        </div>
        <div className="hw-grid">
          {/* Card 1 — Describe el proyecto */}
          <div className="card snap-reveal snap-d1">
            <img
              src="/ss/card1-wizard.png"
              alt="ConstruIA — Describe tu proyecto"
              style={{width:'100%',height:'248px',objectFit:'cover',objectPosition:'center 18%',display:'block'}}
            />
            <div className="card-body" style={{padding:'16px 32px 32px'}}>
              <h3 className="card-title">1. Describe tu proyecto</h3>
              <p className="card-desc">Selecciona Casa, Local o Departamentos. Elige tu estado &#8212; el motor ajusta autom&#225;ticamente los 33 factores regionales FIC SICT 2025.</p>
            </div>
          </div>

          {/* Card 2 — El motor calcula */}
          <div className="card snap-reveal snap-d2">
            <img
              src="/ss/card2-agente.png"
              alt="ConstruIA — El motor calcula"
              style={{width:'100%',height:'248px',objectFit:'cover',objectPosition:'center 22%',display:'block'}}
            />
            <div className="card-body" style={{padding:'16px 32px 32px'}}>
              <h3 className="card-title">2. El motor calcula</h3>
              <p className="card-desc">Precios unitarios CEICO-CMIC actualizados a marzo 2026. Materiales, mano de obra e imprevistos desglosados por partida. Sin f&#243;rmulas manuales.</p>
            </div>
          </div>

          {/* Card 3 — Descarga y presenta */}
          <div className="card snap-reveal snap-d3">
            <img
              src="/ss/card3-precios.png"
              alt="ConstruIA — Precios por estado"
              style={{width:'100%',height:'248px',objectFit:'cover',objectPosition:'center 20%',display:'block'}}
            />
            <div className="card-body" style={{padding:'16px 32px 32px'}}>
              <h3 className="card-title">3. Descarga y presenta</h3>
              <p className="card-desc">PDF profesional formato LOPSRM con membrete, tabla de partidas y tres escenarios: Econ&#243;mico ($834K), Est&#225;ndar ($1.1M) y Premium ($1.5M).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HUMAN-AI COLLAB ═══ */}
      <section className="sec">
        <div className="sec-header-center">
          <h2 className="sec-h2 snap-reveal">Dise&#241;ado para</h2>
          <p className="sec-h2-sub snap-reveal snap-d1">Arquitectos e ingenieros en M&#233;xico</p>
        </div>
        <div className="duo-grid">
          <div className="card duo-card snap-reveal snap-d1">
            <div className="duo-vis" style={{background:'#0D0D0D',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <div className="chat-pill">
                <div className="cp-icon">C</div>
                Voy a calcular tu presupuesto de Casa en Tlaxcala
              </div>
              <div className="chat-steps">
                <div className="chat-step"><div className="chat-step-icon">&#10003;</div><span>Analizando tu estado...</span></div>
                <div className="chat-step-line"></div>
                <div className="chat-step"><div className="chat-step-icon">&#10003;</div><span>Aplicando precios CMIC 2026...</span></div>
                <div className="chat-step-line"></div>
                <div className="chat-step"><div className="chat-step-icon" style={{borderColor:'var(--gold)',color:'var(--gold)'}}>&#9679;</div><span style={{color:'var(--white)'}}>Calculando tres escenarios...</span></div>
                <div className="chat-step-line"></div>
                <div className="chat-step"><div className="chat-step-icon">4</div><span>Generando PDF profesional...</span></div>
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-title">Orquesta con IA</h3>
              <p className="card-desc">Pregunta sobre NTC-RCDF 2023, consulta precios de materiales en tu estado, genera memorias de c&#225;lculo. El agente hace el trabajo t&#233;cnico. T&#250; firmas el resultado.</p>
            </div>
          </div>
          <div className="card duo-card snap-reveal snap-d2">
            <div className="duo-vis" style={{background:'#0D0D0D',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'24px'}}>
              <table className="mini-table">
                <thead><tr><th>Partida</th><th>Unidad</th><th>P.Unit</th><th>Total</th></tr></thead>
                <tbody>
                  <tr><td>Cimentaci&#243;n</td><td>m&#179;</td><td>$2,250</td><td>$98,500</td></tr>
                  <tr><td>Muros block</td><td>m&#178;</td><td>$890</td><td>$84,200</td></tr>
                  <tr className="hl"><td>Losa nervada</td><td>m&#178;</td><td>$1,200</td><td>$156,800</td></tr>
                  <tr><td>Cer&#225;mica 45x45</td><td>m&#178;</td><td>$480</td><td>$41,200</td></tr>
                  <tr style={{borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                    <td colSpan={3} style={{fontWeight:600,color:'var(--white)'}}>TOTAL</td>
                    <td style={{color:'var(--gold)',fontWeight:700,fontSize:'13px'}}>$1,112,100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-body">
              <h3 className="card-title">Refina con precisi&#243;n</h3>
              <p className="card-desc">Edita cada partida, cambia el nivel de acabados, ajusta la superficie. El presupuesto se recalcula en tiempo real con precios CMIC vigentes. Sin reiniciar, sin recalcular manualmente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRECIOS POR ESTADO ═══ */}
      <section className="sec" id="table-sec">
        <div className="sec-header-center">
          <h2 className="sec-h2 snap-reveal">Tus precios, estado por estado</h2>
          <p className="sec-h2-sub snap-reveal snap-d1">Vinculados en tiempo real a tu presupuesto</p>
        </div>

        <div className="iso-wrap snap-reveal">
          <svg width="500" height="180" viewBox="0 0 500 180" fill="none">
            <g transform="translate(60,120)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".6"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".5"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".5"/></g>
            <g transform="translate(60,95)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#9B8FC4" opacity=".6"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#8578B0" opacity=".5"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#ADA2D4" opacity=".5"/></g>
            <g transform="translate(100,108)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".6"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".5"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".5"/></g>
            <g transform="translate(100,83)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#9B8FC4" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#8578B0" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#ADA2D4" opacity=".4"/></g>
            <g transform="translate(100,58)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".4"/></g>
            <g transform="translate(180,132)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#D4C0A0" opacity=".4"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#BBA888" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#E0D0B0" opacity=".4"/></g>
            <g transform="translate(220,120)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#9B8FC4" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#8578B0" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#ADA2D4" opacity=".4"/></g>
            <g transform="translate(300,120)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".6"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".5"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".5"/></g>
            <g transform="translate(300,95)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#9B8FC4" opacity=".6"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#8578B0" opacity=".5"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#ADA2D4" opacity=".5"/></g>
            <g transform="translate(300,70)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#D4C0A0" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#BBA888" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#E0D0B0" opacity=".4"/></g>
            <g transform="translate(300,45)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".4"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".3"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".3"/></g>
            <g transform="translate(340,108)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#9B8FC4" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#8578B0" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#ADA2D4" opacity=".4"/></g>
            <g transform="translate(340,83)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#4A6FA5" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#3A5A8A" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#5580B5" opacity=".4"/></g>
            <g transform="translate(380,96)"><path d="M0,0 L20,-12 L40,0 L20,12Z" fill="#D4C0A0" opacity=".5"/><path d="M0,0 L0,-25 L20,-37 L20,-12Z" fill="#BBA888" opacity=".4"/><path d="M20,-12 L20,-37 L40,-25 L40,0Z" fill="#E0D0B0" opacity=".4"/></g>
          </svg>
        </div>

        <div className="ptable-wrap snap-reveal">
          <table className="ptable">
            <thead>
              <tr>
                <th>Material</th><th>Unidad</th>
                <th className="r">Precio base</th>
                <th className="r">Precio Tlaxcala</th>
                <th>Categor&#237;a</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="name">Cemento Portland CPC 30R</td><td className="unit">bolsa 50kg</td><td className="base">$255</td><td className="state">$252</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Materiales</span></td></tr>
              <tr><td className="name">Arena de r&#237;o cribada</td><td className="unit">m&#179;</td><td className="base">$400</td><td className="state">$396</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Materiales</span></td></tr>
              <tr><td className="name">Varilla corrugada 3/8&quot;</td><td className="unit">pieza 12m</td><td className="base">$195</td><td className="state">$189</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Acero</span></td></tr>
              <tr><td className="name">Tabique rojo 7&#215;14&#215;28</td><td className="unit">pieza</td><td className="base">$6.50</td><td className="state">$6.30</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Materiales</span></td></tr>
              <tr><td className="name">Block hueco 15&#215;20&#215;40</td><td className="unit">pieza</td><td className="base">$18.50</td><td className="state">$17.90</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Materiales</span></td></tr>
              <tr className="hl"><td className="name">Concreto premezclado f&apos;c=200</td><td className="unit">m&#179;</td><td className="base">$2,250</td><td className="state">$2,178</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Estructura</span></td></tr>
              <tr><td className="name">Vigueta pretensada T-12</td><td className="unit">pieza 6m</td><td className="base">$165</td><td className="state">$160</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Estructura</span></td></tr>
              <tr><td className="name">Cer&#225;mica 45&#215;45cm</td><td className="unit">m&#178;</td><td className="base">$160</td><td className="state">$155</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Acabados</span></td></tr>
              <tr><td className="name">Tubo PVC hidr&#225;ulico 1/2&quot;</td><td className="unit">tramo 6m</td><td className="base">$85</td><td className="state">$82</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Hidr&#225;ulica</span></td></tr>
              <tr><td className="name">Alambre recocido cal.16</td><td className="unit">kg</td><td className="base">$32</td><td className="state">$31</td><td><span style={{fontSize:'11px',color:'var(--muted)'}}>Acero</span></td></tr>
            </tbody>
          </table>
        </div>

        <div className="mini-feat">
          <div className="snap-reveal snap-d1">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><circle cx="9" cy="9" r="7"/><path d="M9 5v4l3 2"/></svg>
              Cat&#225;logo CEICO-CMIC 2026
            </div>
            <p className="mf-desc">M&#225;s de 800 insumos y mano de obra actualizados a marzo 2026. Fuente oficial de la industria.</p>
          </div>
          <div className="snap-reveal snap-d2">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><rect x="2" y="4" width="14" height="10" rx="1"/><line x1="2" y1="8" x2="16" y2="8"/><line x1="7" y1="8" x2="7" y2="14"/></svg>
              Factor regional SICT 2025
            </div>
            <p className="mf-desc">Los 33 estados con sus &#237;ndices diferenciados. Tlaxcala no cuesta igual que Monterrey.</p>
          </div>
          <div className="snap-reveal snap-d3">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><circle cx="9" cy="9" r="7"/><path d="M6 9h6M9 6v6"/></svg>
              Investigaci&#243;n normativa
            </div>
            <p className="mf-desc">Consulta NTC-RCDF, LOPSRM y normas CENAPRED directamente desde el Agente IA.</p>
          </div>
        </div>
      </section>

      {/* ═══ ACCORDION + MONITOR ═══ */}
      <section className="sec" id="acc-sec">
        <div className="acc-grid">
          <div>
            <h2 className="sec-h2 sec-h2-left snap-reveal">Presupuesta con<br />inteligencia</h2>
            <p className="sec-h2-sub sec-h2-left snap-reveal snap-d1" style={{marginBottom:'40px'}}>
              Hasta el &#250;ltimo peso
            </p>
            <div className="snap-reveal snap-d2">
              <div className="acc-item active" onClick={(e) => accToggle(e.currentTarget as HTMLElement)}>
                <div className="acc-title">
                  <svg className="acc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="4" cy="4" r="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 4h4l-4 8h4"/>
                  </svg>
                  Precios por estado aplicados
                </div>
                <div className="acc-desc">Factor FIC SICT 2025 diferenciado por regi&#243;n. Construir en Tlaxcala tiene un costo diferente al de CDMX. ConstruIA lo aplica autom&#225;ticamente.</div>
              </div>
              <div className="acc-item" onClick={(e) => accToggle(e.currentTarget as HTMLElement)}>
                <div className="acc-title">
                  <svg className="acc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="1" y="3" width="14" height="10" rx="1"/><path d="M5 7h6M5 10h4"/>
                  </svg>
                  Tres escenarios simult&#225;neos
                </div>
                <div className="acc-desc">Econ&#243;mico, est&#225;ndar y premium calculados en paralelo. Muestra tres opciones reales a tu cliente sin hacer tres presupuestos diferentes.</div>
              </div>
              <div className="acc-item" onClick={(e) => accToggle(e.currentTarget as HTMLElement)}>
                <div className="acc-title">
                  <svg className="acc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M4 2v12M12 2v12M2 6h12M2 10h12"/>
                  </svg>
                  Exportar a PDF profesional
                </div>
                <div className="acc-desc">Membrete, tabla de partidas con cantidades y precio unitario, formato LOPSRM. Listo para adjuntar a tu propuesta o presentar en licitaci&#243;n.</div>
              </div>
            </div>
          </div>
          <div className="monitor-r-wrap snap-reveal snap-d2">
            <div className="monitor-r">
              <div className="monitor-r-screen">
                <div className="monitor-bar" style={{gridColumn:'1/-1'}}>
                  <div className="dots"><span></span><span></span><span></span></div>
                  <span className="bar-title">ConstruIA &#183; Presupuesto</span>
                </div>
                <div className="m-sidebar" style={{padding:'12px 8px',gap:'4px'}}>
                  <div className="m-step" style={{fontSize:'8px',padding:'4px 6px'}}><span className="snum" style={{width:'12px',height:'12px',fontSize:'6px'}}>&#10003;</span>Tipo</div>
                  <div className="m-step active" style={{fontSize:'8px',padding:'4px 6px'}}><span className="snum" style={{width:'12px',height:'12px',fontSize:'6px'}}>2</span>Generales</div>
                  <div className="m-step" style={{fontSize:'8px',padding:'4px 6px'}}><span className="snum" style={{width:'12px',height:'12px',fontSize:'6px'}}>3</span>Estructura</div>
                  <div className="m-step" style={{fontSize:'8px',padding:'4px 6px'}}><span className="snum" style={{width:'12px',height:'12px',fontSize:'6px'}}>4</span>Acabados</div>
                  <div className="m-step" style={{fontSize:'8px',padding:'4px 6px'}}><span className="snum" style={{width:'12px',height:'12px',fontSize:'6px'}}>5</span>Instal.</div>
                </div>
                <div className="m-main" style={{padding:'12px',gap:'8px'}}>
                  <h4 style={{fontSize:'10px'}}>Tipo de proyecto</h4>
                  <div className="m-cards" style={{gap:'4px'}}>
                    <div className="m-card sel" style={{padding:'6px'}}>
                      <svg width="20" height="16" viewBox="0 0 32 24" fill="none" stroke="#C8973A" strokeWidth="1"><polyline points="2,20 16,6 30,20"/><rect x="6" y="20" width="20" height="4"/></svg>
                      <div className="m-card-label" style={{fontSize:'7px',marginTop:'2px'}}>Casa</div>
                    </div>
                    <div className="m-card" style={{padding:'6px'}}>
                      <svg width="20" height="16" viewBox="0 0 32 24" fill="none" stroke="#888" strokeWidth="1"><rect x="4" y="6" width="24" height="18"/><rect x="4" y="2" width="24" height="4"/></svg>
                      <div className="m-card-label" style={{fontSize:'7px',marginTop:'2px'}}>Comercial</div>
                    </div>
                    <div className="m-card" style={{padding:'6px'}}>
                      <svg width="20" height="16" viewBox="0 0 32 24" fill="none" stroke="#888" strokeWidth="1"><rect x="8" y="2" width="16" height="22"/><line x1="16" y1="2" x2="16" y2="24" opacity=".3"/></svg>
                      <div className="m-card-label" style={{fontSize:'7px',marginTop:'2px'}}>Deptos</div>
                    </div>
                  </div>
                </div>
                <div className="m-panel" style={{padding:'12px 8px',gap:'4px'}}>
                  <div className="m-panel-title" style={{fontSize:'7px'}}>En vivo</div>
                  <div className="m-panel-val" style={{fontSize:'16px'}}>$1,112,100</div>
                  <div className="m-panel-sub" style={{fontSize:'7px'}}>Tlaxcala</div>
                </div>
              </div>
            </div>
            <div className="monitor-r-stand"></div>
          </div>
        </div>
      </section>

      {/* ═══ UN CLIC / PDF ═══ */}
      <section className="sec">
        <div className="sec-header-center">
          <h2 className="sec-h2 snap-reveal">Un clic</h2>
          <p className="sec-h2-sub snap-reveal snap-d1">Del c&#225;lculo al PDF profesional</p>
        </div>
        <div className="card snap-reveal" style={{padding:'32px 36px',marginBottom:'16px'}}>
          <h3 style={{fontSize:'22px',fontWeight:700,color:'var(--white)',textAlign:'center',marginBottom:'8px'}}>Del formulario al PDF con un clic</h3>
          <p style={{fontSize:'14px',color:'var(--desc)',textAlign:'center',marginBottom:'32px',maxWidth:'540px',marginLeft:'auto',marginRight:'auto'}}>Completa los 5 pasos del wizard, el motor aplica CMIC 2026 y en segundos tienes el PDF con desglose LOPSRM, tres escenarios y membrete profesional.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:'20px',alignItems:'center'}}>
            <div style={{background:'#0D0D0D',borderRadius:'10px',padding:'16px'}}>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'12px'}}>Formulario completado</p>
              <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'var(--desc)'}}><span style={{color:'var(--gold)'}}>&#10003;</span> Casa habitaci&#243;n &#183; Tlaxcala</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'var(--desc)'}}><span style={{color:'var(--gold)'}}>&#10003;</span> 120 m&#178; &#183; 2 niveles</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'var(--desc)'}}><span style={{color:'var(--gold)'}}>&#10003;</span> Acabados est&#225;ndar</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'12px',color:'var(--desc)'}}><span style={{color:'var(--gold)'}}>&#10003;</span> Instalaciones incluidas</div>
              </div>
              <p style={{fontFamily:'monospace',fontSize:'16px',color:'var(--gold)',fontWeight:700,marginTop:'14px'}}>$1,112,100</p>
            </div>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'#1E1E1E',border:'1px solid #333',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',color:'#666',flexShrink:0}}>&#8594;</div>
            <div style={{background:'#0D0D0D',borderRadius:'10px',padding:'16px'}}>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'12px'}}>PDF profesional</p>
              <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--desc)',borderBottom:'1px solid #1A1A1A',paddingBottom:'4px'}}><span>Cimentaci&#243;n</span><span>$98,500</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--desc)',borderBottom:'1px solid #1A1A1A',paddingBottom:'4px'}}><span>Muros</span><span>$84,200</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--desc)',borderBottom:'1px solid #1A1A1A',paddingBottom:'4px'}}><span>Losa</span><span>$156,800</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'var(--desc)',paddingBottom:'4px'}}><span>Instalaciones</span><span>$62,400</span></div>
              </div>
              <p style={{fontFamily:'monospace',fontSize:'14px',color:'var(--gold)',fontWeight:700,marginTop:'10px',borderTop:'2px solid var(--gold)',paddingTop:'8px'}}>TOTAL $1,112,100</p>
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
          <div className="card snap-reveal snap-d1" style={{padding:'24px'}}>
            <h3 className="card-title" style={{textAlign:'center',marginBottom:'8px'}}>Tres escenarios simult&#225;neos</h3>
            <p className="card-desc" style={{textAlign:'center',marginBottom:'20px'}}>No entregues un solo n&#250;mero a tu cliente. Econ&#243;mico para ganar la licitaci&#243;n, Est&#225;ndar para el proyecto real, Premium para mostrar el potencial.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'5px'}}><span style={{color:'var(--desc)'}}>Econ&#243;mico</span><span style={{fontFamily:'monospace',color:'var(--muted)'}}>$834,075</span></div>
                <div style={{height:'6px',borderRadius:'3px',background:'#333',overflow:'hidden'}}><div style={{height:'100%',width:'65%',background:'#555',borderRadius:'3px'}}></div></div>
              </div>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'5px'}}><span style={{color:'var(--white)',fontWeight:600}}>Est&#225;ndar</span><span style={{fontFamily:'monospace',color:'var(--gold)',fontWeight:700}}>$1,112,100</span></div>
                <div style={{height:'6px',borderRadius:'3px',background:'#333',overflow:'hidden'}}><div style={{height:'100%',width:'82%',background:'var(--gold)',borderRadius:'3px'}}></div></div>
              </div>
              <div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',marginBottom:'5px'}}><span style={{color:'var(--desc)'}}>Premium</span><span style={{fontFamily:'monospace',color:'var(--muted)'}}>$1,557,540</span></div>
                <div style={{height:'6px',borderRadius:'3px',background:'#333',overflow:'hidden'}}><div style={{height:'100%',width:'100%',background:'#444',borderRadius:'3px'}}></div></div>
              </div>
            </div>
          </div>
          <div className="card snap-reveal snap-d2" style={{padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
            <svg width="48" height="52" viewBox="0 0 48 52" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{marginBottom:'16px'}}>
              <rect x="8" y="2" width="32" height="42" rx="3"/>
              <line x1="14" y1="14" x2="34" y2="14"/><line x1="14" y1="20" x2="34" y2="20"/>
              <line x1="14" y1="26" x2="28" y2="26"/>
              <path d="M24 44 L24 52 M18 48 L24 52 L30 48" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="card-title" style={{marginBottom:'8px'}}>Descarga directa</h3>
            <p className="card-desc">Sin cuenta, sin suscripci&#243;n para el primer presupuesto. Descarga el PDF en tu dispositivo en segundos y env&#237;alo por WhatsApp o correo.</p>
          </div>
        </div>
      </section>

      {/* ═══ PRESENTA TU PROPUESTA ═══ */}
      <section className="sec">
        <div className="sec-header-center">
          <h2 className="sec-h2 snap-reveal">Presenta tu propuesta</h2>
          <p className="sec-h2-sub snap-reveal snap-d1">Con tu cliente, con el municipio, con el banco</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'20px',marginBottom:'48px',alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <div className="card snap-reveal" style={{padding:'12px',borderColor:'var(--goldbdr)'}}>
              <div style={{height:'80px',background:'#0D0D0D',borderRadius:'6px',marginBottom:'8px',display:'flex',flexDirection:'column',justifyContent:'center',padding:'10px',gap:'4px'}}>
                <div style={{height:'5px',width:'70%',background:'#222',borderRadius:'2px'}}></div>
                <div style={{height:'4px',width:'90%',background:'#1A1A1A',borderRadius:'2px'}}></div>
                <div style={{height:'4px',width:'60%',background:'#1A1A1A',borderRadius:'2px'}}></div>
              </div>
              <p style={{fontSize:'11px',color:'var(--muted)'}}>P&#225;gina 1 &#8212; Resumen</p>
            </div>
            <div className="card snap-reveal snap-d1" style={{padding:'12px'}}>
              <div style={{height:'80px',background:'#0D0D0D',borderRadius:'6px',marginBottom:'8px',padding:'10px',display:'flex',flexDirection:'column',gap:'3px'}}>
                <div style={{height:'4px',width:'100%',background:'#222',borderRadius:'2px'}}></div>
                <div style={{height:'3px',width:'85%',background:'#1A1A1A',borderRadius:'2px'}}></div>
                <div style={{height:'3px',width:'90%',background:'#1A1A1A',borderRadius:'2px'}}></div>
                <div style={{height:'3px',width:'75%',background:'#1A1A1A',borderRadius:'2px'}}></div>
              </div>
              <p style={{fontSize:'11px',color:'#444'}}>P&#225;gina 2 &#8212; Desglose</p>
            </div>
            <div className="card snap-reveal snap-d2" style={{padding:'12px'}}>
              <div style={{height:'80px',background:'#0D0D0D',borderRadius:'6px',marginBottom:'8px',padding:'10px',display:'flex',flexDirection:'column',gap:'4px'}}>
                <div style={{height:'4px',width:'50%',background:'#222',borderRadius:'2px'}}></div>
                <div style={{height:'14px',width:'70%',background:'rgba(200,151,58,0.12)',borderRadius:'2px',marginTop:'6px'}}></div>
              </div>
              <p style={{fontSize:'11px',color:'#444'}}>P&#225;gina 3 &#8212; Totales</p>
            </div>
          </div>
          <div className="card snap-reveal snap-d1" style={{position:'relative',overflow:'visible'}}>
            <div style={{padding:'20px 24px 12px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              <p style={{fontSize:'11px',fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--muted)'}}>PRESUPUESTO DE OBRA</p>
              <p style={{fontSize:'10px',color:'var(--gold)',marginTop:'2px'}}>ConstruIA.mx &#8212; Reporte t&#233;cnico 2026</p>
              <p style={{fontSize:'10px',color:'#444',marginTop:'2px'}}>Jun 2026 &#183; V&#225;lido 30 d&#237;as &#183; SICT 2025</p>
            </div>
            <div style={{padding:'16px 24px'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12px'}}>
                <thead>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                    <th style={{textAlign:'left',padding:'8px 0',color:'var(--muted)',fontWeight:500,fontSize:'10px',textTransform:'uppercase',letterSpacing:'.06em'}}>Partida</th>
                    <th style={{textAlign:'right',padding:'8px 0',color:'var(--muted)',fontWeight:500,fontSize:'10px',textTransform:'uppercase',letterSpacing:'.06em'}}>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}><td style={{padding:'8px 0',color:'var(--desc)'}}>Cimentaci&#243;n zapatas aisladas</td><td style={{textAlign:'right',fontFamily:'monospace',color:'var(--desc)'}}>$98,500</td></tr>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}><td style={{padding:'8px 0',color:'var(--desc)'}}>Muros block concreto 15cm</td><td style={{textAlign:'right',fontFamily:'monospace',color:'var(--desc)'}}>$84,200</td></tr>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}><td style={{padding:'8px 0',color:'var(--desc)'}}>Sistema losa nervada</td><td style={{textAlign:'right',fontFamily:'monospace',color:'var(--desc)'}}>$156,800</td></tr>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}><td style={{padding:'8px 0',color:'var(--desc)'}}>Acabado cer&#225;mica 45x45</td><td style={{textAlign:'right',fontFamily:'monospace',color:'var(--desc)'}}>$41,200</td></tr>
                  <tr style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}><td style={{padding:'8px 0',color:'var(--desc)'}}>Instalaci&#243;n el&#233;ctrica</td><td style={{textAlign:'right',fontFamily:'monospace',color:'var(--desc)'}}>$62,400</td></tr>
                  <tr>
                    <td style={{padding:'12px 0 8px',color:'var(--white)',fontWeight:600,borderTop:'2px solid var(--gold)'}}>TOTAL ESTIMADO</td>
                    <td style={{textAlign:'right',fontFamily:'monospace',color:'var(--gold)',fontWeight:700,fontSize:'15px',borderTop:'2px solid var(--gold)',paddingTop:'12px'}}>$1,112,100</td>
                  </tr>
                </tbody>
              </table>
              <p style={{fontSize:'10px',color:'#333',marginTop:'12px'}}>Metodolog&#237;a SICT 2025 &#183; CMIC 2026 &#183; Sin IVA</p>
            </div>
            <div style={{position:'absolute',top:'-14px',right:'16px',display:'flex',flexDirection:'column',gap:'8px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 14px',background:'rgba(130,80,200,0.85)',borderRadius:'100px',fontSize:'12px',color:'#FFF',whiteSpace:'nowrap'}}><span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#FFF',opacity:0.8}}></span>Arquitecto</span>
              <span style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 14px',background:'rgba(30,100,200,0.85)',borderRadius:'100px',fontSize:'12px',color:'#FFF',whiteSpace:'nowrap',marginLeft:'20px'}}><span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#FFF',opacity:0.8}}></span>Cliente</span>
              <span style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 14px',background:'rgba(50,160,100,0.85)',borderRadius:'100px',fontSize:'12px',color:'#FFF',whiteSpace:'nowrap'}}><span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#FFF',opacity:0.8}}></span>Constructor</span>
            </div>
          </div>
        </div>
        <div className="mini-feat">
          <div className="snap-reveal">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><rect x="2" y="3" width="14" height="12" rx="1"/><path d="M6 7h6M6 10h4"/></svg>
              Formato LOPSRM incluido
            </div>
            <p className="mf-desc">Requerido en licitaciones p&#250;blicas municipales y estatales. ConstruIA lo genera autom&#225;ticamente.</p>
          </div>
          <div className="snap-reveal snap-d1">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><circle cx="5" cy="9" r="3"/><circle cx="13" cy="5" r="2"/><circle cx="13" cy="13" r="2"/><line x1="8" y1="9" x2="11" y2="6"/><line x1="8" y1="9" x2="11" y2="12"/></svg>
              Comparte en un clic
            </div>
            <p className="mf-desc">PDF directo a WhatsApp, correo o impreso. Tu cliente entiende el presupuesto sin explicaciones.</p>
          </div>
          <div className="snap-reveal snap-d2">
            <div className="mf-title">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--muted)" strokeWidth="1.2"><path d="M9 2v10M5 8l4 4 4-4"/><rect x="3" y="14" width="12" height="2" rx="1"/></svg>
              Actualiza sin rehacer
            </div>
            <p className="mf-desc">Cambia un dato y el PDF se regenera. No m&#225;s versiones v2_final_FINAL.xlsx.</p>
          </div>
        </div>
      </section>

      {/* ═══ PULLQUOTE TESTIMONIAL ═══ */}
      <section className="sec" style={{
        padding:'100px 40px',
        borderTop:'1px solid var(--line)',
        borderBottom:'1px solid var(--line)'
      }}>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center'}}>
          <div style={{
            fontSize:'80px',lineHeight:0.6,color:'var(--gold)',opacity:0.25,
            fontFamily:'Georgia, serif',marginBottom:'28px',display:'block'
          }}>&ldquo;</div>
          <p className="snap-reveal" style={{
            fontSize:'clamp(22px,3.2vw,38px)',fontWeight:400,fontStyle:'italic',
            color:'#fff',lineHeight:1.45,marginBottom:'36px',letterSpacing:'-0.01em'
          }}>
            ConstruIA nos permiti&oacute; ganar una licitaci&oacute;n
            municipal en Tlaxcala. El PDF sali&oacute; en formato
            LOPSRM correcto al primer intento &mdash; algo que
            antes nos tomaba dos d&iacute;as con Excel.
          </p>
          <div className="snap-reveal snap-d1" style={{
            display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'
          }}>
            <div style={{
              width:'36px',height:'36px',borderRadius:'50%',
              background:'rgba(200,151,58,0.15)',border:'1px solid rgba(200,151,58,0.3)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:'14px',fontWeight:'700',color:'var(--gold)'
            }}>R</div>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:'14px',fontWeight:600,color:'#fff'}}>Arq. Roberto P.</div>
              <div style={{fontSize:'12px',color:'var(--muted)'}}>Despacho RPA Arquitectos &middot; Tlaxcala</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="cta-final">
        <p className="snap-reveal" style={{fontSize:'12px',fontWeight:600,letterSpacing:'.15em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'16px'}}>Gratis para tu primer presupuesto</p>
        <h2 className="cta-h2 snap-reveal snap-d1">Empieza a presupuestar<br />como profesional.</h2>
        <p className="cta-sub snap-reveal snap-d2">Arquitectos e ingenieros en los 33 estados de M&#233;xico ya usan ConstruIA<br />para ganar tiempo, ganar clientes y ganar licitaciones.</p>
        <button className="btn-gold-lg snap-reveal snap-d2">Crear mi primer presupuesto &#8594;</button>
        <p className="snap-reveal snap-d3" style={{marginTop:'20px',fontSize:'11px',color:'#333',letterSpacing:'.08em'}}>
          CMIC 2026 &#183; NTC-RCDF 2023 &#183; LOPSRM &#183; SICT 2025 &#183; Sin IVA
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">CONSTRUIA<b>.</b></p>
            <p className="footer-tagline">Copiloto de inteligencia para la industria de la construcci&#243;n en M&#233;xico.</p>
            <div className="footer-badges">
              <span className="footer-badge">CMIC 2026</span>
              <span className="footer-badge">NTC-RCDF</span>
              <span className="footer-badge">SICT 2025</span>
            </div>
          </div>
          <div>
            <p className="footer-col-title">Herramientas</p>
            <ul className="footer-links">
              <li><a href="#">Presupuestador</a></li>
              <li><a href="#">Simulador IA</a></li>
              <li><a href="#">Agente ConstruIA</a></li>
              <li><a href="#">Tesis y Academia</a></li>
              <li><a href="#">Precios por Estado</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Recursos</p>
            <ul className="footer-links">
              <li><a href="#">Normativa CMIC</a></li>
              <li><a href="#">Datos SICT</a></li>
              <li><a href="#">NTC-RCDF 2023</a></li>
              <li><a href="#">CENAPRED</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Legal</p>
            <ul className="footer-links">
              <li><a href="#">Aviso de Privacidad</a></li>
              <li><a href="#">T&#233;rminos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&#169; 2026 ConstruIA.mx &#183; Hecho en M&#233;xico</p>
          <p className="footer-ver">v2.1.0 &#183; Motor Neodata &#183; Precios sin IVA</p>
        </div>
      </footer>
    </>
  );
}
