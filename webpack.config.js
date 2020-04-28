const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const DIR = path.resolve(__dirname);
const baseConfig = {
  target: "node",
  entry: {
    server: "./server.ts",
    mysqlSeed: "./src/connector/mysql/seed/index.ts"
  },
  output: {
    path: `${DIR}/build/`,
    filename: "[name].js",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(.sql)$/i,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", '.json'],
    alias: {
      shared: path.resolve(DIR, 'src/modules/shared'),
      connector: path.resolve(DIR, 'src/connector'),
      service: path.resolve(DIR, 'src/modules/HookahBar/service'),
      controller: path.resolve(DIR, 'src/modules/HookahBar/controller'),
      model: path.resolve(DIR, 'src/modules/HookahBar/model'),
      middleware: path.resolve(DIR, 'src/middleware')
    }
  },
  plugins: [
    new CopyPlugin([
      { from: './src/connector/mysql/scripts/*.sql', to: './scripts/[name].sql' },
      { from: './src/connector/mysql/seed/*.sql', to: './seed/[name].sql' }
    ]),
    new Dotenv()
  ]
};

const developConfig = {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    minimize: false
  }
};

const stageConfig = {
  mode: "production",
  devtool: "inline-source-map",
  optimization: {
    minimize: false
  }
};

const prodConfig = {
  mode: "production",
  optimization: {
    minimize: true
  }
};

module.exports = env => {
  let appConfig;

  switch (env.service) {
    case 'dev':
      appConfig = developConfig;
      break;
    case 'stage':
      appConfig = stageConfig;
      break;
    case 'prod':
      appConfig = prodConfig;
  }
  return Object.assign({}, baseConfig, appConfig)
};