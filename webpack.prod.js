// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GenerateSW = require('workbox-webpack-plugin').GenerateSW

module.exports = merge(common, {
  mode: 'production',
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      },
    },
    runtimeChunk: 'single',
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10000000,
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
  ]
})
