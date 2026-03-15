import { expect } from '@playwright/test';
import BasePage from './BasePage';

export class ProjectsPage extends BasePage {

    private titleProjectPage = () => this.page.locator("//span[normalize-space()='Projects Summary']");
    private inputSearchProject = () => this.page.locator("//input[@aria-controls='projects']");
    private itemCustomerFirst = () => this.page.locator("//a[normalize-space()='Bin Project']");
    private buttonNewProject = () => this.page.locator("//a[normalize-space()='New Project']");
    private inputProjectName = () => this.page.locator("//input[@id='name']");
    private inputCustomer = () => this.page.locator("//button[@data-id='clientid']");
    private searchCustomer = () => this.page.locator("//input[@aria-controls='bs-select-6']");
    private selectCustomer = () => this.page.locator("//span[normalize-space()='Bin Customer']");
    private checkBoxCalculate = () => this.page.locator("//label[normalize-space()='Calculate progress through tasks']");
    private saveProject = () => this.page.locator("//button[normalize-space()='Save']");
    private projectNameCustomer = () => this.page.locator("//button[@title='Bin Project - Bin Customer']");
    private projectProgress = () => this.page.locator("//p[contains(@class,'project-info')]");
    private customer = () => this.page.locator("//dt[normalize-space()='Customer']");
    private projectNameCreated = () => this.page.locator("//a[normalize-space()='Bin Customer']");
    private status = () => this.page.locator("//dt[normalize-space()='Status']");
    private statusProject = () => this.page.locator("//dd[normalize-space()='In Progress']");
    private alertSuccess = () => this.page.locator("//span[@class='alert-title']");
    private projectNameOnProjectTab = () => this.page.locator("//a[normalize-space()='Bin Project']");
    private deleteProject = () => this.page.locator("//a[@class='text-danger _delete']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']");
    private noData = () => this.page.locator("//td[@class='dataTables_empty']");
    private sliderTrack = () => this.page.locator("//div[contains(@class,'ui-slider')]");

    async verifyNavigateToProjectPage() {
        await expect(this.titleProjectPage()).toBeVisible();
        await expect(this.titleProjectPage()).toHaveText('Projects Summary');
    }

    async clickButtonAddNewCustomer() {
        await this.buttonNewProject().click();
    }

    async moveSliderToMiddle() {
        const track = this.sliderTrack();
        const box = await track.boundingBox();
        if (!box) throw new Error('Slider track not visible');

        const y = box.y + box.height / 2;
        const startX = box.x + 2;
        const middleX = box.x + box.width / 2;

        await this.page.mouse.move(startX, y);
        await this.page.mouse.down();
        await this.page.mouse.move(middleX, y, { steps: 20 });
        await this.page.mouse.up();
    }


    async submitDataForNewCustomer() {
        await this.inputProjectName().fill('Bin Project');
        await this.inputCustomer().click();
        await this.searchCustomer().pressSequentially('Bin Customer', { delay: 100 });
        await this.selectCustomer().click();
        await this.checkBoxCalculate().click();
        await this.moveSliderToMiddle();
        await this.saveProject().click();
    }

    async verifyProjectCreated() {
        await expect(this.alertSuccess()).toHaveText('Project added successfully.');
        await expect(this.projectNameCustomer()).toHaveText('Bin Project - Bin Customer');
        await expect(this.projectProgress()).toHaveText('Project Progress 50%');
        await expect(this.customer()).toBeVisible();
        await expect(this.projectNameCreated()).toHaveText('Bin Customer');
        await expect(this.status()).toBeVisible();
        await expect(this.statusProject()).toHaveText('In Progress');
    }

    async searchAndCheckCustomerInTable() {
        await this.inputSearchProject().fill('Bin Project');
        await expect(this.itemCustomerFirst()).toHaveText('Bin Project');
    }

    async moveToProjectName() {
        await this.projectNameOnProjectTab().hover();
    }

    async clickAndDeleteProject() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.deleteProject().click();
        await this.buttonX().click();
    }

    async searchAndCheckProjectInTable() {
        await this.inputSearchProject().fill('Bin Project');
    }

    async verifyNoDataAfterDeletedProject() {
        await expect(this.noData()).toBeVisible();
        await expect(this.noData()).toHaveText('No matching records found');
    }
}
