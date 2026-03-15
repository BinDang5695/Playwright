import { expect } from '@playwright/test';
import BasePage from './BasePage';
import SystemHelper from '../../helpers/SystemHelper';

export default class CategoryPage extends BasePage {

    private buttonAddNewCategory = () => this.page.locator("//span[normalize-space()='Add New category']");
    private inputName = () => this.page.locator("//input[@id='name']");
    private inputOrderingNumber = () => this.page.locator("//input[@id='order_level']");
    private typeDropdown = () => this.page.locator("//button[@title='Physical']");
    private optionDigital = () => this.page.locator("//span[normalize-space()='Digital']");
    private buttonBrowseOfBanner = () => this.page.locator("(//div[normalize-space()='Browse'])[2]");
    private buttonUploadNew = () => this.page.locator("//a[normalize-space()='Upload New']");
    private uppyInputFile = () => this.page.locator("input.uppy-Dashboard-input[type='file']");
    private filePath: string = SystemHelper.getFilePath('test_data/UK.jpg');
    private buttonAddFiles = () => this.page.locator("//button[normalize-space()='Add Files']");
    private uploadedImage1 = () => this.page.locator("//div[@title='UK.jpg']//img[@class='img-fit']");
    private uploadedImage2 = () => this.page.locator("(//div[@title='UK.jpg']//img[@class='img-fit'])[2]");
    private buttonBrowseOfIcon = () => this.page.locator("(//div[normalize-space()='Browse'])[3]");
    private inputMetaTitle = () => this.page.locator("//input[@placeholder='Meta Title']");
    private inputMetaDescription = () => this.page.locator("//textarea[@name='meta_description']");
    private dropdownFilteringAttributes = () => this.page.locator("//div[contains(text(),'Nothing selected')]");
    private inputFilteringAttributes = () => this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']");
    private optionBamboo = () => this.page.locator("//span[normalize-space()='Bamboo']").first();
    private buttonSave = () => this.page.locator("//button[normalize-space()='Save']");
    private inputSearch = () => this.page.locator("//input[@id='search']");
    private nameOfCreatedCategory = () => this.page.locator("//td[normalize-space()='Bin Category']");
    private parentOfCreatedCategory = () => this.page.locator("//tbody//tr//td[3]");
    private orderLevelOfCreatedCategory = () => this.page.locator("//td[normalize-space()='99']");
    private levelOfCreatedCategory = () => this.page.locator("//td[normalize-space()='0']");
    private bannerOfCreatedCategory = () => this.page.locator("//img[@alt='Banner']");
    private iconOfCreatedCategory = () => this.page.locator("//img[@alt='Icon']");
    private featuredOfCreatedCategory = () => this.page.locator("//tr[.//td[normalize-space()='Bin Category']]//input[@type='checkbox']");
    private commissionOfCreatedCategory = () => this.page.locator("//td[normalize-space()='0 %']");
    private iconDelete = () => this.page.locator("//i[@class='las la-trash']");
    private linkDelete = () => this.page.locator("//a[@id='delete-link']");
    private iconThreeIdots = () => this.page.locator("(//i[contains(@class,'la-ellipsis-v')]/parent::a)[1]");
    private optionDelete = () => this.page.locator("//div[@class='dropdown-menu dropdown-menu-right show']//span[contains(text(),'Delete')]");
    private buttonDelete = () => this.page.locator("//a[contains(@class,'comfirm-link') and normalize-space()='Delete']");
    private iconEdit = () => this.page.locator("//a[@title='Edit']");
    private nameOfUpdatedCategory = () => this.page.locator("//td[normalize-space()='Bin Category Updated']");
    private featuredOfUpdatedCategory = () => this.page.locator("//tr[.//td[normalize-space()='Bin Category Updated']]//input[@type='checkbox']");
    private nodataAfterDelete = () => this.page.locator("//td[normalize-space()='Nothing found']");


    async addNewCategory() {
        await this.buttonAddNewCategory().click();
        await this.inputName().fill('Bin Category');
        await this.inputOrderingNumber().fill('99');
        await this.typeDropdown().click();
        await this.optionDigital().click();
        await this.buttonBrowseOfBanner().click();
        await this.buttonUploadNew().click();
        await this.uppyInputFile().setInputFiles(this.filePath);
        await this.buttonAddFiles().click();
        await this.buttonBrowseOfBanner().click();
        await this.uploadedImage1().click();
        await this.buttonAddFiles().click();
        await this.buttonBrowseOfIcon().click();
        await this.uploadedImage2().click();
        await this.buttonAddFiles().click();
        await this.inputMetaTitle().fill('Bin Meta Title');
        await this.inputMetaDescription().fill('Bin Meta Description');
        await this.dropdownFilteringAttributes().click();
        await this.inputFilteringAttributes().pressSequentially('Bamboo', { delay: 100 });
        await this.optionBamboo().click();
        await this.buttonSave().click();
    }

    async checkAddedCategory() {
        await this.inputSearch().fill('Bin Category');
        await this.inputSearch().press('Enter');
        await expect(this.nameOfCreatedCategory()).toBeVisible();
        await expect(this.nameOfCreatedCategory()).toHaveText('Bin Category');
        await expect(this.parentOfCreatedCategory()).toHaveText('—');
        await expect(this.orderLevelOfCreatedCategory()).toHaveText('99');
        await expect(this.levelOfCreatedCategory()).toHaveText('0');
        await expect(this.bannerOfCreatedCategory()).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.iconOfCreatedCategory()).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.featuredOfCreatedCategory()).not.toBeChecked();
        await expect(this.commissionOfCreatedCategory()).toHaveText('0 %');
    }

    async updateAddedCategory() {
        await this.inputSearch().fill('Bin Category');
        await this.inputSearch().press('Enter');
        await this.iconEdit().click();
        await this.inputName().fill('Bin Category Updated');
        await this.buttonSave().click();
    }

    async checkUpdatedCategory() {
        await this.clickMenuCategory();
        await this.inputSearch().fill('Bin Category Updated');
        await this.inputSearch().press('Enter');
        await expect(this.nameOfUpdatedCategory()).toBeVisible();
        await expect(this.nameOfUpdatedCategory()).toHaveText('Bin Category Updated');
        await expect(this.parentOfCreatedCategory()).toHaveText('—');
        await expect(this.orderLevelOfCreatedCategory()).toHaveText('99');
        await expect(this.levelOfCreatedCategory()).toHaveText('0');
        await expect(this.bannerOfCreatedCategory()).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.iconOfCreatedCategory()).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.featuredOfUpdatedCategory()).not.toBeChecked();
        await expect(this.commissionOfCreatedCategory()).toHaveText('0 %');
    }

    async deleteCategory() {
        await this.inputSearch().fill('Bin Category Updated');
        await this.inputSearch().press('Enter');
        await this.iconDelete().click();
        await this.linkDelete().click();
        await this.inputSearch().fill('Bin Category Updated');
        await this.inputSearch().press('Enter');
        await expect(this.nodataAfterDelete()).toBeVisible();
        await expect(this.nodataAfterDelete()).toHaveText('Nothing found');
        await this.clickMenuUploadedFiles();
        await this.iconThreeIdots().click();
        await this.optionDelete().click();
        await this.buttonDelete().click();
    }
}
