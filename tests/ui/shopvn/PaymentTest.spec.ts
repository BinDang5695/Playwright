import { test } from '@fixtures/shopvn.fixture';
import { paymentData } from '@data/shopvn/payment.data';
import { ENV } from '@utils/env';

test.describe('ShopVN Test Suite', () => {

    test('Payment with cash on delivery successfully', async ({ CartPage, CheckoutPage, HomePage, LoginPage }) => {
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.addItemToCart(paymentData);
        await CartPage.verifyAddedItemToCart(paymentData);
        await CartPage.clickBtnPayment();
        await CheckoutPage.inputRecipientInformation(paymentData);
        await CheckoutPage.clickBtnPlaceOrder();
        await CheckoutPage.verifyPaymentSuccess(paymentData);
        await CheckoutPage.clickBtnContinueShopping();
    });

    test('Payment with card successfully', async ({ CartPage, CheckoutPage, HomePage, LoginPage }) => {
        await LoginPage.loginShopVN(ENV.username, ENV.password);
        await HomePage.addItemToCart(paymentData);
        await CartPage.verifyAddedItemToCart(paymentData);
        await CartPage.clickBtnPayment();
        await CheckoutPage.inputRecipientInformation(paymentData, true);
        await CheckoutPage.clickBtnPlaceOrder();
        await CheckoutPage.verifyPaymentSuccess(paymentData, true);
        await CheckoutPage.clickBtnContinueShopping();
    });
});


