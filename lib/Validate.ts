import { RFC2141 } from 'urn-lib';

export enum Strategies {
  Pragmatic = 'pragmatic',
  Strict = 'strict'
}

const defaultStrategy = Strategies.Pragmatic;

export class HTMLEntityFoundError extends Error {}
export class NotImplementedError extends Error {}
export class InvalidIriError extends Error {}

const IRI_REGEX = new RegExp(
  '^' +
    // Protocol identifier (optional)
    // short syntax // still required
    // '(?:(?:(?:[a-z]+):)?\\/\\/)' +
    '(?:(?:(?:https?|ftp|ldap|tel|telnet|news|mailto):)?)' +
    '(?:\\/\\/)?' +
    // User:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
      // Phone numbers.
      '(?:(\\+\\d{1,2})?(?:-| )?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4})' +
    '|' +
      // Host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      '(?:' +
        '(?:' +
          '[a-z0-9\\u00a1-\\uffff]' +
          '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
          '(?<!--)' +
        ')?' +
        '[a-z0-9\\u00a1-\\uffff]\\.' +
      ')+' +
      // TLD identifier name, may end with dot
      // The original code of dperini allowed a dot after a tld.
      // We do not allow for that for now.
      '(?:[a-z\\u00a1-\\uffff]{2,}?)' +
    ')' +
    // Port number (optional)
    '(?::\\d{2,5})?' +
    // Resource path (optional)
    '(?:[/?#]\\S*)?' +
  '$', 'iu',
);

const HTML_ENTITIES_REGEX = /&(?:#x[\da-f]+|#\d+);?/gui;

/**
 * Validate a given IRI.
 * @param {string} a string that may be an IRI.
 * @return {Error | undefined} An error if the IRI is invalid, or undefined if it is valid.
 */
export function validateIri(iri: string, strategy: Strategies = defaultStrategy): Error | undefined {
  if (strategy === Strategies.Pragmatic) {
    const parsedUrn = RFC2141.parse(iri);
    if (!parsedUrn) {
      return new InvalidIriError('Could not parse for the URN phase.');
    }
    const urnValidationErrors = RFC2141.validate(parsedUrn);
    const isValidUrn = !urnValidationErrors;

    const isValidIri = IRI_REGEX.test(iri);
    if (!isValidIri && !isValidUrn) {
      return new InvalidIriError('The given IRI is not a valid IRI.');
    }

    const foundEntity = HTML_ENTITIES_REGEX.test(iri);
    if (foundEntity) {
      return new HTMLEntityFoundError('Found HTML entities. Suggestion: double encode these IRI\'s.');
    }
  }

  if (strategy === Strategies.Strict) {
    return new NotImplementedError('validateIri with the given strategy: "Strict" has not been implemented yet');
  }
}
