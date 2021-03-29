var path = require("path");

const devtool = "source-map";
const mode = "development";
const webpackModule = {
  rules: [
    {
      test: /\.ts$/,
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
    entry: "./mjs/index.js",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "index.js",
      library: {
        type: "module",
      },
      path: path.resolve(__dirname, "..", "dist", "mjs"),
    },
    mode,
    devtool,
    module: webpackModule,
  },
  {
    entry: "./cjs/index.js",
    output: {
      filename: "index.js",
      library: {
        type: "commonjs",
      },
      path: path.resolve(__dirname, "..", "dist", "cjs"),
    },
    mode,
    devtool,
    module: webpackModule,
  },
];
