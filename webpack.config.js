/* jshint node: true */
var path = require('path');


var AppCachePlugin = require('appcache-webpack-plugin');


module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  plugins: [
    new AppCachePlugin({
      cache: ['icon-1024.png', 'favicon.png']
    })
  ],

  output: {
    path: path.join(__dirname) + '/dist',
    filename: 'macaco-maluco.js',
    libraryTarget: 'umd',
    library: 'MacacoMaluco'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.mp3$/,
        loader: "file?name=[hash].[ext]"
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader"
      }
    ]
  }
};
