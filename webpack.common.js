import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class InjectCompiledCodePlugin {
  constructor(options) {
    this.entry = options.entry;
    this.targetAsset = options.targetAsset;
    this.placeholder = options.placeholder || '/* COMPILED_CODE */';
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('InjectCompiledCodePlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'InjectCompiledCodePlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        async () => {
          const entryAsset = compilation.getAsset(this.entry);
          const compiledCode = entryAsset.source.source();

          const targetAsset = compilation.getAsset(this.targetAsset);
          const targetCode = targetAsset.source.source();

          const replaced = targetCode.replace(this.placeholder, JSON.stringify(compiledCode));
          compilation.updateAsset(this.targetAsset, new compiler.webpack.sources.RawSource(replaced));

          compilation.deleteAsset(this.entry);
        }
      );
    });
  }
}

export default {
  entry: {
    popup: './src/popup/Popup.ts',
    content: './src/content/Content.ts',
    injectee: './src/content/InjectedContent.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash][ext][query]',
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/popup'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false, }
          },
        ],
      },
    ]
  },
  plugins: [
    new InjectCompiledCodePlugin({
      entry: 'injectee.bundle.js',
      targetAsset: 'content.bundle.js',
      placeholder: '/* COMPILED_CODE */'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: './src/popup/popup.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets/icons'),
        to: 'icons',
      }, {
        from: path.resolve(__dirname, 'manifest.json'),
        to: 'manifest.json',
      }],
    }),
  ],
};
