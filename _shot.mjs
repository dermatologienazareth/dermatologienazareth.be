import { chromium } from 'playwright-core';
const exe = '/home/mathieu/.cache/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell';
const base = 'http://localhost:8099';
const b = await chromium.launch({ executablePath: exe });
async function shot(path, file, vp, full=false) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: 1 });
  await p.goto(base + path, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: file, fullPage: full });
  await p.close();
}
await shot('/', '/tmp/home-hero.png', { width: 1280, height: 800 }, false);
await shot('/', '/tmp/home-full.png', { width: 1280, height: 800 }, true);
await shot('/', '/tmp/home-mobile.png', { width: 390, height: 844 }, true);
await b.close();
console.log('done');
