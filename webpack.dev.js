// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    inline: true,
    port: 3002,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ],
  },
})
