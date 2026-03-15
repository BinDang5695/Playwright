import { test as base, expect } from '@playwright/test';
import { EndPointGlobal } from './EndpointGlobal';
import { LoginBuilder } from './LoginBuilder';
import { ConfigsGlobal } from './ConfigsGlobal';
import loginSchema from '../../test_data/LoginSchema.json';
import { ApiLogger } from './ApiLogger';
import { VerifyBookHeaders } from '../book/VerifyBookHeaders';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateLoginSchema = ajv.compile(loginSchema);

let cachedToken: string | undefined;

type ApiFixtures = {
  token: string;
};

export const test = base.extend<ApiFixtures>({
  token: async ({ request }, use) => {

    if (!cachedToken) {

    const loginData = LoginBuilder.getDataLogin();
    const url = `${ConfigsGlobal.BASE_URL}${EndPointGlobal.EP_LOGIN}`;

    ApiLogger.logRequest('POST', url, {
      body: loginData
    });

    const start = Date.now();
    const response = await request.post(url, { data: loginData });
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(3000);

    VerifyBookHeaders.verify(response);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    const valid = validateLoginSchema(body);
    expect(valid).toBe(true);
    if (!valid) {
      console.error(validateLoginSchema.errors);
    }

    await ApiLogger.logResponse(response, duration);

    cachedToken = body.token;
  }
  
    if (!cachedToken) {
      throw new Error('Token is undefined after login');
    }

    await use(cachedToken);
}
});

export { expect };
