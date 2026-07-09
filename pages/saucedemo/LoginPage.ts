import { expect } from '@playwright/test';
import { SaucedemoBasePage } from '@pages/saucedemo/BasePage';

type LoginData = {
  email?: string;
  password?: string;
};

export class LoginPage extends SaucedemoBasePage {

  private get inputEmail() {
    return this.page.locator("//input[@id='user-name']")
  }

  private get inputPassword() {
    return this.page.locator("//input[@id='password']")
  }

  private get buttonLogin() {
    return this.page.locator("//input[@id='login-button']")
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async fillSubmitLogin(data: LoginData) {

    if (data.email) {
      await this.inputEmail.fill(data.email ?? "");
    }

    if (data.password) {
      await this.inputPassword.fill(data.password ?? "");
    }
    await this.buttonLogin.click();
  }

  async verifyError(expectedError: string) {

    await expect(this.errorMessage)
      .toHaveText(expectedError);

  }

}