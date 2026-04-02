import { expect } from '@playwright/test';
import fs from 'fs';
import { extractTextFromPDF, readExcelAsText, deleteFile } from '@models/helpers/FileHelpers';
import path from 'path';
import { ExportFileType } from '@models/types/crm/file.model';
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Message, Dropdown, Toogle, Attribute } from '@constants/crm';
import { Proposal } from '@models/types/crm/proposal.model'

export class ProposalsPage extends CRMBasePage {

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

    private get clickButtonSave() {
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

    private get verifyTotal() {
        return this.page.locator("//div[@id='proposals_info' and contains(., 'Showing 1 to 1 of 1 entries')]")
    }

    verifySubject(subject: string) {
        return this.page.locator(`//tr[@class='has-row-options odd']//a[contains(text(),'${subject}')]`)
    }
    
    private get clickButtonMore() {
        return this.page.locator("//button[normalize-space()='More']")
    }

    private get clickButtonDelete() {
        return this.page.locator("//a[normalize-space()='Delete']")
    }

    private get clickButtonExport() {
        return this.page.locator("//span[normalize-space()='Export']")
    }

    private get optionPDF() {
        return this.page.locator("//a[normalize-space()='PDF']")
    }

    private get optionExcel() {
        return this.page.locator("//a[normalize-space()='Excel']")
    }

    private get optionCSV() {
        return this.page.locator("//a[normalize-space()='CSV']")
    }

    private get captureTableProposal() {
        return this.page.locator("//td[1]//a[contains(@href,'list_proposals')]")
    }

    captureTableSubject(subject: string) {
        return this.page.locator(`//td[2]//a[normalize-space()='${subject}']`)
    }

    captureTableTo(customer: string) {
        return this.page.locator(`//a[contains(text(),'${customer}')]`)
    }

    captureTableTotal(total: string) {
        return this.page.locator(`//td[contains(text(),'${total}')]`)
    }

    captureTableDate(date: string) {
        return this.page.locator(`//td[normalize-space()='${date}']`)
    }

    captureTableOpenTill(date: string) {
        return this.page.locator(`//td[normalize-space()='${date}']`)
    }

    private get captureTableCreated() {
        return this.page.locator("//td[@class='sorting_1']")
    }

    private get captureTableStatus() {
        return this.page.locator("//td//span[contains(@class,'proposal-status')]")
    }

    private uiProposalNumber = '';
    private uiSubject = '';
    private uiTo = '';
    private uiTotal = '';
    private uiDate = '';
    private uiOpenTill = '';
    private uiProject = '';
    private uiTags = '';
    private uiCreated = '';
    private uiStatus = '';

    async captureUITableData(data: Proposal) {
        await expect(this.captureTableProposal).toBeVisible();
        this.uiProposalNumber = (await this.captureTableProposal.textContent())?.trim() ?? '';
        this.uiSubject = (await this.captureTableSubject(data.subject).textContent())?.trim() ?? '';
        this.uiTo = (await this.captureTableTo(data.customer).first().textContent())?.trim() ?? '';
        this.uiTotal = (await this.captureTableTotal(data.total).textContent())?.trim() ?? '';
        this.uiDate = (await this.captureTableDate(data.date).textContent())?.trim() ?? '';
        this.uiOpenTill = (await this.captureTableOpenTill(data.openTill).textContent())?.trim() ?? '';
        this.uiProject = '';
        this.uiTags = '';
        this.uiCreated = (await this.captureTableCreated.textContent())?.trim() ?? '';
        this.uiStatus = (await this.captureTableStatus.textContent())?.trim() ?? '';
        console.log('📋 UI data:', {
            proposal: this.uiProposalNumber,
            subject: this.uiSubject,
            to: this.uiTo,
            total: this.uiTotal,
            date: this.uiDate,
            openTill: this.uiOpenTill,
            created: this.uiCreated,
            status: this.uiStatus
        });
    }

    async clickButtonNewProposal() {
        await this.buttonNewProposal.click();
    }

    async addNewProposal(data: Proposal) {
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
        await this.clickButtonSave.scrollIntoViewIfNeeded();
        await this.clickButtonSave.click();
        await this.getbuttonCloseAlert().click();
    }

    async addNewProposalWithRetry(data: Proposal) {
        await this.retryAction(() => this.addNewProposal(data));
    }

    async verifyTooltip() {
        await this.hoverToogle.hover();
        await expect(this.hoverToogle).toBeVisible();
        await expect(this.hoverToogle).toHaveAttribute(Attribute.DATA_TITLE, Toogle.FULLVIEW);
    }

    async searchCreatedProposal(data: Proposal) {
        await this.buttonToogleTableRight.click();
        await this.inputSearchProposal.fill(data.subject);
        await expect(this.verifyTotal).toContainText(Message.SHOWING1TO1OFENTRIES);
    }

    async deleteCreatedProposal(data: Proposal) {
        await this.acceptAlert();
        await this.page.keyboard.press('Escape');
        await this.page.waitForLoadState('networkidle');
        await this.verifySubject(data.subject).click();
        await this.page.reload();
        await this.clickButtonMore.click();
        await this.clickButtonDelete.click();
    }

    async exportFile(type: ExportFileType): Promise<string> {

        const downloadsDir = path.resolve('downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        await this.click(this.clickButtonExport);

        const optionMap = {
            pdf: this.optionPDF,
            excel: this.optionExcel,
            csv: this.optionCSV,
        };

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            optionMap[type].click({ force: true }),
        ]);

        const fileName = download.suggestedFilename();
        const savePath = path.join(downloadsDir, fileName);

        await download.saveAs(savePath);

        return savePath;
    }

