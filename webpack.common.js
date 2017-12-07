const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {    
    app: './src/index.js',
    vendor: ['babel-polyfill', 'whatwg-fetch', 'url-search-params']    
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Test',
      filename: 'index.html',
      template: './src/index.template.html',
      minify:{
        collapseWhitespace: false
      }      
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        exclude: /node_modules/,        
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/[name].[ext]' }
          }
        ]
      }
    ]
  }
};