'use strict'

const { isObject, isEmpty, noop, flow } = require('lodash')
const osom = require('osom')

const normalize = require('./normalize')
const parse = require('./parse')
const mapper = require('./map')

const getQuery = flow([parse, normalize])

module.exports = ({ map = mapper, ...opts } = {}) => {
  const validator = isEmpty(opts) ? noop : osom(opts, { type: String })

  return opts => {
    const query = map(isObject(opts) ? normalize(opts) : getQuery(opts))
    return { ...query, ...validator(query) }
  }
}
