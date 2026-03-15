import { Page } from "@playwright/test";
import BasePage from "./crm/BasePage";
import BillingAddressComponent from "../components/checkout/BillingAddressComponent";
import ShippingAdressComponent from "../components/checkout/ShippingAdressComponent";
import ShippingMethodComponent from "../components/checkout/ShippingMethodComponent";
import PaymentMethodComponent from "../components/checkout/PaymentMethodComponent";
import ConfirmOrderComponent from "../components/checkout/ConfirmOrderComponent";
import PaymentInformationComponent from "../components/checkout/PaymentInformationComponent";

export default class CheckoutPage extends BasePage{

    constructor(page: Page){
        super(page);
    }

    public billingAddressComponent(): BillingAddressComponent{
        return new BillingAddressComponent(this.page.locator(BillingAddressComponent.SELECTOR));
    }

    public shippingAdressComponent(): ShippingAdressComponent{
        return new ShippingAdressComponent(this.page.locator(ShippingAdressComponent.SELECTOR));
    }

    public shippingMethodComponent(): ShippingMethodComponent{
        return new ShippingMethodComponent(this.page.locator(ShippingMethodComponent.SELECTOR));
    }

    public paymentMethodComponent(): PaymentMethodComponent{
        return new PaymentMethodComponent(this.page.locator(PaymentMethodComponent.SELECTOR));
    }

    public paymentInformationComponent(): PaymentInformationComponent{
        return new PaymentInformationComponent(this.page.locator(PaymentInformationComponent.SELECTOR));
    }

    public confirmOrderComponent(): ConfirmOrderComponent{
        return new ConfirmOrderComponent(this.page.locator(ConfirmOrderComponent.SELECTOR));
    }

}