    async exportAndVerifyContentFile(type: ExportFileType) {
        const filePath = await this.exportFile(type);

        try {
            let fileText = '';

            switch (type) {
                case 'pdf':
                    fileText = await extractTextFromPDF(filePath);
                    break;

                case 'excel':
                    fileText = await readExcelAsText(filePath);
                    break;

                case 'csv':
                    fileText = await fs.promises.readFile(filePath, 'utf-8');
                    break;
            }

            const fileNorm = this.normalizeText(fileText);

            const uiData = {
                proposal: this.normalizeText(this.uiProposalNumber),
                subject: this.normalizeText(this.uiSubject),
                to: this.normalizeText(this.uiTo),
                total: this.normalizeText(this.uiTotal),
                date: this.normalizeText(this.uiDate),
                openTill: this.normalizeText(this.uiOpenTill),
                project: this.normalizeText(this.uiProject),
                tags: this.normalizeText(this.uiTags),
                created: this.normalizeText(this.uiCreated),
                status: this.normalizeText(this.uiStatus),
            };

            console.log(
                `🔢 ${type.toUpperCase()} Data to verify:
Proposal#: ${uiData.proposal}
Subject: ${uiData.subject}
To: ${uiData.to}
Total: ${uiData.total}
Date: ${uiData.date}
Open Till: ${uiData.openTill}
Project: ${uiData.project}
Tags: ${uiData.tags}
Date Created: ${uiData.created}
Status: ${uiData.status}`
            );

            // Common assertions
            expect(fileNorm).toContain(uiData.proposal);
            expect(fileNorm).toContain(uiData.subject);
            expect(fileNorm).toContain(uiData.to);
            expect(fileNorm).toContain(uiData.total);
            expect(fileNorm).toContain(uiData.date);
            expect(fileNorm).toContain(uiData.openTill);
            expect(fileNorm).toContain(this.normalizeText('Project'));
            expect(fileNorm).toContain(this.normalizeText('Tags'));
            expect(fileNorm).toContain(uiData.created);
            expect(fileNorm).toContain(uiData.status);

        } finally {
            await deleteFile(filePath);
        }
    }
}
