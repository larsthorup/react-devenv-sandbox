import '../node_modules/react/umd/react.development.js';

const { React } = window;

const { createElement: h, useState } = React;

/** @type {React.FC<{name: string}>} */
const Hello = ({ name }) => {
  const [value, setValue] = useState('');

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const onChange = (ev) => {
    setValue(ev.target.value);
  };

  return h('div', { id: 'hello' }, [
    h('h1', null, 'Greeting'),
    h('p', null, `Hello ${value ? `${value} ` : ''}from ${name}`),
    h('label', {}, ['Enter name:', h('input', { onChange, value })]),
    h('button', {}, 'Submit'),
  ]);
};

export default Hello;
