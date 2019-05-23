'use strict'

const { camelCase, isPlainObject, mapKeys, mapValues } = require('lodash')

const mapKeysDeep = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map(item => mapKeysDeep(item, fn))
    : isPlainObject(obj)
      ? mapValues(mapKeys(obj, fn), value => mapKeysDeep(value, fn))
      : obj

const camelcaseKey = (value, key) => camelCase(key)

module.exports = obj => mapKeysDeep(obj, camelcaseKey)
module.exports.mapKeysDeep = mapKeysDeep
