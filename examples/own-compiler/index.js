(async () => {
  const webpack = require('webpack')
  const express = require('express')
  const expressWebpack = require('express-webpack')
  const config = require('./webpack.config')

  const app = express()
  const compiler = webpack(config)
  const { middleware } = await expressWebpack({ compiler })

  app.use(middleware)

  app.get('/', (req, res) =>
    res.send(`
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="root">not rendered</div>
                <script src="/main.js"></script>
            </body>
        </html>
    `)
  )

  app.listen(3000)
})()
