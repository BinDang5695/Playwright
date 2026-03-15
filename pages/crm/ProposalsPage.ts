import { expect } from '@playwright/test';
import BasePage from './BasePage';
import fs from 'fs';
import { extractTextFromPDF, readExcelAsText } from '../../models/helpers/FileHelpers';
import path from 'path';
export type ExportFileType = 'pdf' | 'excel' | 'csv';

export class ProposalsPage extends BasePage {

    private buttonNewProposals = () => this.page.locator("//a[normalize-space()='New Proposal']");
    private inputSubject = () => this.page.locator("//input[@id='subject']");
    private dropdownRelated = () => this.page.locator("//button[@data-id='rel_type']");
    private optionCustomer = () => this.page.locator("//a[@role='option']//span[normalize-space()='Customer']");
    private dropdownCustomer = () => this.page.locator("//div[contains(text(),'Select and begin typing')]");
    private inputCustomer = () => this.page.locator("//input[@placeholder='Type to search...']");
    private option1stBinCustomer = () => this.page.locator("(//span[normalize-space()='Bin Customer'])[1]");
    private inputDate = () => this.page.locator("//input[@id='date']");
    private date20 = () => this.page.locator("//div[normalize-space()='20']");
    private toogleAllowComments = () => this.page.locator("//label[@for='allow_comments']");
    private inputEmail = () => this.page.locator("//input[@id='email']");
    private dropdownAddItem = () => this.page.locator("//div[contains(text(),'Add Item')]");
    private searchItem = () => this.page.locator("//input[@aria-controls='bs-select-7']");
    private optionBinDescription = () => this.page.locator("//span[.='(1,000.00) Bin description...']");
    private seledtedOptionBinDescription = () => this.page.locator("//div[contains(text(),'(1,000.00) Bin description')]");
    private radioHours = () => this.page.locator("//label[normalize-space()='Hours']");
    private buttonSelect = () => this.page.locator("//button[@class='btn pull-right btn-primary']");
    private buttonSaveAddNewProposal = () => this.page.locator("//button[@type='button'][normalize-space()='Save']");
    private iconToggleFullView = () => this.page.locator("//li[@data-title='Toggle full view']");
    private tooltipContent = () => this.page.locator('.tooltip-inner', { hasText: 'Toggle full view' });
    private buttonToogleTableRight = () => this.page.locator("//i[@class='fa fa-angle-double-right']");
    private inputSearchProposals = () => this.page.locator("//input[@aria-controls='proposals']");
    private contentProposals_info = () => this.page.locator("//div[@id='proposals_info' and contains(., 'Showing 1 to 1 of 1 entries')]");
    private dropdownMore = () => this.page.locator("//button[normalize-space()='More']");
    private optionDelete = () => this.page.locator("//a[normalize-space()='Delete']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");
    private buttonExport = () => this.page.locator("//span[normalize-space()='Export']");
    private optionPDF = () => this.page.locator("//a[normalize-space()='PDF']");
    private optionExcel = () => this.page.locator("//a[normalize-space()='Excel']");
    private optionCSV = () => this.page.locator("//a[normalize-space()='CSV']");
    private tableBinSubject = () => this.page.locator("//tr[@class='has-row-options odd']//a[contains(text(),'Bin Subject')]");
    //Compare file PDF with data on UI table
    private tableProposal = () => this.page.locator("//tr[1]//td[1]//a[contains(@href,'list_proposals')]");
    private tableSubject = () => this.page.locator("//tr[1]//td[2]//a[normalize-space()='Bin Subject']");
    private tableTo = () => this.page.locator("//a[contains(text(),'Bin Customer')]");
    private tableTotal = () => this.page.locator("//td[contains(text(),'€1.000,00')]");
    private tableDate = () => this.page.locator("//td[normalize-space()='20-12-2028']");
    private tableOpenTill = () => this.page.locator("//td[normalize-space()='27-12-2028']");
    private tableCreated = () => this.page.locator("//td[@class='sorting_1']");
    private tableStatus = () => this.page.locator("//td//span[contains(@class,'proposal-status')]");
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

