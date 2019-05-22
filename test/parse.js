'use strict'

const test = require('ava')
const { parse } = require('..')

test('to object', t => {
  t.deepEqual(parse('/?foo=bar'), {
    foo: 'bar'
  })
})

test('nested', t => {
  t.deepEqual(
    parse(
      '/?url=https%3A%2F%2Fkikobeats.com&data.avatar.selector=%23avatar&data.avatar.attr=src&data.avatar.type=image&force=true&data.resume.selector=h1&data.resume.attr=text'
    ),
    {
      'data.avatar.attr': 'src',
      'data.avatar.selector': '#avatar',
      'data.avatar.type': 'image',
      'data.resume.attr': 'text',
      'data.resume.selector': 'h1',
      force: 'true',
      url: 'https://kikobeats.com'
    }
  )
})
