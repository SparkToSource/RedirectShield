import cssnanoPlugin from 'cssnano';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { mergeWithRules } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prod = {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "> 0.25%, not dead", useBuiltIns: 'usage', corejs: 3 }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                cssnanoPlugin({ preset: 'default', }),
              ],
            },
          },
        }],
      },
    ],
  },
};

export default mergeWithRules({
  module: {
    rules: {
      test: "match",
      include: "replace",
      use: "append",
    },
  },
})(common, prod);
