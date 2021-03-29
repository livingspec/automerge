var path = require("path");

const devtool = "source-map";
const mode = "development";
const webpackModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
};

module.exports = [
  {
    entry: "./index.js",
    output: {
      filename: "index.js",
      library: {
        // TODO: modules
        type: "umd",
      },
      path: path.resolve(__dirname, "..", "dist", "import"),
      globalObject: "this",
    },
    mode,
    devtool,
    module: webpackModule,
  },
  {
    entry: "./index.js",
    output: {
      filename: "index.js",
      library: {
        type: "umd",
      },
      path: path.resolve(__dirname, "..", "dist", "default"),
      globalObject: "this",
    },
    mode,
    devtool,
    module: webpackModule,
  },
];
