const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, '..', '.open-next', 'server-functions', 'default', 'handler.mjs'),
  path.join(__dirname, '..', '.open-next', 'worker.js'),
  path.join(__dirname, '..', '.open-next', 'assets', 'server-functions', 'default', 'handler.mjs'),
  path.join(__dirname, '..', '.open-next', 'assets', '_worker.js'),
  path.join(__dirname, '..', '.vercel', 'output', 'static', 'server-functions', 'default', 'handler.mjs'),
  path.join(__dirname, '..', '.vercel', 'output', 'static', '_worker.js'),
];

for (const file of candidates) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Replace fatal loadManifest throw with empty object fallback
    if (content.includes('Unexpected loadManifest(')) {
      content = content.replace(
        /throw new Error\(`Unexpected loadManifest\(\$\{[^}]+\}\) call!`\)/g,
        'return {}'
      );
      content = content.replace(
        /throw new Error\("Unexpected loadManifest\(" \+ [^)]+\+ "\) call!"\)/g,
        'return {}'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`[patch-worker] Successfully patched ${path.basename(file)} to prevent loadManifest crashes.`);
    }
  }
}
