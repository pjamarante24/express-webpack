const path = require("path");

/**
 * @type {import("webpack").Configuration}
 */
const clientConfig = {
  mode: "development",
  entry: {
    index: ["react-hot-loader/patch", "./renderer/index.js"],
    counter: ["react-hot-loader/patch", "./renderer/counter.js"],
    todo: ["react-hot-loader/patch", "./renderer/todo.js"],
  },
  output: {
    filename: "[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-hot-loader/babel"],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};

/**
 * @type {import("webpack").Configuration}
 */
const serverConfig = {
  target: "node",
  mode: "development",
  entry: {
    index: ["./src/index.js"],
    counter: ["./src/counter.js"],
    todo: ["./src/todo.js"],
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
  },
};

module.exports = { clientConfig, serverConfig };
