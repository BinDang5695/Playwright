import { expect } from '@playwright/test';
import BasePage from './BasePage';
import SystemHelper from '../../helpers/SystemHelper';

export default class AllProductsPage extends BasePage {

    private buttonAddNewProduct = () => this.page.locator("//a[@class='btn btn-circle btn-info']//span[contains(text(),'Add New Product')]");
    private inputProductName = () => this.page.locator("//input[@placeholder='Product Name']");
    private dropdownCategory = () => this.page.locator("//button[@data-id='category_id']");
    private inputCategory = () => this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']");
    private optionPlaywrightdzCategory = () => this.page.locator("//span[normalize-space()='Playwrightdz Category']");
    private inputUnit = () => this.page.locator("//input[@placeholder='Unit (e.g. KG, Pc etc)']");
    private inputTags = () => this.page.locator("//span[@role='textbox']");
    private toggleColors = () => this.page.locator("//div[@class='col-md-1']//span");
    private dropdownColors = () => this.page.locator("//button[@data-id='colors']");
    private inputColors = () => this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']");
    private inputUnitPrice = () => this.page.locator("//input[@placeholder='Unit price']");
    private optionDiscount = () => this.page.locator("//input[@placeholder='Discount']");
    private optionQuantity = () => this.page.locator("//input[@placeholder='Quantity']");
    private inputDescription = () => this.page.locator("//div[@role='textbox']");
    private buttonSaveAndPublish = () => this.page.locator("//button[normalize-space()='Save & Publish']");
    private buttonX = () => this.page.locator("(//button[@data-value='removed'])[2]");
    private inputSearchProduct = () => this.page.locator("//input[@id='search']");
    private buttonSearchProduct = () => this.page.locator("//div[@class='input-group-append d-none d-lg-block']//button[@type='submit']");
    private createdProduct = () => this.page.locator("//a[normalize-space()='Bin Product Name']");
    private tooltipRed = () => this.page.locator("label[data-title='Red']");
    private tooltipWhite = () => this.page.locator("label[data-title='White']");
    private iconDelete = () => this.page.locator("//i[@class='las la-trash']");
    private linkDelete = () => this.page.locator("//a[@id='delete-link']");
    private iconEdit = () => this.page.locator("//i[@class='las la-edit']");
    private buttonUpdateProduct = () => this.page.locator("//button[normalize-space()='Update Product']");
    async selectColor(color: string) { await this.page.getByRole('option', { name: color, exact: true }).click(); }

    async addNewProduct() {
        await this.buttonAddNewProduct().click();
        await this.inputProductName().fill('Bin Product Name');
        await this.dropdownCategory().click();
        await this.inputCategory().fill('Playwrightdz Category');
        await this.optionPlaywrightdzCategory().click();
        await this.inputUnit().fill('Bin Unit');
        await this.inputTags().fill('Bin Tag');
        await this.toggleColors().click();
        await this.dropdownColors().click();
        await this.inputColors().fill('Red');
        await this.selectColor('Red');
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');
        await this.inputColors().fill('White');
        await this.selectColor('White');
        await this.inputUnitPrice().clear();
        await this.inputUnitPrice().fill('100');
        await this.optionDiscount().clear();
        await this.optionDiscount().fill('10');
        await this.inputDescription().fill('Bin description');
        await this.buttonSaveAndPublish().scrollIntoViewIfNeeded();
        await this.buttonSaveAndPublish().click();
    }

    async verifyColors() {
        await this.page.goto('https://cms.anhtester.com/admin/products/admin/2756/edit?lang=vn');
        await this.buttonX().click();
        await this.inputSearchProduct().fill('Bin Product Name');
        await this.buttonSearchProduct().click();
        await this.createdProduct().click();
        await this.tooltipRed().hover();
        await expect(this.tooltipRed()).toHaveAttribute('data-title', 'Red');
        //Cach 2: await expect(this.page.locator('.tooltip-inner')).toHaveText('Red');
        await this.tooltipWhite().hover();
        await expect(this.tooltipWhite()).toHaveAttribute('data-title', 'White');
        await this.page.goto('https://cms.anhtester.com/admin/products/all');
        await this.inputSearchProduct().fill('Bin Product Name');
        await this.page.keyboard.press('Enter');
        await this.iconDelete().click();
        await this.linkDelete().click();
    }

    async addNewAndUpdateProduct() {
        await this.buttonAddNewProduct().click();
        await this.inputProductName().fill('Bin Product Name');
        await this.dropdownCategory().click();
        await this.inputCategory().fill('Playwrightdz Category');
        await this.optionPlaywrightdzCategory().click();
        await this.inputUnit().fill('Bin Unit');
        await this.inputTags().fill('Bin Tag');
        await this.inputUnitPrice().clear();
        await this.inputUnitPrice().fill('100');
        await this.optionDiscount().clear();
        await this.optionDiscount().fill('10');
        await this.optionQuantity().clear();
        await this.optionQuantity().fill('50');
        await this.inputDescription().fill('Bin description');
        await this.buttonSaveAndPublish().scrollIntoViewIfNeeded();
        await this.buttonSaveAndPublish().click();
        await this.inputSearchProduct().fill('Bin Product Name');
        await this.page.keyboard.press('Enter');
        await this.iconEdit().click();
        await this.inputProductName().fill('Bin Product Name Updated');
        await this.buttonUpdateProduct().scrollIntoViewIfNeeded();
        await this.buttonUpdateProduct().click();
    }

    async deleteProduct() {
        await this.inputSearchProduct().fill('Bin Product Name Updated');
        await this.page.keyboard.press('Enter');
        await this.iconDelete().click();
        await this.linkDelete().click();
    }
}
