import { expect, APIResponse } from '@playwright/test';
import addFormats from 'ajv-formats';
import Ajv from 'ajv-draft-04';

const ajv = new Ajv({
  strict: false,
  allErrors: true,
});

addFormats(ajv);

export function validateSchema(schema: object, data: any) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }

  expect(valid).toBe(true);
}

export async function measureRequest(
  requestFn: () => Promise<APIResponse>,
  maxTime = 3000
) {
  const start = Date.now();
  const response = await requestFn();
  const duration = Date.now() - start;

  expect(duration).toBeLessThan(maxTime);

  return { response, duration };
}