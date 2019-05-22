'use strict'

const test = require('ava')
const superQuery = require('..')

const isUrlHttp = require('is-url-http')

test('url is required', t => {
  const toQuery = superQuery()

  const error = t.throws(() => {
    toQuery()
  }, TypeError)

  t.is(
    error.message,
    'The "url" argument must be of type string. Received type undefined'
  )
})

test('detect query parameters', t => {
  const toQuery = superQuery()
  t.deepEqual(toQuery('/?foo=bar'), { foo: 'bar' })
})

test('required fields', t => {
  const toQuery = superQuery({
    url: {
      required: true
    }
  })

  toQuery('/?foo=bar')

  const error = t.throws(() => {
    toQuery('/?foo=bar')
  }, TypeError)

  t.is(error.message, 'You need to provide an URL')

  t.deepEqual(toQuery('/?url=kikobeats.com&foo=bar'), {
    url: 'kikobeats.com',
    foo: 'bar'
  })
})

test('validation fields', t => {
  const toQuery = superQuery({
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
  const toQuery = superQuery({
    userAgent: {
      default: 'foo'
    }
  })

  t.deepEqual(toQuery('/?foo=bar'), { foo: 'bar', userAgent: 'foo' })
  t.deepEqual(toQuery('/?user_agent=googlebot'), { userAgent: 'googlebot' })
})
