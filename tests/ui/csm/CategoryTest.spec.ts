import { test } from './BaseTest';

test.describe.serial('CSM Category CRUD', () => {

    test('Add new Category', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuCategory();
        await pages.categoryPage().addNewCategory();
        await pages.categoryPage().checkAddedCategory();
    });

    test('Update added Category', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuCategory();
        await pages.categoryPage().updateAddedCategory();
        await pages.categoryPage().checkUpdatedCategory();
    });

    test('Delete Category', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuCategory();
        await pages.categoryPage().deleteCategory();
    });
});
