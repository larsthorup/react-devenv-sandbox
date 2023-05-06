import ChromeLauncher from 'chrome-launcher';
import * as fs from 'fs';
import httpServer from 'http-server';
import puppeteer from 'puppeteer-core';
import puppeteerToIstanbul from 'puppeteer-to-istanbul';
import * as util from 'util';
import { getMochaResult, initMocha } from './browser/mocha-bridge.js';

// Note: inspired by https://github.com/direct-adv-interfaces/mocha-headless-chrome/

const root = '.';
const port = 8081;
const url = `http://localhost:${port}/dev/mocha-runner.html`;
const reporter = 'dot';
const timeout = 60000;

const main = async () => {
  try {
    await startingServer();
    const result = await runningMochaInPuppeteer();
    await writingResult(result);
    process.exit(result.mochaResult.result.stats.failures > 0 ? 1 : 0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const startingServer = async () => {
  const server = httpServer.createServer({ root });
  await new Promise((resolve) => server.listen(port, 'localhost', resolve));
};

const runningMochaInPuppeteer = async () => {
  const chromePaths = ChromeLauncher.Launcher.getInstallations();
  const [chromePath] = chromePaths;
  const options = {
    executablePath: chromePath,
  };
  const browser = await puppeteer.launch(options);
  const pages = await browser.pages();
  const page = pages.pop();
  let isPageError = false;
  page.on('console', mochaConsoleHandler);
  page.on('pageerror', ({ message }) => {
    console.error(message);
    isPageError = true;
  });
  page.on('response', (/*response*/) => {
    // console.log(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', (request) => {
    console.error(`${request.failure().errorText} ${request.url()}`);
  });
  page.on('dialog', (dialog) => dialog.dismiss());
  await page.evaluateOnNewDocument(initMocha, reporter);
  await page.coverage.startJSCoverage();
  await page.coverage.startCSSCoverage();
  await page.goto(url);
  await page.waitForFunction(getMochaResult, {
    timeout,
  });
  const mochaResult = await page.evaluate(getMochaResult);
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);
  await browser.close();
  if (isPageError) throw new Error('See page errors above');
  return {
    mochaResult,
    jsCoverage,
    cssCoverage,
  };
};

const writingResult = (result) => {
  fs.mkdirSync('output/test', { recursive: true });
  fs.writeFileSync(
    'output/test/mocha-test-result.json',
    JSON.stringify(result.mochaResult, null, 2)
  );
  const coverage = [...result.jsCoverage, ...result.cssCoverage];
  let totalBytes = 0;
  let usedBytes = 0;
  for (let { ranges, text, url } of coverage) {
    if (
      !url.includes('/node_modules/') &&
      (url.endsWith('.js') || url.endsWith('.css')) &&
      !url.endsWith('.test.js')
    ) {
      totalBytes += text ? text.length : 0;
      for (let range of ranges) {
        // console.log(range.start, range.end);
        usedBytes += range.end - range.start - 1;
      }
    }
  }
  console.log(`Code coverage in bytes: ${(usedBytes / totalBytes) * 100}%`);
  puppeteerToIstanbul.write(coverage, {
    includeHostname: true,
    storagePath: './.nyc_output',
  });
};

const mochaConsoleHandler = (msg) => {
  const args = msg.args();
  Promise.all(args.map((a) => a.jsonValue().catch(() => ''))).then((args) => {
    // process stdout stub
    let isStdout = args[0] === 'stdout:';
    isStdout && (args = args.slice(1));

    let msg = util.format(...args);
    !isStdout && msg && (msg += '\n');
    process.stdout.write(msg);
  });
};

main();
