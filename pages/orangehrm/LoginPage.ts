import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage{

    private headerLogin = () => this.page.locator("//h5[normalize-space()='Login']");
    private inputUsername = () => this.page.locator("//input[@placeholder='Username']");
    private inputPassword = () => this.page.locator("//input[@placeholder='Password']");
    private buttonLogin = () => this.page.locator("//button[normalize-space()='Login']");
    private alertErrorMessage = () => this.page.locator("//span[@data-notify='message']");

    async loginHRM(username: string, password: string) {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await expect(this.headerLogin()).toBeVisible();
        await this.inputUsername().fill(username);
        await this.inputPassword().fill(password);
        await this.clickWithRetry(this.buttonLogin());

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
