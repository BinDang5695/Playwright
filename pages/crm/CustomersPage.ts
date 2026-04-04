import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Dropdown } from '@constants/crm';
import { Customer } from '@models/types/crm/customer.model'
import { CustomerDataDriven } from '@models/types/crm/customerdriven.model'
import { expect } from '@playwright/test';

export class CustomersPage extends CRMBasePage {

    private get buttonAddNewCustomer() {
        return this.page.getByRole('link', { name: 'New Customer' });
    }

    private get searchInput() {
        return this.page.locator("//input[@aria-controls='clients']");
    }

    private get inputCompany() {
        return this.page.getByLabel('Company');
    }

    private get inputVATNumber() {
        return this.page.getByLabel('VAT Number');
    }

    private get inputPhoneNumber() {
        return this.page.getByLabel('Phone');
    }

    private get inputWebsite() {
        return this.page.getByLabel('Website');
    }

    private get dropDownGroups() {
        return this.page.locator("//button[@data-id='groups_in[]']");
    }

    textOption(name: string) {
        return this.page.locator(`//span[normalize-space()='${name}']`);
    }

    private get currencyDropdown() {
        return this.page.locator("//button[@data-id='default_currency']");
    }

    private get currencyOption() {
        return this.page.getByText('€', { exact: true });
    }

    private get defaultLanguageDropdown() {
        return this.page.locator("//button[@data-id='default_language']");
    }

    private get inputAddress() {
        return this.page.getByRole('textbox', { name: 'Address' });
    }

    private get inputCity() {
        return this.page.locator("#city");
    }

    private get inputState() {
        return this.page.locator("#state");
    }

    private get inputZipCode() {
        return this.page.locator("#zip");
    }

    private get countryDropdown() {
        return this.page.locator('button[data-id="country"]');
    }

    private get buttonSave() {
        return this.page.locator("//button[contains(@class,'only-save')]");
    }

    private get totalCustomer() {
        return this.page.locator("//span[normalize-space()='Total Customers']/preceding-sibling::span");
    }

    private get errorMessage() {
        return this.page.locator("#company-error");
    }

    customerInTable(name: string) {
        return this.page.locator(`//a[normalize-space()='${name}']`);
    }

    async clickButtonAddNewCustomer() {
        await this.buttonAddNewCustomer.click();
    }

    async addNewCustomer(data: Customer) {
        await this.inputCompany.fill(data.company);
        await this.inputVATNumber.fill(data.vat);
        await this.inputPhoneNumber.fill(data.phone);
        await this.inputWebsite.fill(data.website);
        await this.selectDropdownWithSearch(Dropdown.GROUPS_IN, 1, data.group);
        await this.dropDownGroups.click();
        await this.currencyDropdown.click();
        await this.currencyOption.click();
        await this.selectDropdownBySpanText(Dropdown.DEFAULT_LANGUAGE, data.language);
        await this.inputAddress.fill(data.address);
        await this.inputCity.fill(data.city);
        await this.inputState.fill(data.state);
        await this.inputZipCode.fill(data.zip);
        await this.selectDropdownWithSearch(Dropdown.COUNTRY, 4, data.country);
        await this.buttonSave.click();
    }

    async addNewCustomerDataDriven(data: CustomerDataDriven) {

        if (data.company)
            await this.inputCompany.fill(data.company);

        if (data.vat)
            await this.inputVATNumber.fill(data.vat);

        if (data.phone)
            await this.inputPhoneNumber.fill(data.phone);

        if (data.website)
            await this.inputWebsite.fill(data.website);

        if (data.group) {
            await this.selectDropdownWithSearch(Dropdown.GROUPS_IN, 1, data.group);
            await this.dropDownGroups.click();
        }

        if (data.currency) {
            await this.currencyDropdown.click();
            await this.currencyOption.click();
        }

        if (data.language) {
            await this.selectDropdownBySpanText(Dropdown.DEFAULT_LANGUAGE, data.language);
        }

        if (data.address)
            await this.inputAddress.fill(data.address);

        if (data.city)
            await this.inputCity.fill(data.city);

        if (data.state)
            await this.inputState.fill(data.state);

        if (data.zip)
            await this.inputZipCode.fill(data.zip);

        if (data.country) {
            await this.selectDropdownWithSearch(Dropdown.COUNTRY, 4, data.country);
        }

        await this.buttonSave.scrollIntoViewIfNeeded();
        await this.buttonSave.click();
    }

    async verifyCreateFail(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }

    async verifyCustomerAddedDataDriven(data: CustomerDataDriven) {

        if (data.company)
            await expect(this.inputCompany).toHaveValue(data.company);

        if (data.vat)
            await expect(this.inputVATNumber).toHaveValue(data.vat);

        if (data.phone)
            await expect(this.inputPhoneNumber).toHaveValue(data.phone);

        if (data.website)
            await expect(this.inputWebsite).toHaveValue(data.website);

        if (data.address)
            await expect(this.inputAddress).toHaveValue(data.address);

        if (data.city)
            await expect(this.inputCity).toHaveValue(data.city);

        if (data.state)
            await expect(this.inputState).toHaveValue(data.state);

        if (data.zip)
            await expect(this.inputZipCode).toHaveValue(data.zip);
    }

    async verifyCustomerAdded(data: Customer) {
        await expect(this.inputCompany).toHaveValue(data.company);
        await expect(this.inputVATNumber).toHaveValue(data.vat);
        await expect(this.inputPhoneNumber).toHaveValue(data.phone);
        await expect(this.inputWebsite).toHaveValue(data.website);
        await expect(this.dropDownGroups).toHaveText(data.group);
        await expect(this.currencyDropdown).toHaveText(data.currency);
        await expect(this.defaultLanguageDropdown).toHaveText(data.language);
        await expect(this.inputAddress).toHaveValue(data.address);
        await expect(this.inputCity).toHaveValue(data.city);
        await expect(this.inputState).toHaveValue(data.state);
        await expect(this.inputZipCode).toHaveValue(data.zip);
        await expect(this.inputState).toHaveValue(data.state);
        await expect(this.countryDropdown).toHaveText(data.country);
    }

    async getTotalCustomers(): Promise<number> {
        const totalText = await this.totalCustomer.textContent();
        return Number(totalText);
    }

    async searchCustomer(data: Customer) {
        await this.searchInput.fill(data.company);
        await expect(this.customerInTable(data.company)).toBeVisible();
    }

    async deleteCustomer(data: Customer) {
        await this.customerInTable(data.company).hover();
        await this.acceptAlert();
        await this.buttonDelete.click();
        await this.getbuttonCloseAlert().click();
    }

    async deleteCustomerIfExist(data: CustomerDataDriven): Promise<void> {
        if (!data.company) {
            console.log('⚠️ No company name provided, cannot delete');
            return;
        }
        await this.searchInput.fill(data.company);
        await this.customerInTable(data.company).hover();
        await this.acceptAlert();
        await this.buttonDelete.click();
        await this.getbuttonCloseAlert().click();
        await this.searchInput.fill(data.company);
    }

    async verifyCustomerDeleted(data: Customer) {
        await this.searchInput.fill(data.company);
        await expect(this.getNoData()).toBeVisible();
    }

}
