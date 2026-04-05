import { test } from '@fixtures/crm.fixture';
import { invalidLoginCases } from '@data/crm/login.data';
import { ENV } from '@utils/env';

test.describe('CRM Test Suite', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('Login Successfully @login', async ({ loginPage }) => {
    await loginPage.loginCRM(ENV.username, ENV.password);
    await loginPage.verifyLoginSuccess();
  });

  for (const { name, email, password, message } of invalidLoginCases) {

    test(`Login Failed - ${name} @login`, async ({ loginPage }) => {
      await loginPage.loginCRM(email, password);
      await loginPage.verifyLoginFail(message);
    });
  }
});