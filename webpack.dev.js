import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              ['@babel/preset-env', { targets: "last 1 chrome version" } ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ]
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 300,
    ignored: /node_modules/,
  },
});
