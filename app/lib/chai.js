import '../../node_modules/chai/chai.js';

/** @typedef {typeof import('chai')} ChaiStatic */

/** @type {any} */
const windowUnknown = /** @type {any} */ window;

/** @type { {chai: ChaiStatic} } */
const windowWithChai = /** @type { {chai: ChaiStatic} } */ windowUnknown;

const { chai } = windowWithChai;

export default chai;
const { expect } = chai;
export { expect };
