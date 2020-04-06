/**
 * @module
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: 'development',
  entry: ['./src'],
  output: {
    publicPath: '/',
  },
}
