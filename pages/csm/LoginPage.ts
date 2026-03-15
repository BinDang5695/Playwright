import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {

    private headerLogin = () => this.page.locator("//p[normalize-space()='Login to your account.']");
    private inputEmail = () => this.page.locator("//input[@id='email']");
    private inputPassword = () => this.page.locator("//input[@id='password']");
    private checkboxRememberMe = () => this.page.locator("//span[normalize-space()='Remember Me']");
    private buttonLogin = () => this.page.locator("//button[normalize-space()='Login']");
    private alertErrorMessage = () => this.page.locator("//span[@data-notify='message']");

    async loginCSM(email: string, password: string) {
        await this.page.goto('https://cms.anhtester.com/login');
        await expect(this.headerLogin()).toBeVisible();
        await this.inputEmail().fill(email);
        await this.inputPassword().fill(password);
        await this.checkboxRememberMe().click();
        await this.buttonLogin().click();
    }

    async verifyLoginSuccess() {
        await expect(this.menuDashboard).toBeVisible();
        await expect(this.page).not.toHaveURL(/login/);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await expect(this.page).toHaveURL(/login/);
        await expect(this.alertErrorMessage()).toBeVisible();
        await expect(this.alertErrorMessage()).toHaveText(expectedMessage);
    }
}
