'use strict'

const test = require('ava')
const normalize = require('../normalize')

test('booleans', t => {
  t.deepEqual(normalize({ foo: '' }), { foo: true })
  t.deepEqual(normalize({ foo: 'true' }), { foo: true })
  t.deepEqual(normalize({ foo: 'false' }), { foo: false })
})

test('number', t => {
  t.deepEqual(normalize({ foo: '123' }), { foo: 123 })
  t.deepEqual(normalize({ foo: '3.14' }), { foo: 3.14 })
})

test('string', t => {
  t.deepEqual(normalize({ foo: '123.lel' }), { foo: '123.lel' })
})

test('other', t => {
  t.deepEqual(normalize({ foo: 'NaN' }), { foo: NaN })
  t.deepEqual(normalize({ foo: 'null' }), { foo: null })
  t.deepEqual(normalize({ foo: 'undefined' }), { foo: undefined })
})
