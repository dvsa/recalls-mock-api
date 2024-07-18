const { merge } = require('webpack-merge');
const development = require('./webpack.development');

module.exports = merge(development, {
  // @ts-ignore
  watch: true
});
