const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/main.ts',
    styles: './src/styles/styles.scss'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{loader: 'file-loader', options: {}}]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      assets: path.resolve('./src/assets')
    }
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    })
  ],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
};
