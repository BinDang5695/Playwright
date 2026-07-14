import { test } from '@fixtures/ui.fixture';
import { getInvalidLoginCases } from '@data/ui/login.data';
import { ROLES } from '@constants/crm';

for (const role of ROLES) {

    test.describe.serial(`${role} - Login Test Suite`, () => {

        for (const item of getInvalidLoginCases(role)) {

            test(`[LOGIN_001] ${item.name}`, async ({ guestLoginPage }) => {

                await test.step('Enter invalid username and password', async () => {

                    await guestLoginPage.loginCRM(
                        item.email,
                        item.password
                    );

                });

                await test.step('Verify login failed', async () => {

                    await guestLoginPage.verifyLoginFail(
                        item.message
                    );

                });
            });
        }
    });
}