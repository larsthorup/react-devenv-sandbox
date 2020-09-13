import { expect } from './lib/chai.js';
import { createElement as h } from './lib/react.js';
import * as ReactDOM from './lib/react-dom.js';

import Hello from './hello.js';

describe('hello', function () {
  const fixture = document.getElementById('fixture');

  it('works', async function () {
    // when: rendered
    ReactDOM.render(h(Hello, { name: 'mocha' }), fixture);

    // then: shows greeting without user name
    expect(fixture?.querySelector('p')?.innerText).to.equal('Hello from mocha');

    // when: user enter name
    const input = fixture?.querySelector('input');
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(input),
      'value'
    )?.set?.call(input, 'Lars');
    input?.dispatchEvent(new Event('input', { bubbles: true }));

    // then: shows greeting with user name
    expect(fixture?.querySelector('p')?.innerText).to.equal(
      'Hello Lars from mocha'
    );
  });
});
