import { validateIri, Strategies, HTMLEntityFoundError, NotImplementedError, InvalidIriError } from '../lib/Validate';

describe('strategies and basic validation', () => {
  test(`scanning for HTML entities where they exist`, () => {
    expect(validateIri('https://example.com/a:&#xA;', Strategies.Pragmatic)).toBeInstanceOf(HTMLEntityFoundError);
  });

  test(`scanning for HTML entities where they do not exist`, () => {
    expect(validateIri('https://example.com/lorëm-ipsum', Strategies.Pragmatic)).toBe(undefined);
  });

  test(`using implicit pragmatic strategy`, () => {
    expect(validateIri('https://example.com/a:&#xA;')).toBeInstanceOf(HTMLEntityFoundError);
  });

  test(`an invalid iri using implicit pragmatic strategy`, () => {
    expect(validateIri('example-of-invalid-uri')).toBeInstanceOf(InvalidIriError);
  });

  test(`using the skip validation strategy`, () => {
    expect(validateIri('https://example.com/a:&#xA;', Strategies.SkipValidation)).toBe(undefined);
  });

  test(`using the spec strategy`, () => {
    expect(validateIri('https://example.com/a:&#xA;', Strategies.Specification)).toBeInstanceOf(NotImplementedError);
  });
});

