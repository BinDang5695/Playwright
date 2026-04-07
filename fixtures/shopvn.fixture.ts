import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/shopvn/LoginPage';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { CartPage } from '@pages/shopvn/CartPage';
import { CheckoutPage } from '@pages/shopvn/CheckoutPage';
import { HomePage } from '@pages/shopvn/HomePage';
import { ProductsPage } from '@pages/shopvn/ProductsPage';
import { UsersPage } from '@pages/shopvn/UsersPage';

export type PageFixtureType = {
    LoginPage: LoginPage;
    ShopvnBasePage: ShopvnBasePage;
    CartPage: CartPage;
    CheckoutPage: CheckoutPage;
    HomePage: HomePage;
    ProductsPage: ProductsPage;
    UsersPage: UsersPage;
};

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ page }: { page: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(page));
    };
}

export const test = baseTest.extend<PageFixtureType>({

    LoginPage: createPageFixture(LoginPage),
    ShopvnBasePage: createPageFixture(ShopvnBasePage),
    CartPage: createPageFixture(CartPage),
    CheckoutPage: createPageFixture(CheckoutPage),
    HomePage: createPageFixture(HomePage),
    ProductsPage: createPageFixture(ProductsPage),
    UsersPage: createPageFixture(UsersPage),
});

export { expect };