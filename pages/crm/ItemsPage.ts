import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Item } from '@models/types/crm/item.model'
import { expect } from '@playwright/test';

export class ItemsPage extends CRMBasePage {

    private get buttonImportItems() {
        return this.page.locator("//a[normalize-space()='Import Items']")
    }

    private get buttonChooseFile() {
        return this.page.locator("#file_csv")
    }

    private get buttonImport() {
        return this.page.locator("//button[normalize-space()='Import']")
    }

    private get inputSearchItems() {
        return this.page.locator("//input[@aria-controls='DataTables_Table_1']")
    }

    tableDescription(description: string) {
        return this.page.locator(`//a[normalize-space()='${description}']`);
    }

    tableLongDescription(longDescription: string) {
        return this.page.locator(`//td[normalize-space()='${longDescription}']`);
    }

    tableRate(rate: string) {
        return this.page.locator(`//td[normalize-space()='${rate}']`);
    }

    tableTax1(tax1: string) {
        return this.page.locator(`//td[5]//span[normalize-space()='${tax1}']`);
    }

    tableTax2(tax2: string) {
        return this.page.locator(`//td[6]//span[normalize-space()='${tax2}']`);
    }

    tableUnit(unit: string) {
        return this.page.locator(`//td[normalize-space()='${unit}']`);
    }

    async clickButtonImportItems() {
        await this.click(this.buttonImportItems);
    }

    async importCSVFile(data: Item) {
        await this.buttonChooseFile.setInputFiles(data.file);
    }

    async clickToImportCSVFile() {
        await this.click(this.buttonImport);
    }

    async searchAndVerifyItems(data: Item) {
        await this.inputSearchItems.fill(data.longDescription);
        await expect(this.tableDescription(data.description)).toHaveText(data.description);
        await expect(this.tableLongDescription(data.longDescription)).toHaveText(data.longDescription);
        await expect(this.tableRate(data.rate)).toHaveText(data.rate);
        await expect(this.tableTax1(data.tax1)).toHaveText(data.tax1);
        await expect(this.tableTax2(data.tax2)).toHaveText(data.tax2);
        await expect(this.tableUnit(data.unit)).toHaveText(data.unit);
    }

    async deleteImportedItem(data: Item) {
        await this.acceptAlert();
        await this.tableDescription(data.description).hover();
        await this.getButtonDelete().click();
        await this.getbuttonCloseAlert().click();
    }

}
