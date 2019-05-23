'use strict'

const test = require('ava')
const map = require('../map')

test('camelize keys', t => {
  t.deepEqual(map({ foo_bar: 'fooz' }), { fooBar: 'fooz' })
  t.deepEqual(map({ plan_id: 123 }), { planId: 123 })
  t.deepEqual(map({ foo: { plan_id: 123 } }), { foo: { planId: 123 } })
  t.deepEqual(map({ foo: [{ plan_id: 123 }] }), {
    foo: [{ planId: 123 }]
  })
})
