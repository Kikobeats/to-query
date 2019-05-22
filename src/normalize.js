'use strict'

const {
  set,
  isArray,
  isObject,
  concat,
  reduce,
  camelCase,
  flow
} = require('lodash')

const autoParse = require('auto-parse')

const normalize = value => {
  if (isArray(value)) return normalizeArray(value)
  if (isObject(value)) return normalizeObject(value)
  return autoParse(value)
}

const normalizeObject = query =>
  reduce(
    query,
    (acc, value, key) => {
      return { ...acc, [camelCase(key)]: normalize(value) }
    },
    {}
  )

const normalizeArray = query =>
  reduce(query, (acc, value) => concat(acc, normalize(value)), [])

const normalizeBooleanValues = query =>
  reduce(
    query,
    (acc, value, key) => {
      if (value === '') value = true
      set(acc, key, value)
      return acc
    },
    {}
  )

module.exports = flow([normalizeBooleanValues, normalize])
