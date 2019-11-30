const path = require('path')

module.exports = {
  plugins: [],
  entry: {
    main: path.resolve(__dirname, 'src/main.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      filename: '[name].js',
    },
  },
}
