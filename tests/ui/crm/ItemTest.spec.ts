import { test } from '@fixtures/crm.fixture';
import { Menu } from '@constants/crm';
import { itemData } from '@data/crm/item.data';

test.describe('CRM Test Suite', () => {

    test('Add new Item, verify and delete Item Successfully', async ({ itemsPage, CRMBasePage }) => {
        await CRMBasePage.clickByMenuText(Menu.SALES);
        await CRMBasePage.clickByMenuName(Menu.ITEMS);
        await itemsPage.clickButtonImportItems();
        await itemsPage.importCSVFile(itemData);
        await itemsPage.clickToImportCSVFile();
        await CRMBasePage.clickByMenuText(Menu.SALES);
        await CRMBasePage.clickByMenuName(Menu.ITEMS);
        await itemsPage.searchAndVerifyItems(itemData);
        await itemsPage.deleteImportedItem(itemData);
    });
});
