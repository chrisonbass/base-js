import includePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
    include: {},
    paths: ['src/lib'],
    external: [
      "react"
    ],
    extensions: ['.js', '.json', '.html']
};

export default {
    entry: './src/main.js',
    format: 'cjs',
    dest: 'public/main.min.js',
    plugins: [ includePaths(includePathOptions) ],
};
