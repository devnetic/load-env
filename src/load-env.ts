import * as fs from 'fs'
import { stringify } from 'querystring'

type Config = Record<string, string>

interface LoadOptions {
  separator?: string
  returnConfig?: boolean
}

interface ParseOptions {
  separator?: string
  createEnv?: boolean
}

type SaveConfig = Record<string, string | number | boolean>

/**
 * Load the .env file and set the ENV variables
 *
 * @param {string} [filename='.env']
 * @param {LoadOptions} [options={}}]
 * @returns {void|Config}
 */
const load = (filename: string = '.env', options: LoadOptions = {}): void | Config => {
  try {
    const fileContent: string = fs.readFileSync(filename, 'utf8')

    if (options.returnConfig) {
      return parse(fileContent, { separator: options.separator || '\n', createEnv: true })
    } else {
      parse(fileContent, { separator: options.separator || '\n', createEnv: true })
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Parse a String and will return an Object with the parsed keys and values.
 *
 * @param {string} config
 * @param {ParseOptions} options
 */
const parse = (config: string, options: ParseOptions = {}): Config => {
  let key: string
  let value: string

  return config.trim().split(options.separator || '\n').reduce((result: Config, line: string) => {
    [key, value] = line.split('=')

    if (options.createEnv === true) {
      set(key.trim(), value.trim())
    }

    result[key.trim()] = value.trim()

    return result
  }, {} as Config)
}

/**
 *
 * @param {string} filename
 * @param {SaveConfig} config
 * @param {string} [separator='\n']
 */
const save = (filename: string, config: SaveConfig, separator: string = '\n' ): boolean => {
  const content: string = Object.entries(config).reduce((content: Array<string>, [key, value]: [string, any]) => {
    content.push(`${key}=${value}`)

    return content
  }, []).join(separator)

  try {
    fs.writeFileSync(filename, content)

    return true
  } catch (error) {
    return false
  }
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
  save,
  set
}
