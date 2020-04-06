const path = require('path')

const loadEnv = require('./../dist/src')

const content = `DB_HOST = localhost
DB_USER = root
DB_PASS = s1mpl3`

loadEnv.load(path.join(__dirname, '.env'))
console.log('process.env.DB_HOST: %s', process.env.DB_HOST)
console.log('process.env.DB_USER: %s', process.env.DB_USER)
console.log('process.env.DB_PASS: %s', process.env.DB_PASS)

loadEnv.load(path.join(__dirname, '.errors-description'))
console.log('process.env.KRO0001: %s', process.env.KRO0001)
console.log('process.env.KRO0002: %s', process.env.KRO0002)
console.log('process.env.KRO0003: %s', process.env.KRO0003)

const loadedConfig = loadEnv.load(path.join(__dirname, '.env'), { returnConfig: true })
console.log('loadedConfig: %o', loadedConfig)

const config = loadEnv.parse(content)
console.log('config: %o', config)

loadEnv.save(path.join(__dirname, '.env-dev'), config)
