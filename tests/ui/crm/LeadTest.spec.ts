import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Add new Leads, verify and delete Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuLeads();
        await pages.leadsPage().createMultipleLeads(2);
        await pages.leadsPage().searchAndCheckDataInTable(3, 'Bin Lead');
        await pages.leadsPage().deleteDataAfterSearched();
        await pages.leadsPage().verifyDeletedLeads();
        await pages.headerPage().openMyProfile();
        await pages.headerPage().searchAndCheckPagination();
        await pages.headerPage().logout();
    });
});
