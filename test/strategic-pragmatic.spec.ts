import { validateIri, Strategies, HTMLEntityFoundError, InvalidIriError } from '../lib/Validate';
import { correctUris, incorrectUris } from './uris';
import { correctUrls, incorrectUrls } from './urls';
import { correctUrns, incorrectUrns } from './urns';

describe('pragmatic strategy', () => {
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

  for (const correctUrl of correctUrls) {
    test(`correct ${correctUrl}`, () => {
      expect(validateIri(correctUrl)).toBe(undefined);
    });
  }

  for (const correctUrn of correctUrns) {
    test(`correct ${correctUrn}`, () => {
      expect(validateIri(correctUrn)).toBe(undefined);
    });
  }

  for (const correctUri of correctUris) {
    test(`correct ${correctUri}`, () => {
      expect(validateIri(correctUri)).toBe(undefined);
    });
  }

  for (const incorrectUrl of incorrectUrls) {
    test(`incorrect ${incorrectUrl}`, () => {
      expect(validateIri(incorrectUrl)).toBeInstanceOf(Error);
    });
  }

  for (const incorrectUri of incorrectUris) {
    test(`incorrect ${incorrectUri}`, () => {
      expect(validateIri(incorrectUri)).toBeInstanceOf(Error);
    });
  }

  for (const incorrectUrn of incorrectUrns) {
    test(`incorrect ${incorrectUrn}`, () => {
      expect(validateIri(incorrectUrn)).toBeInstanceOf(Error);
    });
  }
});
