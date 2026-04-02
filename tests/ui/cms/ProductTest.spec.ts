import { test } from '@fixtures/cms.fixture';
import { productData } from '@data/cms/product.data';
import { Menu } from '@constants/crm';

test.describe.serial('CMS Product CRUD', () => {

    test('Add new Product', async ({ productsPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.ALLPRODUCTS);
        await productsPage.addNewProduct(productData);
        await productsPage.verifyColors(productData);
    });

    test('Update added Product', async ({ productsPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.ALLPRODUCTS);
        await productsPage.addNewAndUpdateProduct(productData);
    });

    test('Delete Product', async ({ productsPage, CMSBasePage }) => {
        await CMSBasePage.clickByMenuName(Menu.PRODUCTS);
        await CMSBasePage.clickByMenuName(Menu.ALLPRODUCTS);
        await productsPage.deleteProduct(productData);
    });
});
