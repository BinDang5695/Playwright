import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
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

        await test.step('Verify created leads are displayed correctly', async () => {
            await leadsPage.searchAndCheckDataInTable(leadData);
        });
    });

    test('[LEAD_002] Delete Leads Successfully', async ({ leadsPage }) => {

        await test.step('Search for the existing leads', async () => {
            await leadsPage.searchAndCheckDataInTable(leadData);
        });

        await test.step('Delete the searched leads', async () => {
            await leadsPage.deleteDataAfterSearched();
        });

        await test.step('Verify the leads are deleted successfully', async () => {
            await leadsPage.verifyDeletedLeads(leadData);
        });
    });

});