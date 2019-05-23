'use strict'

const test = require('ava')
const { mapper } = require('..')

test('camelize keys', t => {
  t.deepEqual(mapper({ foo_bar: 'fooz' }), { fooBar: 'fooz' })
  t.deepEqual(mapper({ plan_id: 123 }), { planId: 123 })
  t.deepEqual(mapper({ foo: { plan_id: 123 } }), { foo: { planId: 123 } })
  t.deepEqual(mapper({ foo: [{ plan_id: 123 }] }), {
    foo: [{ planId: 123 }]
  })
})
