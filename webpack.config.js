const path = require("path")
const mode = process.env.MODE === "dev"

let config = {
    mode : (mode)? "development" : "production" ,
    watch : mode ,
    entry : "./src/CirclesJS.js",
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "CirclesJS.min.js",
        library : "Circles",
        libraryTarget : "umd",
        globalObject: 'this'
    },
    devtool : "inline-source-map",
    optimization : {
      minimize : true
    },
    module: {
      rules: [
        {
          enforce : "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ["eslint-loader"],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
      ]
    }
}
module.exports = config 