import babel from 'rollup-plugin-babel';

export default {
  input: 'src/base/BaseObject.js',
  output: {
    file: 'dist/base/BaseObject.js',
    format: 'cjs'
  },
  // All the used libs needs to be here
  external: [ ],
  plugins: [
    babel()
  ]
};
