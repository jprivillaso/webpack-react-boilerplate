'use strict';

const path = require('path');

console.log('Running styles build');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { compile } = require('./webpack.utils.js');

const extractCSS = new ExtractTextPlugin({
  filename: 'styles.css',
  ignoreOrder: true
});

const webpackConfig = {
  entry: [
    './src/styles.scss',
  ],
  output: {
    path: path.resolve(__dirname, '../../dist'),
    /**
     * This is a little hack. Webpack was intended to work only with js files,
     * so it's not possible to generate only css assets.
     */
    filename: 'styles.css'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        /**
         * This is made on purpose in order to show how to
         * make concurrent builds. I will include the utils folder
         * in a separate build.
         */
        exclude: /node_modules|utils/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      }
    ]
  },
  plugins: [
    extractCSS
  ],
  resolve: {
    extensions: ['.scss', '.css']
  }
};

const run = async() => {

  await compile(webpackConfig, 'webpack.concurrent-styles.js');

  /**
   * This timeout is just to show that the builds are processed
   * in parallel
   */
  setTimeout(() => {

    process.send({
      message: 'FINISHED_BUILD',
      processName: 'webpack.concurrent-styles.js'
    });

  }, 15000);

};

run();
