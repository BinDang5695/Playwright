import { expect } from '@playwright/test';
import { CMSBasePage } from '@pages/cms/CMSBasePage';
import { SystemHelper } from '../../models/helpers/SystemHelper';
import { Category } from '@models/types/cms/category.model';
import { Menu } from '@constants/crm';

export class CategoryPage extends CMSBasePage {

    private get buttonAddNewCategory() {
        return this.page.locator("//span[normalize-space()='Add New category']")
    };

    private get inputName() {
        return this.page.locator("#name")
    };

    private get inputOrderingNumber() {
        return this.page.locator("#order_level")
    };

    private get typeDropdown() {
        return this.page.locator("//button[@title='Physical']")
    };

    private get optionDigital() {
        return this.page.locator("//span[normalize-space()='Digital']")
    };

    private get buttonBrowseOfBanner() {
        return this.page.locator("(//div[normalize-space()='Browse'])[2]")
    };

    private get buttonUploadNew() {
        return this.page.locator("//a[normalize-space()='Upload New']")
    };

    private get uppyInputFile() {
        return this.page.locator("input.uppy-Dashboard-input[type='file']")
    };

    private get filePath() {
        return SystemHelper.getFilePath('test_data/UK.jpg');
    };

    private get buttonAddFiles() {
        return this.page.locator("//button[normalize-space()='Add Files']")
    };

    private get uploadedImage1() {
        return this.page.locator("//div[@title='UK.jpg']//img[@class='img-fit']")
    };

    private get uploadedImage2() {
        return this.page.locator("(//div[@title='UK.jpg']//img[@class='img-fit'])[2]")
    };

    private get buttonBrowseOfIcon() {
        return this.page.locator("(//div[normalize-space()='Browse'])[3]")
    };

    private get inputMetaTitle() {
        return this.page.locator("//input[@placeholder='Meta Title']")
    };

    private get inputMetaDescription() {
        return this.page.locator("//textarea[@name='meta_description']")
    };

    private get dropdownFilteringAttributes() {
        return this.page.locator("//div[contains(text(),'Nothing selected')]")
    };

    private get inputFilteringAttributes() {
        return this.page.locator("//div[@class='dropdown-menu show']//input[@aria-label='Search']")
    };

    private get optionBamboo() {
        return this.page.locator("//span[normalize-space()='Bamboo']").first()
    };

    private get buttonSave() {
        return this.page.locator("//button[normalize-space()='Save']")
    };

    private get inputSearch() {
        return this.page.locator("#search")
    };

    nameOfCreatedCategory(name: string) {
        return this.page.locator(`//td[normalize-space()='${name}']`)
    };

    private get parentOfCreatedCategory() {
        return this.page.locator("//tbody//tr//td[3]")
    };

    orderLevelOfCreatedCategory(level: string) {
        return this.page.locator(`//td[normalize-space()='${level}']`)
    };

    private get levelOfCreatedCategory() {
        return this.page.locator("//td[normalize-space()='0']")
    };

    private get bannerOfCreatedCategory() {
        return this.page.locator("//img[@alt='Banner']")
    };

    private get iconOfCreatedCategory() {
        return this.page.locator("//img[@alt='Icon']")
    };

    private get featuredOfCreatedCategory() {
        return this.page.locator("//tr[.//td[normalize-space()='Bin Category']]//input[@type='checkbox']")
    };

    private get commissionOfCreatedCategory() {
        return this.page.locator("//td[normalize-space()='0 %']")
    };

    private get iconDelete() {
        return this.page.locator("//i[@class='las la-trash']")
    };

    private get linkDelete() {
        return this.page.locator("//a[@id='delete-link']")
    };

    private get iconThreeIdots() {
        return this.page.locator("(//i[contains(@class,'la-ellipsis-v')]/parent::a)[1]")
    };

    private get optionDelete() {
        return this.page.locator("//div[@class='dropdown-menu dropdown-menu-right show']//span[contains(text(),'Delete')]")
    };

    private get buttonDelete() {
        return this.page.locator("//a[contains(@class,'comfirm-link') and normalize-space()='Delete']")
    };

    private get iconEdit() {
        return this.page.locator("//a[@title='Edit']")
    };

