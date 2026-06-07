import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const assetsDir = join(distDir, 'assets');

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('Build failed: dist/index.html is missing.');
  process.exit(1);
}

if (!existsSync(assetsDir)) {
  console.error('Build failed: dist/assets folder is missing.');
  process.exit(1);
}

const assets = readdirSync(assetsDir);
const jsFiles = assets.filter((file) => file.endsWith('.js'));
const cssFiles = assets.filter((file) => file.endsWith('.css'));

if (!jsFiles.length) {
  console.error('Build failed: no JavaScript bundle in dist/assets.');
  process.exit(1);
}

if (!cssFiles.length) {
  console.error('Build failed: no CSS bundle in dist/assets.');
  process.exit(1);
}

console.log(`Build verified: ${jsFiles.length} JS, ${cssFiles.length} CSS in dist/assets.`);
