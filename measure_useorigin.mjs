import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('https://useorigin.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

// Screenshot inicial
await page.screenshot({ path: '/tmp/origin_top.png', fullPage: false });

// Script 1 — cards grandes
const s1 = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('[class*="card"],[class*="Card"],[class*="feature"]')]
    .filter(el => el.getBoundingClientRect().height > 300);
  return cards.slice(0,4).map(card => {
    const s = window.getComputedStyle(card);
    const img = card.querySelector('img');
    const panel = card.querySelector('[class*="panel"],[class*="widget"],[class*="mock"]');
    const ps = panel ? window.getComputedStyle(panel) : null;
    return {
      cardBg: s.backgroundColor, cardRadius: s.borderRadius,
      cardBorder: s.border, cardPadding: s.padding,
      cardHeight: Math.round(card.getBoundingClientRect().height),
      cardWidth: Math.round(card.getBoundingClientRect().width),
      hasImg: !!img, imgSrc: img ? img.src.slice(-80) : 'none',
      imgObjectFit: img ? window.getComputedStyle(img).objectFit : '',
      panelBg: ps ? ps.backgroundColor : '', panelRadius: ps ? ps.borderRadius : '',
      panelBackdrop: ps ? ps.backdropFilter : '', panelPadding: ps ? ps.padding : ''
    };
  });
});
console.log('\n=== SCRIPT 1 — CARDS ===\n', JSON.stringify(s1, null, 2));

// Script 2 — tipografía de títulos
const s2 = await page.evaluate(() => {
  const titles = [...document.querySelectorAll('[class*="card"] h2,[class*="card"] h3,[class*="feature"] h2,[class*="feature"] h3')];
  return titles.slice(0,6).map(el => {
    const s = window.getComputedStyle(el);
    return {
      text: el.textContent.trim().slice(0,50),
      fontSize: s.fontSize, fontWeight: s.fontWeight,
      fontStyle: s.fontStyle, fontFamily: s.fontFamily,
      color: s.color, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing
    };
  });
});
console.log('\n=== SCRIPT 2 — TIPOGRAFÍA ===\n', JSON.stringify(s2, null, 2));

// Script 3 — paneles UI flotantes
const s3 = await page.evaluate(() => {
  const panels = [...document.querySelectorAll('[class*="widget"],[class*="panel"],[class*="card-inner"],[class*="mock"],[class*="preview"]')]
    .filter(el => { const r = el.getBoundingClientRect(); return r.width > 100 && r.width < 600 && r.height > 80; });
  return panels.slice(0,4).map(el => {
    const s = window.getComputedStyle(el);
    return {
      bg: s.backgroundColor, backdropFilter: s.backdropFilter,
      borderRadius: s.borderRadius, border: s.border,
      padding: s.padding,
      width: Math.round(el.getBoundingClientRect().width),
      height: Math.round(el.getBoundingClientRect().height),
      boxShadow: s.boxShadow, innerHTML_preview: el.innerHTML.slice(0,200)
    };
  });
});
console.log('\n=== SCRIPT 3 — PANELES ===\n', JSON.stringify(s3, null, 2));

// Script 4 — grid layout
const s4 = await page.evaluate(() => {
  const grids = [...document.querySelectorAll('[class*="grid"],[class*="cards"],[class*="features"]')]
    .filter(el => el.children.length >= 2);
  return grids.slice(0,3).map(el => {
    const s = window.getComputedStyle(el);
    return {
      display: s.display, gridTemplateColumns: s.gridTemplateColumns,
      gap: s.gap, padding: s.padding, maxWidth: s.maxWidth,
      childCount: el.children.length
    };
  });
});
console.log('\n=== SCRIPT 4 — GRID ===\n', JSON.stringify(s4, null, 2));

// Scroll 600px y screenshot
const container = await page.$('.landing-page, main, body');
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/origin_600.png', fullPage: false });

// Scroll 1200px y screenshot
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/origin_1200.png', fullPage: false });

// Script 5 — big feature cards (PASO 2)
const s5 = await page.evaluate(() => {
  const bigCards = [...document.querySelectorAll('[class*="feature"],[class*="section"]')]
    .filter(el => el.getBoundingClientRect().height > 400);
  return bigCards.slice(0,2).map(card => {
    const heading = card.querySelector('h2,h3');
    const hs = heading ? window.getComputedStyle(heading) : null;
    const s = window.getComputedStyle(card);
    return {
      bg: s.backgroundColor, borderRadius: s.borderRadius,
      padding: s.padding, border: s.border,
      headingFontFamily: hs?.fontFamily, headingFontSize: hs?.fontSize,
      headingFontStyle: hs?.fontStyle, headingFontWeight: hs?.fontWeight,
      headingColor: hs?.color,
      headingText: heading?.textContent?.trim().slice(0,60)
    };
  });
});
console.log('\n=== SCRIPT 5 — FEATURE SECTIONS ===\n', JSON.stringify(s5, null, 2));

// Extra: capturar estilos directamente de los elementos reales de useorigin
const s6 = await page.evaluate(() => {
  // Buscar cualquier elemento con foto de fondo
  const allEls = document.querySelectorAll('*');
  const withBg = [];
  for (const el of allEls) {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none' && bg.includes('url') && !bg.includes('svg')) {
      const r = el.getBoundingClientRect();
      if (r.width > 200 && r.height > 200) {
        const s = window.getComputedStyle(el);
        withBg.push({
          tag: el.tagName, className: el.className.slice(0,100),
          width: Math.round(r.width), height: Math.round(r.height),
          bg: s.backgroundColor, radius: s.borderRadius,
          border: s.border, overflow: s.overflow
        });
        if (withBg.length >= 4) break;
      }
    }
  }
  return withBg;
});
console.log('\n=== SCRIPT 6 — BG IMAGE ELEMENTS ===\n', JSON.stringify(s6, null, 2));

await browser.close();
console.log('\nDone.');