    async captureUITableData() {
        await this.tableProposal().waitFor({ state: 'visible', timeout: 10000 });
        this.uiProposalNumber = (await this.tableProposal().textContent())?.trim() ?? '';
        this.uiSubject = (await this.tableSubject().textContent())?.trim() ?? '';
        this.uiTo = (await this.tableTo().first().textContent())?.trim() ?? '';
        this.uiTotal = (await this.tableTotal().textContent())?.trim() ?? '';
        this.uiDate = (await this.tableDate().textContent())?.trim() ?? '';
        this.uiOpenTill = (await this.tableOpenTill().textContent())?.trim() ?? '';
        this.uiProject = '';
        this.uiTags = '';
        this.uiCreated = (await this.tableCreated().textContent())?.trim() ?? '';
        this.uiStatus = (await this.tableStatus().textContent())?.trim() ?? '';
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
        await this.buttonNewProposals().waitFor({ state: 'visible' });
        await this.buttonNewProposals().click();
    }

    async addNewProposal() {
        await this.inputSubject().fill("Bin Subject");
        await this.dropdownRelated().click();
        await this.optionCustomer().click();
        await this.dropdownCustomer().click();
        await this.inputCustomer().pressSequentially("Bin Customer", { delay: 100 });
        await this.option1stBinCustomer().click();
        await this.inputDate().fill("20-12-2028");
        await this.date20().click();
        await this.toogleAllowComments().click();
        await this.inputEmail().pressSequentially("vbin@gmail.com", { delay: 100 });
        await this.radioHours().click();
        await this.dropdownAddItem().click();
        await this.searchItem().pressSequentially("Bin description", { delay: 100 });
        await this.optionBinDescription().first().click();
        await expect(this.seledtedOptionBinDescription()).toBeVisible();
        await this.buttonSelect().click();
        await this.buttonSaveAddNewProposal().scrollIntoViewIfNeeded();
        await this.buttonSaveAddNewProposal().isVisible();
        await this.buttonSaveAddNewProposal().click();
        await this.buttonX().click();
    }

    async addNewProposalWithRetry(maxRetry = 2) {
        for (let attempt = 1; attempt <= maxRetry; attempt++) {
            try {
                console.log(`👉 Add New Proposal - attempt ${attempt}`);

                await this.addNewProposal();
                return;

            } catch (error) {
                console.warn(`❌ Failed at attempt ${attempt}`, error);

                if (attempt === maxRetry) {
                    throw error;
                }

                await this.page.reload({ waitUntil: 'domcontentloaded' });
                await this.page.waitForLoadState('networkidle');
            }
        }
    }

    async verifyTooltip() {
        await this.iconToggleFullView().hover();
        await expect(this.iconToggleFullView()).toBeVisible();
        await expect(this.iconToggleFullView())
            .toHaveAttribute('data-title', 'Toggle full view');
    }

    async searchCreatedProposal() {
        await this.buttonToogleTableRight().click();
        await this.inputSearchProposals().fill("Bin Subject");
        await expect(this.contentProposals_info()).toBeVisible();
    }

    private async deleteFile(filePath: string) {
        try {
            await fs.promises.unlink(filePath);
            console.log(`🧹 Deleted file: ${filePath}`);
        } catch (err) {
            console.warn(`⚠️ Could not delete file: ${filePath}`);
        }
    }

    async deleteCreatedProposal() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.page.keyboard.press('Escape');
        await this.page.waitForLoadState('networkidle');
        await this.tableBinSubject().waitFor({ state: 'visible' });
        await this.tableBinSubject().click({ force: true });
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.dropdownMore().waitFor({ state: 'visible' });
        await this.dropdownMore().click();
        await this.optionDelete().click();
        await this.buttonX().click();
    }

    async exportFile(type: ExportFileType): Promise<string> {

        const downloadsDir = path.resolve('downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        await this.buttonExport().click({ force: true });

        const optionMap = {
            pdf: this.optionPDF(),
            excel: this.optionExcel(),
            csv: this.optionCSV(),
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
            await this.deleteFile(filePath);
        }
    }
}
