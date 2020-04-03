# @devnetic/load-env

![npm (scoped)](https://img.shields.io/npm/v/@devnetic/load-env)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@devnetic/load-env?color=red)
![npm](https://img.shields.io/npm/dt/@devnetic/load-env)
![GitHub issues](https://img.shields.io/github/issues-raw/devnetic/load-env)
![GitHub](https://img.shields.io/github/license/devnetic/load-env)

Loads environment variables from .env files, or any .dot files with the same structure

# Usage

To load a `.env` file just run the `load()` function in the `loadEnv` module.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.load()
```

## Loading config values from .dot files

To load `.dot` files different to `.env` just run the `load()` function in the `loadEnv` module with the necessary file.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.load('./.errors-description')
```

## Setting a value in process.env

To set a value in `process.env` just run the `set()` function in the `loadEnv` module with the necessary key and value.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

loadEnv.set('KLE0003', 'Error message 03')
```

Now the new value is available in `process.env.KLE0003`.

## Parsing a value

To parse a single value just run the `parse()` function in the `loadEnv` module with the necessary config value in the follow format `key=value`.  This function returns and object with the parsed keys and values.

```javascript
import * as loadEnv from '@devnetic/load-env' // or
// const loadEnv = require('@devnetic/load-env')

const config = loadEnv.parse('KLE0003=Error message 03')
console.log(JSON.stringify(config)) // { "KLE0003": "Error message 03"}
```
