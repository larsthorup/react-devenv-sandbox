import '../node_modules/react/umd/react.development.js';
import Hello from './hello.js';

const { React } = window;

const { createElement: h } = React;

const App = () => h(Hello, { name: 'lib/react' });

export default App;
