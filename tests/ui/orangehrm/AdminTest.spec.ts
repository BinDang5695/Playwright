import { test } from './BaseTest';
import validationCases from '../../../test_data/addUserValidation.json';

test.describe('HRM - Add User Validation', () => {

  for (const item of validationCases) {

    test(item.title, async ({ pages }) => {
      console.log(`\n[TEST] ${item.title}`);

      await pages.loginPage().loginHRM('Admin', 'admin123');
      await pages.adminPage().clickMenuAdmin();
      await pages.adminPage().clickButtonAdd();

      await pages.adminPage().fillAddUserForm(item.data);
      await pages.adminPage().clickButtonSave();

      for (const err of item.expectedErrors) {
        await pages.adminPage().verifyErrors(
          err.field,
          err.message,

        );
      }
      
    });
    
  }
});
