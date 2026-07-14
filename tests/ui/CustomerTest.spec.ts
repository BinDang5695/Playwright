import { test } from '@fixtures/ui.fixture';
import { Menu, Message } from '@constants/crm';
import { customerData } from '@data/ui/customer.data';
import { contactData } from '@data/ui/contact.data';
import { ROLES } from '@constants/crm';

for (const role of ROLES) {

    test.describe.serial(`${role} - Customer Test Suite`, () => {

        test.use({ role });

        test.beforeEach(async ({ BasePage }) => {

            await test.step('Navigate to Customers', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
            });

        });

        test('[CUSTOMER_001] Create customer successfully', async ({ BasePage, customersPage }) => {

            let before: number;

            await test.step('Get total customers before creating', async () => {
                before = await customersPage.getTotalCustomers();
            });

            await test.step('Open the New Customer form', async () => {
                await customersPage.clickButtonAddNewCustomer();
            });

            await test.step('Create a new customer', async () => {
                await customersPage.addNewCustomer(customerData);
            });

            await test.step('Verify the customer is created successfully', async () => {
                await customersPage.verifyCustomerAdded(customerData);
            });

            await test.step('Verify total customers is increased', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
                const after = await customersPage.getTotalCustomers();
                await customersPage.expectEqual(after, before + 1);
            });

        });

        test('[CONTACT_001] Create contact successfully', async ({ BasePage, customersPage, contactsPage }) => {

            await test.step('Search for the existing customer', async () => {
                await customersPage.searchCustomer(customerData);
            });

            await test.step('Open customer details', async () => {
                await customersPage.hoverToCustomer(customerData);
                await BasePage.clickButtonView();
            });

            await test.step('Navigate to Contacts', async () => {
                await contactsPage.clickByLinkText(Menu.CONTACTS);
            });

            await test.step('Open the New Contact form', async () => {
                await contactsPage.clickButtonNewContact();
            });

            await test.step('Create a new contact', async () => {
                await contactsPage.addNewContact(contactData);
            });

            await test.step('Verify the contact is created successfully', async () => {
                await contactsPage.verifyCreatedContact(contactData);
            });

        });

        test('[CUSTOMER_002] Delete customer successfully', async ({ BasePage, customersPage }) => {

            let before: number;

            await test.step('Get total customers before deleting', async () => {
                before = await customersPage.getTotalCustomers();
            });

            await test.step('Search for the existing customer', async () => {
                await customersPage.searchCustomer(customerData);
            });

            await test.step('Delete the customer', async () => {
                await customersPage.hoverToCustomer(customerData);
                await BasePage.deleteRecord();
            });

            await test.step('Verify total customers is decreased', async () => {
                const after = await customersPage.getTotalCustomers();
                await customersPage.expectEqual(after, before - 1);
            });

            await test.step('Verify the customer is deleted successfully', async () => {
                await customersPage.searchCustomer(customerData);
                await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
            });

        });

    });

}