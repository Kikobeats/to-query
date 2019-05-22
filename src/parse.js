'use strict'

const { flow } = require('lodash')

const { parse: parseQuery } = require('querystring')
const { parse: parseUrl } = require('url')

module.exports = flow([url => parseUrl(url).query, parseQuery])
