'use client';
import { useState } from 'react';
import Image from 'next/image';

const tabs = [
  {
    title: '¿Te vas de presupuesto siempre?',
    desc: 'Controla partidas y costos CMIC por estado.',
  },
  {
    title: '¿Pierdes tiempo en trámites?',
    desc: 'Checklist completo 32 estados.',
  },
  {
    title: '¿Tu material siempre mal calculado?',
    desc: 'Lista exacta con factor de desperdicio.',
  },
  {
    title: '¿Sin respuestas normativas rápidas?',
    desc: 'Copiloto IA con toda la normativa vigente.',
  },
];

export function MonographTabs() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background: '#ebede9', padding: '0 5.2rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '1.4rem 0 4rem' }}>

        {/* Intro block */}
        <div style={{ marginBottom: '43px' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.125rem',
            color: '#6b7280',
            fontWeight: 400,
            marginBottom: '0.5rem',
          }}>
            Respuestas para todo
          </p>
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '3rem',
            fontWeight: 600,
            lineHeight: '112.5%',
            color: '#2c2d2a',
          }}>
            Resuelve los problemas<br />más comunes.
          </h2>
        </div>

        {/* Tabs layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '80rem',
          margin: '0 auto',
        }}>
          {/* Left: tab list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '24.5rem',
            flexShrink: 0,
          }}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  opacity: active === i ? 1 : 0.5,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'opacity 0.2s',
                }}
              >
                <div style={{
                  border: '1px solid rgba(44,45,42,0.63)',
                  borderRadius: '1rem',
                  padding: '1.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}>
                  {/* Title row */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    gap: '1rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.3125rem',
                      fontWeight: 600,
                      lineHeight: '1.25',
                      color: '#2c2d2a',
                    }}>
                      {tab.title}
                    </span>
                    <svg
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      fill="none"
                      style={{
                        flexShrink: 0,
                        transform: active === i ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                        color: '#2c2d2a',
                      }}
                    >
                      <path d="M1 1L7 7L13 1" stroke="#2c2d2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Description (visible only when active) */}
                  {active === i && (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.125rem',
                      fontWeight: 400,
                      opacity: 0.75,
                      color: '#2c2d2a',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {tab.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: image panel */}
          <div style={{
            flex: 1,
            marginLeft: '6rem',
            height: '440px',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <Image
              key={active}
              src="/dashboard-preview.jpg.jpg"
              alt={tabs[active].title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
