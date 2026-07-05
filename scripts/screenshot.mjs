/*
  Capture screenshots of the running site for quick visual checks.

  Usage:
    npx playwright-core install chromium   # one-time, downloads the browser
    npm run dev                            # in another terminal
    npm run screenshot [baseUrl] [route...]

  Defaults: baseUrl http://localhost:4321, route "/". Images are written to
  .screenshots/ at desktop (1280) and mobile (390) widths.
*/
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const base = process.argv[2] || process.env.BASE_URL || 'http://localhost:4321';
const routes = process.argv.slice(3);
if (routes.length === 0) routes.push('/');

const outDir = '.screenshots';
mkdirSync(outDir, { recursive: true });

// Let playwright-core resolve its installed browser; if that fails, scan the
// cache for a chrome-headless-shell binary and use it explicitly.
function findHeadlessShell() {
  try {
    const root = join(homedir(), '.cache', 'ms-playwright');
    for (const dir of readdirSync(root)) {
      if (!dir.startsWith('chromium_headless_shell')) continue;
      const bin = join(root, dir, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
      return bin;
    }
  } catch {
    /* fall through to default resolution */
  }
  return undefined;
}

async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    const executablePath = findHeadlessShell();
    if (!executablePath) {
      console.error(
        'Could not launch Chromium. Run: npx playwright-core install chromium'
      );
      throw err;
    }
    return await chromium.launch({ executablePath });
  }
}

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await launch();
try {
  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const file = join(outDir, `${slug}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      await page.close();
      console.log('saved', file);
    }
  }
} finally {
  await browser.close();
}
