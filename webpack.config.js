/* eslint-disable prettier/prettier */
const path = require("path");

module.exports = {
    mode: "production",
    entry: ["./src/static.ts"],
    /*
    watchOptions: {
        ignored: ["node_modules/**", "dist/**"]
    },
    */
    output: {
        filename: "cookie-consent.min.js",
        path: path.resolve(__dirname, "example-static")
    },
    devServer: {
        contentBase: "./example-static"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
