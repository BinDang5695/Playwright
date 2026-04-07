import { test } from '@fixtures/shopvn.fixture';
import { ENV } from '@utils/env';
import { usersData } from '@data/shopvn/users.data';

test.describe.serial('ShopVN Test Suite', () => {

    test('Add new User successfully', async ({ HomePage, LoginPage, UsersPage }) => {
                const role = process.env.ROLE;
                test.skip(role !== 'admin')
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.clickLinkManageUsers();
        await UsersPage.addNewUser(usersData);
        await UsersPage.verifyAddedUser(usersData);
    });

    test('Delete added User successfully', async ({ HomePage, LoginPage, UsersPage }) => {
                const role = process.env.ROLE;
                test.skip(role !== 'admin')
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.clickLinkManageUsers();
        await UsersPage.deleteAddedUser();
    });
});


