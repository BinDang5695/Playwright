import { Page } from "@playwright/test";
import BasePage from "./crm/BasePage";
import CartItemRowComponent from "../components/shoppingCart/CartItemRowComponent";
import TotalsComponent from "../components/shoppingCart/TotalsComponent";

export default class ShoppingCartPage extends BasePage {

    constructor(page: Page){
        super(page);
    }

    public async cartItemRowCompList(): Promise<CartItemRowComponent[]>{
        const cartItemRowLocatorList = await this.page.locator(CartItemRowComponent.SELECTOR).all();
        return cartItemRowLocatorList.map(comp => new CartItemRowComponent(comp));
    }

    public totalsComponent(): TotalsComponent {
        return new TotalsComponent(this.page.locator(TotalsComponent.SELECTOR));
    }

}