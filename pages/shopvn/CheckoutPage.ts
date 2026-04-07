import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { Payment } from '@models/types/shopvn/payment.model';

export class CheckoutPage extends ShopvnBasePage {

    private get inputFullName() {
        return this.page.getByTestId('checkout-name')
    }

    private get inputPhoneNumber() {
        return this.page.getByTestId('checkout-phone')
    }

    private get inputAddress() {
        return this.page.getByTestId('checkout-address')
    }

    private get btnPlaceOrder() {
        return this.page.getByTestId('checkout-submit')
    }

    private get iconSuccess() {
        return this.page.locator("//div[@class='success-icon']")
    }

    private get placedSuccessfully() {
        return this.page.getByTestId('checkout-success-heading')
    }

    private get orderCode() {
        return this.page.locator('p:has-text("Mã đơn hàng") strong')
    }

    recipient(name: string) {
        return this.page.locator(`//strong[normalize-space()='${name}']`);
    }

    address(address: string) {
        return this.page.locator(`//p[normalize-space()='${address}']`);
    }

    private get paymentByCard() {
        return this.page.locator(`//span[contains(text(),'Thanh toán bằng thẻ (Stripe)')]`);
    }

    private get cashOnDelivery() {
        return this.page.locator("//strong[contains(text(),'💵 Tiền mặt khi nhận hàng')]");
    }

    private get card() {
        return this.page.locator("//strong[contains(text(),'💳 Thẻ')]");
    }

    successTotal(totalAmount: string) {
        return this.page.locator(`//p[normalize-space()='${totalAmount}']`);
    }

    private get btnContinueShopping() {
        return this.page.getByTestId('checkout-continue');
    }

    async inputRecipientInformation(data: Payment, payByCard = false) {
        await this.inputFullName.fill(data.recipientName);
        await this.inputPhoneNumber.fill(data.phoneNumber);
        await this.inputAddress.fill(data.address);
        if (payByCard) await this.paymentByCard.click();
    }

    async clickBtnPlaceOrder() {
        await this.btnPlaceOrder.click();
    }

    async verifyPaymentSuccess(data: Payment, payByCard = false) {
        await expect(this.iconSuccess).toBeVisible();
        await expect(this.placedSuccessfully).toHaveText('Đặt hàng thành công!');
        await expect(this.orderCode).toHaveText(/#[a-f0-9]+/);
        await expect(this.recipient(data.recipientName)).toHaveText(data.recipientName);
        await expect(this.address(data.address)).toHaveText(data.address);
        await expect(payByCard ? this.card : this.cashOnDelivery).toHaveText(payByCard ? '💳 Thẻ' : '💵 Tiền mặt khi nhận hàng');
        await expect(this.successTotal(data.totalAmount)).toHaveText(data.totalAmount);
    }

    async clickBtnContinueShopping() {
        await this.btnContinueShopping.click();
    }

}