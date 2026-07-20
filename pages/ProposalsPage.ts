import { expect } from '@playwright/test';
import { ExportData } from '@models/types/ui/export-data.model';
import { BasePage } from '@pages/BasePage';
import { Dropdown, Toogle, Attribute } from '@constants/crm';
import { Proposal } from '@models/types/ui/proposal.model'

export class ProposalsPage extends BasePage {

    private get buttonNewProposal() {
        return this.page.locator("//a[normalize-space()='New Proposal']")
    }

    private get inputSubject() {
        return this.page.locator("#subject")
    }

    private get dropdownRelated() {
        return this.page.locator("//button[@data-id='rel_type']")
    }

    private get optionCustomer() {
        return this.page.locator("//a[@role='option']//span[normalize-space()='Customer']")
    }

    private get inputDate() {
        return this.page.locator("#date")
    }

    private get selectDate() {
        return this.page.locator("//div[normalize-space()='20']")
    }

    private get labelToogle() {
        return this.page.locator("//label[@for='allow_comments']")
    }

    private get inputEmail() {
        return this.page.locator("#email")
    }

    private get selectLabelHours() {
        return this.page.locator("//label[normalize-space()='Hours']")
    }

    private get buttonSelect() {
        return this.page.locator("//button[@class='btn pull-right btn-primary']")
    }

    private get buttonSave() {
        return this.page.locator("//button[@type='button'][normalize-space()='Save']")
    }

    private get hoverToogle() {
        return this.page.locator("//li[@data-title='Toggle full view']")
    }

    private get buttonToogleTableRight() {
        return this.page.locator("//i[@class='fa fa-angle-double-right']")
    }

    private get inputSearchProposal() {
        return this.page.locator("//input[@aria-controls='proposals']")
    }

    private verifySubject(subject: string) {
        return this.page.locator(`//tr[@class='has-row-options odd']//a[contains(text(),'${subject}')]`)
    }

    private get captureTableProposal() {
        return this.page.locator("//td[1]//a[contains(@href,'list_proposals')]")
    }

    private captureTableSubject(subject: string) {
        return this.page.locator(`//td[2]//a[normalize-space()='${subject}']`)
    }

    private captureTableTo(customer: string) {
        return this.page.locator(`//a[contains(text(),'${customer}')]`)
    }

    private captureTableTotal(total: string) {
        return this.page.locator(`//td[contains(text(),'${total}')]`)
    }

    private captureTableDate(date: string) {
        return this.page.locator(`//td[normalize-space()='${date}']`)
    }

    private captureTableOpenTill(date: string) {
        return this.page.locator(`//td[normalize-space()='${date}']`)
    }

    private get captureTableCreated() {
        return this.page.locator("//td[@class='sorting_1']")
    }

    private get captureTableStatus() {
        return this.page.locator("//td//span[contains(@class,'proposal-status')]")
    }

    async captureUITableData(data: Proposal): Promise<ExportData> {

        await expect(this.captureTableProposal).toBeVisible();

        const uiData: ExportData = {
            proposal: (await this.captureTableProposal.textContent())?.trim() ?? '',
            subject: (await this.captureTableSubject(data.subject).textContent())?.trim() ?? '',
            to: (await this.captureTableTo(data.customer).first().textContent())?.trim() ?? '',
            total: (await this.captureTableTotal(data.total).textContent())?.trim() ?? '',
            date: (await this.captureTableDate(data.date).textContent())?.trim() ?? '',
            openTill: (await this.captureTableOpenTill(data.openTill).textContent())?.trim() ?? '',
            project: '',
            tags: '',
            created: (await this.captureTableCreated.textContent())?.trim() ?? '',
            status: (await this.captureTableStatus.textContent())?.trim() ?? '',
        };

        console.log('📋 UI data:', uiData);

        return uiData;
    }

    async clickButtonNewProposal() {
        await this.buttonNewProposal.click();
    }

    async inputToAddNewProposal(data: Proposal) {
        await this.inputSubject.fill(data.subject);
        await this.dropdownRelated.click();
        await this.optionCustomer.click();
        await this.selectDropdownWithSearch(Dropdown.CUSTOMER, 13, data.customer);
        await this.inputDate.fill(data.date);
        await this.selectDate.click();
        await this.labelToogle.click();
        await this.inputEmail.fill(data.email);
        await this.selectDropdownWithSearch(Dropdown.ADDITEM, 7, data.description, data.binDescription);
        await this.selectLabelHours.click();
        await this.buttonSelect.click();
    }

    async scrollToButtonSave() {
        await this.buttonSave.scrollIntoViewIfNeeded();
    }

    async clickButtonSave() {
        await this.buttonSave.click();
    }

    async hoverToTooltip() {
        await this.hoverToogle.hover();
    }

    async verifyTooltip() {
        await expect(this.hoverToogle).toHaveAttribute(Attribute.DATA_TITLE, Toogle.FULLVIEW);
    }

    async clickButtonToogleTableRight() {
        await this.buttonToogleTableRight.click();
    }

    async searchCreatedProposal(data: Proposal) {
        await this.inputSearchProposal.pressSequentially(data.subject, {delay: 100});
    }

    async selectCreatedProposal(data: Proposal) {
        await this.verifySubject(data.subject).click();
    }


}
