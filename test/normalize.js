'use strict'

const test = require('ava')
const { normalize } = require('..')

test('camelize keys', t => {
  t.deepEqual(normalize({ foo_bar: 'fooz' }), { fooBar: 'fooz' })
  t.deepEqual(normalize({ plan_id: 123 }), { planId: 123 })
  t.deepEqual(normalize({ foo: { plan_id: 123 } }), { foo: { planId: 123 } })
  t.deepEqual(normalize({ foo: [{ plan_id: 123 }] }), {
    foo: [{ planId: 123 }]
  })
})

test('normalize booleans', t => {
  t.deepEqual(normalize({ foo: '' }), {
    foo: true
  })
})
