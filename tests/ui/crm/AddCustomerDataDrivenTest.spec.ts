import { test } from './BaseTest';
import customerCases from '../../../test_data/customerData.json';
import type { CustomerData } from '../../../models/types/CustomerData';

type CustomerCase = {
  title: string;
  data: CustomerData;
  expectedType: 'success' | 'error';
  expectedMessage?: string;
};

const cases = customerCases as CustomerCase[];

test.describe('CRM Add Customer Data Driven', () => {

  for (const item of cases) {

    test(item.title, async ({ pages }) => {

      await pages.loginPage().loginCRM('admin@example.com', '123456');
      await pages.basePage().clickMenuCustomers();
      await pages.customersPage().clickButtonAddNewCustomer();
      await pages.customersPage().addNewCustomerDataDriven(item.data);

      if (item.expectedType === 'success') {
        await pages.customersPage().verifyCustomerAddedDataDriven(item.data);
        await pages.customersPage().deleteCustomerIfExist(item.data.company!);
      } else {
        await pages.customersPage().verifyCreateFail(item.expectedMessage!);
      }

    });

  }

});
