import { test } from '@fixtures/cms.fixture';
import { invalidLoginCases } from '@data/cms/login.data';
import { ENV } from '@utils/env';

test.describe('CMS Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

    test('Login Successfully', async ({ loginPage }) => {
        await loginPage.loginCMS(ENV.username, ENV.password);
        await loginPage.verifyLoginSuccess();
    });

    for (const { name, email, password, message } of invalidLoginCases) {
    test(`Login Failed - ${name}`, async ({ loginPage }) => {
      await loginPage.loginCMS(email, password);
      await loginPage.verifyLoginFail(message);
    });
}
});
