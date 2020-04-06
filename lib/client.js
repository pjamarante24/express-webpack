const hotClient = require('webpack-hot-client')

module.exports = {
  /**
   *
   * @param {*} compiler
   * @param {*} options
   * @returns {Promise<(import("webpack-hot-client").Client)>}
   */
  getClient(compiler, options) {
    if (!options) {
      return Promise.resolve(null)
    }

    return new Promise((resolve) => {
      const client = hotClient(compiler, options)
      const { server } = client

      server.on('listening', () => resolve(client))
    })
  },
}
