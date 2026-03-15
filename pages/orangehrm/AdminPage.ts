import { expect } from '@playwright/test';
import BasePage from './BasePage';

export default class AdminPage extends BasePage {

  private buttonAdd = () => this.page.locator("//button[normalize-space()='Add']");
  selectDropdownByLabel = async (label: string, option: string) => {
    await this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .locator('.oxd-select-text-input')
      .click();

    await this.page
      .locator('.oxd-select-dropdown')
      .locator('div[role="option"]', { hasText: option })
      .click();
  };

  private inputEmployeeName = () => this.page.locator("//input[@placeholder='Type for hints...']");
  private buttonSave = () => this.page.locator("//button[normalize-space()='Save']");

  inputByExactLabel = (label: string) =>
    this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText(label, { exact: true })
      })
      .locator('input');

  async clickButtonAdd() {
    await this.clickWithRetry(this.buttonAdd());
  }

  async clickButtonSave() {
    await this.clickWithRetry(this.buttonSave());
  }

  async fillAddUserForm(data: any) {

    if (data.userRole) {
      await this.selectDropdownByLabel('User Role', data.userRole);
    }

    if (data.employeeName) {
      await this.inputEmployeeName().fill(data.employeeName);
    }

    if (data.username) {
      await this.inputByExactLabel('Username').fill(data.username);
    }

    if (data.status) {
      await this.selectDropdownByLabel('Status', data.status);
    }

    if (data.password) {
      await this.inputByExactLabel('Password').fill(data.password);
    }

    if (data.confirmPassword) {
      await this.inputByExactLabel('Confirm Password').fill(data.confirmPassword);
    }
  }

  async verifyErrors(label: string, messages: string | string[]) {
    const errors = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: label })
      .locator('.oxd-input-field-error-message');

    const expectedMessages = Array.isArray(messages)
      ? messages
      : [messages];

    await expect(errors.first()).toBeVisible();

    const actualMessages = (await errors.allTextContents())
      .map(m => m.trim());

    for (const msg of expectedMessages) {
      expect(actualMessages).toContain(msg);
    }
  }

}
