(async () => {
  const express = require('express')
  const expressWebpack = require('express-webpack')

  const app = express()
  const { middleware } = await expressWebpack({ hotClient: false })

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
