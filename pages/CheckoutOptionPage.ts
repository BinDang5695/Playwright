import { Page } from "@playwright/test";
import BasePage from "./crm/BasePage";

export default class CheckoutOptionPage extends BasePage {

    private checkoutAsGuestBtnSel: string = 'input[class*="checkout-as-guest-button"]';

    constructor(page: Page){
        super(page);
    }

    public async checkOutAsGuest(): Promise<void>{
        await this.page.locator(this.checkoutAsGuestBtnSel).click();
    }


}