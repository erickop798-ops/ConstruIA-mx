'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeroScrollSection } from './_components/HeroScrollSection';
import { DashboardSection } from './_components/DashboardSection';
import { ToolCardsSection } from './_components/ToolCardsSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="landing-page" ref={containerRef}>

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

      {/* ═══ HERO SCROLL + DASHBOARD ═══ */}
      <HeroScrollSection containerRef={containerRef} />
      <DashboardSection />

      {/* ═══ HERRAMIENTAS ═══ */}
      <ToolCardsSection />

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
