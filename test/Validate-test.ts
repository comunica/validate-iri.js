import { IriValidationStrategy, validateIri } from '../lib/Validate';

const VALID_ABSOLUTE_IRIS = [
  'file://foo',
  'ftp://ftp.is.co.za/rfc/rfc1808.txt',
  'http://www.ietf.org/rfc/rfc2396.txt',
  'ldap://[2001:db8::7]/c=GB?objectClass?one',
  'mailto:John.Doe@example.com',
  'news:comp.infosystems.www.servers.unix',
  'tel:+1-816-555-1212',
  'telnet://192.0.2.16:80/',
  'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
  'http://example.com',
  'http://example.com/',
  'http://example.com/foo',
  'http://example.com/foo/bar',
  'http://example.com/foo/bar/',
  'http://example.com/foo/bar?q=1&r=2',
  'http://example.com/foo/bar/?q=1&r=2',
  'http://example.com#toto',
  'http://example.com/#toto',
  'http://example.com/foo#toto',
  'http://example.com/foo/bar#toto',
  'http://example.com/foo/bar/#toto',
  'http://example.com/foo/bar?q=1&r=2#toto',
  'http://example.com/foo/bar/?q=1&r=2#toto',
  'http://example.com/foo/bar/.././baz',
  'http://a.example/AZaz\u{00C0}\u{00D6}\u{00D8}\u{00F6}\u{00F8}\u{02FF}\u{0370}\u{037D}\u{037F}\u{1FFF}',
  'http://a.example/\u{200C}\u{200D}\u{2070}\u{218F}\u{2C00}\u{2FEF}\u{3001}\u{D7FF}\u{FA0E}\u{FDCF}',
  'http://a.example/\u{FDF0}\u{FFEF}\u{10000}\u{EFFFD}',
  'http://a.example/?AZaz\u{E000}\u{F8FF}\u{F0000}\u{FFFFD}\u{100000}\u{10FFFD}\u{00C0}\u{00D6}\u{00D8}',
  'http://a.example/\u{00F6}\u{00F8}\u{02FF}\u{0370}\u{037D}\u{037F}\u{1FFF}\u{200C}\u{200D}\u{2070}\u{218F}\u{2C00}',
  'http://a.example/\u{2FEF}\u{3001}\u{D7FF}\u{FA0E}\u{FDCF}\u{FDF0}\u{FFEF}\u{10000}\u{EFFFD}',
  // From https://sourceforge.net/projects/foursuite/ under Apache License
  'file:///foo/bar',
  'mailto:user@host?subject=blah',
  'dav:', // Empty opaque part / rel-path allowed by RFC 2396bis
  'about:', // Empty opaque part / rel-path allowed by RFC 2396bis
  // the following test cases are from a Perl script by David A. Wheeler
  // at http://www.dwheeler.com/secure-programs/url.pl
  'http://www.yahoo.com',
  'http://www.yahoo.com/',
  'http://1.2.3.4/',
  'http://www.yahoo.com/stuff',
  'http://www.yahoo.com/stuff/',
  'http://www.yahoo.com/hello%20world/',
  'http://www.yahoo.com?name=obi',
  'http://www.yahoo.com?name=obi+wan&status=jedi',
  'http://www.yahoo.com?onery',
  'http://www.yahoo.com#bottom',
  'http://www.yahoo.com/yelp.html#bottom',
  'https://www.yahoo.com/',
  'ftp://www.yahoo.com/',
  'ftp://www.yahoo.com/hello',
  // Wheeler"s script says these are invalid, but they aren"t
  'http://www.yahoo.com?name=%00%01',
  'http://www.yaho%6f.com',
  'http://www.yahoo.com/hello%00world/',
  'http://www.yahoo.com/hello+world/',
  'http://www.yahoo.com?name=obi&',
  'http://www.yahoo.com?name=obi&type=',
  'http://www.yahoo.com/yelp.html#',
  // The following test cases are from a Haskell program by Graham Klyne
  // at http://www.ninebynine.org/Software/HaskellUtils/Network/URITest.hs
  'http://example.org/aaa/bbb#ccc',
  'mailto:local@domain.org',
  'mailto:local@domain.org#frag',
  'HTTP://EXAMPLE.ORG/AAA/BBB#CCC',
  // -- escapes
  'http://example.org/aaa%2fbbb#ccc',
  'http://example.org/aaa%2Fbbb#ccc',
  'http://example.com/%2F',
  'http://example.com/?%2F',
  'http://example.com/#?%2F',
  'http://example.com/aaa%2Fbbb',
  // -- ports
  'http://example.org:80/aaa/bbb#ccc',
  'http://example.org:/aaa/bbb#ccc',
  'http://example.org./aaa/bbb#ccc',
  'http://example.123./aaa/bbb#ccc',
  // -- bare authority
  'http://example.org',
  // -- IPv6 literals (from RFC2732):
  'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
  'http://[1080:0:0:0:8:800:200C:417A]/index.html',
  'http://[3ffe:2a00:100:7031::1]',
  'http://[1080::8:800:200C:417A]/foo',
  'http://[::192.9.5.5]/ipng',
  'http://[::FFFF:129.144.52.38]:80/index.html',
  'http://[2010:836B:4179::836B:4179]',
  // -- Random other things that crop up
  'http://example/Andr&#567;',
  'file:///C:/DEV/Haskell/lib/HXmlToolbox-3.01/examples/',
  // Iprivate characters are allowed in query
  'http://a/?\u{E000}',
  'http://example.com/?\u{E000}',
];

