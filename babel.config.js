const path = require('path');
const tsconfig = require('./tsconfig.json');

const createConfig = (api) => {
  api.cache(true);

  const paths = tsconfig.compilerOptions.paths;
  const babelPaths = Object.keys(paths).reduce((output, key) => {
    const correctedPath = path.resolve(
      __dirname,
      tsconfig.compilerOptions.baseUrl,
      paths[key][0],
    );
    return {
      ...output,
      [key]: correctedPath,
    }
  }, {});

  return {
    presets: [
      '@babel/preset-env',
      '@babel/react',
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
      [require.resolve('babel-plugin-module-resolver'), {
        alias: {
          ...babelPaths,
        },
        extensions: ['.ts']
      }],
    ],
  };
};

module.exports = createConfig;