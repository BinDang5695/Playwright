import { expect } from '@playwright/test';
import { CMSBasePage } from '@pages/cms/CMSBasePage';
import { Product } from '@models/types/cms/product.model';

export class ProductsPage extends CMSBasePage {

    private get buttonAddNewProduct() {
        return this.page.locator("//a[@class='btn btn-circle btn-info']//span[contains(text(),'Add New Product')]")
    };

    private get inputProductName() {
        return this.page.locator("//input[@placeholder='Product Name']")
    };

    private get dropdownCategory() {
        return this.page.locator("//button[@data-id='category_id']")
    };

    private get inputCategory() {
        return this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']")
    };

    optionPlaywrightdzCategory(category: string) {
        return this.page.locator(`//span[normalize-space()='${category}']`)
    };

    private get inputUnit() {
        return this.page.locator("//input[@placeholder='Unit (e.g. KG, Pc etc)']")
    };

    private get inputTags() {
        return this.page.locator("//span[@role='textbox']")
    };

    private get toggleColors() {
        return this.page.locator("//div[@class='col-md-1']//span")
    };

    private get dropdownColors() {
        return this.page.locator("//button[@data-id='colors']")
    };

    private get inputColors() {
        return this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']")
    };

    private get inputUnitPrice() {
        return this.page.locator("//input[@placeholder='Unit price']")
    };

    private get optionDiscount() {
        return this.page.locator("//input[@placeholder='Discount']")
    };

    private get optionQuantity() {
        return this.page.locator("//input[@placeholder='Quantity']")
    };

    private get inputDescription() {
        return this.page.locator("//div[@role='textbox']")
    };

    private get buttonSaveAndPublish() {
        return this.page.locator("//button[normalize-space()='Save & Publish']")
    };

    private get buttonX() {
        return this.page.locator("(//button[@data-value='removed'])[2]")
    };

    private get inputSearchProduct() {
        return this.page.locator("//input[@id='search']")
    };

    private get buttonSearchProduct() {
        return this.page.locator("//div[@class='input-group-append d-none d-lg-block']//button[@type='submit']")
    };

    createdProduct(name: string) {
        return this.page.locator(`//a[normalize-space()='${name}']`)
    };

    private get tooltipSnow() {
        return this.page.locator("label[data-title='Snow']")
    };

    private get tooltipAliceBlue() {
        return this.page.locator("label[data-title='AliceBlue']")
    };

    private get iconDelete() {
        return this.page.locator("//i[@class='las la-trash']")
    };

    private get linkDelete() {
        return this.page.locator("//a[@id='delete-link']")
    };

    private get iconEdit() {
        return this.page.locator("//i[@class='las la-edit']")
    };

    private get buttonUpdateProduct() {
        return this.page.locator("//button[normalize-space()='Update Product']")
    };

    async selectColor(color: string) { await this.page.getByRole('option', { name: color, exact: true }).click(); }

    async inputDataAddNewProduct(data: Product) {
        await this.buttonAddNewProduct.click();
        await this.inputProductName.fill(data.name);
        await this.dropdownCategory.click();
        await this.inputCategory.fill(data.category);
        await this.optionPlaywrightdzCategory(data.category).click();
        await this.inputUnit.fill(data.unit);
        await this.inputTags.fill(data.tags);
        await this.inputUnitPrice.clear();
        await this.inputUnitPrice.fill(data.unitprice);
        await this.optionDiscount.clear();
        await this.optionDiscount.fill(data.discount);
    }

    async addNewProduct(data: Product) {
        await this.inputDataAddNewProduct(data);
        await this.toggleColors.click();
        await this.dropdownColors.click();
        await this.inputColors.pressSequentially(data.color[0]!, { delay: 100 });
        await this.selectColor(data.color[0]!);
        await this.inputColors.clear();
        await this.inputColors.pressSequentially(data.color[1]!, { delay: 100 });
        await this.selectColor(data.color[1]!);
        await this.inputDescription.fill(data.description);
        await this.buttonSaveAndPublish.click();
    }

    async verifyColors(data: Product) {
        await this.page.goto('https://cms.anhtester.com/admin/products/admin/2756/edit?lang=vn');
        await this.buttonX.click();
        await this.inputSearchProduct.fill(data.name);
        await this.buttonSearchProduct.click();
        await this.createdProduct(data.name).click();
        await this.tooltipSnow.hover();
        await expect(this.tooltipSnow).toHaveAttribute('data-title', data.color[0]!);
        //Method 2: await expect(this.page.locator('.tooltip-inner')).toHaveText(data.color[0]!);
        await this.tooltipAliceBlue.hover();
        await expect(this.tooltipAliceBlue).toHaveAttribute('data-title', data.color[1]!);
        await this.page.goto('https://cms.anhtester.com/admin/products/all');
        await this.inputSearchProduct.fill(data.name);
        await this.page.keyboard.press('Enter');
        await this.iconDelete.click();
        await this.linkDelete.click();
    }

    async addNewAndUpdateProduct(data: Product) {
        await this.inputDataAddNewProduct(data);
        await this.optionQuantity.clear();
        await this.optionQuantity.fill(data.quantity);
        await this.buttonSaveAndPublish.click();
        await this.inputSearchProduct.fill(data.name);
        await this.page.keyboard.press('Enter');
        await this.iconEdit.click();
        await this.inputProductName.fill(data.updatedName);
        await this.buttonUpdateProduct.click();
    }

    async deleteProduct(data: Product) {
        await this.inputSearchProduct.fill(data.updatedName);
        await this.page.keyboard.press('Enter');
        await this.iconDelete.click();
        await this.linkDelete.click();
    }
}
