import * as fs from 'fs'

import test from 'ava'
import * as sinon from 'sinon'

import * as loadEnv from './../src'

test('should load and set the correct values from .env file', t => {
  const fileContent = [
    'KLE0001=Error message 01',
    'KLE0002=Error message 02'
  ]

  sinon.stub(fs, 'readFileSync').returns(fileContent.join('\n'))

  loadEnv.load()

  t.is(process.env['KLE0001'], 'Error message 01')
  t.is(process.env['KLE0002'], 'Error message 02')
})

test('should set the correct value', t => {
  loadEnv.set('KLE0003', 'Error message 03')

  t.is(process.env['KLE0003'], 'Error message 03')
})

test('should parse and return the correct values', t => {
  const expected = {
    KEY: 'value'
  }

  t.deepEqual(loadEnv.parse('KEY=value'), expected)
})
