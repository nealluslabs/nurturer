/* config-overrides.js */

const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("react-app-rewire-babel-loader");
 
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

    return config;
};