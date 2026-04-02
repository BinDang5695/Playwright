import { test } from '@fixtures/crm.fixture';
import customerCases from '../../../test_data/crm/CustomerData.json';
import { Menu } from '@constants/crm';
import { CustomerDataDriven } from '@models/types/crm/customerdriven.model';

type CustomerCase = {
  title: string;
  data: CustomerDataDriven;
  expectedType: 'success' | 'error';
  expectedMessage?: string;
};

const cases = customerCases as CustomerCase[];

test.describe.serial('CRM Add Customer Data Driven', () => {

  for (const item of cases) {

    test(item.title, async ({ CRMBasePage, customersPage }) => {

      await CRMBasePage.clickByMenuText(Menu.CUSTOMERS);
      await customersPage.clickButtonAddNewCustomer();
      await customersPage.addNewCustomerDataDriven(item.data);

      if (item.expectedType === 'success') {
        await customersPage.verifyCustomerAddedDataDriven(item.data);
        await CRMBasePage.clickByMenuText(Menu.CUSTOMERS);
        await customersPage.deleteCustomerIfExist(item.data);
      } else {
        await customersPage.verifyCreateFail(item.expectedMessage!);
      }
    });
  }
});
