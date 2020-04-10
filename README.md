# express-webpack
Development and Hot Module Reload middleware for Express

This module implements [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client) into a single middleware.

## Install

Using npm:

```console
npm install express-webpack --save-dev
```

## Usage

See [/examples](https://github.com/pjamarante24/express-webpack/tree/master/examples) for an examples of usage.


```js
const express = require('express')
const expressWebpack = require('express-webpack')

const app = express()
const { middleware } = await expressWebpack()

app.use(middleware)
```

## Options

### configPath

By default it will use your `webpack.config.js` located in your root directory but you can set a diferent path using this option.

```js
const express = require('express')
const expressWebpack = require('express-webpack')

const app = express()
const { middleware } = await expressWebpack({
configPath: require.resolve('./webpack.dev.js'),
})

app.use(middleware)
```

### config

You can pass a webpack configuratin object using this option.

```js
const express = require('express')
const expressWebpack = require('express-webpack')

const config = {
	mode: 'development',
	entry: ['./src'],
	output: {
		publicPath: '/',
	},
}

const app = express()
const { middleware } = await expressWebpack({ config })

app.use(middleware)
```

### compiler

You can pass your own webpack compiler using this option.

```js
const webpack = require('webpack')
const express = require('express')
const expressWebpack = require('express-webpack')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)
const { middleware } = await expressWebpack({ compiler })

app.use(middleware)
```

### hotClient

You can override the default options set by [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client) by setting an object with the availables options for the [webpack-hot-client](https://github.com/webpack-contrib/webpack-hot-client#options) or shutdown the HMR by setting this option to `false`.

### devMiddleware

You can override the default options set by [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) by setting an object with the availables options for the [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware#options)

## API

### expressWebpack([options])

Returns a `Promise` which resolves in an object with the following properties:

- `middleware` _(Object)_ - Middleware for development and HMR

- `close(callback)` _(Function)_ - Close both instances of `webpack-dev-middleware` and `webpack-hot-middleware` if enabled. Receive a callback function which is executed when both instances are closed.

- `hotClient` _(Object)_ - An instance of `webpack-hot-client`.

- `devMiddleware` _(Object)_ - An instance of `webpack-dev-middleware`.
