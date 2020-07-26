import '../node_modules/react/umd/react.development.js';

const { React, ReactDOM } = window;

const { createElement: h, useState } = React;

/** @type {React.FC<{name: string}>} */
const Hello = ({ name }) => {
  const [value, setValue] = useState('');
  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onChange = (ev) => {
    setValue(ev.target.value);
  };
  const h1 = h('h1', null, 'Greeting');
  const p = h('p', null, `Hello ${value ? `${value} ` : ''}from ${name}`);
  const input = h('label', {}, 'Enter name:', h('input', { onChange, value }));
  const button = h('button', {}, 'Submit');
  return h('div', { id: 'hello' }, h1, p, input, button);
};

export default Hello;
