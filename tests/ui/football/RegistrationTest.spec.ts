import { test } from '@fixtures/fb.fixture';
import validationCases from '@data/fb/RegistrationData.json';

type ValidationCase = {
  title: string;
  data: {
    firstName?: string;
    surName?: string;
    clubName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    emails?: string[];
    emailCount?: number;
    consent?: boolean | string;
    captcha?: string;
  };
  expectedErrors: Array<{ field: string; message: string }>;
};

const cases = validationCases as ValidationCase[];

test.describe('FB Validation Tests', () => {

  for (const item of cases) {
    test(item.title, async ({ page, registrationPage }) => {
      console.log(`\n[TEST] ${item.title}`);
      await page.goto('https://football-questionnaire-dev.powerappsportals.com/');
      await registrationPage.clickButtonRegisterAndProceed();
      await registrationPage.fillSubmitRegistration(item.data);
      if (!item.data.emailCount) {
        await registrationPage.clickButtonSubmitRegistration();
      }
  
      await registrationPage.verifyErrorsByField(item.expectedErrors);
    });
  }
});