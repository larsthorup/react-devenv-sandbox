import { expect } from '../lib/chai.js';
import { createElement as h } from '../lib/react.js';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '../lib/react-testing-library.js';

import ComponentXXX from './ComponentXXX.js';

describe('ComponentXXX', function () {
  afterEach(cleanup);
  it('works', async function () {
    // when: rendered
    render(h(ComponentXXX, { name: 'test-XXX' }));

    // then: shows greeting without user name
    expect(await screen.findByText('Hello from test-XXX')).to.exist;

    const name = Math.random().toString();

    // when: user enter name
    fireEvent.change(screen.getByRole('textbox', { name: 'Enter name:' }), {
      target: { value: name },
    });

    // then: shows greeting with user name
    expect(await screen.findByText(`Hello ${name} from test-XXX`)).to.exist;
  });
});
