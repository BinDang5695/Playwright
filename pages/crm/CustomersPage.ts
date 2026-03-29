import { CRMBasePage } from './CRMBasePage';
import { Button, Input, Option, Dropdown, Table, Number, Delay, Error } from '@constants/crm';
import { Customer } from '@models/types/customer.model'
import { CustomerDataDriven } from '@models/types/customerdriven.model'

export class CustomersPage extends CRMBasePage {

  get buttonAddNewCustomer() {
      return this.getLinkByText(Button.NEWCUSTOMER);
  }

  get searchInput() {
      return this.getInputAriaControls(Input.CLIENTS);
  }

  get inputCompany() {
      return this.getInputById(Input.COMPANY);
  }

  get inputVATNumber() {
      return this.getInputById(Input.VAT);
  }

  get inputPhoneNumber() {
      return this.getInputById(Input.PHONENUMBER);
  }

  get inputWebsite() {
      return this.getInputById(Input.WEBSITE);
  }

  get clickDropdown() {
      return this.getDropdown(Dropdown.GROUPS_IN);
  }

  get currencyDropdown() {
      return this.getDropdown(Dropdown.DEFAULT_CURRENCY);
  }

  get optionEuro() {
      return this.getValue1(Option.EURO);
  }
  
  get defaultLanguageDropdown() {
      return this.getDropdown(Dropdown.DEFAULT_LANGUAGE);
  }

  get optionVietnamese() {
      return this.getValue(Option.VIETNAMESE);
  }

  get inputAddress() {
      return this.getTextArea2(Input.ADDRESS);
  }

  get inputCity() {
      return this.getInputById(Input.CITY);
  }

  get inputState() {
      return this.getInputById(Input.STATE);
  }

  get inputZipCode() {
      return this.getInputById(Input.ZIP);
  }

  get countryDropdown() {
      return this.getDropdown(Dropdown.COUNTRY);
  }

  get buttonSave() {
      return this.getButtonByClass(Button.ONLY_SAVE);
  }

  dataInTable(company: string) {
      return this.getLinkByText(company);
  }

  get totalCustomer() {
      return this.getTotalCustomer(Table.TOTAL_CUSTOMERS);
  }

  get buttonDelete() {
      return this.getLinkByText(Button.DELETE);
  }

  get errorCompany() {
      return this.getErrorCompany(Error.COMPANY_ERROR);
  }  

  dataTable(company: string) {
      return this.getAText(company);
  }  

  async clickButtonAddNewCustomer() {
    await this.click(this.buttonAddNewCustomer);
  }

  async addNewCustomer(data: Customer) {
    await this.type(this.inputCompany, data.company);
    await this.type(this.inputVATNumber, data.vat);
    await this.type(this.inputPhoneNumber, data.phone);
    await this.type(this.inputWebsite, data.website);
    await this.selectDropdown(Dropdown.GROUPS_IN, Number.ONE, data.group);
    await this.click(this.clickDropdown);
    await this.click(this.currencyDropdown);
    await this.click(this.optionEuro);
    await this.click(this.defaultLanguageDropdown);
    await this.click(this.optionVietnamese);
    await this.type(this.inputAddress, data.address);
    await this.type(this.inputCity, data.city);
    await this.type(this.inputState, data.state);
    await this.type(this.inputZipCode, data.zip);
    await this.selectDropdown(Dropdown.COUNTRY, Number.FOUR, data.country);
    await this.click(this.buttonSave);
  }

