import { merge } from 'webpack-merge';

import CopyPlugin from 'copy-webpack-plugin';
import AwsSamPlugin from 'aws-sam-webpack-plugin';
import common from './webpack.common';

const awsSamPlugin = new AwsSamPlugin({ vscodeDebug: false }); // Doesn't work, and removes existing items (Jest debug)
const awsSamEntryMap = awsSamPlugin.entry() as unknown as Record<string, string>;

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: Object.keys(awsSamEntryMap).map((lambdaName) => ([
        { from: './.env', to: `.aws-sam/build/${lambdaName}/` },
      ].filter(Boolean) as CopyPlugin.ObjectPattern[]
    )).flat(),
}),
],
});
