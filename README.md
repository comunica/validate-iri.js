# Validate IRI

[![Build status](https://github.com/comunica/validate-iri.js/workflows/CI/badge.svg)](https://github.com/comunica/validate-iri.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/comunica/validate-iri.js/badge.svg?branch=master)](https://coveralls.io/github/comunica/validate-iri.js?branch=master)
[![npm version](https://badge.fury.io/js/validate-iri.svg)](https://www.npmjs.com/package/validate-iri)

This tool validates an IRI according to RFC 3987
It works in both JavaScript and TypeScript.

TODO

- Create a strict parser or rename pragmatic to strict.

## Installation

```bash
$ npm install validate-iri
```
or
```bash
$ yarn add validate-iri
```

This package also works out-of-the-box in browsers via tools such as [webpack](https://webpack.js.org/) and [browserify](http://browserify.org/).

## Usage

This validation is automatically included by `jsonld-context-parser.js`. If you want to use it manually:

```
import { validateIri } from 'validate-iri`

const yourIri = 'https://example.com/john-doe'
validateIri(yourIri) // Will throw an error if the IRI is invalid.

```

## License

This code is released under the [MIT license](http://opensource.org/licenses/MIT).


## Performance

You can fetch the data for the performance test by running `npm run download-performance-data`.
Running the performance can be done by `npm run performance`

┌─────────────────────────┬────────────┬─────────────┬──────────────┬──────────────┐
│          File           │ Validation │  Time ran   │ Quads parsed │ Memory Usage │
┼─────────────────────────┼────────────┼─────────────┼──────────────┼──────────────┤
│  toRdf-manifest.jsonld  │   false    │ 0.746047688 │     999      │    49 MB     │
│  toRdf-manifest.jsonld  │   true     │ 0.800105549 │     999      │    51 MB     │
│  sparql-init.json       │   false    │ 1.292013069 │      26      │    53 MB     │
│  sparql-init.json       │   true     │ 1.281219347 │      26      │    52 MB     │
└─────────────────────────┴────────────┴─────────────┴──────────────┴──────────────┘
