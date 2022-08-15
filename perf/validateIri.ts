/* eslint-disable no-console */

import { IriValidationStrategy, validateIri } from '..';

const ITERATIONS = 100_000;

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
  'file:///foo/bar',
  'mailto:user@host?subject=blah',
  'dav:',
  'about:',
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
  'http://www.yahoo.com?name=%00%01',
  'http://www.yaho%6f.com',
  'http://www.yahoo.com/hello%00world/',
  'http://www.yahoo.com/hello+world/',
  'http://www.yahoo.com?name=obi&',
  'http://www.yahoo.com?name=obi&type=',
  'http://www.yahoo.com/yelp.html#',
  'http://example.org/aaa/bbb#ccc',
  'mailto:local@domain.org',
  'mailto:local@domain.org#frag',
  'HTTP://EXAMPLE.ORG/AAA/BBB#CCC',
  'http://example.org/aaa%2fbbb#ccc',
  'http://example.org/aaa%2Fbbb#ccc',
  'http://example.com/%2F',
  'http://example.com/?%2F',
  'http://example.com/#?%2F',
  'http://example.com/aaa%2Fbbb',
  'http://example.org:80/aaa/bbb#ccc',
  'http://example.org:/aaa/bbb#ccc',
  'http://example.org./aaa/bbb#ccc',
  'http://example.123./aaa/bbb#ccc',
  'http://example.org',
  'http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html',
  'http://[1080:0:0:0:8:800:200C:417A]/index.html',
  'http://[3ffe:2a00:100:7031::1]',
  'http://[1080::8:800:200C:417A]/foo',
  'http://[::192.9.5.5]/ipng',
  'http://[::FFFF:129.144.52.38]:80/index.html',
  'http://[2010:836B:4179::836B:4179]',
  'http://example/Andr&#567;',
  'file:///C:/DEV/Haskell/lib/HXmlToolbox-3.01/examples/',
  'http://a/?\u{E000}',
  'http://example.com/?\u{E000}',
];

const FULL_TIMER = 'Full IRI validation';

console.time(FULL_TIMER);

for (let i = 0; i < ITERATIONS; i++) {
  for (const iri of VALID_ABSOLUTE_IRIS) {
    validateIri(iri, IriValidationStrategy.Strict);
  }
}

console.timeEnd(FULL_TIMER);

const PARTIAL_TIMER = 'Partial IRI validation';

console.time(PARTIAL_TIMER);

for (let i = 0; i < ITERATIONS; i++) {
  for (const iri of VALID_ABSOLUTE_IRIS) {
    validateIri(iri, IriValidationStrategy.Pragmatic);
  }
}

console.timeEnd(PARTIAL_TIMER);

/* eslint-enable no-console */
