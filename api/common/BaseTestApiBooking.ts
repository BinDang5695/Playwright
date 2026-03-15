import { test as base, expect } from '@playwright/test';
import { EndPointGlobal } from './EndpointGlobal';
import { CreateToken } from '../booking/CreateToken';
import { ConfigsBooking } from './ConfigsBooking';
import CreateTokenSchema from '../../test_data/CreateTokenSchema.json';
import { ApiLogger } from './ApiLogger';
import { VerifyBookingHeaders } from '../booking/VerifyBookingHeaders';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validateCreateTokenSchema = ajv.compile(CreateTokenSchema);

let cachedToken: string | undefined;

type ApiFixtures = {
  token: string;
};

export const test = base.extend<ApiFixtures>({
  token: async ({ request }, use) => {

    if (!cachedToken) {

    const loginData = CreateToken.getDataCreateToken();
    const url = `${ConfigsBooking.BASE_URL}${EndPointGlobal.EP_AUTH}`;

    ApiLogger.logRequest('POST', url, {
      body: loginData
    });

    const start = Date.now();
    const response = await request.post(url, { data: loginData });
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(3000);

    VerifyBookingHeaders.verify(response);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    const valid = validateCreateTokenSchema(body);
    expect(valid).toBe(true);
    if (!valid) {
      console.error(validateCreateTokenSchema.errors);
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