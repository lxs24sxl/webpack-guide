const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge( common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          priority: 10,
          chunks: 'initial',
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true
        }
      }
    }
  }
});