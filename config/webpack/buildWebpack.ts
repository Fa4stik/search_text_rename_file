import {buildPlugins} from "./buildPlugins";
import webpack from "webpack";
import {buildLoaders} from "./buildLoaders";
import {buildResolves} from "./buildResolves";
import {TBuildOptions} from "./types";

export const buildWebpack = (options: TBuildOptions): webpack.Configuration => ({
    mode: "production",
    entry: options.entry,
    output: {
        path: options.output,
        publicPath: '/',
        filename: "[name].[contenthash].js",
        clean: true
    },
    plugins: buildPlugins(options),
    module: {
        rules: buildLoaders()
    },
    resolve: buildResolves(),
})