const os = require('os');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')


function createGlob(glob) {
  return [
    `${glob}/docs/**/*.+(js|md)`,
    `${glob}/src/*.js`,
    `${glob}/package.json`,
    `${glob}/examples/*.js`,
  ];
}

const createDefaultGlob = () => createGlob('components/**');

module.exports = (
  {
    entry,
    host,
    port,
    env = 'development',
    cwd = process.cwd(),
    noMinimize = false,
    report = false,
  },
) => ({
  mode: env,
  entry: {
    main:
      env === 'development' && host && port
        ? [
          'react-hot-loader/patch',
          `${require.resolve(
            'webpack-dev-server/client',
          )}?http://${host}:${port}/`,
          'webpack/hot/only-dev-server',
          path.join(process.cwd(), entry),
        ]
        : path.join(cwd, entry),
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(cwd, 'dist'),
    publicPath: '/',
  },
  devtool: env === 'production' ? false : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /SITE_DATA$/,
        loader: require.resolve('@versionone/ui-site-data'),
        options: {
          debug: env === 'development',
          include: [
            'docs/**/*.md',
            ...createDefaultGlob(),
          ].filter(p => !!p),
          exclude: [
            '**/node_modules/**',
            'docs/assets/**',
            'packages/**/__tests__/**',
            'components/**/__tests__/**',
          ],
        },
      },
      {
        test: /\.icon\.svg$/,
        loaders: [
          require.resolve('babel-loader'),
          require.resolve('@versionone/ui-svg-icon-loader'),
        ],
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  resolve: {
    mainFields: ['main:src', 'main'],
    extensions: ['.js', '.jsx'],
  },
  plugins: plugins({ cwd, env, noMinimize, report }),
});
function plugins(
  {
    cwd,
    env,
    noMinimize,
    report,
  },
) {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'public/index.html.ejs'),
      title: `VersionOne UI Component Library${env === 'development' ? ' - DEV' : ''}`,
      // favicon: path.join(
      //   cwd,
      //   `public/favicon${env === 'development' ? '-dev' : ''}.ico`,
      // ),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),
    new CopyWebpackPlugin([
      { from: path.join(process.cwd(), '..', '**', 'docs', 'assets/**/*'), to: path.join(process.cwd(), 'dist', 'assets'), flatten: true, },
      { from: path.join(process.cwd(), '_redirects'), to: path.join(process.cwd(), 'dist'), type: 'file', },
    ], {
        debug: env === 'development',
      }),
  ];

  if (report) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: true,
        generateStatsFile: true,
        logLevel: 'error',
      }),
    );
  }

  if (env === 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
  }

  if (env === 'production' && !noMinimize) {
    plugins.push(uglify());
  }

  return plugins;
}

const uglify = () => {
  return new UglifyJsPlugin({
    parallel: Math.max(os.cpus().length - 1, 1),
    uglifyOptions: {
      compress: {
        arrows: false,
        booleans: false,
        collapse_vars: false,
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        if_return: false,
        inline: false,
        join_vars: false,
        keep_infinity: true,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        sequences: false,
        side_effects: false,
        switches: false,
        top_retain: false,
        toplevel: false,
        typeofs: false,
        unused: false,
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: true,
    },
  });
};
