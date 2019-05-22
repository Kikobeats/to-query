'use strict'

const { isEmpty, noop, flow } = require('lodash')
const osom = require('osom')

const normalize = require('./normalize')
const parse = require('./parse')

const getQuery = flow([parse, normalize])

module.exports = (schema = {}) => {
  const validator = isEmpty(schema) ? noop : osom(schema, { type: String })

  return url => {
    const query = getQuery(url)
    return { ...query, ...validator(query) }
  }
}

module.exports.parse = parse
module.exports.normalize = normalize
