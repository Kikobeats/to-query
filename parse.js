'use strict'

const { flow } = require('lodash')
const { URL } = require('url')

module.exports = flow([
  url => {
    if (!url) {
      throw TypeError(
        `Expected \`url\` to be of type \`string\` but received type \`${typeof url}\``
      )
    }
    return new URL(url, 'http://localhost').searchParams
  },
  searchParams => Object.fromEntries(searchParams.entries())
])
