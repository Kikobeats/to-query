'use strict'

const { camelCase } = require('lodash')
const mapKeysDeep = require('@kikobeats/map-keys-deep')

module.exports = obj => mapKeysDeep(obj, (value, key) => camelCase(key))
