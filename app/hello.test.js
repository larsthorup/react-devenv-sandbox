import puppeteer from 'puppeteer-core'; // mocha-ok, tsc-error
import ptl from 'pptr-testing-library';
import * as staticServer from '../dev/static-server.js';
import { userEvent, wait } from '../dev/puppeteer-testing-library.js';

/** @typedef {import('puppeteer-core').Browser} Browser */
/** @typedef {import('puppeteer-core').ElementHandle} ElementHandle */
/** @typedef {import('http').Server} Server */
/** @typedef {import('pptr-testing-library')} */

describe('server', function () {
  this.timeout(15000);
  // TODO: extract and --require
  const chromePath =
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'; // TODO
  let port = 8090;
  const rootUrl = `http://localhost:${port}`;
  let rootDir = process.env.NODE_ENV === 'production' ? './build' : '.';
  /** @type {Browser} */
  let browser;
  /** @type {ElementHandle} */
  let document;
  // let page;
  /** @type {Server} */
  let server;
  before(async function () {
    server = await staticServer.launch(port, rootDir);
    browser = await puppeteer.launch({ executablePath: chromePath });
    const page = await browser.newPage();
    // await page.coverage.startJSCoverage();
    await page.goto(`${rootUrl}`, {
      waitUntil: 'networkidle2',
    });
    // await page.screenshot({ path: 'output/index.test.png' }); // TODO
    document = await ptl.getDocument(page);
  });

  after(async function () {
    // pti.write(await page.coverage.stopJSCoverage());
    if (browser) {
      await browser.close();
    }
    if (server) {
      await staticServer.terminate(server);
    }
  });

  describe('hello', function () {
    it('works', async function () {
      const screen = ptl.getQueriesForElement(document);
      await wait(() => screen.getByText('Hello from lib/react'));
      await userEvent.type(screen.getByLabelText('Enter name:'), 'Lars');
      await userEvent.click(screen.getByText('Submit'));
      await wait(() => screen.getByText('Hello Lars from lib/react'));
    });
  });
});
