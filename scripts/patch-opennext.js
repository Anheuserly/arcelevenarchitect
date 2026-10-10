const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'node_modules', '@opennextjs', 'cloudflare', 'dist', 'cli', 'build', 'patches', 'plugins', 'load-manifest.js');

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');

  // Ensure preview-props and other Next 16 optional manifests are handled
  if (!content.includes('preview-props')) {
    content = content.replace(
      'p.endsWith("prefetch-hints")',
      'p.endsWith("prefetch-hints") || p.endsWith("preview-props") || $PATH.includes("preview-props")'
    );
  }

  // Prevent fatal crash if an unknown optional manifest is requested
  content = content.replace(
    'throw new Error(`Unexpected loadManifest(${$PATH}) call!`);',
    'return {};'
  );

  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('[patch-opennext] Successfully patched @opennextjs/cloudflare load-manifest plugin.');
} else {
  console.warn('[patch-opennext] Target file not found, skipping patch.');
}
