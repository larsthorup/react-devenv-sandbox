const fs = require('fs');
const path = require('path');

// Note: to be able to use __dirname below, this file is a .cjs file
const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');

if (fs.existsSync(buildDir)) {
  fs.rmdirSync(buildDir, { recursive: true });
}
fs.mkdirSync(buildDir);
for (const filename of ['favicon.ico', 'index.html']) {
  const src = path.join(rootDir, filename);
  const dest = path.join(buildDir, filename);
  fs.copyFileSync(src, dest);
}
