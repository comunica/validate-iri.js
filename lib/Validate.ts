function buildAbsoluteIriRfc3987Regex(): RegExp {
  // The syntax is defined in https://www.rfc-editor.org/rfc/rfc3987#section-2.2
  // Rules are defined in reversed order

  const subDelimsRaw = `!$&'()*+,;=`;
  const subDelims = `[${subDelimsRaw}]`;

  const pctEncoded = `%[a-fA-F0-9]{2}`;

  const decOctet = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';

  const ipv4address = `${decOctet}\\.${decOctet}\\.${decOctet}\\.${decOctet}`;

  const h16 = `[a-fA-F0-9]{1,4}`;
  const ls32 = `(${h16}:${h16}|${ipv4address})`;
  const ipv6address = `((${h16}:){6}${ls32}|::(${h16}:){5}${ls32}|(${h16})?::(${h16}:){4}${ls32}|((${h16}:){0,1}${h16})?::(${h16}:){3}${ls32}|((${h16}:){0,2}${h16})?::(${h16}:){2}${ls32}|((${h16}:){0,3}${h16})?::${h16}:${ls32}|((${h16}:){0,4}${h16})?::${ls32}|((${h16}:){0,5}${h16})?::${h16}|((${h16}:){0,6}${h16})?::)`;

  const ipvfuture = `v[a-fA-F0-9]+\\.(${subDelims}|${subDelims}|":)+`;

  const ipLiteral = `\\[(${ipv6address}|${ipvfuture})\\]`;

  const port = `[0-9]*`;

  const scheme = `[a-zA-Z][a-zA-Z0-9+\\-.]*`;

  const iprivateRaw = `\u{E000}-\u{F8FF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}`;
  const iprivate = `[${iprivateRaw}]`;

  const ucscharRaw = `\u{A0}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFEF}\u{10000}-\u{1FFFD}\u{20000}-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}\u{50000}-\u{5FFFD}\u{60000}-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}\u{90000}-\u{9FFFD}\u{A0000}-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}\u{D0000}-\u{DFFFD}\u{E1000}-\u{EFFFD}`;

  const iunreservedRaw = `a-zA-Z0-9\\-._~${ucscharRaw}`;
  const iunreserved = `[${iunreservedRaw}]`;

  const ipchar = `(${iunreserved}|${pctEncoded}|${subDelims}|[:@])*`;

  const ifragment = `(${ipchar}|[\\/?])*`;

  const iquery = `(${ipchar}|${iprivate}|[\\/?])*`;

  const isegmentNz = `(${ipchar})+`;
  const isegment = `(${ipchar})*`;

  const ipathEmpty = '';
  const ipathRootless = `${isegmentNz}(\\/${isegment})*`;
  const ipathAbsolute = `\\/(${isegmentNz}(\\/${isegment})*)?`;
  const ipathAbempty = `(\\/${isegment})*`;

  const iregName = `(${iunreserved}|${pctEncoded}|${subDelims})*`;

  const ihost = `(${ipLiteral}|${ipv4address}|${iregName})`;
  const iuserinfo = `(${iunreserved}|${pctEncoded}|${subDelims}|:)*`;
  const iauthority = `(${iuserinfo}@)?${ihost}(:${port})?`;

  const ihierPart = `(\\/\\/${iauthority}${ipathAbempty}|${ipathAbsolute}|${ipathRootless}|${ipathEmpty})`;

  const iri = `^${scheme}:${ihierPart}(\\?${iquery})?(#${ifragment})?$`;

  return new RegExp(iri, 'u');
}

const STRICT_IRI_REGEX: RegExp = buildAbsoluteIriRfc3987Regex();
// eslint-disable-next-line no-control-regex
const PRAGMATIC_IRI_REGEX = /^[A-Za-z][\d+-.A-Za-z]*:[^\u0000-\u0020"<>\\^`{|}]*$/u;

/**
 * Possible ways of validating an IRI
 */
export enum IriValidationStrategy {
  /**
   * Validates the IRI according to RFC 3987.
   */
  Strict = 'strict',

  /**
   * Validates that the IRI has a valid scheme and does not contain any character forbidden by the Turtle specification.
   */
  Pragmatic = 'pragmatic',

  /**
   * Does not validate the IRI at all.
   */
  None = 'none',
}

/**
 * Validate a given IRI according to the given strategy.
 *
 * By default the IRI is fully validated according to RFC 3987.
 * But it is possible to do a lighter a faster validation using the "pragmatic" strategy.
 *
 * @param {string} iri a string that may be an IRI.
 * @param {IriValidationStrategy} strategy IRI validation strategy.
 * @return {Error | undefined} An error if the IRI is invalid, or undefined if it is valid.
 */
export function validateIri(
  iri: string,
  strategy: IriValidationStrategy = IriValidationStrategy.Strict,
): Error | undefined {
  switch (strategy) {
    case IriValidationStrategy.Strict:
      return STRICT_IRI_REGEX.test(iri) ? undefined : new Error(`Invalid IRI according to RFC 3987: '${iri}'`);
    case IriValidationStrategy.Pragmatic:
      return PRAGMATIC_IRI_REGEX.test(iri) ? undefined : new Error(`Invalid IRI according to RDF Turtle: '${iri}'`);
    case IriValidationStrategy.None:
      return undefined;
    default:
      // `strategy` narrows to `never` here, but callers from JavaScript can still pass
      // an arbitrary value, so it is stringified explicitly.
      return new Error(`Not supported validation strategy "${String(strategy)}"`);
  }
}
