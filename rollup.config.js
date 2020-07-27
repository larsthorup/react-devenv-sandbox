import alias from '@rollup/plugin-alias';

export default {
  context: 'window', // Note: needed because we import React as UMD
  input: 'app/index.js',
  output: {
    file: 'build/app/index.js',
  },
  plugins: [
    alias({
      entries: [
        {
          find: '../node_modules/react/umd/react.development.js',
          replacement: '../node_modules/react/umd/react.production.min.js',
        },
        {
          find: '../node_modules/react-dom/umd/react-dom.development.js',
          replacement:
            '../node_modules/react-dom/umd/react-dom.production.min.js',
        },
      ],
    }),
  ],
};
