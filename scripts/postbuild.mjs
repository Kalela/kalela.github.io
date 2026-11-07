// Post-build: GitHub Pages SPA fallback + Jekyll opt-out.
// Copies the prerendered index.html to 404.html so deep links / refreshes on
// unknown paths still load the app, and guarantees a .nojekyll marker so Pages
// serves Angular's _-prefixed asset files.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browserDir = join('dist', 'portfolio', 'browser');
const index = join(browserDir, 'index.html');

if (!existsSync(index)) {
  console.error(`postbuild: expected ${index} to exist after build`);
  process.exit(1);
}

copyFileSync(index, join(browserDir, '404.html'));

const nojekyll = join(browserDir, '.nojekyll');
if (!existsSync(nojekyll)) {
  writeFileSync(nojekyll, '');
}

console.log('postbuild: wrote 404.html and ensured .nojekyll');
