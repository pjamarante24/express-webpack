const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const { getClient } = require('./client')

const path = require('path')

/**
 * @typedef Options
 * @property {import("webpack").Configuration} config - Set webpack config
 * @property {String} configPath - Set webpack config file path
 * @property {import("webpack").Compiler} compiler - Use your own compiler
 * @property {import("webpack-hot-client").Options} hotClient
 * @property {import("webpack-dev-middleware").Options} devMiddleware
 */
const defaultOptions = { hotClient: {}, devMiddleware: {} }

/**
 * @param {Options} options
 */
module.exports = async (options) => {
  const opts = {
    ...defaultOptions,
    ...options,
  }

  let { config, compiler } = opts

  if (!compiler) {
    if (!config) {
      config = require(opts.configPath || path.resolve('./webpack.config.js'))
    }

    compiler = webpack(config)
  }

  if (!opts.devMiddleware.publicPath) {
    const { publicPath } = compiler.options.output
    if (!publicPath) {
      throw new Error(
        "express-webpack: publicPath must be set on `dev` options, or in a compiler's `output` configuration."
      )
    }
  }

  const hotClient = await getClient(compiler, opts.hotClient)
  const middleware = devMiddleware(compiler, opts.devMiddleware)
  const close = (cb) => {
    middleware.close(hotClient ? () => hotClient.close(cb) : cb)
  }

  return { middleware, hotClient, devMiddleware, close }
}
