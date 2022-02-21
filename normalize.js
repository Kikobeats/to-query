'use strict'

const { isArray, isObject, concat, reduce } = require('lodash')
const autoParse = require('auto-parse')

const castValues = value => {
  if (isArray(value)) return castArrayValues(value)
  if (isObject(value)) return castObjectValues(value)
  if (value === '') return true
  return autoParse(value)
}

const castObjectValues = query =>
  reduce(
    query,
    (acc, value, key) => {
      acc[key] = castValues(value)
      return acc
    },
    {}
  )

const castArrayValues = query =>
  reduce(query, (acc, value) => concat(acc, castValues(value)), [])

module.exports = castObjectValues
