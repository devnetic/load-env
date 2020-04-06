import * as fs from 'fs'

import test from 'ava'
import * as sinon from 'sinon'

import * as loadEnv from './../src'

const fileContent = [
  'KLE0001=Error message 01',
  'KLE0002=Error message 02'
]

let sandbox: sinon.SinonSandbox
let writeFileSyncStub: sinon.SinonStub
let readFileSyncStub: sinon.SinonStub

test.before(t => {
  sandbox = sinon.createSandbox()

  writeFileSyncStub = sandbox.stub(fs, 'writeFileSync')
  readFileSyncStub = sandbox.stub(fs, 'readFileSync')
})

test.afterEach(t => {
  sandbox.restore()
});

test('should load and set the correct values from .env file', t => {
  readFileSyncStub.returns(fileContent.join('\n'))

  loadEnv.load()

  t.is(process.env.KLE0001, 'Error message 01')
  t.is(process.env.KLE0002, 'Error message 02')
})

test('should load and set the correct values from .dot file', t => {
  readFileSyncStub.returns(fileContent.join('\n'))

  loadEnv.load('.errors_description')

  t.is(process.env['KLE0001'], 'Error message 01')
  t.is(process.env['KLE0002'], 'Error message 02')
})

test('should load and returns the correct values from .env file', t => {
  readFileSyncStub.returns(fileContent.join('\n'))

  const expected = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  const config = loadEnv.load('.env', { returnConfig: true })

  t.deepEqual(config, expected)
})

test('should throws and error when load fails', t => {
  const filename = '.env-dev'
  const config = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  const error = new Error('foo error')

  readFileSyncStub.throws(error)

  try {
    loadEnv.load('.env')
  } catch (error) {
    t.true(readFileSyncStub.threw())
  }
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
  t.deepEqual(loadEnv.parse(content, { createEnv: true, separator: '\n' }), expected)
})

test('should save the config values', t => {
  const filename = '.env-dev'
  const config = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }
  const content = 'KLE0001=Error message 01\nKLE0002=Error message 02'

  loadEnv.save(filename, config)

  t.true(writeFileSyncStub.calledWith(filename, content))
})

test('should throws and error when save fails', t => {
  const filename = '.env-dev'
  const config = {
    'KLE0001': 'Error message 01',
    'KLE0002': 'Error message 02'
  }

  writeFileSyncStub.throws(new Error('foo error'))

  t.false(loadEnv.save(filename, config))
})
