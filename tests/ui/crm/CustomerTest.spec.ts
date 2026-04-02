import { test } from '@fixtures/crm.fixture';
import { Menu } from '@constants/crm';
import { customerData } from '@data/crm/customer.data';
import { contactData } from '@data/crm/contact.data';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Customer Successfully', async ({ customersPage, contactsPage, CRMBasePage }) => {
        await CRMBasePage.clickByMenuText(Menu.CUSTOMERS);
        const beforeAddCustomer = await customersPage.getTotalCustomers();
        console.log(`beforeAddCustomer = ${beforeAddCustomer}`);
        await customersPage.clickButtonAddNewCustomer();
        await customersPage.addNewCustomer(customerData)
        await customersPage.verifyCustomerAdded(customerData);
        await CRMBasePage.clickByLinkText(Menu.CONTACTS);
        await contactsPage.clickButtonNewContact();
        await contactsPage.addNewContact(contactData);
        await contactsPage.verifyCreatedContact(contactData);
        await CRMBasePage.clickByMenuText(Menu.CUSTOMERS);
        await customersPage.searchCustomer(customerData);
        const afterAddedCustomer = await customersPage.getTotalCustomers();
        await customersPage.expectEqual(afterAddedCustomer, beforeAddCustomer + 1);
        console.log(`afterAddedCustomer = ${beforeAddCustomer} + 1`);
        await customersPage.deleteCustomer(customerData);
        const afterDeletedCustomer = await customersPage.getTotalCustomers();
        await customersPage.expectEqual(afterDeletedCustomer, beforeAddCustomer);
        console.log(`afterDeletedCustomer = ${beforeAddCustomer}`);
        await customersPage.verifyCustomerDeleted(customerData);
    });
});
