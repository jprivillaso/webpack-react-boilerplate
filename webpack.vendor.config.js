'use strict';

const webpack = require('webpack');
const path = require('path');

const vendorLibs = [
  'lodash',
  'moment',
  'react',
  'react-dom',
  'react-redux',
  'redux',
  'redux-saga'
];

module.exports = {
  entry: {
    'vendor': vendorLibs,
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      path: 'dist/[name]-manifest.json',
      name: '[name]_lib'
    }),
  ],
}
;