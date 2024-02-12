import webpack from "webpack";

export const buildLoaders = (): webpack.ModuleOptions['rules'] => ([
    {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    },
    {
        test: /\.css$/i,
        // Здесь можно вместо style-loader использовать ExtractPlugin
        use: ['style-loader', "css-loader", "postcss-loader"],
    },
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
])