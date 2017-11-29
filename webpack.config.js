const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-forms.min.js',
    library: 'ReactFormed',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
    }],
  },
  externals: {
    react: 'React',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true }),
  ],
};
