import * as fs from 'fs';

const count = 100;
const folder = 'app/generated';
const fileNames = ['ComponentXXX.js', 'ComponentXXX.test.js'];
const sources = fileNames.map((fileName) =>
  fs.readFileSync(`${folder}/${fileName}`, 'utf-8')
);

const runnerHtml = [];
for (let i = 100; i < 100 + count; ++i) {
  const xxx = i.toString();
  for (let f = 0; f < fileNames.length; ++f) {
    const fileName = fileNames[f];
    const source = sources[f];
    const targetFileName = fileName.replace(/XXX/g, xxx);
    const targetSource = source.replace(/XXX/g, xxx);
    fs.writeFileSync(`${folder}/${targetFileName}`, targetSource);
    runnerHtml.push(
      `<script type="module" src="../app/generated/Component${xxx}.test.js"></script>`
    );
  }
  fs.writeFileSync(`${folder}/mocha-runner.html`, runnerHtml.join('\n'));
}
