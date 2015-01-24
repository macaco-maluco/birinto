/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'macaco-maluco.js',
    libraryTarget: 'umd',
    library: 'MacacoMaluco'
  },

  externals: {
   'react': 'var React'
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
      }
    ]
  }
};
