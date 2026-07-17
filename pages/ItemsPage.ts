import { BasePage } from '@pages/BasePage';
import { Item } from '@models/types/ui/item.model'
import { expect } from '@playwright/test';

export class ItemsPage extends BasePage {

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

    override get buttonDelete() {
        return this.page.locator("//a[@class='text-danger _delete']");
    }

    private tableDescription(description: string) {
        return this.page.locator(`//a[normalize-space()='${description}']`);
    }

    private tableLongDescription(longDescription: string) {
        return this.page.locator(`//td[normalize-space()='${longDescription}']`);
    }

    private tableRate(rate: string) {
        return this.page.locator(`//td[normalize-space()='${rate}']`);
    }

    private tableTax1(tax1: string) {
        return this.page.locator(`//td[5]//span[normalize-space()='${tax1}']`);
    }

    private tableTax2(tax2: string) {
        return this.page.locator(`//td[6]//span[normalize-space()='${tax2}']`);
    }

    private tableUnit(unit: string) {
        return this.page.locator(`//td[normalize-space()='${unit}']`);
    }

    async clickButtonImportItems() {
        await this.buttonImportItems.click();
    }

    async importCSVFile(data: Item) {
        await this.buttonChooseFile.setInputFiles(data.file);
    }

    async clickToImportCSVFile() {
        await this.buttonImport.click();
    }

    async searchItems(data: Item) {
        await this.inputSearchItems.fill(data.longDescription);
    }

    async hoverToItem(data: Item) {
        await this.tableLongDescription(data.longDescription).hover();
    }

    async verifyItems(data: Item) {
        await this.searchItems;
        await expect(this.tableDescription(data.description)).toHaveText(data.description);
        await expect(this.tableLongDescription(data.longDescription)).toHaveText(data.longDescription);
        await expect(this.tableRate(data.rate)).toHaveText(data.rate);
        await expect(this.tableTax1(data.tax1)).toHaveText(data.tax1);
        await expect(this.tableTax2(data.tax2)).toHaveText(data.tax2);
        await expect(this.tableUnit(data.unit)).toHaveText(data.unit);
    }

}
