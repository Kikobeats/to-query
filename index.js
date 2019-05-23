'use strict'

const { isEmpty, noop, flow } = require('lodash')
const osom = require('osom')

const normalize = require('./normalize')
const parse = require('./parse')
const mapper = require('./map')

const getQuery = flow([parse, normalize])

const toQuery = ({ map = mapper, ...opts } = {}) => {
  const validator = isEmpty(opts) ? noop : osom(opts, { type: String })

  return url => {
    const query = map(getQuery(url))
    return { ...validator(query), ...query }
  }
}

toQuery.map = mapper
toQuery.normalize = normalize
toQuery.parse = parse

module.exports = toQuery
