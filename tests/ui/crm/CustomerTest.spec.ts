import { test, expect } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Customer Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuCustomers();
        const beforeAddCustomer = await pages.customersPage().getTotalCustomers();
        console.log(`beforeAddCustomer = ${beforeAddCustomer}`);
        await pages.customersPage().clickButtonAddNewCustomer();
        await pages.customersPage().addNewCustomer();
        await pages.customersPage().verifyCustomerAdded();
        await pages.basePage().clickTabContacts();
        await pages.contactsPage().clickButtonNewContact();
        await pages.contactsPage().addNewContact('Bin', 'Dang');
        await pages.contactsPage().verifyCreatedContact('Bin', 'Dang');
        await pages.customersPage().searchCustomer();
        const afterAddedCustomer = await pages.customersPage().getTotalCustomers();
        await expect(afterAddedCustomer).toBe(beforeAddCustomer + 1);
        console.log(`afterAddedCustomer = ${beforeAddCustomer} + 1`);
        await pages.customersPage().deleteCustomer();
        const afterDeletedCustomer = await pages.customersPage().getTotalCustomers();
        await expect(afterDeletedCustomer).toBe(beforeAddCustomer);
        console.log(`afterDeletedCustomer = ${beforeAddCustomer}`);
        await pages.customersPage().verifyCustomerDeleted();
        await pages.headerPage().logout();
    });
});
