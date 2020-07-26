export default {
  context: 'window', // Note: needed because we import React as UMD
  input: 'app/index.js',
  output: {
    file: 'build/app/index.js',
  },
};
