const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pkgDir = path.join(rootDir, 'node_modules', '@cloudflare', 'next-on-pages');
const binDir = path.join(pkgDir, 'bin');
const binLink = path.join(rootDir, 'node_modules', '.bin', 'next-on-pages');

const shimRunner = `#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('⚡️ [@cloudflare/next-on-pages bridge] Routing build to modern OpenNext Cloudflare adapter...');
try {
  execSync('npm run build:pages', { stdio: 'inherit' });

  // Sync to .vercel/output/static in case Pages project output directory is configured as .vercel/output/static
  const vercelStaticDir = path.join(process.cwd(), '.vercel', 'output', 'static');
  const openNextAssetsDir = path.join(process.cwd(), '.open-next', 'assets');
  if (fs.existsSync(openNextAssetsDir)) {
    fs.mkdirSync(vercelStaticDir, { recursive: true });
    fs.cpSync(openNextAssetsDir, vercelStaticDir, { recursive: true });
    console.log('⚡️ Synced assets to .vercel/output/static');
  }

  console.log('⚡️ OpenNext Cloudflare Pages build completed successfully.');
} catch (err) {
  console.error('⚡️ OpenNext build failed:', err.message);
  process.exit(1);
}
`;

try {
  fs.mkdirSync(binDir, { recursive: true });
  fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify({
    name: '@cloudflare/next-on-pages',
    version: '1.99.99',
    description: 'Bridge stub to OpenNext for Cloudflare Pages',
    main: 'bin/index.js',
    bin: {
      'next-on-pages': 'bin/index.js'
    }
  }, null, 2));

  fs.writeFileSync(path.join(binDir, 'index.js'), shimRunner, { mode: 0o755 });

  const dotBinDir = path.dirname(binLink);
  if (!fs.existsSync(dotBinDir)) {
    fs.mkdirSync(dotBinDir, { recursive: true });
  }

  try {
    fs.unlinkSync(binLink);
  } catch (_) {}

  try {
    fs.symlinkSync(path.join('..', '@cloudflare', 'next-on-pages', 'bin', 'index.js'), binLink);
  } catch (_) {
    fs.writeFileSync(binLink, shimRunner, { mode: 0o755 });
  }

  console.log('[cloudflare-shim] Installed next-on-pages bridge package at node_modules/@cloudflare/next-on-pages');
} catch (e) {
  console.warn('[cloudflare-shim] Warning:', e.message);
}
