import { resolve } from "path";
import { sync } from "glob";

export const entry = sync("./scripts/**/*.js");
export const output = {
    path: resolve(__dirname, "./dist"),
    filename: "bundle.js"
};
export const mode = "development";
export const module = {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }]
};

