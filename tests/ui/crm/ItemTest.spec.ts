import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Add new Item, verify and delete Item Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuItems();
        await pages.itemsPage().clickButtonImportItems();
        await pages.itemsPage().importCSVFile();
        await pages.itemsPage().clickToImportCSVFile();
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuItems();
        await pages.itemsPage().searchAndVerifyItems();
        await pages.itemsPage().deleteImportedItem();
        await pages.headerPage().logout();
    });
});
