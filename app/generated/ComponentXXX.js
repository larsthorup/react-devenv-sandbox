import { createElement as h, useState } from '../lib/react.js';

/** @type {React.FC<{name: string}>} */
const ComponentXXX = ({ name }) => {
  const [value, setValue] = useState('');

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onChange = (ev) => {
    setValue(ev.target.value);
  };

  return h(
    'div',
    { id: 'component-XXX' },
    h('h1', null, 'Greeting XXX'),
    h('p', null, `Hello ${value ? `${value} ` : ''}from ${name}`),
    h('label', {}, 'Enter name:', h('input', { onChange, value })),
    h('button', {}, 'Submit')
  );
};

export default ComponentXXX;
