import * as fs from 'fs'

/**
 * Load the .env file and set the ENV variables
 *
 * @param {string} [filename='.env']
 * @returns {void}
 */
const load = (filename: string = '.env'): void => {
  try {
    const env: Array<string> = fs.readFileSync(filename, 'utf8').trim().split('\n')
    let key: string
    let value: string

    env.forEach((config: string) => {
      [key, value] = config.split('=')

      process.env[key] = value
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Parse a String and will return an Object with the parsed keys and values.
 * @param {string} config
 */
const parse = (config: string): Object => {
  const [key, value] = config.split('=')

  return { [key]: value }
}

/**
 * Set a ENV variable value
 *
 * @param {string} key
 * @param {string} value
 */
const set = (key: string, value: string): void => {
  process.env[key] = value
}

export {
  load,
  parse,
  set
}
