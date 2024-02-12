import path from 'path';
import webpack from "webpack";
import dotenv from 'dotenv';
import {buildWebpack} from "./config/webpack/buildWebpack";

type TEnvOptions = {
    analyzer: boolean
}

dotenv.config()

const config = (env: TEnvOptions): webpack.Configuration => buildWebpack({
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
    analyzer: env.analyzer,
})

export default config