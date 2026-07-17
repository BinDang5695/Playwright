// api/common/ApiTestHelper.ts
import { expect, APIResponse } from '@playwright/test';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import AjvDraft04 from 'ajv-draft-04';

const ajv07 = new Ajv({ strict: false, allErrors: true });
addFormats(ajv07);

const ajv04 = new AjvDraft04({ strict: false, allErrors: true });
addFormats(ajv04);

function pickAjv(schema: any) {
  const version = schema?.$schema ?? '';
  if (version.includes('draft-04')) {
    return ajv04;
  }
  return ajv07;
}

export function validateSchema(schema: object, data: any) {
  const ajv = pickAjv(schema);
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