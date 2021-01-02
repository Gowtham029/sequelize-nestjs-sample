const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = options => {
    return {
        entry: [
            'webpack/hot/poll?100',
            './src/main.ts',
        ],
        optimization: {
            minimize: false,
        },
        target: 'node',
        externals: [
            nodeExternals({
                whitelist: ['webpack/hot/poll?100'],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true
                    },
                    exclude: /node_modules/,
                  }
    ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/])
        ],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'index.js',
        },
    }
}
