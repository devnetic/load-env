import * as loadEnv from './../src'

loadEnv.load('./.env')

console.log(process.env.LOG_QUERIES)
console.log(process.env.ENVIRONMENT)
