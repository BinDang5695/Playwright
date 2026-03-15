import { Locator } from '@playwright/test';
import BasePage from './BasePage';
import { Delay } from '@constants/crm';

export class CRMBasePage extends BasePage {

  getValue(value: string | number) {
    return this.page.locator(`//span[normalize-space()='${value}']`);
  }

  async clickValue(value: string | number) {
    await this.click(this.getValue(value));
  }

  getTab(tabName: string) {
    return this.page.getByRole('link', { name: tabName });
  }

  getButtonByText(text: string | number): Locator {
    return this.page.locator(`//button[normalize-space()='${text}']`);
  }

  getLinkByText(text: string): Locator {
    return this.page.locator(`//a[normalize-space()='${text}']`);
  }

  getDropdown(name: string | number): Locator {
    return this.page.locator(`//button[@data-id='${name}']`);
  }

  getDropdownSearch(index: number): Locator {
    return this.page.locator(`//input[@aria-controls='bs-select-${index}']`);
  }

  async selectDropdown(name: string | number, searchIndex: number, value: string) {
    await this.click(this.getDropdown(name));
    await this.type(this.getDropdownSearch(searchIndex), value, Delay.ONE_HUNDRED_MILLISECONDS);
    await this.click(this.getValue(value));
  }

  getInputAriaControls(inputAriaControls: string): Locator {
    return this.page.locator(`//input[@aria-controls='${inputAriaControls}']`);
  }

  getInputValue(inputValue: string | number): Locator {
    return this.page.locator(`//input[@name='${inputValue}']`);
  }

  getType(value: string | number): Locator {
    return this.page.locator(`//span[@class='text'][normalize-space()='${value}']`);
  }

  getButton(value: string | number): Locator {
    return this.page.locator(`//div[contains(@class,'btn')]//button[@type='${value}']`);
  }

  getTextArea(value: string | number): Locator {
    return this.page.locator(`//form[@id='contract-form']//textarea[@id='${value}']`);
  }

  getText(value: string | number): Locator {
    return this.page.locator(`//div[contains(text(),'${value}')]`);
  }

  getAlert(): Locator {
    return this.page.locator(`//span[@class='alert-title']`);
  }

  getNoData(value: string | number): Locator {
    return this.page.locator(`.dataTables_empty`, { hasText: `${value}` });
  }

  getCloseAlert(): Locator {
    return this.page.locator(`//button[@data-dismiss='alert']`);
  }

  getInputById(id: string) {
    return this.page.locator(`#${id}`);
  }

  formatCurrency(value: string | number): string {
    return Number(value).toFixed(2);
  }

  async verifyCurrency(locator: Locator, value: string | number) {
    await this.verifyValue(locator, this.formatCurrency(value));
  }
  
}
