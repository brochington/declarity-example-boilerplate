var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: "source-map",
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: path.join(__dirname, 'src'),
            query: {
                cacheDirectory: true,
                presets: ["es2015", "stage-0"],
            }

        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: "file?hash=sha512&digest=hex&name=[hash].[ext]",
            include: path.join(__dirname, 'src/img')
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
    ]},
    resolve: {
        root: [
            path.resolve('./node_modules')
        ],
        fallback: [
            path.resolve('./node_modules')
        ],
        extensions: ['', '.js']
    }
}
