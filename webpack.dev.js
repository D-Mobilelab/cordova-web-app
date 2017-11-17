const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const PLATFORM_ANDROID = './platforms/android/assets/www';
const PLATFORM_IOS = './platforms/ios/www';

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
      new HtmlWebpackPlugin({
        title: 'Test',
        filename: 'index.html',
        APP_ENV: env.APP_ENV,
        template: './src/index.template.html',
        minify: {
          collapseWhitespace: false
        }
      }),
      // pass this in the global scope
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('development'),
        APP_ENV: JSON.stringify(env.APP_ENV),
      }),    
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      })
    ]
  });
 }