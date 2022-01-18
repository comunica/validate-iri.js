import { createReadStream } from 'fs';
import * as path from 'path';
import { JsonLdParser } from 'jsonld-streaming-parser';

const runPerformanceTest = (fileName, skipContextValidation: boolean):
Promise<any> => new Promise(resolve => {
  const resolvedFileName = path.resolve(process.cwd(), 'perf', fileName);

  const start = process.hrtime.bigint();
  let count = 0;
  const parsed = createReadStream(resolvedFileName).pipe(new JsonLdParser({
    baseIRI: 'http://example.org/', skipContextValidation,
  }));
  parsed.on('data', (quad: any) => {
    count++;
  });
  parsed.on('error', (error: Error) => {
    throw error;
  });
  parsed.on('end', () => {
    const end = process.hrtime.bigint();

    resolve({
      File: fileName,
      Validation: !skipContextValidation,
      'Time ran': Number(end - start) / 1_000_000_000,
      'Quads parsed': count,
      'Memory Usage': `${Math.round(process.memoryUsage().rss / 1_024 / 1_024)} MB`,
    });
  });
});

const files = [
  'toRdf-manifest.jsonld',
  'sparql-init.json',
];

const lines = [];

for (const file of files) {
  lines.push(runPerformanceTest(file, true), runPerformanceTest(file, false));
}

Promise.all(lines).then(results => {
  console.table(results);
}).catch(error => {
  console.log(error);
});
