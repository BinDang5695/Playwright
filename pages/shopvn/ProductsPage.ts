import { expect } from '@playwright/test';
import { ShopvnBasePage } from '@pages/shopvn/ShopvnBasePage';
import { Product } from '@models/types/shopvn/products.model';

export class ProductsPage extends ShopvnBasePage {

    private get btnAddProduct() {
        return this.page.getByRole('button', { name: '＋ Thêm sản phẩm' })
    }

    private get inputProductName() {
        return this.page.getByPlaceholder('Tên sản phẩm')
    }

    private get inputProductPrice() {
        return this.page.getByPlaceholder('199000')
    }

    private get inputProductInventoryQuantity() {
        return this.page.getByPlaceholder('50')
    }

    private get iconHandBag() {
        return this.page.getByRole('button', { name: '👜' })
    }

    private get dropdownTag() {
        return this.page.locator("//select[@name='tag']")
    }

    private get dropdownCategory() {
        return this.page.locator("//select[@name='category']")
    }

    private get btnAddProductToCategory() {
        return this.page.getByRole('button', { name: 'Thêm sản phẩm' })
    }

    private get btnDeleteOfAddedProduct() {
        return this.page.locator("//tr[9]/td[8]/button[1]")
    }

    private get btnDeleteThisProduct() {
        return this.page.locator("//button[normalize-space()='Xóa']")
    }

    async addNewProduct(data: Product) {
        await this.btnAddProduct.click();
        await this.inputProductName.fill(data.productName);
        await this.inputProductPrice.fill(data.price);
        await this.inputProductInventoryQuantity.fill(data.inventoryQuantity);
        await this.iconHandBag.click();
        await this.dropdownTag.selectOption(data.tag);
        await this.dropdownCategory.selectOption(data.category);
        await this.btnAddProductToCategory.click();
    }

    async verifyAddedProduct(data: Product) {
        await expect(this.verifyTable(9,2)).toHaveText("👜");
        await expect(this.verifyTable(9,3)).toHaveText(data.productName);
        await expect(this.verifyTable(9,4)).toHaveText(data.category);
        await expect(this.verifyTable(9,5)).toHaveText(data.tag);
        await expect(this.verifyTable(9,6)).toHaveText(data.verifyPrice);
        await expect(this.verifyTable(9,7)).toHaveText(data.inventoryQuantity);
    }

    async deleteAddedProduct() {
        await this.btnDeleteOfAddedProduct.click();
        await this.btnDeleteThisProduct.click();
        await this.page.waitForTimeout(5000);
    }

}