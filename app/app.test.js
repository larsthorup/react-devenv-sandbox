import { expect } from './lib/chai.js';
import { createElement as h } from './lib/react.js';
import { fireEvent, render, screen } from './lib/react-testing-library.js';

import App from './app.js';

describe('app', function () {
  it('works', async function () {
    // when: rendered
    render(h(App));

    // then: shows greeting without user name
    expect(await screen.findByText('Hello from lib/react')).to.exist;

    // when: user enter name
    fireEvent.change(screen.getByRole('textbox', { name: 'Enter name:' }), {
      target: { value: 'Lars' },
    });

    // then: shows greeting with user name
    expect(await screen.findByText('Hello Lars from lib/react')).to.exist;
  });
});
