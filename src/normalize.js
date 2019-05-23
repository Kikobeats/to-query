'use strict'

const { set, isArray, isObject, concat, reduce, flow } = require('lodash')
const autoParse = require('auto-parse')

const castValues = value => {
  if (isArray(value)) return castArrayValues(value)
  if (isObject(value)) return castObjectValues(value)
  return autoParse(value)
}

const castObjectValues = query =>
  reduce(
    query,
    (acc, value, key) => {
      return { ...acc, [key]: castValues(value) }
    },
    {}
  )

const castArrayValues = query =>
  reduce(query, (acc, value) => concat(acc, castValues(value)), [])

const sanetizeBooleanValues = query =>
  reduce(
    query,
    (acc, value, key) => {
      if (value === '') value = true
      set(acc, key, value)
      return acc
    },
    {}
  )

module.exports = flow([sanetizeBooleanValues, castValues])
