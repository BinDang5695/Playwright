import { test } from '@fixtures/ui.fixture';
import customerCases from '@data/ui/CustomerData.json';
import { Menu, Message } from '@constants/crm';
import { CustomerDataDriven } from '@models/types/ui/customerdriven.model';
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

      await test.step('Navigate to Customers page', async () => {
        await BasePage.clickByMenuName(Menu.CUSTOMERS);
      });

    });

    for (const item of cases) {

      test(item.title, async ({ BasePage, customersPage }) => {

        await test.step('Open the New Customer form', async () => {
          await customersPage.clickButtonAddNewCustomer();
        });

        await test.step('Input to create a new customer from JSON data file', async () => {
          await customersPage.inputToCreateCustomer(item.data);
        });

        await test.step('Scroll to button save', async () => {
          await customersPage.scrollToButtonSave();
        });

        await test.step('Click button save', async () => {
          await customersPage.clickButtonSave();
        });

        if (item.expectedType === 'success') {

          await test.step('Verify the customer is created successfully', async () => {
            await customersPage.verifyCustomerAddedDataDriven(item.data);
          });

          await test.step('Navigate to Customers page', async () => {
            await BasePage.clickByMenuName(Menu.CUSTOMERS);
          });

          await test.step('Search for the existing customer', async () => {
                await customersPage.searchCustomer(item.data.company!);
          });

          await test.step('Hover to customer', async () => {
                await customersPage.hoverToCustomer(item.data.company!);
          });

          await test.step('Delete the customer', async () => {
                await BasePage.deleteRecordAfterHover();
            });

          await test.step('Search for the deleted customer', async () => {
                await customersPage.searchCustomer(item.data.company!);
          });

          await test.step('Verify the customer is deleted successfully', async () => {
                await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
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