import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export class BasePage {

  constructor(public page: Page) { }

  async expectEqual(actual: number, expected: number, message?: string) {
    if (message) {
      console.log(message);
    }
    await expect(actual).toBe(expected);
  }

  async acceptAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async dismissAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
  }

  async type(locator: Locator, text: string, delay?: number) {
    await expect(locator).toBeVisible();

    if (delay) {
      await locator.pressSequentially(text, { delay });
    } else {
      await locator.fill(text);
    }
  }

  normalizeText(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toUpperCase();
  }

  get getAlert() {
    return this.page.locator(`//span[@class='alert-title']`);
  }

  get getNoData() {
    return this.page.locator(`//td[@class='dataTables_empty']`);
  }

  get getbuttonCloseAlert() {
    return this.page.locator(`//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']`);
  }

  get getFile() {
    return this.page.locator(`input[type="file"]`);
  }

  get buttonView() {
    return this.page.locator("//a[normalize-space()='View']");
  }

  get buttonEdit() {
    return this.page.locator("//div[@class='row-options']//a[contains(text(),'Edit')]");
  }

  get buttonDelete() {
    return this.page.locator("//a[normalize-space()='Delete']");
  }

  get checkboxSelectAll() {
    return this.page.locator(".checkbox.mass_select_all_wrap:visible");
  }

  get checkboxSelectEach() {
    return this.page.locator("//div[@class='checkbox']//input[@type='checkbox']");
  }

  get buttonBulkActions() {
    return this.page.locator("//span[normalize-space()='Bulk Actions']");
  }

  get checkboxMassDelete() {
    return this.page.locator("//label[normalize-space()='Mass Delete']");
  }

  get checkboxMarkAsLost() {
    return this.page.locator("//label[normalize-space()='Mark as lost']");
  }

  get buttonConfirm() {
    return this.page.locator("//a[normalize-space()='Confirm']");
  }

  get closePopUp() {
    return this.page.locator("//div[contains(@class,'modal') and contains(@class,'in')]//div[contains(@class,'modal-header')]/button[@aria-label='Close']");
  }

  get editorBody() {
    return this.page.frameLocator('#article-form iframe#description_ifr').locator('#tinymce');
  }

  getLinkByText(text: string) {
    return this.page.locator(`//a[normalize-space()='${text}']`);
  }

  getByMenuText(text: string) {
    return this.page.locator(`//span[@class='menu-text'][normalize-space()='${text}']`);
  }

  getBySpanText(text: string) {
    return this.page.locator(`//span[normalize-space()='${text}']`);
  }

  getDropdownByDataId(text: string | number) {
    return this.page.locator(`//button[@data-id='${text}']`);
  }

  getDropdownSearchByIndex(index: number) {
    return this.page.locator(`//input[@aria-controls='bs-select-${index}']`);
  }

  getSpanByTextClass(value: string | number) {
    return this.page.locator(`//span[@class='text'][normalize-space()='${value}']`);
  }

  async clickByMenuName(text: string) {
    await this.getBySpanText(text).click();
  }

  async clickByMenuText(text: string) {
    await this.getByMenuText(text).click();
  }

  async clickByLinkText(link: string) {
    await this.getLinkByText(link).click();
  }

  async deleteRecord() {
    await this.acceptAlert();
    await this.buttonDelete.click();
    await this.getbuttonCloseAlert.click();
  }

  async clickButtonView() {
    await this.buttonView.click();
  }

  async clickButtonEdit() {
    await this.buttonEdit.click();
  }

  async attachFile(relativeFilePath: string) {
    const absoluteFilePath = path.resolve(relativeFilePath);
    await this.getFile.setInputFiles(absoluteFilePath);
    await expect(this.page.locator('.dz-preview')).toBeVisible();
  }

  async selectDropdownWithSearch(name: string | number, searchIndex: number, value: string, searchValue?: string) {
    await this.getDropdownByDataId(name).click();
    await this.type(this.getDropdownSearchByIndex(searchIndex), searchValue ?? value, 100);
    await this.getBySpanText(value).first().click();
  }

  async selectDropdownBySpanText(name: string | number, value: string) {
    await this.getDropdownByDataId(name).click();
    await this.getBySpanText(value).first().click();
  }

  async selectDropdownByType(name: string | number, value: string) {
    await this.getDropdownByDataId(name).click();
    await this.getSpanByTextClass(value).first().click();
  }

  async verifyNoItem(expectedMessage: string) {
    await expect(this.getNoData).toHaveText(expectedMessage);
  }

}

