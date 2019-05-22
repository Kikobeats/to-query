# superquery

<p align="center">
  <br>
  <br>
  <img src="logo.png" alt="superquery">
  <br>
  <br>
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/superquery.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/Kikobeats/superquery/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/superquery)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/superquery.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/superquery)
[![Dependency status](https://img.shields.io/david/Kikobeats/superquery.svg?style=flat-square)](https://david-dm.org/Kikobeats/superquery)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/superquery.svg?style=flat-square)](https://david-dm.org/Kikobeats/superquery#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/superquery.svg?style=flat-square)](https://www.npmjs.org/package/superquery)

> Get query object from a request url as input.

## Highlights

- Get query parameters for any URL.<br/>
eg. `/?foo=bar` → `{ foo: 'bar' }`
- Normalize keys to camel case.<br/>
eg. `/?user_agent=googlebot` → `{ userAgent: 'googlebot' }`
- Auto cast values to native types.<br/>
eg. `/?plan_id=123` → `{ planId: 123 }`
- Friendly boolean values.<br/>
eg. `/is_enabled` → `{ iEnabled: true }`
- Declare default values.<br/>
eg. `/?` → `{ accept: '*' }`

Also it supports required fields, validation, error handling and more.

## Installation

```bash
$ npm install superquery --save
```

## Get Started

**superquery** is a convenient way for getting query parameters from any request url as input.

```js
const superQuery = require('superquery')
const toQuery = superQuery()

const query = toQuery('/?foo=bar') // => { foo: 'bar' }
```

### Default Data Fields

You can associate a default value to use in case the value is not provided:

```js
const userAgentString = require('ua-string')
const superQuery = require('superquery')

const toQuery = superQuery({
  userAgent: {
    default: userAgentString
  }
})

toQuery('/?') // => { userAgent: 'Mozilla/5.0 (Macintosh; Intel…' }
toQuery('/?user_agent=googlebot') // =>  { userAgent: 'googlebot' }
```

### Required Data Fields

Declaring fields as **required** means it throw an error in case of non presence:

```js
const superQuery = require('superquery')

const toQuery = superQuery({
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
const superQuery = require('superquery')

const toQuery = superQuery({
  url: {
    required: 'You need to provide an URL.'
  }
})

toQuery('/?foo=bar')
// => TypeError: You need to provide an URL.
```

### Validate Data Fields

In case you need granual control ver fields, you can declare any kind of validation, making easy connect with other packages.

```js
const isUrlHttp = require('is-url-http')
const superQuery = require('superquery')

const toQuery = superQuery({
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

## Integration

**superquery** has been designed to do *just one thing well*.

In this aspect, **superquery** is *framework agnostic*, giving you freedom to connect it with the rest of your software.

In case you want ot use it with any HTTP server (Express, Micro, Koa, Hapi, Fastify,...) just provide the url of the request.

```js
const superQuery = require('superquery')()

module.exports = (req, res) => {
  req.query = superQuery(req.url)
  res.end('Your query is', req.query)
}
```

That's all!

## API

### `toQuery = superQuery([options])`

It creates **superquery** instance.

Any option provided will be passed to [`osom`](https://www.npmjs.com/package/osom), check the [documentation](https://osom.js.org) to know more.

### `toQuery`

#### url

*Required*<br>
Type: `string`

The serialized URL to convert into query object.

## License

**superquery** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/superquery/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/superquery/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
