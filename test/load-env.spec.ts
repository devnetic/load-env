import * as fs from 'fs'

import test from 'ava'
import * as sinon from 'sinon'

import * as loadEnv from './../src'

const fsStub = sinon.stub(fs, 'readFileSync')

const fileContent = [
  'KLE0001=Error message 01',
  'KLE0002=Error message 02'
]

test('should load and set the correct values from .env file', t => {
  fsStub.returns(fileContent.join('\n'))

  loadEnv.load()

  t.is(process.env['KLE0001'], 'Error message 01')
  t.is(process.env['KLE0002'], 'Error message 02')
})

test('should load and set the correct values from .dot file', t => {
  fsStub.returns(fileContent.join('\n'))

  loadEnv.load('.errors_description')

  t.is(process.env['KLE0001'], 'Error message 01')
  t.is(process.env['KLE0002'], 'Error message 02')
})

test('should load and returns the correct values from .env file', t => {
  fsStub.returns(fileContent.join('\n'))

  const expected = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  const config = loadEnv.load('.env', { returnConfig: true })

  t.deepEqual(config, expected)
})

test('should set the correct value', t => {
  loadEnv.set('KLE0003', 'Error message 03')

  t.is(process.env['KLE0003'], 'Error message 03')
})

test('should parse and return the correct values', t => {
  const expected = {
    KEY: 'value'
  }
  const expectedMultiLine = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  t.deepEqual(loadEnv.parse('KEY=value'), expected)
  t.deepEqual(loadEnv.parse('KLE0001=Error message 01\nKLE0002=Error message 02'), expectedMultiLine)
})

test('should parse and set the correct values', t => {
  const content = 'KLE0001=Error message 01\nKLE0002=Error message 02'
  const expected = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  t.deepEqual(loadEnv.parse(content, { createEnv: true }), expected)
})
