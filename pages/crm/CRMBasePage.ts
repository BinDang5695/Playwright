import { Locator, FrameLocator, Page } from '@playwright/test';
import BasePage from './BasePage';
import { Delay } from '@constants/crm';
import path from 'path';

export class CRMBasePage extends BasePage {

  getValue(value: string | number) {
    return this.page.locator(`//span[normalize-space()='${value}']`);
  }

  getValue1(value: string | number) {
    return this.page.locator(`//span[contains(normalize-space(),'${value}')]`);
  }

  getValue2(value: string | number) {
    return this.page.locator(`//span[@class='menu-text'][normalize-space()='${value}']`);
  }

  getValue3(value: string | number) {
    return this.page.locator(`//h1[normalize-space()='${value}']`);
  }

  getValue4(): Locator {
    return this.page.locator(`.alert.alert-danger`);
  }

  getValue5(value: string | number): Locator {
    return this.page.locator(`//b[normalize-space()='${value}']`);
  }

  getValue6(value: string | number, page?: Page) {
    const targetPage = page || this.page;
    return targetPage.locator(`//h4[normalize-space()='${value}']`);
  }

  getValue7(value: string | number, page?: Page) {
    const targetPage = page || this.page;
    return targetPage.locator(`//p[normalize-space()='${value}']`);
  }

  getValue8(value: string) {
    return this.page.locator(`//dt[normalize-space()='${value}']`);
  }

  getValue9(value: string) {
    return this.page.locator(`//dd[normalize-space()='${value}']`);
  }


  async waitForElementInTab(tab: Page, selector: string, timeout: number = 15000) {
  await tab.waitForSelector(selector, { state: 'visible', timeout });
}

  async clickValue(value: string | number) {
    await this.click(this.getValue(value));
  }

  async clickValue2(value: string | number) {
    await this.click(this.getValue2(value));
  }

  async clickValue3(value: string | number) {
    await this.click(this.getLinkByText(value));
  }

  getTab(tabName: string) {
    return this.page.getByRole('link', { name: tabName });
  }

  getTab2(text: string) {
    return this.page.locator(`//h4[@id='${text}']`);
  }

  getTab3(text: string) {
    return this.page.locator(`//h3[@id='${text}']`);
  }

  getTab4(text: string) {
    return this.page.locator(`//h4[contains(@class,'${text} ')]`);
  }

  getTab5(text: string | number) {
    return this.page.locator(`//ul[@data-col-status-id='${text}']//h4[contains(.,'No Tasks Found')]`);
  }

  getTab6(text: string | number) {
    return this.page.locator(`//ul[@data-task-status-id='${text}']`);
  }
  
getButtonByText(text: string | number, page?: Page): Locator {
  const targetPage = page || this.page;
  return targetPage.locator(`//button[normalize-space()='${text}']`);
}

  getButtonText(text: string | number): Locator {
    return this.page.locator(`//button[contains(@type,'button')][normalize-space()='${text}']`);
  }

  getButtonByClass(text: string | number): Locator {
    return this.page.locator(`//button[contains(@class,'${text}')]`);
  }

  getButtonByP(text: string | number): Locator {
    return this.page.locator(`//p[contains(@class,'${text}')]`);
  }

  getButtonById(text: string | number): Locator {
    return this.page.locator(`//button[@id='${text}']`);
  }

  getButtonByTitle(text: string | number): Locator {
    return this.page.locator(`//button[@title='${text}']`);
  }

  getDropdownSelect(text: string | number): Locator {
    return this.page.locator(`//select[@name='${text}']`);
  }

  getLinkByText(text: string | number): Locator {
    return this.page.locator(`//a[normalize-space()='${text}']`);
  }

  getDropdown(name: string | number): Locator {
    return this.page.locator(`//button[@data-id='${name}']`);
  }

  getDropdownSearch(index: number): Locator {
    return this.page.locator(`//input[@aria-controls='bs-select-${index}']`);
  }

  async selectDropdown(name: string | number, searchIndex: number, value: string, searchValue?: string) {
    await this.click(this.getDropdown(name));
    await this.type(this.getDropdownSearch(searchIndex), searchValue ?? value, Delay.ONE_HUNDRED_MILLISECONDS);
    await this.click(this.getValue(value).first());
  }

  async selectDropdownNotSearch(name: string | number, value: string) {
    await this.click(this.getDropdown(name));
    await this.click(this.getValue(value).first());
  }

  async selectDropdownNotSearch2(name: string | number, value: string) {
    await this.click(this.getDropdown(name));
    await this.click(this.getType(value).first());
  }

  getInputAriaControls(inputAriaControls: string): Locator {
    return this.page.locator(`//input[@aria-controls='${inputAriaControls}']`);
  }

  getInputValue(inputValue: string | number): Locator {
    return this.page.locator(`//input[@name='${inputValue}']`);
  }

  getInputFile(inputValue: string | number): Locator {
    return this.page.locator(`input[type='${inputValue}']`);
  }

  getType(value: string | number): Locator {
    return this.page.locator(`//span[@class='text'][normalize-space()='${value}']`);
  }

  getButton(value: string | number): Locator {
    return this.page.locator(`//div[contains(@class,'btn')]//button[@type='${value}']`);
  }

  getButton2(value: string | number): Locator {
    return this.page.locator(`//div[@class='btn-bottom-toolbar text-right']//button[@type='submit'][normalize-space()='${value}']`);
  }

  getButton3(value: string | number): Locator {
    return this.page.locator(`//div[@class='panel-footer text-right']//button[@type='submit'][normalize-space()='${value}']`);
  }

getButton4(value: string | number, page?: Page): Locator {
  const targetPage = page || this.page;
  return targetPage.locator(`//div[@class='${value}']`);
}

