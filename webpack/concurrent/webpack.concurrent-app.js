'use strict';

console.log('Running app build');

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const { compile } = require('./webpack.utils.js');
const NODE_ENV = process.env.NODE_ENV || 'development';

const webpackConfig = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../../src/index.js')
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.min.js',
    publicPath: '',
    chunkFilename: 'chunk-[id]-[name].js',
    pathinfo: true
  },
  resolve: {
    modules: [
      'lib',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.tmpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('../../dist/vendor-manifest.json')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};

const run = async() => {

  await compile(webpackConfig, 'webpack.concurrent-app.js');
  process.send({
    message: 'FINISHED_BUILD',
    processName: 'webpack.concurrent-app.js'
  });

};

run();
