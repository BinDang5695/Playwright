import { expect } from '@playwright/test';
import { CMSBasePage } from '@pages/cms/CMSBasePage';

export class LoginPage extends CMSBasePage {

    private get headerLogin() {
        return this.page.locator("//p[normalize-space()='Login to your account.']")
    }

    private get inputEmail() {
        return this.page.locator("#email")
    }

    private get inputPassword() {
        return this.page.locator("#password")
    }
    
    private get checkboxRememberMe() {
        return this.page.locator("//span[normalize-space()='Remember Me']")
    }

    private get buttonLogin() {
        return this.page.locator("//button[normalize-space()='Login']")
    }

    private get alertErrorMessage() {
        return this.page.locator("//span[@data-notify='message']")
    }

    async loginCMS(email: string, password: string) {
        await this.page.goto(process.env.BASE_URL!);
        await expect(this.headerLogin).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.checkboxRememberMe.click();
        await this.buttonLogin.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).not.toHaveURL(/login/);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await expect(this.page).toHaveURL(/login/);
        await expect(this.alertErrorMessage).toHaveText(expectedMessage);
    }
}
