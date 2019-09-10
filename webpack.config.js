const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.join(__dirname, 'packages', 'react-formed-playground', 'index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'babel-loader',
    }],
  },
};

module.exports = config;