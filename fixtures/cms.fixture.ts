import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/cms/LoginPage';
import { ProductsPage } from '@pages/cms/ProductsPage';
import { CategoryPage } from '@pages/cms/CategoryPage';
import { CMSBasePage } from '@pages/cms/CMSBasePage';

export type PageFixtureType = {
    authenticatedPage: Page;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    categoryPage: CategoryPage;
    CMSBasePage: CMSBasePage;
};

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ authenticatedPage }: { authenticatedPage: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(authenticatedPage));
    };
}

export const test = baseTest.extend<PageFixtureType>({

    authenticatedPage: async ({ page }, use) => {
        await page.goto(process.env.BASE_URL!);
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    CMSBasePage: createPageFixture(CMSBasePage),
    productsPage: createPageFixture(ProductsPage),
    categoryPage: createPageFixture(CategoryPage),

});

export { expect };