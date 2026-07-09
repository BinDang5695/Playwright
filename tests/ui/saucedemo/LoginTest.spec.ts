import { test } from '@fixtures/saucedemo.fixture';
import validationCases from '@data/saucedemo/LoginData.json';

type ValidationCase = {
  title: string;
  data: {
    email?: string;
    password?: string;
  };
  expectedError: string;
};

const cases = validationCases as ValidationCase[];

test.describe('Login Validation Tests', () => {

  cases.forEach((item) => {

    test(item.title, async ({ page, loginPage }) => {

      await page.goto('https://www.saucedemo.com/');
      await loginPage.fillSubmitLogin(item.data);
      await loginPage.verifyError(item.expectedError);

    });
  });
});