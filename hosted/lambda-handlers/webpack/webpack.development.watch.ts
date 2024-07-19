import { merge } from 'webpack-merge';
import development from './webpack.development';

module.exports = merge(development, {
  watch: true,
});
