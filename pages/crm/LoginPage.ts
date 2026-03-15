import { expect } from '@playwright/test';
import { Menu } from '../../constants/crm';
import { CRMBasePage } from './CRMBasePage';

export class LoginPage extends CRMBasePage {

    get headerLogin() {
        return this.page.getByRole('heading', { name: 'Login' });
    }

    get inputEmail() {
        return this.page.locator('#email');
    }

    get inputPassword() {
        return this.page.locator('#password');
    }

    get checkboxRememberMe() {
        return this.page.locator('#remember');
    }

    get buttonLogin() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get alertErrorMessage() {
        return this.page.locator('.alert.alert-danger');
    }

    async loginCRM(email: string, password: string) {
        await this.goto(process.env.BASE_URL!);
        await expect(this.headerLogin).toBeVisible();
        await this.type(this.inputEmail, email);
        await this.type(this.inputPassword, password);
        await this.checkboxRememberMe.check();
        await this.click(this.buttonLogin);
    }

    async verifyLoginSuccess() {
        await expect(this.getValue(Menu.DASHBOARD)).toBeVisible();
        await expect(this.page).not.toHaveURL(/authentication/);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await expect(this.page).toHaveURL(/authentication/);
        await expect(this.alertErrorMessage).toBeVisible();
        await expect(this.alertErrorMessage).toHaveText(expectedMessage);
    }

}