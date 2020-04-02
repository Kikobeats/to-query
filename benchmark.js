'use strict'

const bench = require('nanobench')
const pkg = require('./package.json')

const parse = require('./parse')

const ITERATIONS = 1000000

const PAYLOAD =
  '/?url=https%3A%2F%2Fedna-pxmb461cy.now.sh&force&embed=screenshot.url'

bench(`parse v${pkg.version}`, function (b) {
  b.start()

  for (var i = 0; i < ITERATIONS; i++) {
    parse(PAYLOAD)
  }

  b.end()
})
