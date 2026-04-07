import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { Payment } from '@models/types/shopvn/payment.model';

export class HomePage extends ShopvnBasePage {

    addToCart(productName: string) {
        return this.page.locator('.product-card').filter({ hasText: productName }).locator('button[class*="add-to-cart"]')
    }

    private get btnCart() {
        return this.page.locator("//button[@class='cart-btn']")
    }

    private get linkManageProducts() {
        return this.page.getByRole('button', { name: '⚙️ Quản lý SP' })
    }

    private get linkManageUsers() {
        return this.page.getByRole('button', { name: '👥 Quản lý User' })
    }

    async addItemToCart(data: Payment) {
        await this.addToCart(data.productName).click();
        await expect(this.addToCart(data.productName)).toHaveClass(/added/);
        await this.btnCart.click();
    }

    async clickLinkManageProducts() {
        await this.linkManageProducts.click();
    }

    async clickLinkManageUsers() {
        await this.linkManageUsers.click();
    }
}