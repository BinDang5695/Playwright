import { test } from '@fixtures/crm.fixture';
import { Menu } from '@constants/crm';
import { leadData } from '@data/crm/lead.data';

test.describe('CRM Test Suite', () => {

    test('Add new Leads, verify and delete Successfully', async ({ leadsPage, CRMBasePage }) => {
        await CRMBasePage.clickByMenuText(Menu.LEADS);
        await leadsPage.createMultipleLeads(2, leadData);
        await leadsPage.searchAndCheckDataInTable(leadData);
        await leadsPage.deleteDataAfterSearched();
        await leadsPage.verifyDeletedLeads(leadData);
    });
});
