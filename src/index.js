'use strict'

const { isEmpty, noop, flow } = require('lodash')
const osom = require('osom')

const normalize = require('./normalize')
const parse = require('./parse')
const mapper = require('./map')

const getQuery = flow([parse, normalize])

module.exports = ({ map = mapper, ...opts } = {}) => {
  const validator = isEmpty(opts) ? noop : osom(opts, { type: String })

  return url => {
    const query = map(getQuery(url))
    return { ...query, ...validator(query) }
  }
}

module.exports.parse = parse
module.exports.normalize = normalize
module.exports.mapper = mapper
