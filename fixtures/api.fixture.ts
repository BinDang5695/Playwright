import { test as base, expect } from '@playwright/test';
import { GlobalSetup } from '../env/api.global.setup';

type ApiFixtures = {
  token: string;
};

let cachedToken: string | undefined;

export const test = base.extend<ApiFixtures>({
  token: async ({ request }, use) => {
    if (!cachedToken) {
      cachedToken = await GlobalSetup.login(request);
    }
    if (!cachedToken) {
      throw new Error('Token is undefined after login');
    }
    await use(cachedToken);
  },
});

export { expect };