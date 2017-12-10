'use strict';

const webpackAppCodeConfig = './webpack/concurrent/webpack.concurrent-app.js';
const webpackAppStylesConfig = './webpack/concurrent/webpack.concurrent-styles.js';

const NODE_ENV = process.env.NODE_ENV || 'development';
const BUILD_PIPELINE = [ webpackAppStylesConfig, webpackAppCodeConfig ];

console.log(`Running webpack build through API. Env [${NODE_ENV}]`);

const runAsyncBuild = () => {

  const { fork } = require('child_process');

  for (let i = 0; i < BUILD_PIPELINE.length; i++) {

    const childProcess = fork(BUILD_PIPELINE[i]);

    childProcess.on('message', ({message, processName}) => {

      if (message === 'FINISHED_BUILD') {
        console.log(`Killing process ${processName}`);
        childProcess.kill('SIGINT');
      } else {
        console.log(`Message from ${processName}: \n ${message}`);
      }

    });

  }

};

runAsyncBuild();
