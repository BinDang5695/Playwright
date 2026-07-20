import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
import { Message } from '@constants/crm';
import { itemData } from '@data/ui/item.data';

test.describe.serial('Admin - Item Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Sales > Items', async () => {
            await BasePage.clickByMenuText(Menu.SALES);
            await BasePage.clickByMenuName(Menu.ITEMS);
        });
    });

    test('[ITEM_001] Import items successfully', async ({ itemsPage }) => {

        await test.step('Open the Import Items dialog', async () => {
            await itemsPage.clickButtonImportItems();
        });

        await test.step('Upload the CSV file', async () => {
            await itemsPage.importCSVFile(itemData);
        });

        await test.step('Import the items', async () => {
            await itemsPage.clickToImportCSVFile();
        });
    });

    test('[ITEM_002] Verify imported item', async ({ itemsPage }) => {

        await test.step('Search for the imported item', async () => {
            await itemsPage.searchItems(itemData);
        });

        await test.step('Verify the imported item is displayed correctly', async () => {
            await itemsPage.verifyItems(itemData);
        });
    });

    test('[ITEM_003] Delete imported item', async ({ BasePage, itemsPage }) => {

        await test.step('Search for the imported item', async () => {
            await itemsPage.searchItems(itemData);
        });

        await test.step('Hover to expense', async () => {
            await itemsPage.hoverToItem(itemData);
        });

        await test.step('Delete the imported item', async () => {
            await itemsPage.deleteRecordAfterHover();
        });

        await test.step('Search for the delete imported item', async () => {
            await itemsPage.searchItems(itemData);
        });

        await test.step('Verify the imported item is deleted successfully', async () => {
            await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
        });
    });

});