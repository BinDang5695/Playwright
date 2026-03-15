import test from "@playwright/test";
import OrderComputerFlow from "../../../test_flows/computer/OrderComputerFlow";
import { cheapComputerData } from "../../../test_data/computer/CheapComputerData";
import { standardComputerData } from "../../../test_data/computer/StandardComputerData";
import { expensiveComputerData } from "../../../test_data/computer/ExpensiveComputerData";

test.describe('Computer Tests', () => {
    test(`Cheap Computer Component Test`, { tag: ["@authen", "@smoke"] }, async ({ page }) => {
        await page.goto("/build-your-cheap-own-computer");
        const compTestFlow = new OrderComputerFlow(page, cheapComputerData);
        await compTestFlow.buildComputerSpecAndAddToCart();
        await compTestFlow.verifyShoppingCart();
        await compTestFlow.agreeTOSAndCheckout();
        await compTestFlow.inputBillingAddress();
        await compTestFlow.inputShippingAddress();
        await compTestFlow.selectShippingMethod();
        await compTestFlow.selectPaymentMethod();
        await compTestFlow.inputPaymentInformation();
        await compTestFlow.confirmOrder();
    })

    test(`Standard Computer Component Test`, { tag: "@buyProduct" }, async ({ page }) => {
        await page.goto("/build-your-own-computer");
        const compTestFlow = new OrderComputerFlow(page, standardComputerData);
        await compTestFlow.buildComputerSpecAndAddToCart();
        await compTestFlow.verifyShoppingCart();
        await compTestFlow.agreeTOSAndCheckout();
        await compTestFlow.inputBillingAddress();
        await compTestFlow.inputShippingAddress();
        await compTestFlow.selectShippingMethod();
        await compTestFlow.selectPaymentMethod();
        await compTestFlow.inputPaymentInformation();
        await compTestFlow.confirmOrder();
    })

    test(`Expensive Computer Component Test`, async ({ page }) => {
        await page.goto("/build-your-own-expensive-computer-2");
        const compTestFlow = new OrderComputerFlow(page, expensiveComputerData);
        await compTestFlow.buildComputerSpecAndAddToCart();
        await compTestFlow.verifyShoppingCart();
        await compTestFlow.agreeTOSAndCheckout();
        await compTestFlow.inputBillingAddress();
        await compTestFlow.inputShippingAddress();
        await compTestFlow.selectShippingMethod();
        await compTestFlow.selectPaymentMethod();
        await compTestFlow.inputPaymentInformation();
        await compTestFlow.confirmOrder();
    })
});