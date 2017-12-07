'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const port = 3000;
const config = require(`./webpack.${process.env.NODE_ENV}.config.js`);
const isDevMode = process.env.NODE_ENV !== 'production';

const app = express();

if (isDevMode) {

  const compiler = webpack(config);
  const middleware = new WebpackDevServer(compiler, {
    publicPath: '/',
    contentBase: '/',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    quiet: false,
    noInfo: false,
    watchOptions: {
      poll: true
    }
  });

  middleware.listen(port);

} else {

  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('/', (req, res) => {
    console.log('Request');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  app.listen(port, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info('==> Production: 🌎  Listening on port %s. Open up ' + 'http://localhost:%s/ in your browser.', port, port);
    }
  });

}
