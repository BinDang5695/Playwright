import { test } from '@fixtures/page.fixture';
import { Menu } from '@constants/crm';
import { customerData } from '@data/crm/customer.data';
import { Message } from '@constants/crm';
import { contactData } from '@data/crm/contact.data';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Customer Successfully', async ({ customersPage, contactsPage, CRMBasePage }) => {
        await CRMBasePage.clickValue(Menu.CUSTOMERS);
        const beforeAddCustomer = await customersPage.getTotalCustomers();
        console.log(`beforeAddCustomer = ${beforeAddCustomer}`);
        await customersPage.clickButtonAddNewCustomer();
        await customersPage.addNewCustomer(customerData)
        await customersPage.verifyCustomerAdded(customerData);
        await CRMBasePage.clickValue3(Menu.CONTACTS);
        await contactsPage.clickButtonNewContact();
        await contactsPage.addNewContact(contactData);
        await contactsPage.verifyCreatedContact(contactData, Message.CREATEDCONTACT);
        await CRMBasePage.clickValue(Menu.CUSTOMERS);
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
