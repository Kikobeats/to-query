<div align="center">
	<br>
	<br>
	<img src="media/logo.png">
	<br>
	<br>
	<br>
</div>

![Last version](https://img.shields.io/github/tag/Kikobeats/to-query.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/to-query.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/to-query)
[![NPM Status](https://img.shields.io/npm/dm/to-query.svg?style=flat-square)](https://www.npmjs.org/package/to-query)

> Get query object from a request url as input.

## Highlights

- Get query parameters for any URL.<br/>
eg. `/?foo=bar` → `{ foo: 'bar' }`
- Normalize keys to camel case.<br/>
eg. `/?user_agent=googlebot` → `{ userAgent: 'googlebot' }`
- Auto cast values to native types.<br/>
eg. `/?plan_id=123` → `{ planId: 123 }`
- Friendly boolean values.<br/>
eg. `/?is_enabled` → `{ isEnabled: true }`
- Declare default values.<br/>
eg. `/?` → `{ accept: '*' }`

Also it supports required fields, validation, error handling and more.

## Installation

```bash
$ npm install to-query --save
```

## Get Started

**to-query** is a convenient way for getting query parameters from any request url as input.

```js
const toQuery = require('to-query')()

const query = toQuery('/?foo=bar') // => { foo: 'bar' }
```

### Default

Sometimes you need to associate a default value to be used in case if one is not provided:

```js
const userAgentString = require('ua-string')
const createQuery = require('to-query')

const toQuery = createQuery({
  userAgent: {
    default: userAgentString
  }
})

toQuery('/?') // => { userAgent: 'Mozilla/5.0 (Macintosh; Intel…' }
toQuery('/?user_agent=googlebot') // =>  { userAgent: 'googlebot' }
```

### Required

Declaring fields as **required** means it throw an error in case of non presence:

```js
const createQuery = require('to-query')

const toQuery = createQuery({
  url: {
    required: true
  }
})

toQuery('/?foo=bar')
// => TypeError: Expected `string` for `url`, got `undefined`
```

#### Custom Error Message

In case you provide an `string` instead of a `boolean` it will be used as the message to show under error:

```js
const createQuery = require('to-query')

const toQuery = createQuery({
  url: {
    required: 'You need to provide an URL.'
  }
})

toQuery('/?foo=bar')
// => TypeError: You need to provide an URL.
```

### Validate

If you need granular control for type checking the shape of value in something you expect, you can declare any kind of validation, making easy connect with other packages:

```js
const isUrlHttp = require('is-url-http')
const createQuery = require('to-query')

const toQuery = createQuery({
  url: {
    validate: {
      validator: isUrlHttp,
      message: input => `The value '${input}' is not a valid http(s) URL.`
    }
  }
})

toQuery('/?url=kikobeats.com')
// => TypeError: The value 'kikobeats.com' is not a valid http(s) URL.
```

### Transform

You can mutate an individual value, using one or more functions to produce the final output:

```js
const createQuery = require('to-query')

const split = str => str.split(',').map(item => item.trim())

const toQuery = createQuery({
  url: {
    filters: {
      transform: [split]
    }
  }
})

toQuery('/?filters=prerender,auto,resize')
// => { filters: ['prerender', 'auto', 'resize'] }
```

## Usage

**to-query** has been designed to do *just one thing well*.

In this aspect, **to-query** is *framework agnostic*, giving you freedom to connect it with the rest of your software.

In case you want ot use it with any HTTP server (Express, Micro, Koa, Hapi, Fastify,...) just provide the url of the request.

```js
const toQuery = require('to-query')()

module.exports = (req, res) => {
  req.query = createQuery(req.url)
  res.end('Your query is', req.query)
}
```

That's all!

## API

### `toQuery = to-query([options])`

It creates **to-query** instance.

#### options

Any option provided will be passed to [`osom`](https://www.npmjs.com/package/osom), check the [documentation](https://osom.js.org) to know more.

Additionally you can setup

##### map

Type: `function`<br/>

A function to run as mapper *before* process the url.

The default map just convert keys into camel case.

### `toQuery(input)`

#### input

*Required*<br/>
Type: `string|object`

The input value to convert into a query object.

## License

**to-query** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/to-query/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/to-query/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
