import { test } from '@fixtures/ui.fixture';
import { Menu, Message } from '@constants/crm';
import { leadData } from '@data/ui/lead.data';

test.describe.serial('Admin - Lead Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Leads', async () => {
            await BasePage.clickByMenuText(Menu.LEADS);
        });
    });

    test('[LEAD_001] Create Leads Successfully', async ({ leadsPage }) => {

        await test.step('Create multiple leads', async () => {
            await leadsPage.createMultipleLeads(2, leadData);
        });

        await test.step('Select leads length', async () => {
            await leadsPage.selectLeadsLength(10);
        });

        await test.step('Search created leads', async () => {
            await leadsPage.searchLeads(leadData);
        });

        await test.step('Verify created leads are displayed correctly', async () => {
            await leadsPage.checkNumberOfLeads(leadData);
        });
    });

    test('[LEAD_002] Delete Leads Successfully', async ({ BasePage, leadsPage }) => {

        await test.step('Search for the existing leads', async () => {
            await leadsPage.searchLeads(leadData);
        });

        await test.step('Select leads length', async () => {
            await leadsPage.selectLeadsLength(25);
        });

        await test.step('Select all created Leads', async () => {
            await BasePage.selectAllAndEnsureChecked(3);
        });

        await test.step('Delete all the searched leads', async () => {
            await BasePage.deleteRecordAfterSelectCheckbox();
        });

        await test.step('Search for the deleted leads', async () => {
            await leadsPage.searchLeads(leadData);
        });

        await test.step('Verify alert the leads are deleted successfully', async () => {
            await leadsPage.verifyAlertTotalDeletedLeads(leadData);
        });

        await test.step('Verify the leads are deleted successfully', async () => {
            await BasePage.verifyNoItem(Message.NO_ENTRIES_FOUND);
        });
    });

});