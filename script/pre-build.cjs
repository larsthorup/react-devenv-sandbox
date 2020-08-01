const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

fs.rmdirSync(buildDir, { recursive: true });
fs.mkdirSync(buildDir);
fs.mkdirSync(path.join(buildDir, 'style'));
for (const filename of ['favicon.ico', 'index.html']) {
  const src = path.join(rootDir, filename);
  const dest = path.join(buildDir, filename);
  fs.copyFileSync(src, dest);
}
