/* config-overrides.js */

const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("react-app-rewire-babel-loader");

const webpack = require("webpack");

 
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
    config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/@react-spring")
    );
    config = rewireBabelLoader.include(
        config,
        resolveApp("node_modules/react-spring")
    );

      // Add fallback for Node.js 'crypto' module
 config.resolve = {
    ...config.resolve,
   
    fallback: {
      ...config.resolve?.fallback,
      process: require.resolve("process/browser.js"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: require.resolve("url"),
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      vm: require.resolve("vm-browserify"),
      fs: false, // Not available in browsers
    },
  };

  config.resolve.alias = {
    ...config.resolve.alias,
    src: path.resolve(__dirname, 'src'),
  };
  // Inject global variables for browser compatibility
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ];


    // Explicitly handle CSS and PostCSS files
  const cssRule = config.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  );

         if (cssRule) {
           cssRule.oneOf.unshift({
             test: /\.css$/i,
             exclude: /node_modules/,
             use: [
               require.resolve("style-loader"),
               {
                 loader: require.resolve("css-loader"),
                 options: {
                   importLoaders: 1,
                   sourceMap: env === "development",
                 },
               },
               {
                 loader: require.resolve("postcss-loader"),
                 options: {
                   postcssOptions: {
                     plugins: [
                       require("tailwindcss"),
                       require("autoprefixer"),
                     ],
                   },
                 },
               },
             ],
           });
         }


         /*if (env === "production") {*/
          // Ignore source maps from node_modules
          config.ignoreWarnings = [
            {
              message: /Failed to parse source map/,
            },
          ];
        /*}*/

    return config;
};