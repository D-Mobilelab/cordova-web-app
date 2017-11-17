const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const HYBRID_FOLDER = './www';
module.exports = function(env){
  let outputPath = './dist';
  if(env.APP_ENV === 'hybrid') {
    console.log('Hybrid build');
    outputPath = HYBRID_FOLDER;    
  }
  return merge(common, {
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: '[name].[hash:5].bundle.js'
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Test',
        filename: 'index.html',
        APP_ENV: env.APP_ENV,
        template: './src/index.template.html',
        minify: {
          collapseWhitespace: true
        }
      }),
      // pass this in the global scope
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify('production'),
        APP_ENV: JSON.stringify(env.APP_ENV)        
      }),      
      new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
      }),
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  })
}