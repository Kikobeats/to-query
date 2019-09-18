'use strict'

const test = require('ava')
const createQuery = require('..')

const isUrlHttp = require('is-url-http')

test('url is required', t => {
  const toQuery = createQuery()

  const error = t.throws(() => {
    toQuery()
  }, TypeError)

  t.is(
    error.message,
    'Expected `url` to be of type `string` but received type `undefined`'
  )
})

test('detect query parameters', t => {
  const toQuery = createQuery()
  t.deepEqual(toQuery('/?foo=bar'), { foo: 'bar' })
})

test('required fields', t => {
  const toQuery = createQuery({
    url: {
      required: true
    }
  })

  const genericError = t.throws(() => {
    toQuery('/?foo=bar')
  }, TypeError)

  t.is(genericError.message, 'Expected `string` for `url`, got `undefined`')

  const error = t.throws(
    () =>
      createQuery({
        url: {
          required: 'You need to provide an URL'
        }
      })('/?foo=bar'),
    TypeError
  )

  t.is(error.message, 'You need to provide an URL')

  t.deepEqual(toQuery('/?url=kikobeats.com&foo=bar'), {
    url: 'kikobeats.com',
    foo: 'bar'
  })
})

test('validation fields', t => {
  const toQuery = createQuery({
    url: {
      type: String,
      validate: {
        validator: isUrlHttp,
        message: input => `The value '${input}' is not a valid http(s) URL.`
      }
    }
  })

  const error = t.throws(() => {
    toQuery('/?url=bar')
  }, TypeError)

  t.is(error.message, "The value 'bar' is not a valid http(s) URL.")
})

test('default values', t => {
  const toQuery = createQuery({
    userAgent: {
      default: 'foo'
    }
  })

  t.deepEqual(toQuery('/?foo=bar'), { foo: 'bar', userAgent: 'foo' })
  t.deepEqual(toQuery('/?user_agent=googlebot'), { userAgent: 'googlebot' })
})

test('transform field', t => {
  const split = str => str.split(',').map(item => item.trim())

  t.deepEqual(
    createQuery({ filter: { transform: [split] } })('/?filter=foo,bar'),
    { filter: ['foo', 'bar'] }
  )
  t.deepEqual(
    createQuery({ filter: { transform: split } })('/?filter=foo,bar'),
    { filter: ['foo', 'bar'] }
  )
})
