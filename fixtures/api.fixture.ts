import { test as base, expect } from '@playwright/test';
import { AuthService } from '../api/services/AuthService';

type ApiFixtures = {
  token: string;
};

let cachedToken: string | undefined;

export const test = base.extend<ApiFixtures>({
  token: async ({ request }, use) => {
    if (!cachedToken) {
      cachedToken = await AuthService.login(request);
    }
    if (!cachedToken) {
      throw new Error('Token is undefined after login');
    }
    await use(cachedToken);
  },
});

export { expect };