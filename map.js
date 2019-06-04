'use strict'

const { camelCase } = require('lodash')
const mapObject = require('map-obj')

module.exports = obj =>
  mapObject(obj, (key, value) => [camelCase(key), value], { deep: true })
