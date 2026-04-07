import { test } from '@fixtures/shopvn.fixture';
import { invalidLoginCases } from '@data/shopvn/login.data';
import { ENV } from '@utils/env';

test.describe('ShopVN Test Suite', () => {

  test('Login Successfully @login', async ({ LoginPage }) => {
    await LoginPage.loginShopVN(ENV.username, ENV.password);
    await LoginPage.verifyLoginSuccess();
  });

  for (const { name, email, password, message } of invalidLoginCases) {

    test(`Login Failed - ${name} @login`, async ({ LoginPage }) => {
      await LoginPage.loginShopVN(email, password);
      await LoginPage.verifyLoginFail(message);
    });
  }
});