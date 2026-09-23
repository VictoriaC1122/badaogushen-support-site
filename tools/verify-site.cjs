const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const output = await fs.mkdtemp(path.join(os.tmpdir(), 'stock-mastery-site-'));
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const language of ['zh-Hant', 'en']) {
      for (const width of [320, 390, 768, 1440]) {
        for (const colorScheme of ['light', 'dark']) {
          const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme });
          const errors = [];
          page.on('pageerror', error => errors.push(error.message));
          await page.goto(pathToFileURL(path.join(root, language === 'en' ? 'en/index.html' : 'index.html')).href);
          const state = await page.evaluate(() => {
            const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
            const brokenAnchors = [...document.querySelectorAll('a[href^="#"]')]
              .map(link => link.hash.slice(1)).filter(id => !document.getElementById(id));
            const emails = [...document.querySelectorAll('a[href^="mailto:"]')].map(link => link.getAttribute('href'));
            const smallTargets = [...document.querySelectorAll('nav a, .button, summary')]
              .filter(node => node.getBoundingClientRect().height < 44).map(node => node.textContent);
            return {
              lang: document.documentElement.lang,
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              uniqueIDs: new Set(ids).size === ids.length,
              brokenAnchors, emails, smallTargets,
              imagesLoaded: [...document.images].every(img => img.complete && img.naturalWidth > 0),
              copyright: document.querySelector('#copyright').textContent,
              privatePhoneFound: /\+886|\b09\d{8}\b/.test(document.body.innerText),
              scriptCount: document.scripts.length
            };
          });
          assert.equal(state.lang, language);
          assert.equal(state.overflow, false, `${language} ${width} horizontal overflow`);
          assert.equal(state.uniqueIDs, true);
          assert.deepEqual(state.brokenAnchors, []);
          assert.deepEqual(state.smallTargets, []);
          assert.equal(state.imagesLoaded, true);
          assert.equal(state.privatePhoneFound, false);
          assert.equal(state.scriptCount, 0);
          assert(state.emails.length >= 5);
          assert(state.emails.every(email => email.startsWith('mailto:victoriacheng1122@gmail.com')));
          assert(state.copyright.includes('2026 Yung Wen Cheng (Stock Mastery)'));
          await page.locator('summary').first().click();
          assert.equal(await page.locator('details').first().getAttribute('open'), '');
          await page.locator('summary').first().press('Enter');
          assert.equal(await page.locator('details').first().getAttribute('open'), null);
          // Text zoom catches long localized labels that a narrow viewport alone misses.
          if (width === 320) {
            await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          }
          await page.locator('#support').scrollIntoViewIfNeeded();
          await page.screenshot({ path: path.join(output, `${language}-${width}-${colorScheme}.png`) });
          assert.deepEqual(errors, []);
          results.push(`${language} ${width}px ${colorScheme}: PASS`);
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  console.log(results.join('\n'));
  console.log(`Screenshots: ${output}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
