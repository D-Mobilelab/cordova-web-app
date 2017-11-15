const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

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
      host: '0.0.0.0'
    }
  });
 }