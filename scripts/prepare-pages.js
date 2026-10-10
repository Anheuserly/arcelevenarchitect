const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const openNextDir = path.join(rootDir, '.open-next');
const assetsDir = path.join(openNextDir, 'assets');

console.log('⚡️ Preparing OpenNext assets for Cloudflare Pages...');

if (!fs.existsSync(assetsDir)) {
  console.error('❌ Error: .open-next/assets does not exist. Run opennextjs-cloudflare build first.');
  process.exit(1);
}

// 1. Copy worker.js -> _worker.js in assets
const workerSrc = path.join(openNextDir, 'worker.js');
const workerDst = path.join(assetsDir, '_worker.js');
if (fs.existsSync(workerSrc)) {
  fs.copyFileSync(workerSrc, workerDst);
  console.log('✓ Copied .open-next/worker.js -> .open-next/assets/_worker.js');
}

// 2. Copy dependency directories needed by _worker.js
const dirsToCopy = ['cloudflare', 'middleware', 'server-functions', '.build'];
for (const dirName of dirsToCopy) {
  const src = path.join(openNextDir, dirName);
  const dst = path.join(assetsDir, dirName);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dst, { recursive: true, force: true });
    console.log(`✓ Copied .open-next/${dirName} -> .open-next/assets/${dirName}`);
  }
}

// 3. Mirror to .vercel/output/static for any Cloudflare fallback configs
const vercelStaticDir = path.join(rootDir, '.vercel', 'output', 'static');
try {
  fs.mkdirSync(vercelStaticDir, { recursive: true });
  fs.cpSync(assetsDir, vercelStaticDir, { recursive: true, force: true });
  console.log('✓ Mirrored assets to .vercel/output/static');
} catch (e) {
  console.warn('⚠️ Warning syncing to .vercel/output/static:', e.message);
}

// 4. Run worker patch to eliminate loadManifest crashes
try {
  require('./patch-worker.js');
} catch (pErr) {
  console.warn('⚠️ Warning running patch-worker:', pErr.message);
}

console.log('⚡️ Cloudflare Pages preparation completed successfully.');
