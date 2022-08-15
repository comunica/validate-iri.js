# Validate IRI

[![Build status](https://github.com/comunica/validate-iri.js/workflows/CI/badge.svg)](https://github.com/comunica/validate-iri.js/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/comunica/validate-iri.js/badge.svg?branch=master)](https://coveralls.io/github/comunica/validate-iri.js?branch=master)
[![npm version](https://badge.fury.io/js/validate-iri.svg)](https://www.npmjs.com/package/validate-iri)

This tool validates an IRI according to RFC 3987.
It works in both JavaScript and TypeScript.

TODO

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

Multiple validation modes are provided:
- `IriValidationStrategy.Strict`: carefully validates the IRI using RFC 3987 grammar. This is the default value.
- `IriValidationStrategy.Pragmatic`: quickly validates that the IRI has a valid scheme and does not contain any character forbidden by the N-Triples, Turtle and N3 grammars.
- `IriValidationStrategy.None`: does not validate the IRI at all.

Example:
```
import { validateIri, IriValidationStrategy } from 'validate-iri`
const yourIri = 'https://example.com/john-doe'
validateIri(yourIri, IriValidationStrategy.Pragmatic) // Will throw an error if the IRI is invalid.
```

## License

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
