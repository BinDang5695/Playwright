import { Contract } from '@models/types/ui/contract.model'
import { BasePage } from '@pages/BasePage';
import { expect } from '@playwright/test';
import { Message } from '@constants/crm';

export class ContractsPage extends BasePage {

    private get menuContract() {
        return this.page.locator("//span[normalize-space()='Contracts']")
    }

    private get buttonNewContract() {
        return this.page.locator("//a[normalize-space()='New Contract']")
    }

    private createdContract(subject: string) {
        return this.page.locator(`//a[normalize-space()='${subject}']`)
    }

    private get inputCustomer() {
        return this.page.locator("//button[@data-id='clientid']")
    }

    private get searchCustomer() {
        return this.page.locator("//input[@aria-controls='bs-select-2']")
    }

    private customerOption(name: string) {
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

    private contractTypeOption(type: string) {
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

    private selectedCustomer(name: string) {
        return this.page.locator(`//div[contains(text(),'${name}')]`)
    }

    private selectedContractType(type: string) {
        return this.page.locator(`//div[contains(text(),'${type}')]`)
    }

    private get searchOnContract() {
        return this.page.locator("//input[@aria-controls='contracts']")
    }

    async clickMenuContract() {
        await this.menuContract.click();
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
        await expect(this.getAlert).toHaveText(Message.CREATEDCONTRACT);
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
        await expect(this.getAlert).toHaveText(Message.UPDATEDCONTRACT);
        await expect(this.selectedCustomer(data.customer)).toHaveText(data.customer);
        await expect(this.inputSubject).toHaveValue(data.subject);
        await expect(this.inputContractValue).toHaveValue(Number(data.value).toFixed(2));
        await expect(this.selectedContractType(data.contractType)).toHaveText(data.contractType);
        await expect(this.inputStartDate).toHaveValue(data.startDate);
        await expect(this.inputEndDate).toHaveValue(data.endDate);
        await expect(this.inputDescription).toHaveValue(data.description);
    }

    async searchContract(data: Contract) {
        await this.searchOnContract.fill(data.subject);
    }

    async hoverToContract(data: Contract) {
        await this.createdContract(data.subject).hover();
    }

}
