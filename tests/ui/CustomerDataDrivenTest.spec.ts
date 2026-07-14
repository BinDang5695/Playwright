import { test } from '@fixtures/ui.fixture';
import customerCases from '@data/ui/CustomerData.json';
import { Menu } from '@constants/crm';
import { CustomerDataDriven } from '@models/types/customerdriven.model';
import { ROLES } from '@constants/crm';

type CustomerCase = {
  title: string;
  data: CustomerDataDriven;
  expectedType: 'success' | 'error';
  expectedMessage?: string;
};

const cases = customerCases as CustomerCase[];

for (const role of ROLES) {

  test.describe.serial(`${role} - Add Customer Data Driven From JSON File Test Suite`, () => {

    test.use({
      role,
    });

    test.beforeEach(async ({ BasePage }) => {

      await test.step('Navigate to Customers', async () => {
        await BasePage.clickByMenuName(Menu.CUSTOMERS);
      });

    });

    for (const item of cases) {

      test(item.title, async ({ BasePage, customersPage }) => {

        await test.step('Open the New Customer form', async () => {
          await customersPage.clickButtonAddNewCustomer();
        });

        await test.step('Add new customer from JSON data file', async () => {
          await customersPage.addNewCustomerDataDriven(item.data);
        });

        if (item.expectedType === 'success') {

          await test.step('Verify the customer is created successfully', async () => {
            await customersPage.verifyCustomerAddedDataDriven(item.data);
          });

          await test.step('Delete the created customer', async () => {
            await BasePage.clickByMenuName(Menu.CUSTOMERS);
            await customersPage.deleteCustomerIfExist(item.data);
          });

        } else {

          await test.step('Verify the validation error message is displayed', async () => {
            await customersPage.verifyCreateFail(item.expectedMessage!);
          });

        }

      });

    }

  });

}