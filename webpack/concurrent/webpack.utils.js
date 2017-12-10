const path = require('path');
const webpack = require('webpack');

const generateWebpackStats = (info, webpackProcessName) => {

  const fs = require('fs');
  const dir = path.resolve(__dirname, '../../stats');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = `../../stats/${webpackProcessName}-stats.json`;
  fs.writeFile(path.resolve(__dirname, fileName), JSON.stringify(info), (err) => {

    if(err) {
      console.log(err);
    } else {
      console.log(`${webpackProcessName}-stats.json were saved successfully!`);
    }

  });

};

const compile = (configObject, webpackProcessName) => {

  return new Promise((fulfill, reject) => {

    webpack(configObject, (err, stats) => {

      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        reject();
      }

      const info = stats.toJson();
      generateWebpackStats(info, webpackProcessName);

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log(
        stats.toString({
          assets: true,
          colors: true,
          chunks: false,
          errors: true,
          timings: true,
          version: true,
          warnings: true
        })
      );

      fulfill();

    });

  });

};

module.exports = {
  compile
};
