'use strict'

const { parse: parseQuery } = require('querystring')
const { parse: parseUrl } = require('url')
const { flow } = require('lodash')

module.exports = flow([url => parseUrl(url).query, parseQuery])
