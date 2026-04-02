import { test } from '@fixtures/cms.fixture';
import { categoryData } from '@data/cms/category.data';
import { Menu } from '@constants/crm';

test.describe.serial('CMS Category CRUD', () => {

    test('Add new Category', async ({ categoryPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.CATEGORY);
        await categoryPage.addNewCategory(categoryData);
        await categoryPage.checkAddedCategory(categoryData);
    });

    test('Update added Category', async ({ categoryPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.CATEGORY);
        await categoryPage.updateAddedCategory(categoryData);
        await categoryPage.checkUpdatedCategory(categoryData);
    });

    test('Delete Category', async ({ categoryPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.CATEGORY);
        await categoryPage.deleteCategory(categoryData);
    });
});
