const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer({
  distDir: ".next",
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFileName: "../bundles/client.html",
    },
  },
  webpack(config) {
    console.log("config", config);
    const prod = process.env.NODE_ENV;
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    if (prod) {
      plugins.push(new CompressionPlugin());
    }
    return {
      ...config,
      mode: prod === "production" ? "production" : "development",
      devtool: prod === "production" ? "hidden-source-map" : "eval",
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            loader: "webpack-ant-icon-loader",
            enforce: "pre",
            include: [require.resolve("@ant-design/icons/lib/dist")],
          },
        ],
      },
      plugins,
    };
  },
});

/**
 * hidden-source-map
 * - 소스코드 숨기면서 에러시 소스맴 제공
 *
 * eval
 * - 빠르게 웹팩 적용
 *
 * @zeit/next-bundle-analyzer
 * - front서버의 package와 server코드를 분석해주는 라이브러리
 *
 * CompressionPlugin
 * - js 파일을 압축시켜주는 라이브러리
 *
 */
