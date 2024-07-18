import * as path from 'path';
import * as webpack from 'webpack';

import AwsSamPlugin from 'aws-sam-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const awsSamPlugin = new AwsSamPlugin({ vscodeDebug: false });

const awsSamEntryMap = awsSamPlugin.entry() as unknown as Record<string, string>;

const webpackConfig: webpack.Configuration = {
  name: 'server',
  target: 'node',
  entry: () => awsSamEntryMap,
  output: {
    filename: (chunkData) => awsSamPlugin.filename(chunkData),
    libraryTarget: 'commonjs2',
    path: path.resolve('.'),
    chunkFormat: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  externals: {
    fsevents: "require('fsevents')",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // This is required when using TypeORM.
          // Prevents Webpack/Terser stripping class names breaking reflection.
          keep_classnames: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.webpack.json',
        },
      },
    ],
  },
  plugins: [
    awsSamPlugin,
  ].filter(Boolean).flat() as webpack.WebpackPluginInstance[],
};

export default webpackConfig;
