import { ElementHandle, Page } from "@playwright/test";
import { TIMEOUT } from "../../constants/timeout";

export default class LoginPageMethod01 {

    // Scope for selector
    private usernameSel: string = '#username';
    private passwordSel: string = '#password';
    private loginBtnSel: string = 'button[type="submit"]';

    // Constructor
    constructor(private page: Page){
        this.page = page;
    }

    // Main interaction methods
    public async fillLoginForm(loginCreds: {username: string, password: string}): Promise<void>{
        await this.inputUsername(loginCreds.username);
        await this.inputPassword(loginCreds.password);
        await this.clickOnLoginBtn();
    }

    public async inputUsername(username: string): Promise<void>{
        const usernameLocator: ElementHandle = await this.page.waitForSelector(this.usernameSel, TIMEOUT.SECOND_15);
        await usernameLocator.fill(username);
    }

    public async inputPassword(password: string): Promise<void>{
        await this.page.locator(this.passwordSel).fill(password);
    }

    public async clickOnLoginBtn(): Promise<void>{
        await this.page.locator(this.loginBtnSel).click();
    }
}