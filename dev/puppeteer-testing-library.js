import ptl from 'pptr-testing-library';
/** @typedef {import('puppeteer-core').ElementHandle} ElementHandle */

export const wait = ptl.wait;

/**
 *
 * @param {Promise<ElementHandle>} elementPromise
 * @param {*} text
 */
const type = async (elementPromise, text) => {
  const element = await elementPromise;
  await element.type(text);
};

/**
 *
 * @param {Promise<ElementHandle>} elementPromise
 */
const click = async (elementPromise) => {
  const element = await elementPromise;
  await element.click();
};

export const userEvent = { type, click };
