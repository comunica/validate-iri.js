/**
 * @see https://en.wikipedia.org/wiki/Uniform_Resource_Name
 */
export const correctUrns = [
  'urn:isbn:0451450523',
  'urn:isan:0000-0000-2CEA-0000-1-0000-0000-Y',
  'urn:ISSN:0167-6423',
  'urn:ietf:rfc:2648',
  'urn:mpeg:mpeg7:schema:2001',
  'urn:oid:2.16.840',
  'urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66',
  'urn:nbn:de:bvb:19-146642',
  'urn:lex:eu:council:directive:2010-03-09;2010-19-UE',
  'urn:lsid:zoobank.org:pub:CDC8D258-8F57-41DC-B560-247E17D3DC8C',
  'urn:epc:class:lgtin:4012345.012345.998877',
  'urn:epc:id:sgtin:0614141.112345.400',
  'urn:epc:id:sscc:0614141.1234567890',
  'urn:epc:id:sgln:0614141.12345.400',
  'urn:epc:id:bic:CSQU3054383',
  'urn:epc:id:imovn:9176187',
  'urn:epc:id:gdti:0614141.12345.400',
  'urn:mrn:iala:aton:us:1234.5',
  'urn:mrn:iala:vts:ca:ecareg',
  'urn:mrn:iala:wwy:us:atl:chba:potri',
  'urn:mrn:iala:pub:g1143',
  'urn:microsoft:adfs:claimsxray',
  'urn:isan:0000-0000-9E59-0000-O-0000-0000-2',

  // @see https://datatracker.ietf.org/doc/html/rfc2141#section-6
  'URN:foo:a123,456',
  'urn:foo:a123,456',
  'urn:FOO:a123,456',
  'urn:foo:A123,456',
  'urn:foo:a123%2C456',
  'URN:FOO:a123%2c456',
];

// @see https://github.com/cmawhorter/urn-lib/blob/master/test/__tests__/fixtures/aws-urns.ts
// urns that have more parts than allowed by the spec.
export const incorrectUrns = [
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name',
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name:*',
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name_prefix*',
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name:log-stream:log_stream_name',
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name:log-stream:log_stream_name_prefix*',
  'arn:aws:logs:us-east-1:account-id:log-group:log_group_name_prefix*:log-stream:log_stream_name_prefix*',
  'arn:aws:codebuild:us-east-1:123456789012:project/my-demo-project',
  'arn:aws:codebuild:us-east-1:123456789012:build/my-demo-project:7b7416ae-89b4-46cc-8236-61129df660ad',
  'arn:aws:codecommit:us-east-1:123456789012:MyDemoRepo',
  'arn:aws:codedeploy:us-east-1:123456789012:application:WordPress_App',
  'arn:aws:codedeploy:us-east-1:123456789012:instance/AssetTag*',
  'arn:aws:config:us-east-1:123456789012:config-rule/MyConfigRule',
  'arn:aws:codepipeline:us-east-1:123456789012:MyDemoPipeline',
];
