'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HeroScrollSection } from './_components/HeroScrollSection';
import { ActivityTicker } from './_components/ActivityTicker';
import { SocialProofBand } from './_components/SocialProofBand';
import { DashboardSection } from './_components/DashboardSection';
import { ToolCardsSection } from './_components/ToolCardsSection';
import { HowItWorks } from './_components/HowItWorks';
import { PricingPreview } from './_components/PricingPreview';
import { FAQSection } from './_components/FAQSection';
import { FeaturePreciosSection } from './_components/FeaturePreciosSection';
import { FeaturePlataformaSection } from './_components/FeaturePlataformaSection';

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
    <div
      className="landing-page"
      ref={containerRef}
      style={{
        background: `
          radial-gradient(ellipse at 15% 85%, rgba(20,35,100,0.55) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(15,28,85,0.40) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(10,18,60,0.30) 0%, transparent 70%),
          #080810
        `,
      }}
    >

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

      {/* 1. Hero */}
      <HeroScrollSection containerRef={containerRef} />

      {/* 2. Activity Ticker */}
      <ActivityTicker />

      {/* 3. Social Proof */}
      <SocialProofBand />

      {/* 4. Dashboard */}
      <DashboardSection />

      {/* 5. Tool Cards */}
      <ToolCardsSection />

      {/* 6. Cómo Funciona */}
      <HowItWorks />

      {/* 7. Pricing */}
      <PricingPreview />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9 & 10. Cards grandes */}
      <FeaturePreciosSection />
      <FeaturePlataformaSection />

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
