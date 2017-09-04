'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true
});

const SRC_PATH = path.join(__dirname, 'src');
const DIST_PATH = path.join(__dirname, '/dist/');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      `${SRC_PATH}/index.js`,
      `${SRC_PATH}/styles.scss`
    ]
  },
  output: {
    path: DIST_PATH,
    filename: 'js/[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tmpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    extractCSS,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    alias: {
      '~components': path.resolve(__dirname, 'src/components/'),
      '~containers': path.resolve(__dirname, 'src/containers/'),
      '~constants': path.resolve(__dirname, 'src/constants/'),
      '~reducers': path.resolve(__dirname, 'src/reducers/'),
      '~sagas': path.resolve(__dirname, 'src/sagas/'),
      '~actions': path.resolve(__dirname, 'src/actions/'),
      '~services': path.resolve(__dirname, 'src/services/'),
      '~utils': path.resolve(__dirname, 'src/utils/'),
    },
    extensions: ['.js'],
  }
};
