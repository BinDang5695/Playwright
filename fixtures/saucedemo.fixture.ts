import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/saucedemo/LoginPage';

export type PageFixtureType = {
    page: Page,
    loginPage: LoginPage;
};

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ page }: { page: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(page));
    };
}

export const test = baseTest.extend<PageFixtureType>({
    loginPage: createPageFixture(LoginPage),
});

export { expect };