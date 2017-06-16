const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: ['./examples/index.js'],
  },
  output: {
    path: path.join(__dirname, './docs'),
    publicPath: '/docs',
    filename: 'bundle.js',
    library: 'coloreact',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
}
