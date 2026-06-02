'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeroScrollSection } from './_components/HeroScrollSection';
import { ActivityTicker } from './_components/ActivityTicker';
import { StatsCards } from './_components/StatsCards';
import { FeatureSections } from './_components/FeatureSections';
import { PainPointTabs } from './_components/PainPointTabs';
import { PricingPreview } from './_components/PricingPreview';
import { FAQSection } from './_components/FAQSection';

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
    <div className="landing-page" ref={containerRef} style={{ background: '#0a0a0a' }}>

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

      {/* 1. Hero — fondo #0a0a0a */}
      <HeroScrollSection containerRef={containerRef} />

      {/* 2. Activity Ticker */}
      <ActivityTicker />

      {/* 3. Stats cards — fondo #0f0f14 */}
      <StatsCards />

      {/* 4. Feature Sections — fondo #0a0a0a */}
      <FeatureSections />

      {/* 5. Pain Point Tabs — fondo #0a0a0a */}
      <PainPointTabs />

      {/* 6. Pricing — fondo hereda de sección */}
      <PricingPreview />

      {/* 7. FAQ — fondo #0f0f14 */}
      <FAQSection />

      {/* ═══ CTA FINAL ═══ */}
      <section className="cia-cta-section" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
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
