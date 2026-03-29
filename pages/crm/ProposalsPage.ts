import { expect } from '@playwright/test';
import fs from 'fs';
import { extractTextFromPDF, readExcelAsText, deleteFile } from '../../models/helpers/FileHelpers';
import path from 'path';
import { ExportFileType } from '@models/types/file.model';
import { CRMBasePage } from './CRMBasePage';
import { Button, Message, Dropdown, Number, Option, Label, Toogle, Search, Href, Currency, Date, Status, Delay, Attribute, Input, Table } from '@constants/crm';
import { Proposal } from '@models/types/proposal.model'

export class ProposalsPage extends CRMBasePage {

    get buttonNewProposal() {
        return this.getLinkByText(Button.NEWPROPOSAL);
    }

    get inputSubject() {
        return this.getInputById(Input.SUBJECT);
    }

    get dropdownRelated() {
        return this.getDropdown(Dropdown.RELATED);
    }

    get optionCustomer() {
        return this.getType(Option.CUSTOMER);
    }

    inputDate(date: string) {
        return this.getInputById(date);
    }

    get selectDate() {
        return this.getDivId(Number.TWENTY);
    }

    get clickToogle() {
        return this.getLabel(Label.ALLOW_COMMENTS);
    }    

    inputEmail(email: string) {
        return this.getInputById(Input.EMAIL);
    }

    get selectLabelHours() {
        return this.getLabelText(Label.HOURS);
    }

    get clickButtonPull() {
        return this.getButtonByClass(Button.PULL);
    }

    get clickButtonSave() {
        return this.getButtonText(Button.SAVE);
    }

    get hoverToogle() {
        return this.getToogle(Toogle.FULLVIEW);
    }

    get clickButtonDoubleRight() {
        return this.getLi(Button.DOUBLERIGHT);
    }

    get inputSearchProposal() {
        return this.getInputAriaControls(Search.PROPOSALS);
    }

    get verifyTotal() {
        return this.getDivText(Table.PROPOSALS_INFO);
    }

    get verifySubject() {
        return this.getTableLink(Number.TWO, Href.LIST_PROPOSALS);
    }

    get clickButtonMore() {
        return this.getButtonByText(Button.MORE);
    }

    get clickButtonDelete() {
        return this.getLinkByText(Button.DELETE);
    }

    get clickButtonExport() {
        return this.getValue(Button.EXPORT);
    }

    get selectOptionPDF() {
        return this.getLinkByText(Option.PDF);
    }

    get selectOptionExcel() {
        return this.getLinkByText(Option.EXCEL);
    }

    get selectOptionCSV() {
        return this.getLinkByText(Option.CSV);
    }

    get clickTable() {
        return this.getTable(Option.CSV);
    }

    //Compare file PDF with data on UI table

    get captureTableProposal() {
        return this.getTableLink(Number.ONE, Href.LIST_PROPOSALS);
    }

    captureTableSubject(subject: string) {
        return this.getTableLink(Number.TWO, subject);
    }

    captureTableTo(customer: string) {
        return this.getTableLink(Number.THREE, customer);
    }

    get captureTableTotal() {
        return this.getTDText(Currency.EURO);
    }

    get captureTableDate() {
        return this.getTDText(Date.DATE);
    }

    get captureTableOpenTill() {
        return this.getTDText(Date.OPENTILL);
    }

    get captureTableCreated() {
        return this.getTD(Date.DATECREATED);
    }

    get captureTableStatus() {
        return this.getTDSpan(Status.PROPOSAL_STATUS);
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

    async captureUITableData() {
        await this.waitVisible(this.getTableLink(Number.ONE, Href.LIST_PROPOSALS));
        this.uiProposalNumber = (await this.getTableLink(Number.ONE, Href.LIST_PROPOSALS).textContent())?.trim() ?? '';
        this.uiSubject = (await this.getTableLink(Number.TWO, Href.LIST_PROPOSALS).textContent())?.trim() ?? '';
        this.uiTo = (await this.getTableLink(Number.THREE, Href.CLIENT).first().textContent())?.trim() ?? '';
        this.uiTotal = (await this.getTDText(Currency.EURO).textContent())?.trim() ?? '';
        this.uiDate = (await this.getTDText(Date.DATE).textContent())?.trim() ?? '';
        this.uiOpenTill = (await this.getTDText(Date.OPENTILL).textContent())?.trim() ?? '';
        this.uiProject = '';
        this.uiTags = '';
        this.uiCreated = (await this.getTD(Date.DATECREATED).textContent())?.trim() ?? '';
        this.uiStatus = (await this.getTDSpan(Status.PROPOSAL_STATUS).textContent())?.trim() ?? '';
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
        await this.click(this.buttonNewProposal);
    }

    async addNewProposal(data: Proposal) {
        await this.type(this.inputSubject, data.subject);
        await this.click(this.dropdownRelated);
        await this.click(this.optionCustomer);
        await this.selectDropdown(Dropdown.CUSTOMER, Number.THIRDTEEN, data.customer);
        await this.type(this.inputDate(Input.DATE), data.date);
        await this.click(this.selectDate);
        await this.click(this.clickToogle);
        await this.type(this.inputEmail(data.email), data.email);
        await this.selectDropdown(Dropdown.ADDITEM, Number.SEVEN, data.description, Option.BINDESCRIPTION);
        await this.click(this.selectLabelHours);
        await this.click(this.clickButtonPull);
        await this.scrollIntoView(this.clickButtonSave);
        await this.click(this.clickButtonSave);
        await this.click(this.getbuttonCloseAlert());
    }

    async addNewProposalWithRetry(data: Proposal) {
        await this.retryAction(() => this.addNewProposal(data));
    }

    async verifyTooltip() {
        await this.hover(this.hoverToogle);
        await this.waitVisible(this.hoverToogle);
        await this.verifyAttribute(this.hoverToogle, Attribute.DATA_TITLE, Toogle.FULLVIEW);
    }

    async searchCreatedProposal(data: Proposal) {
        await this.click(this.clickButtonDoubleRight);
        await this.type(this.inputSearchProposal, data.subject);
        await this.verifyContainsText(this.verifyTotal, Message.SHOWING1TO1OFENTRIES);
    }

    async deleteCreatedProposal() {
        await this.acceptAlert();
        await this.pressEscape();
        await this.waitForNetwork();
        await this.click(this.verifySubject);
        await this.reloadPage();
        await this.click(this.clickButtonMore);
        await this.click(this.clickButtonDelete);
    }

    async exportFile(type: ExportFileType): Promise<string> {

        const downloadsDir = path.resolve('downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }

        await this.click(this.clickButtonExport);

        const optionMap = {
            pdf: this.selectOptionPDF,
            excel: this.selectOptionExcel,
            csv: this.selectOptionCSV,
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
