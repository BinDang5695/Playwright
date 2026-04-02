import { Contract } from '@models/types/crm/contract.model'
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { expect } from '@playwright/test';
import { Message } from '@constants/crm';

export class ContractsPage extends CRMBasePage {

    private get buttonNewContract() {
        return this.page.locator("//a[normalize-space()='New Contract']")
    }

    private get inputCustomer() {
        return this.page.locator("//button[@data-id='clientid']")
    }

    private get searchCustomer() {
        return this.page.locator("//input[@aria-controls='bs-select-2']")
    }

    customerOption(name: string) {
        return this.page.locator(`//span[normalize-space()='${name}']`)
    }

    private get inputSubject() {
        return this.page.locator("#subject")
    }

    private get inputContractValue() {
        return this.page.locator("//input[@name='contract_value']")
    }

    private get inputContractType() {
        return this.page.locator("//button[@data-id='contract_type']")
    }

    private get inputValueForContractType() {
        return this.page.locator("//input[@aria-controls='bs-select-1']")
    }

    contractTypeOption(type: string) {
        return this.page.locator(`//span[@class='text'][normalize-space()='${type}']`)
    }

    private get inputStartDate() {
        return this.page.locator("#datestart")
    }

    private get inputEndDate() {
        return this.page.locator("#dateend")
    }

    private get inputDescription() {
        return this.page.getByRole('textbox', { name: 'Description' })
    }

    private get buttonSave() {
        return this.page.locator("//div[contains(@class,'btn')]//button[@type='submit']")
    }

    selectedCustomer(name: string) {
        return this.page.locator(`//div[contains(text(),'${name}')]`)
    }

    selectedContractType(type: string) {
        return this.page.locator(`//div[contains(text(),'${type}')]`)
    }

    private get dropdownMore() {
        return this.page.locator("//button[normalize-space()='More']")
    }
    private get searchContract() {
        return this.page.locator("//input[@aria-controls='contracts']")
    }

    async clickButtonNewContract() {
        await this.buttonNewContract.click();
    }

    async addNewContract(data: Contract) {
        await this.inputCustomer.click();
        await this.searchCustomer.pressSequentially(data.customer, { delay: 100 });
        await this.customerOption(data.customer).click();
        await this.inputSubject.fill(data.subject);
        await this.inputContractValue.fill(data.value);
        await this.inputContractType.click();
        await this.inputValueForContractType.fill(data.contractType);
        await expect(this.contractTypeOption(data.contractType)).toBeVisible();
        await this.contractTypeOption(data.contractType).click();
        await this.inputStartDate.fill(data.startDate);
        await this.inputEndDate.fill(data.endDate);
        await this.inputDescription.fill(data.description);
        await this.buttonSave.click();
    }

    async verifyCreatedContract(data: Contract) {
        await expect(this.getAlert()).toHaveText(Message.CREATEDCONTRACT);
        await expect(this.selectedCustomer(data.customer)).toHaveText(data.customer);
        await expect(this.inputSubject).toHaveValue(data.subject);
        await expect(this.inputContractValue).toHaveValue(Number(data.value).toFixed(2));
        await expect(this.selectedContractType(data.contractType)).toHaveText(data.contractType);
        await expect(this.inputStartDate).toHaveValue(data.startDate);
        await expect(this.inputEndDate).toHaveValue(data.endDate);
        await expect(this.inputDescription).toHaveValue(data.description);
    }

    async updateContract(data: Contract) {
        await this.inputSubject.fill(data.subject);
        await this.inputContractValue.fill(data.value);
        await this.inputStartDate.fill(data.startDate);
        await this.inputEndDate.fill(data.endDate);
        await this.inputDescription.fill(data.description);
        await this.buttonSave.click();
    }

    async verifyUpdatedContract(data: Contract) {
        await expect(this.getAlert()).toHaveText(Message.UPDATEDCONTRACT);
        await expect(this.selectedCustomer(data.customer)).toHaveText(data.customer);
        await expect(this.inputSubject).toHaveValue(data.subject);
        await expect(this.inputContractValue).toHaveValue(Number(data.value).toFixed(2));
        await expect(this.selectedContractType(data.contractType)).toHaveText(data.contractType);
        await expect(this.inputStartDate).toHaveValue(data.startDate);
        await expect(this.inputEndDate).toHaveValue(data.endDate);
        await expect(this.inputDescription).toHaveValue(data.description);
    }

    async deleteContract() {
        await this.acceptAlert();
        await this.dropdownMore.click();
        await this.buttonDelete.click();
        await this.getbuttonCloseAlert().click();
    }

    async verifyDeletedContract(data: Contract) {
        await this.searchContract.fill(data.subject);
        await expect(this.getNoData()).toBeVisible();
    }

}
