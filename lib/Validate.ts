export enum Strategies {
  SkipValidation = 'skip-validation',
  Pragmatic = 'pragmatic',
  Specification = 'specification',
}

const defaultStrategy = Strategies.Pragmatic;

export class HTMLEntityFoundError extends Error {}
export class NotImplementedError extends Error {}
export class InvalidIriError extends Error {}

const IRI_REGEX = /^([A-Za-z][\d+-.A-Za-z]*|_):[^ "#<>[\\\]`{|}]*(#[^#]*)?$/u;
const HTML_ENTITIES_REGEX = /&(?:#x[\da-f]+|#\d+|[\da-z]+);?/gui;

/**
 * Validate a given IRI.
 * @param {string} a string that may be an IRI.
 * @return {Error | undefined} An error if the IRI is invalid, or undefined if it is valid.
 */
export function validateIri(iri: string, strategy: Strategies = defaultStrategy): Error | undefined {
  if (strategy === Strategies.SkipValidation) {
    return;
  }

  if (strategy === Strategies.Pragmatic) {
    const isValidIri = IRI_REGEX.test(iri);
    if (!isValidIri) {
      return new InvalidIriError('The given IRI is not a valid IRI.');
    }

    const foundEntity = HTML_ENTITIES_REGEX.test(iri);
    if (foundEntity) {
      return new HTMLEntityFoundError('Found HTML entities. Suggestion: double encode these IRI\'s.');
    }
  }

  if (strategy === Strategies.Specification) {
    return new NotImplementedError('validateIri with the given strategy: "Specification" has not been implemented yet');
  }
}