const ALWAYS_INVALID_ABSOLUTE_IRIS = [
  '',
  'foo',
  'http://example.com/beepbeep\u0007\u0007',
  'http://example.com/\n',
];

const STRICTLY_INVALID_ABSOLUTE_IRIS = [
  // "::", // not OK, per Roy Fielding on the W3C uri list on 2004-04-01
  //
  // the following test cases are from a Perl script by David A. Wheeler
  // at http://www.dwheeler.com/secure-programs/url.pl
  'http://www yahoo.com',
  'http://www.yahoo.com/hello world/',
  'http://www.yahoo.com/yelp.html#"',
  //
  // the following test cases are from a Haskell program by Graham Klyne
  // at http://www.ninebynine.org/Software/HaskellUtils/Network/URITest.hs
  // 'http://[2010:836B:4179::836B:4179]',
  'http://example.com/ ',
  'http://example.com/%',
  'http://example.com/A%Z',
  'http://example.com/%ZZ',
  'http://example.com/%AZ',
  'http://example.com/A C',
  // "A'C",
  'http://example.com/A`C',
  'http://example.com/A<C',
  'http://example.com/A>C',
  'http://example.com/A^C',
  'http://example.com/A\\C',
  'http://example.com/A{C',
  'http://example.com/A|C',
  'http://example.com/A}C',
  'http://example.com/A[C',
  'http://example.com/A]C',
  'http://example.com/A[**]C',
  'http://[xyz]/',
  'http://]/',
  'http://example.org/[2010:836B:4179::836B:4179]',
  'http://example.org/abc#[2010:836B:4179::836B:4179]',
  'http://example.org/xxx/[qwerty]#a[b]',
  // From a post to the W3C uri list on 2004-02-17
  // 'http://w3c.org:80path1/path2',
  // Iprivate characters are not allowed in path not in fragment
  'http://example.com/\u{E000}',
  'http://example.com/\u{E000}',
  'http://example.com/#\u{E000}',
  'http://example.com/#\u{E000}',
  // Bad characters
  'http://\u{FFFF}',
  'http://example.com/?\u{FFFF}',
  'http://example.com/\u{0000}',
  'http://example.com/?\u{0000}',
  'http://example.com/#\u{0000}',
  'http://example.com/\u{E000}',
  'http://example.com/\u{F8FF}',
  'http://example.com/\u{F0000}',
  'http://example.com/\u{FFFFD}',
  'http://example.com/\u{100000}',
  'http://example.com/\u{10FFFD}',
  'http://example.com/?\u{FDEF}',
  'http://example.com/?\u{FFFF}',
  'http://example.com/\u{FDEF}',
  'http://example.com/\u{FFFF}',
  'http://example.com/\u{1FFFF}',
  'http://example.com/\u{2FFFF}',
  'http://example.com/\u{3FFFF}',
  'http://example.com/\u{4FFFF}',
  'http://example.com/\u{5FFFF}',
  'http://example.com/\u{6FFFF}',
  'http://example.com/\u{7FFFF}',
  'http://example.com/\u{8FFFF}',
  'http://example.com/\u{9FFFF}',
  'http://example.com/\u{AFFFF}',
  'http://example.com/\u{BFFFF}',
  'http://example.com/\u{CFFFF}',
  'http://example.com/\u{DFFFF}',
  'http://example.com/\u{EFFFF}',
  'http://example.com/\u{FFFFF}',
  // Bad host
  'http://[/',
  'http://[::1]a/',
  // Fuzzing bugs
  'http://͏@[]',
];

describe('Validate', () => {
  for (const iri of VALID_ABSOLUTE_IRIS) {
    test(`the IRI '${iri}' should be valid`, () => {
      expect(validateIri(iri, IriValidationStrategy.Strict)).toBeUndefined();
      expect(validateIri(iri, IriValidationStrategy.Pragmatic)).toBeUndefined();
    });
  }

  for (const iri of ALWAYS_INVALID_ABSOLUTE_IRIS) {
    test(`the IRI '${iri}' should be invalid according to pragmatic and strict modes`, () => {
      expect(validateIri(iri, IriValidationStrategy.Pragmatic)).toBeInstanceOf(Error);
      expect(validateIri(iri, IriValidationStrategy.Strict)).toBeInstanceOf(Error);
    });
  }

  for (const iri of STRICTLY_INVALID_ABSOLUTE_IRIS) {
    test(`the IRI '${iri}' should be invalid according to strict mode`, () => {
      expect(validateIri(iri)).toBeInstanceOf(Error);
    });
  }

  test('the validateIri function should not fail on invalid strategy', () => {
    // @ts-expect-error
    expect(validateIri('http://example.com/', 'foo')).toBeInstanceOf(Error);
  });

  test('the validateIri function should always validate with the none strategy', () => {
    expect(validateIri('', IriValidationStrategy.None)).toBeUndefined();
    expect(validateIri('\n', IriValidationStrategy.None)).toBeUndefined();
  });
});
