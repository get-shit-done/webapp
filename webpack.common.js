// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entryPath = './src/index.tsx'
const outputPath = './build'
const PUBLIC_PATH = '/'

const supportedLocales = ['en']
const config = {
  entry: {
    main: path.resolve(__dirname, entryPath),
  },

  output: {
    path: path.resolve(__dirname, outputPath),
    publicPath: PUBLIC_PATH,
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.md$/, use: ['html-loader', 'highlight-loader', 'markdown-loader'] },
      { test: /\.svg$/, use: 'raw-loader' },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.(ico|jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]`),
    ),
    new MiniCssExtractPlugin({
      fileName: 'style.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

module.exports = config