    nameOfUpdatedCategory(updatedName: string) {
        return this.page.locator(`//td[normalize-space()='${updatedName}']`)
    };

    private get featuredOfUpdatedCategory() {
        return this.page.locator("//tr[.//td[normalize-space()='Bin Category Updated']]//input[@type='checkbox']")
    };

    private get nodataAfterDelete() {
        return this.page.locator("//td[normalize-space()='Nothing found']")
    };

    async addNewCategory(data: Category) {
        await this.buttonAddNewCategory.click();
        await this.inputName.fill(data.name);
        await this.inputOrderingNumber.fill(data.orderingNumber);
        await this.typeDropdown.click();
        await this.optionDigital.click();
        await this.buttonBrowseOfBanner.click();
        await this.buttonUploadNew.click();
        await this.uppyInputFile.setInputFiles(this.filePath);
        await this.buttonAddFiles.click();
        await this.buttonBrowseOfBanner.click();
        await this.uploadedImage1.click();
        await this.buttonAddFiles.click();
        await this.buttonBrowseOfIcon.click();
        await this.uploadedImage2.click();
        await this.buttonAddFiles.click();
        await this.inputMetaTitle.fill(data.metaTitle);
        await this.inputMetaDescription.fill(data.metaDescription);
        await this.dropdownFilteringAttributes.click();
        await this.inputFilteringAttributes.pressSequentially(data.filteringAttributes, { delay: 100 });
        await this.optionBamboo.click();
        await this.buttonSave.click();
    }

    async checkAddedCategory(data: Category) {
        await this.inputSearch.fill(data.name);
        await this.inputSearch.press('Enter');
        await expect(this.nameOfCreatedCategory(data.name)).toBeVisible();
        await expect(this.nameOfCreatedCategory(data.name)).toHaveText(data.name);
        await expect(this.parentOfCreatedCategory).toHaveText('—');
        await expect(this.orderLevelOfCreatedCategory(data.orderingNumber)).toHaveText(data.orderingNumber);
        await expect(this.levelOfCreatedCategory).toHaveText('0');
        await expect(this.bannerOfCreatedCategory).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.iconOfCreatedCategory).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.featuredOfCreatedCategory).not.toBeChecked();
        await expect(this.commissionOfCreatedCategory).toHaveText('0 %');
    }

    async updateAddedCategory(data: Category) {
        await this.inputSearch.fill(data.name);
        await this.inputSearch.press('Enter');
        await this.iconEdit.click();
        await this.inputName.fill(data.updatedName);
        await this.buttonSave.click();
    }

    async checkUpdatedCategory(data: Category) {
        await this.clickByMenuName(Menu.CATEGORY);
        await this.inputSearch.fill(data.updatedName);
        await this.inputSearch.press('Enter');
        await expect(this.nameOfUpdatedCategory(data.updatedName)).toBeVisible();
        await expect(this.nameOfUpdatedCategory(data.updatedName)).toHaveText(data.updatedName);
        await expect(this.parentOfCreatedCategory).toHaveText('—');
        await expect(this.orderLevelOfCreatedCategory(data.orderingNumber)).toHaveText(data.orderingNumber);
        await expect(this.levelOfCreatedCategory).toHaveText('0');
        await expect(this.bannerOfCreatedCategory).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.iconOfCreatedCategory).toHaveAttribute('src', expect.stringContaining('https://cms.anhtester.com/public/uploads/all/'));
        await expect(this.featuredOfUpdatedCategory).not.toBeChecked();
        await expect(this.commissionOfCreatedCategory).toHaveText('0 %');
    }

    async deleteCategory(data: Category) {
        await this.inputSearch.fill(data.updatedName);
        await this.inputSearch.press('Enter');
        await this.iconDelete.click();
        await this.linkDelete.click();
        await this.inputSearch.fill(data.updatedName);
        await this.inputSearch.press('Enter');
        await expect(this.nodataAfterDelete).toBeVisible();
        await expect(this.nodataAfterDelete).toHaveText('Nothing found');
        await this.clickByMenuName(Menu.UPLOADEDFILES);
        await this.iconThreeIdots.click();
        await this.optionDelete.click();
        await this.buttonDelete.click();
    }
}
