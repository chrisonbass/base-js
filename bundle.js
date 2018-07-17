var rollup = require('rollup').rollup,
  babel = require('rollup-plugin-babel');

var files = [
  [ "./src/base/BaseObject.js", "dist/base/BaseObject.js",{}],
  [ "./src/base/Behavior.js", "dist/base/Behavior.js",{
    external: [
      './src/base/BaseObject'
    ]
  }],
  [ "./src/base/Component.js", "dist/base/Component.js",{
    external: [
      './src/base/BaseObject',
      './src/base/Behavior',
      'react'
    ]
  }]
];

files.forEach ( file => {
  var i = {
    input: file[0],
    plugins: [
      babel()
    ]
  };
  rollup(
    Object.assign({}, i, file[2])
  )
  .then(bundle => {
    bundle.write({
      format: 'cjs',
      file: file[1]
    });
  } );
} );
