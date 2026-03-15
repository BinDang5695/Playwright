import { test } from './BaseTest';

test.describe('CSM Login', () => {

    test('Login Successfully', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456');
        await pages.loginPage().verifyLoginSuccess();
    });

    test('Login Failed With Invalid Email', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin123@example.com', '123456');
        await pages.loginPage().verifyLoginFail("Invalid login credentials");
    });

    test('Login Failed With Invalid Password', async ({ pages }) => {
        await pages.loginPage().loginCSM('admin@example.com', '123456789');
        await pages.loginPage().verifyLoginFail("Invalid login credentials");
    });
});
