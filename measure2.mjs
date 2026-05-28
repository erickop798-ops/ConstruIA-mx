import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('https://useorigin.com/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

// Scroll 2400, 3600, 4800
for (const y of [2400, 3600, 4800]) {
  await page.evaluate(v => window.scrollTo(0, v), y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `/tmp/origin_${y}.png` });
}

// Medición más granular — buscar por altura y bg oscuro
const extra = await page.evaluate(() => {
  const results = [];
  document.querySelectorAll('div,section,article').forEach(el => {
    const r = el.getBoundingClientRect();
    const s = window.getComputedStyle(el);
    const bg = s.backgroundColor;
    // Cards grandes con bg definido (no transparente) y dentro del viewport
    if (r.width > 300 && r.width < 800 && r.height > 300 && r.height < 900) {
      if (!bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('rgba(0,0,0,0)')) {
        const hasText = el.textContent.trim().length > 10;
        if (hasText && results.length < 8) {
          results.push({
            tag: el.tagName, classes: el.className.slice(0,120),
            bg, radius: s.borderRadius, border: s.border,
            padding: s.padding, width: Math.round(r.width), height: Math.round(r.height),
            text: el.textContent.trim().slice(0,60),
            backdropFilter: s.backdropFilter, boxShadow: s.boxShadow.slice(0,80)
          });
        }
      }
    }
  });
  return results;
});
console.log('EXTRA ELEMENTS:\n', JSON.stringify(extra, null, 2));

await browser.close();
