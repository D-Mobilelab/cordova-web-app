const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const PLATFORM_ANDROID = './platforms/android/platform_www';
const PLATFORM_IOS = './platforms/ios/platform_www';

 module.exports = function(env) {
  let contentBase = './dist';  
  if(env.APP_ENV === 'hybrid'){
    if(env.PLATFORM === 'android') {
      contentBase = PLATFORM_ANDROID;
    } else {
      contentBase = PLATFORM_IOS;
    }
  }

  return merge(common, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: contentBase,
      host: '0.0.0.0' // needed to be served from your ip
    },
    plugins: [
      // pass this in the global scope
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('development'),
        APP_ENV: JSON.stringify(env.APP_ENV),
      }),

/*  
    disable in development
    new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }) */
    ]
  });
 }