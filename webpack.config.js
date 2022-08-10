const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function securityContent(...args) {
  return args.join(" ");
}

const optimizer = (argv) => ({
  minimize: (argv.mode !== 'development'),
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
  ],
});

module.exports = (env, argv) => ([{
  name: "main",
  entry: "./src/main.ts",
  target: "electron-main",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./lib/libcrypto-1_1-x64.dll", to: "libcrypto-1_1-x64.dll" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
  },
  externals: {
  },
  optimization: optimizer(argv),
}, {
  name: "preload",
  entry: "./src/preload.ts",
  target: "electron-preload",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "preload.js",
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
  },
  optimization: optimizer(argv),
}, {
  name: "renderer",
  entry: "./src/index.tsx",
  target: argv.mode === "development" ? "web": "electron-renderer",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "renderer.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "CK3 Mod Updater",
      meta: argv.mode !== "development" ? {
        "Content-Security-Policy": {
          "http-equiv": "Content-Security-Policy",
          "content": securityContent(
            "default-src 'self';",
            "img-src 'self' data:;",
            "script-src 'self'",
          ),
        },
      } : {}
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
  },
  optimization: optimizer(argv),
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9999,
  },
}]);
