import { expect } from '@playwright/test';
import BasePage from './BasePage';
import SystemHelper from '../../models/helpers/SystemHelper';

export class ItemsPage extends BasePage {

    private buttonImportItems = () => this.page.locator("//a[normalize-space()='Import Items']");
    private buttonChooseFile = () => this.page.locator("//input[@id='file_csv']");
    private buttonImport = () => this.page.locator("//button[normalize-space()='Import']");
    private filePath: string = SystemHelper.getFilePath('test_data/BinItems.csv');
    private inputSearchItems = () => this.page.locator("//input[@aria-controls='DataTables_Table_1']");
    private tableDescription = () => this.page.locator("//a[normalize-space()='Bin Description']");
    private tableLongDescription = () => this.page.locator("//td[normalize-space()='Bin Long description']");
    private tableRate = () => this.page.locator("//td[normalize-space()='$25.00']");
    private tableTax1 = () => this.page.locator("//td[5]//span[normalize-space()='0.00%']");
    private tableTax2 = () => this.page.locator("//td[6]//span[normalize-space()='0.00%']");
    private tableUnit = () => this.page.locator("//td[normalize-space()='Bin Unit']");
    private buttonDelete = () => this.page.locator("//a[@class='text-danger _delete']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");

    async clickButtonImportItems() {
        await this.buttonImportItems().waitFor({ state: 'visible' });
        await this.buttonImportItems().click();
    }

    async importCSVFile() {
        await this.buttonChooseFile().setInputFiles(this.filePath);
    }

    async clickToImportCSVFile() {
        await this.buttonImport().waitFor({ state: 'visible' });
        await this.buttonImport().click();
    }

    async searchAndVerifyItems() {
        await this.inputSearchItems().fill('Bin Long Description');
        await expect(this.tableDescription()).toHaveText('Bin Description');
        await expect(this.tableLongDescription()).toHaveText('Bin Long description');
        await expect(this.tableRate()).toHaveText('$25.00');
        await expect(this.tableTax1()).toHaveText('0.00%');
        await expect(this.tableTax2()).toHaveText('0.00%');
        await expect(this.tableUnit()).toHaveText('Bin Unit');
    }

    async deleteImportedItem() {
        await this.page.on('dialog', async dialog => { await dialog.accept(); });
        await this.tableDescription().hover();
        await this.buttonDelete().click();
        await this.buttonX().click();
    }

}
