const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  devServer: {
    port: 5200,
    proxy: {
      "/api": {
        target: "https://csd.cskj.site/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    requireModuleExtension: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("globalConfig", path.resolve(__dirname, "./src/globalConfig.js"));

    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        globalConfig: "globalConfig"
      }
    ]);

    config
      .entry("app")
      .clear()
      .add("./src/content.js");

    config.module.rule("svg").exclude.add(resolve("src/icons/svg"));

    config.module
      .rule("icons")
      .test(/\.(svg)(\?.*)?$/)
      .include.add(resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    if (isProduction) {
      config.entry("background").add("./src/background.js");

      config.output
        .filename("js/[name].js")
        .chunkFilename("js/[name].js")
        .library("")
        .libraryTarget("umd");

      config.plugin("extract-css").tap(args => {
        args.forEach(item => {
          item.filename = "css/[name].css";
          item.chunkFilename = "css/[name].css";
        });
        return args;
      });

      config.module
        .rule("fonts")
        .use("url-loader")
        .tap(args => {
          // args.fallback.options.publicPath = '/';
          args.fallback.options.name = "fonts/[name].[ext]";
          return args;
        });

      // 删除 HTML 相关的 webpack 插件
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserWebpackPlugin({
            parallel: true
          })
        ]
      };
    }
  }
};