import { expect } from '@playwright/test';
import { CRMBasePage } from '@pages/crm/CRMBasePage';

export class LoginPage extends CRMBasePage {

    private get headerLogin() {
        return this.page.getByRole('heading', { name: 'Login' })
    }

    private get inputEmail() {
        return this.page.getByLabel('Email')
    }

    private get inputPassword() {
        return this.page.getByLabel('Password')
    }

    private get checkboxRememberMe() {
        return this.page.getByRole('checkbox', { name: 'Remember me' })
    }

    private get buttonLogin() {return this.page.getByRole('button', { name: 'Login' })
    }

    private get alertErrorMessage() {
        return this.page.locator('.alert.alert-danger')
    }

    async loginCRM(email: string, password: string) {
        await this.page.goto(process.env.BASE_URL!);
        await expect(this.headerLogin).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.checkboxRememberMe.check();
        await this.buttonLogin.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).not.toHaveURL(/authentication/);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await expect(this.page).toHaveURL(/authentication/);
        await expect(this.alertErrorMessage).toBeVisible();
        await expect(this.alertErrorMessage).toHaveText(expectedMessage);
    }
}