/**
 * Genera capturas para el README. Requiere: npm run build && npm run preview (4173)
 * Uso: npx playwright install chromium && node scripts/capture-readme-screenshots.mjs
 */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../docs/screenshots');
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';

const shots = [
  { hash: '#inicio', file: '01-inicio.png' },
  { hash: '#about', file: '02-sobre-mi.png' },
  { hash: '#skills', file: '03-habilidades.png' },
  { hash: '#projects', file: '04-proyectos.png' },
  { hash: '#education', file: '05-trayectoria.png' },
  { hash: '#contact', file: '06-contacto.png' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const { hash, file } of shots) {
  await page.goto(`${baseUrl}/${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, file) });
  console.log('OK', file);
}

await browser.close();
