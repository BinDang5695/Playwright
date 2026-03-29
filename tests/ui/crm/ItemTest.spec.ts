import { test } from './BaseTest';
import { Menu } from '@constants/crm';
import { itemData } from '@data/crm/item.data';

test.describe('CRM Test Suite', () => {

    test('Add new Item, verify and delete Item Successfully', async ({ itemsPage, CRMBasePage }) => {
        await CRMBasePage.clickValue2(Menu.SALES);
        await CRMBasePage.clickValue(Menu.ITEMS);
        await itemsPage.clickButtonImportItems();
        await itemsPage.importCSVFile(itemData);
        await itemsPage.clickToImportCSVFile();
        await CRMBasePage.clickValue2(Menu.SALES);
        await CRMBasePage.clickValue(Menu.ITEMS);
        await itemsPage.searchAndVerifyItems(itemData);
        await itemsPage.deleteImportedItem(itemData);
    });
});
