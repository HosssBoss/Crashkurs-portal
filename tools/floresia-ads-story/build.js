#!/usr/bin/env node
/* Florésia Ad Builder — renders BOTH Meta placements from one briefing:
     Beitrag / Post   1080 x 1350 (4:5)   — the skill's native canvas
     Story / Reel     1080 x 1920 (9:16)  — story.css extension, Meta safe zones

   Usage: node build.js <briefs-dir> <out-dir>
   Each brief JSON may carry `formats:["post","story"]` (default both) and
   `story:{...}` overrides merged over the base brief for the 9:16 render. */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const SKILL = '/root/.claude/skills/synced/93e81da6-8344-4b9c-9650-b13d7fb1bd3f_2d2639a7-4f1b-4a5d-ad7f-f145903f18d0/floresia-ads';
const { buildHTML } = require(path.join(SKILL, 'render.js'));
const STORY_CSS = fs.readFileSync(path.join(__dirname, 'story.css'), 'utf8');

// Playfair Display is not installable via apt here, so embed the npm woff2 files
// directly — otherwise the CTA/panel serif silently falls back and breaks the brand.
const PF_DIR = path.join(__dirname, 'node_modules/@fontsource/playfair-display/files');
const FONT_CSS = [400, 700, 800, 900].map(w => {
  const f = path.join(PF_DIR, `playfair-display-latin-${w}-normal.woff2`);
  if (!fs.existsSync(f)) return '';
  const b64 = fs.readFileSync(f).toString('base64');
  return `@font-face{font-family:'Playfair Display';font-style:normal;font-weight:${w};` +
         `src:url(data:font/woff2;base64,${b64}) format('woff2');font-display:block;}`;
}).join('\n');

const SIZES = { post: { w: 1080, h: 1350 }, story: { w: 1080, h: 1920 } };

function html(brief, format) {
  let h = buildHTML(brief);
  h = h.replace('</head>', `<style>${FONT_CSS}</style></head>`);
  if (format === 'story') {
    h = h.replace('</head>', `<style>${STORY_CSS}</style></head>`);
    // The engine positions the top subline with an inline `top` computed against the
    // 4:5 headline origin (46px). Story moves the headline to 300px, so the subline
    // must travel the same 254px or it renders ABOVE the headline.
    h = h.replace(/(<div class="sub top[^"]*" style="top:)(\d+)(px)/g,
                  (m, a, n, c) => a + (parseInt(n, 10) + 254) + c);
  }
  return h;
}

async function render(brief, format, out, browser) {
  const { w, h } = SIZES[format];
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html(brief, format), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  await page.close();
  return out;
}

(async () => {
  const inDir = process.argv[2] || path.join(__dirname, 'briefs');
  const outDir = process.argv[3] || path.join(__dirname, 'out');
  fs.mkdirSync(outDir, { recursive: true });
  const briefs = fs.readdirSync(inDir).filter(f => f.endsWith('.json')).sort();
  if (!briefs.length) { console.error('No briefs in', inDir); process.exit(1); }

  const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox','--font-render-hinting=none'] });
  for (const f of briefs) {
    const base = JSON.parse(fs.readFileSync(path.join(inDir, f), 'utf8'));
    // resolve photo paths relative to the briefs dir, not the CWD
    const abs = p => (p && !path.isAbsolute(p)) ? path.resolve(inDir, p) : p;
    base.bg = abs(base.bg);
    if (base.story && base.story.bg) base.story.bg = abs(base.story.bg);
    const name = f.replace(/\.json$/, '');
    const formats = base.formats || ['post', 'story'];
    for (const fmt of formats) {
      const brief = fmt === 'story' ? { ...base, ...(base.story || {}) } : base;
      const out = path.join(outDir, `${name}_${fmt}.png`);
      try {
        await render(brief, fmt, out, browser);
        console.log(`✓ ${name} [${fmt}] → ${path.basename(out)}`);
      } catch (e) { console.error(`✗ ${name} [${fmt}]: ${e.message}`); }
    }
  }
  await browser.close();
  console.log(`\nFertig → ${outDir}`);
})();
