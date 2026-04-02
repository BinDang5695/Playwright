import { Locator, expect } from '@playwright/test';
import BasePage from '@pages/crm/BasePage';
import { Delay } from '@constants/crm';
import path from 'path';

export class CRMBasePage extends BasePage {

  getBySpanText(text: string | number) {
    return this.page.locator(`//span[normalize-space()='${text}']`);
  }

  async clickByMenuName(text: string | number) {
    await this.click(this.getBySpanText(text));
  }

  getByMenuText(text: string | number) {
    return this.page.locator(`//span[@class='menu-text'][normalize-space()='${text}']`);
  }

  async clickByMenuText(text: string | number) {
    await this.click(this.getByMenuText(text));
  }

  async clickByLinkText(link: string | number) {
    await this.click(this.getLinkByText(link));
  }

  getLinkByText(text: string | number): Locator {
    return this.page.locator(`//a[normalize-space()='${text}']`);
  }

  getDropdownByDataId(text: string | number): Locator {
    return this.page.locator(`//button[@data-id='${text}']`);
  }

  getDropdownSearchByIndex(index: number): Locator {
    return this.page.locator(`//input[@aria-controls='bs-select-${index}']`);
  }

  async selectDropdownWithSearch(name: string | number, searchIndex: number, value: string, searchValue?: string) {
    await this.click(this.getDropdownByDataId(name));
    await this.type(this.getDropdownSearchByIndex(searchIndex), searchValue ?? value, Delay.ONE_HUNDRED_MILLISECONDS);
    await this.click(this.getBySpanText(value).first());
  }

  async selectDropdownBySpanText(name: string | number, value: string) {
    await this.click(this.getDropdownByDataId(name));
    await this.click(this.getBySpanText(value).first());
  }

  async selectDropdownByType(name: string | number, value: string) {
    await this.click(this.getDropdownByDataId(name));
    await this.click(this.getSpanByTextClass(value).first());
  }

  getSpanByTextClass(value: string | number): Locator {
    return this.page.locator(`//span[@class='text'][normalize-space()='${value}']`);
  }

  getAlert(): Locator {
    return this.page.locator(`//span[@class='alert-title']`);
  }

  getNoData(): Locator {
    return this.page.locator(`//td[@class='dataTables_empty']`);
  }

  getbuttonCloseAlert(): Locator {
    return this.page.locator(`//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']`);
  }

  getFile(): Locator {
    return this.page.locator(`input[type="file"]`);
  }

  getButtonDelete(): Locator {
    return this.page.locator(`//a[@class='text-danger _delete']`);
  }

  async attachFile(relativeFilePath: string) {
    const absoluteFilePath = path.resolve(relativeFilePath);
    await this.getFile().setInputFiles(absoluteFilePath);
    await expect(this.page.locator('.dz-preview'));
  }

  get buttonView() {
    return this.page.locator("//a[normalize-space()='View']");
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

  get buttonConfirm() {
    return this.page.locator("//a[normalize-space()='Confirm']");
  }

  get closePopUp() {
    return this.page.locator("//div[contains(@class,'modal') and contains(@class,'in')]//div[contains(@class,'modal-header')]/button[@aria-label='Close']");
  }

  get editorBody() {
    return this.page.frameLocator('#article-form iframe#description_ifr').locator('#tinymce');
  }

}




