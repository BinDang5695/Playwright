import { test as baseTest, expect, Page } from '@playwright/test';
import { RegistrationPage } from '@pages/football/RegistrationPage';

export type PageFixtureType = {
    page: Page,
    registrationPage: RegistrationPage;
};

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ page }: { page: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(page));
    };
}

export const test = baseTest.extend<PageFixtureType>({
    registrationPage: createPageFixture(RegistrationPage),
});

export { expect };