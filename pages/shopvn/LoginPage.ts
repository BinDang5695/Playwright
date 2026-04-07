import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';

export class LoginPage extends ShopvnBasePage {

    private get headerLogin() {
        return this.page.getByRole('heading', { name: 'ShopVN', level: 1 })
    }

    private get inputEmail() {
        return this.page.getByTestId('login-username')
    }

    private get inputPassword() {
        return this.page.getByTestId('login-password')
    }

    private get buttonLogin() {
        return this.page.getByTestId('login-submit')
    }

    private get alertErrorMessage() {
        return this.page.getByRole('alert')
    }

    async loginShopVN(email: string, password: string) {
        await this.page.goto(process.env.BASE_URL!);
        await expect(this.headerLogin).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.buttonLogin.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).not.toHaveURL(/login/);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await expect(this.page).toHaveURL(/login/);
        await expect(this.alertErrorMessage).toBeVisible();
        await expect(this.alertErrorMessage).toHaveText(expectedMessage);
    }
}