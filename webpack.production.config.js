'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

module.exports = {
  entry: [
    path.join(__dirname, 'src/index.js'),
    path.join(__dirname, 'src/styles.scss'),
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.min.js',
    publicPath: '/',
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
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      mangle: {
        except: ['viridisDashboard', 'viridisDashboard.gridster', 'viridisDashboard.gridster.getGridLayout']
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }
    ]
  }
};
