(async () => {
  const webpack = require('webpack')
  const React = require('react')
  const ReacDOMServer = require('react-dom/server')
  const express = require('express')
  const expressWebpack = require('express-webpack')
  const { clientConfig, serverConfig } = require('./webpack.config')

  const app = express()
  const serverCompiler = webpack(serverConfig)
  const options = {
    config: clientConfig,
    devMiddleware: { publicPath: '/' },
    hotClient: { allEntries: true },
  }
  const { middleware } = await expressWebpack(options)
  serverCompiler.watch({}, (err) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
    }
  })

  app.use(middleware)

  app.get('/', (req, res) => {
    delete require.cache[require.resolve('./dist/index')]
    const App = require('./dist/index').default
    const markup = ReacDOMServer.renderToString(<App />)

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Index</title>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script src="/index.js"></script>
        </body>
    </html>`)
  })

  app.get('/counter', (req, res) => {
    delete require.cache[require.resolve('./dist/counter')]
    const App = require('./dist/counter').default
    const markup = ReacDOMServer.renderToString(<App />)

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Counter</title>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script src="/counter.js"></script>
        </body>
    </html>`)
  })

  app.get('/todo', (req, res) => {
    delete require.cache[require.resolve('./dist/todo')]
    const App = require('./dist/todo').default
    const markup = ReacDOMServer.renderToString(<App />)

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Todo</title>
        </head>
        <body>
            <div id="root">${markup}</div>
            <script src="/todo.js"></script>
        </body>
    </html>`)
  })

  app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080')
  })
})()
