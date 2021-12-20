const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = exports.onCreateWebpackConfig = ({
  actions,
  plugins,
  stage,
}) => {
  // when we do `npm run stats`, we generate a bundle size report locally
  // gatsby will open chrome automatically to let us see the result
  const statsPlugins = [];
  if (process.env.REV_STATS) {
    statsPlugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}));
  }

  actions.setWebpackConfig({
    resolve: {
      // Handlling "require" calls in NodeJS
      fallback: {
        fs: false,
        assert: require.resolve('assert'),
        path: require.resolve('path-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
      },
    },

    // https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/
    plugins: [...statsPlugins],
  });
};
