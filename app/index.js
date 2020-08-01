import '../node_modules/react/umd/react.development.js';
import '../node_modules/react-dom/umd/react-dom.development.js';
import App from './app.js';

const { React, ReactDOM } = window;

const { createElement: h } = React;

ReactDOM.render(h(App), document.getElementById('root'));
