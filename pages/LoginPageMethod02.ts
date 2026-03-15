import { ElementHandle, Locator, Page } from "@playwright/test";
import { TIMEOUT } from "../../constants/timeout";

export default class LoginPageMethod02 {

    // Scope for selector
    private usernameSel: string = '#username';
    private passwordSel: string = '#password';
    private loginBtnSel: string = 'button[type="submit"]';

    // Constructor
    constructor(private page: Page){
        this.page = page;
    }

    // Locators

    public usernameLocator(): Locator{
        return this.page.locator(this.usernameSel);
    }

    public passwordLocator(): Locator{
        return this.page.locator(this.passwordSel);
    }

    public loginBtnLocator(): Locator{
        return this.page.locator(this.loginBtnSel);
    }
}