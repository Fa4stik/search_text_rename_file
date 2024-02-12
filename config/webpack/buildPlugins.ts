import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import {TBuildOptions} from "./types";

export const buildPlugins = ({html, analyzer, public: publicPath, output}: TBuildOptions): webpack.Configuration['plugins'] => {
    const plugins: webpack.Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: html,
            favicon: path.resolve(publicPath, 'favicon.ico'),
            publicPath: '/',
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(publicPath, 'config.json'), to: output },
            ],
        }),
        // Запуск в отедльном потоке проверки ошибок ts. Ускоряет работу в x2 раза
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProgressPlugin(),
    ]

    analyzer &&
        plugins.push(new BundleAnalyzerPlugin())

    return plugins
}