  async addNewCustomerDataDriven(data: CustomerDataDriven) {

    if (data.company)
        await this.type(this.inputCompany, data.company);

    if (data.vat)
        await this.type(this.inputVATNumber, data.vat);

    if (data.phone)
        await this.type(this.inputPhoneNumber, data.phone, Delay.ONE_HUNDRED_MILLISECONDS);

    if (data.website)
        await this.type(this.inputWebsite, data.website, Delay.ONE_HUNDRED_MILLISECONDS);

    if (data.group) {
      await this.selectDropdown(Dropdown.GROUPS_IN, Number.ONE, data.group);
    }

    if (data.currency) {
      await this.click(this.clickDropdown);
      await this.click(this.currencyDropdown);
      await this.click(this.optionEuro);
    }

    if (data.language) {
      await this.click(this.defaultLanguageDropdown);
      await this.click(this.optionVietnamese);
    }

    if (data.address)
      await this.type(this.inputAddress, data.address);

    if (data.city)
      await this.type(this.inputCity, data.city);

    if (data.state)
      await this.type(this.inputState, data.state);

    if (data.zip)
      await this.type(this.inputZipCode, data.zip);

    if (data.country) {
        await this.selectDropdown(Dropdown.COUNTRY, Number.FOUR, data.country);
    }

    await this.scrollIntoView(this.buttonSave);
    await this.click(this.buttonSave);
  }

  async verifyCreateFail(expectedMessage: string) {
    await this.waitVisible(this.errorCompany);
    await this.verifyText(this.errorCompany, expectedMessage);
  }

  async verifyCustomerAddedDataDriven(data: CustomerDataDriven) {

    if (data.company)
        await this.verifyValue(this.inputCompany, data.company)

    if (data.vat)
        await this.verifyValue(this.inputVATNumber, data.vat)

    if (data.phone)
        await this.verifyValue(this.inputPhoneNumber, data.phone)

    if (data.website)
        await this.verifyValue(this.inputWebsite, data.website)

    if (data.address)
        await this.verifyValue(this.inputAddress, data.address)

    if (data.city)
        await this.verifyValue(this.inputCity, data.city)

    if (data.state)
        await this.verifyValue(this.inputState, data.state)

    if (data.zip)
        await this.verifyValue(this.inputZipCode, data.zip)

  }

  async verifyCustomerAdded(data: Customer) {
    await this.verifyValue(this.inputCompany, data.company);
    await this.verifyValue(this.inputVATNumber, data.vat);
    await this.verifyValue(this.inputPhoneNumber, data.phone);
    await this.verifyValue(this.inputWebsite, data.website);
    await this.verifyText(this.clickDropdown, data.group);
    await this.verifyText(this.currencyDropdown, data.currency);
    await this.verifyText(this.defaultLanguageDropdown, data.language);
    await this.verifyValue(this.inputAddress, data.address);
    await this.verifyValue(this.inputCity, data.city);
    await this.verifyValue(this.inputState, data.state);
    await this.verifyValue(this.inputZipCode, data.zip);
    await this.verifyValue(this.inputState, data.state);
    await this.verifyText(this.countryDropdown, data.country);
  }

  async getTotalCustomers(): Promise<number> {
    return this.getTextAsNumber(this.totalCustomer);
  }

  async searchCustomer(data: Customer) {
    await this.type(this.searchInput, data.company);
    await this.waitVisible(this.dataInTable(data.company));
  }

  async deleteCustomer(data: Customer) {
    await this.hover(this.dataInTable(data.company));
    await this.acceptAlert();
    await this.click(this.buttonDelete);
    await this.click(this.getbuttonCloseAlert());
  }

  async deleteCustomerIfExist(data: CustomerDataDriven): Promise<void> {
      if (!data.company) {
    console.log('⚠️ No company name provided, cannot delete');
    return;
  }
    await this.type(this.searchInput, data.company);
    await this.hover(this.dataTable(data.company));
    await this.acceptAlert();
    await this.click(this.buttonDelete);
    await this.waitForNetwork();
    await this.click(this.getbuttonCloseAlert());
    await this.waitForNetwork();
    await this.type(this.searchInput, data.company);
  }

  async verifyCustomerDeleted(data: Customer) {
    await this.type(this.searchInput, data.company);
    await this.waitVisible(this.getNoData());
  }

}