  getButton5(value: string | number): Locator {
    return this.page.locator(`//div[contains(@class,'${value}')]`);
  }

  getStatus(value: string | number): Locator {
    return this.page.locator(`//div[@class='panel-heading'][contains(text(),'${value}')]`);
  }

  getTextArea(value: string | number): Locator {
    return this.page.locator(`//form[@id='contract-form']//textarea[@id='${value}']`);
  }

  getText(value: string | number): Locator {
    return this.page.locator(`//div[contains(text(),'${value}')]`);
  }

  getAText(value: string | number): Locator {
    return this.page.locator(`//a[contains(text(),'${value}')]`);
  }

  getBText(value: string | number): Locator {
    return this.page.locator(`//a[contains(@class,'${value}')]`);
  }

  getCText(value: string | number): Locator {
    return this.page.locator(`//a[contains(@class,'delete')]//i[contains(@class,'${value}')]`);
  }

  getTDText(value: string | number): Locator {
    return this.page.locator(`//td[normalize-space()='${value}']`);
  }

  getTDText2(columnIndex: number, value: string | number): Locator {
    return this.page.locator(`//td[${columnIndex}]//span[normalize-space()='${value}']`);
  }

  getDivText(value: string | number): Locator {
    return this.page.locator(`//div[@id='${value}']`);
  }

  getTableLink(tdIndex: number, hrefValue: string): Locator {
    return this.page.locator(`//td[${tdIndex}]//a[contains(@href,'${hrefValue}')]`);
  }

  getDivId(value: string | number): Locator {
    return this.page.locator(`//div[normalize-space()='${value}']`);
  }

  getAlert(): Locator {
    return this.page.locator(`//span[@class='alert-title']`);
  }

  getNoData(): Locator {
    return this.page.locator(`//td[@class='dataTables_empty']`);
  }

  getCloseAlert(): Locator {
    return this.page.locator(`//button[@data-dismiss='alert']`);
  }

  getInputById(id: string) {
    return this.page.locator(`#${id}`);
  }

  getInputByName(name: string) {
    return this.page.locator(`input[name='${name}']`);
  }

  getLabel(value: string | number): Locator {
    return this.page.locator(`//label[@for='${value}']`);
  }

  getLabelText(value: string | number): Locator {
    return this.page.locator(`//label[normalize-space()='${value}']`);
  }

  getTable(value: string | number): Locator {
    return this.page.locator(`//tr[@class='has-row-options odd']//a[contains(text(),'${value}']`);
  }

  getTable2(value: string | number, page?: Page): Locator {
    const targetPage = page || this.page;
    return targetPage.locator(`//tr[contains(@class,'odd')]//a[contains(text(),'${value}')]`);
  }

  getOption(value: string | number): Locator {
    return this.page.locator(`//span[.='${value}']`);
  }

  getToogle(value: string | number): Locator {
    return this.page.locator(`//li[@data-title='${value}']`);
  }

  getToogle2(value: string | number): Locator {
    return this.page.locator(`//a[@data-original-title='${value}']`);
  }

  getToogle3(value: string | number): Locator {
    return this.page.locator(`//a[@data-title='${value}']`);
  }

  getContainsClass(): Locator {
    return this.page.locator(`//a[@class='text-danger _delete']`);
  }

  getLi(value: string | number): Locator {
    return this.page.locator(`//i[contains(@class,'${value}')]`);
  }

  getTD(value: string | number): Locator {
    return this.page.locator(`//td[contains(@class,'${value}')]`);
  }

  getTDSpan(value: string | number): Locator {
    return this.page.locator(`//td//span[contains(@class,'${value}')]`);
  }

  getSpan(value: string | number): Locator {
    return this.page.locator(`//span[contains(@class,'trigger') and normalize-space()='${value}']`);
  }

  formatCurrency(value: string | number): string {
    return Number(value).toFixed(2);
  }

  async verifyCurrency(locator: Locator, value: string | number) {
    await this.verifyValue(locator, this.formatCurrency(value));
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
    await this.waitVisible(this.page.locator('.dz-preview'));
  }

  gettooltipContent(text: string): Locator {
    return this.page.locator('.tooltip-inner', { hasText: text });
  }

  getbuttonX(value: string | number): Locator {
    return this.page.locator(`//form[@id='contact-form']//button[@aria-label='${value}']`);
  }

  getTextArea2(value: string | number): Locator {
    return this.page.locator(`//textarea[@id='${value}']`);
  }

  getTotalCustomer(value: string | number): Locator {
    return this.page.locator(`//span[normalize-space()='${value}']/preceding-sibling::span`);
  }

  getErrorCompany(value: string | number): Locator {
    return this.page.locator(`//p[@id='${value}']`);
  }

  getCheckbox(value: string | number): Locator {
    return this.page.locator(`//div[@class='panel-body']//label[@for='disabled'][normalize-space()='${value}']`);
  }

  getCheckbox2(value: string | number): Locator {
    return this.page.locator(`//div[@class='col-md-6']//input[@id='${value}']`);
  }

  getCheckbox3(value: string | number): Locator {
    return this.page.locator(`//div[@class='popover-content']//ul//li//a[@href='#'][normalize-space()='${value}']`);
  }

  getCells(value: string | number): Locator {
    return this.page.locator(`//table//tbody/tr/td[${value}]`);
  }
  
  getFrameLocator(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  get iframeDescription() {
    return this.getFrameLocator('#article-form iframe#description_ifr');
  }

  get editorBody() {
    return this.iframeDescription.locator('#tinymce');
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


  
}




