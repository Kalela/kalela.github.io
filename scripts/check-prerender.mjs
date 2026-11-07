// Guards the core SEO goal: the prerendered HTML must contain real, crawlable
// content — not an empty app shell. Run after `npm run build`.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const indexPath = join('dist', 'portfolio', 'browser', 'index.html');
const html = readFileSync(indexPath, 'utf8');

const checks = [
  { label: 'hero <h1> "Philip Kalela."', test: /<h1[^>]*>\s*Philip Kalela\./ },
  { label: 'JSON-LD Person block', test: /application\/ld\+json[\s\S]*"@type":\s*"Person"/ },
  { label: 'canonical origin', test: /rel="canonical"\s+href="https:\/\/kalela\.github\.io\/"/ },
  { label: 'a work company (CarePay DevCo)', test: /CarePay DevCo/ },
  { label: 'a certification (AWS Solutions Architect)', test: /AWS Certified Solutions Architect/ },
  { label: 'meta description', test: /<meta name="description"/ },
];

const failures = checks.filter((c) => !c.test.test(html));

for (const c of checks) {
  console.log(`${failures.includes(c) ? '✘' : '✔'} ${c.label}`);
}

if (failures.length > 0) {
  console.error(`\ncheck-prerender: ${failures.length} check(s) failed in ${indexPath}`);
  process.exit(1);
}
console.log(`\ncheck-prerender: all ${checks.length} checks passed`);
