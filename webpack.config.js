const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const DIR = path.resolve(__dirname);

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    server: "./server.ts"
  },
  output: {
    path: `${DIR}/build/`,
    filename: "[name].js",
    umdNamedDefine: true
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/ },
      {
        test: /\.(.sql)$/i,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", '.json'],
    alias: {
      shared: path.resolve(DIR, 'src/modules/shared'),
      connector: path.resolve(DIR, 'src/connector'),
      service: path.resolve(DIR, 'src/modules/hookah-bar/service'),
      controller: path.resolve(DIR, 'src/modules/hookah-bar/controller'),
      model: path.resolve(DIR, 'src/modules/hookah-bar/model'),
      middleware: path.resolve(DIR, 'src/middleware')
    }
  },
  plugins: [
    new CopyPlugin([
      { from: './src/connector/mysql/scripts/*.sql', to: './scripts/[name].sql' },
    ])
  ]
};