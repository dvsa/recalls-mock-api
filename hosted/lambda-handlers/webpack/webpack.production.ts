import { merge } from 'webpack-merge';

import * as path from 'path';
import * as child from 'child_process';

import ZipPlugin from 'zip-webpack-plugin';
import AwsSamPlugin from 'aws-sam-webpack-plugin';
import common from './webpack.common';

const repositoryName = 'recalls-mock-api';
const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();
const matchForwardSlash = /\//g;
const currentBranchName = child.execSync('git rev-parse --abbrev-ref HEAD').toString().trim().replace(matchForwardSlash, '-');

const awsSamPlugin = new AwsSamPlugin({ vscodeDebug: false }); // Doesn't work, and removes existing items (Jest debug)
const awsSamEntryMap = awsSamPlugin.entry() as unknown as Record<string, string>;

type EnvironmentVariables = { [key: string]: string | undefined };

export default (env: EnvironmentVariables) => merge(common, {
  mode: 'production',
  devtool: false,
  plugins: Object.keys(awsSamEntryMap).map((lambdaName) => (new ZipPlugin({
    path: `${path.resolve('.')}/dist`,
    filename: env.tag ? `${repositoryName}-${env.tag}-${lambdaName}` : `${repositoryName}-${currentBranchName}-${commitHash}-${lambdaName}`,
    // Only include files for this specific Lambda.
    // eslint-disable-next-line security/detect-non-literal-regexp
    include: [new RegExp(lambdaName)],
    exclude: [/.env/],
    // Remove the `./aws-sam/build/{LambdaName}` nesting.
    pathMapper(assetPath: string) {
      return assetPath.replace(`.aws-sam/build/${lambdaName}`, '.');
    },
  }))),
});
