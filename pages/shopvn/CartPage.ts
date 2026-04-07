import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { Payment } from '@models/types/shopvn/payment.model';

export class CartPage extends ShopvnBasePage {

    private get headerCart() {
        return this.page.locator("//h1[@class='cart-title']")
    }

    private get textTotal() {
        return this.page.locator("//span[contains(text(),'Tổng cộng')]")
    }

    amountTotal(totalAmount: string) {
        return this.page.locator(`//div[@class='summary-total']//span[contains(text(),'${totalAmount}')]`)
    }

    private get btnPayment() {
        return this.page.getByRole('button', { name: 'Thanh toán ngay' })
    }

    async verifyAddedItemToCart(data: Payment) {
        await expect(this.headerCart).toHaveText('Giỏ hàng của bạn (1)');
        await expect(this.textTotal).toHaveText('Tổng cộng');
        await expect(this.amountTotal(data.totalAmount)).toHaveText(data.totalAmount);
    }

    async clickBtnPayment() {
        await this.btnPayment.click();
    }

}