import { test } from '@fixtures/shopvn.fixture';
import { productsData } from '@data/shopvn/products.data';
import { ENV } from '@utils/env';

test.describe.serial('ShopVN Test Suite', () => {

    test('Add new Product successfully', async ({ HomePage, LoginPage, ProductsPage }) => {
        const role = process.env.ROLE;
        test.skip(role !== 'admin')
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.clickLinkManageProducts();
        await ProductsPage.addNewProduct(productsData);
        await HomePage.clickLinkManageProducts();
        await ProductsPage.verifyAddedProduct(productsData);
    });

    test('Delete added Product successfully', async ({ HomePage, LoginPage, ProductsPage }) => {
        const role = process.env.ROLE;
        test.skip(role !== 'admin')
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.clickLinkManageProducts();
        await ProductsPage.deleteAddedProduct();
    });
});


