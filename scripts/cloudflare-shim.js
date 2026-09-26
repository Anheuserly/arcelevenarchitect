const fs = require('fs');
const path = require('path');

const binDir = path.join(__dirname, '..', 'node_modules', '.bin');
const binPath = path.join(binDir, 'next-on-pages');

const shimContent = `#!/usr/bin/env node
const { execSync } = require('child_process');
console.log('⚡️ [@cloudflare/next-on-pages bridge] Routing build to modern OpenNext Cloudflare adapter...');
try {
  execSync('npm run build:pages', { stdio: 'inherit' });
  console.log('⚡️ OpenNext Cloudflare Pages build completed successfully.');
} catch (err) {
  console.error('⚡️ OpenNext build failed:', err.message);
  process.exit(1);
}
`;

try {
  if (!fs.existsSync(binDir)) {
    fs.mkdirSync(binDir, { recursive: true });
  }
  fs.writeFileSync(binPath, shimContent, { mode: 0o755 });
  console.log('[cloudflare-shim] Installed next-on-pages shim at node_modules/.bin/next-on-pages');
} catch (e) {
  console.warn('[cloudflare-shim] Warning:', e.message);
}
