/** @format */

const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-forms.min.js',
    library: 'ReactFormed',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    react: 'React',
  },
};
