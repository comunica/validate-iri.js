import { validateIri, Strategies, NotImplementedError } from '../lib/Validate';

describe('strict strategy', () => {
  test(`using the strict strategy`, () => {
    expect(validateIri('https://example.com/a:&#xA;', Strategies.Strict)).toBeInstanceOf(NotImplementedError);
  });
});

