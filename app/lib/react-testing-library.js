import '../../node_modules/react-dom/umd/react-dom-test-utils.development.js';
import '../../node_modules/@testing-library/react/dist/@testing-library/react.pure.umd.js';

/** @typedef {typeof import('@testing-library/react')} TestingLibraryReact */

/** @type {any} */
const windowUnknown = /** @type {any} */ window;

/** @type { { TestingLibraryReact: TestingLibraryReact } } */
const windowWithTestingLibraryReact =
  /** @type { {TestingLibraryReact: TestingLibraryReact} } */ windowUnknown;

const { TestingLibraryReact } = windowWithTestingLibraryReact;

const { cleanup, fireEvent, render, screen } = TestingLibraryReact;

export { cleanup, fireEvent, render, screen };
