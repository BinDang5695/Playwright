import { test } from './BaseTest';

test.describe.serial('CSM Product CRUD', () => {

    test('Add new Product', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuAllProduct();
        await pages.allProductsPage().addNewProduct();
        await pages.allProductsPage().verifyColors();
    });

    test('Update added Product', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuAllProduct();
        await pages.allProductsPage().addNewAndUpdateProduct();
    });

    test('Delete Product', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.basePage().clickMenuProducts();
        await pages.basePage().clickMenuAllProduct();
        await pages.allProductsPage().deleteProduct();
    });
});
