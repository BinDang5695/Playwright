import { test } from '@fixtures/ui.fixture';
import { Menu, Message } from '@constants/crm';
import { customerData } from '@data/ui/customer.data';
import { contactData } from '@data/ui/contact.data';
import { ROLES } from '@constants/crm';

for (const role of ROLES) {

    test.describe.serial(`${role} - Customer Test Suite`, () => {

        test.use({ role });

        test.beforeEach(async ({ BasePage }) => {

            await test.step('Navigate to Customers page', async () => {
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
                await customersPage.inputToAddNewCustomer(customerData);
            });

            await test.step('Click button save', async () => {
                await customersPage.clickButtonSave();
            });

            await test.step('Verify the customer is created successfully', async () => {
                await customersPage.verifyCustomerAdded(customerData);
            });

            await test.step('Navigate to Customers', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
            });

            await test.step('Verify total customers is increased', async () => {
                const after = await customersPage.getTotalCustomers();
                await customersPage.expectEqual(after, before + 1);
            });

        });

        test('[CONTACT_001] Create contact successfully', async ({ BasePage, customersPage, contactsPage }) => {

            await test.step('Search for the existing customer', async () => {
                await customersPage.searchCustomer(customerData.company);
            });

            await test.step('Hover to customer', async () => {
                await customersPage.hoverToCustomer(customerData.company);
            });

            await test.step('Open customer details', async () => {
                await BasePage.clickButtonView();
            });

            await test.step('Navigate to Contacts page', async () => {
                await BasePage.clickByLinkText(Menu.CONTACTS);
            });

            await test.step('Open the New Contact form', async () => {
                await contactsPage.clickButtonNewContact();
            });

            await test.step('Input to create a new contact', async () => {
                await contactsPage.inputToCreateNewContact(contactData);
            });

            await test.step('Click save button', async () => {
                await contactsPage.clickButtonSave();
            });           
            await test.step('Verify alert create contact success', async () => {
                await contactsPage.verifyAlertCreateContactSuccess();
            });

            await test.step('Click created contact', async () => {
                await contactsPage.clickCreatedContact(contactData);
            });

            await test.step('Verify the contact is created successfully', async () => {
                await contactsPage.verifyCreatedContact(contactData);
            });

            await test.step('Close New Contact popup ', async () => {
                await BasePage.clickButtonClosePopUp();
            });
        });

        test('[CUSTOMER_002] Delete customer successfully', async ({ BasePage, customersPage }) => {

            let before: number;

            await test.step('Get total customers before deleting', async () => {
                before = await customersPage.getTotalCustomers();
            });

            await test.step('Search for the existing customer', async () => {
                await customersPage.searchCustomer(customerData.company);
            });

            await test.step('Hover to customer', async () => {
                await customersPage.hoverToCustomer(customerData.company);
            });

            await test.step('Delete the customer', async () => {
                await BasePage.deleteRecordAfterHover();
            });

            await test.step('Verify total customers is decreased', async () => {
                const after = await customersPage.getTotalCustomers();
                await customersPage.expectEqual(after, before - 1);
            });

            await test.step('Search for the deleted customer', async () => {
                await customersPage.searchCustomer(customerData.company);
            });

            await test.step('Verify the customer is deleted successfully', async () => {
                await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
            });

        });

    });

}