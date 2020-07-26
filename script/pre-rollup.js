const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

fs.rmdirSync(buildDir, { recursive: true });
fs.mkdirSync(buildDir);
for (const filename of ['favicon.ico', 'index.html']) {
  const src = path.join(rootDir, filename);
  const dest = path.join(buildDir, filename);
  fs.copyFileSync(src, dest);
}
