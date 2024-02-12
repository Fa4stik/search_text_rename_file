import webpack from "webpack";

export const buildResolves = (): webpack.Configuration['resolve'] => ({
    extensions: ['.tsx', '.ts', '.js']
})