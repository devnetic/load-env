# @devnetic/load-env

![npm (scoped)](https://img.shields.io/npm/v/@devnetic/load-env)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@devnetic/load-env?color=red)
![npm](https://img.shields.io/npm/dt/@devnetic/load-env)
![GitHub issues](https://img.shields.io/github/issues-raw/devnetic/load-env)
![GitHub](https://img.shields.io/github/license/devnetic/load-env)

`load-env` is a zero-dependencies module to work with environment variables from .env files, ***or any `.dot` files with the same structure.***.  This last feature is one of the main differences with another similar packages, because with `load-env` you can read not just `.env` files, you can read any `.dot` file o similar files with an equivalent  structure.

Another main feature is the possibility to save config values to a `.dot` file.

# Usage

## **loadEnv.load(filename: string = '.env', options: LoadOptions = {}): void | Config**
```javascript
LoadOptions {
  returnConfig?: boolean
  separator?: string
}
```

To load a `.env` file just run the `load()` function in the `loadEnv` module.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.load()
```

But if you want return the config values in an object instead of set `process.env`, you can use the `load()` function `returnConfig` parameter.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

const config = loadEnv.load('your_path_to/.env', { returnConfig: true })
```

To load `.dot` files different to `.env` just run the `load()` function in the `loadEnv` module with the necessary file path.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.load('your_path_to/.errors-description', { separator: `\r\n`})
```

The default line separator for `.dot` files is `'\n'`, but you can use a different separator using the `load()` function `options` parameter.

---

## **loadEnv.set(key: string, value: string): void**

To set a value in `process.env` just run the `set()` function in the `loadEnv` module with the necessary key and value.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.set('KLE0003', 'Error message 03')
```

Now the new value is available in `process.env.KLE0003`.

---

## **loadEnv.parse(config: string, options: ParseOptions = {}): Config**

To parse values just run the `parse()` function in the `loadEnv` module with the necessary config values in the follow format `key1=value1\nkey2=value2`.  By default this function returns an object with the parsed keys and values, but could set the values in `process.env` too, just setting the parameter `createEnv` to `true` in the options parameter.

```javascript
ParseOptions {
  createEnv?: boolean
  separator?: string
}
```

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

const config = loadEnv.parse('KLE0003=Error message 03')
console.log(JSON.stringify(config)) // { "KLE0003": "Error message 03" }

loadEnv.parse('KLE0002=Error message 02\nKLE0003=Error message 03', { createEnv: true })
// Now the new value are available in process.env.KLE0002 and process.env.KLE0003
```

---

## **loadEnv.save(filename: string, config: Object, separator: string = '\n' ): boolean**

To save a config to a `.dot` file, you can use the `loadEnv`'s `.save()` function.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

const config = { DB_HOST: 'localhost', DB_USER: 'root', DB_PASS: 's1mpl3' }

loadEnv.save('your_path_to/.env-dev', config)
```
