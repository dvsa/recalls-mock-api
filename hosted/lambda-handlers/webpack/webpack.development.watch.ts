import { merge } from 'webpack-merge';
import development from './webpack.development';

export default merge(development, {
  watch: true,
});
