import { Option, Dropdown, Message } from '@constants/crm';
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Project } from '@models/types/crm/project.model'
import { expect } from '@playwright/test';

export class ProjectsPage extends CRMBasePage {

    private get titleProjectPage() {
        return this.page.locator("//span[normalize-space()='Projects Summary']")
    }

    private get buttonNewProject() {
        return this.page.locator("//a[normalize-space()='New Project']")
    }

    private get inputSearchProject() {
        return this.page.locator("//input[@aria-controls='projects']")
    }

    itemCustomerFirst(customerName: string) {
        return this.page.locator(`//a[normalize-space()='${customerName}']`)
    }

    private get inputProjectName() {
        return this.page.locator("#name")
    }

    private get checkBoxCalculate() {
        return this.page.locator("//label[normalize-space()='Calculate progress through tasks']")
    }

    private get saveProject() {
        return this.page.locator("//button[normalize-space()='Save']")
    }

    projectNameCustomer(name: string) {
        return this.page.locator(`//button[@title='${name}']`)
    }

    private get projectProgress() {
        return this.page.locator("//p[contains(@class,'project-info')]")
    }

    private get customer() {
        return this.page.locator("//dt[normalize-space()='Customer']")
    }

    projectNameCreated(name: string) {
        return this.page.locator(`//a[normalize-space()='${name}']`)
    }

    private get statusProject() {
        return this.page.locator("//dd[normalize-space()='In Progress']")
    }

    projectNameOnProjectTab(name: string) {
        return this.page.locator(`//a[normalize-space()='${name}']`)
    }

    private get sliderTrack() {
        return this.page.locator("//div[contains(@class,'ui-slider')]")
    }

    async clickNewProject() {
        await this.buttonNewProject.click();
    }

    async verifyNavigateToProjectPage() {
        await expect(this.titleProjectPage).toBeVisible();
    }

    async moveSliderToMiddle() {
        const track = this.sliderTrack;
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

    async submitDataForNewProject(data: Project) {
        await this.inputProjectName.fill(data.name);
        await this.selectDropdownWithSearch(Dropdown.CLIENT_ID, 6, data.customer);
        await this.checkBoxCalculate.click();
        await this.moveSliderToMiddle();
        await this.selectDropdownBySpanText(Dropdown.BILLING_TYPE, Option.PROJECTHOURS);
        await this.saveProject.click();
    }

    async verifyProjectCreated(data: Project) {
        await expect(this.getAlert()).toHaveText(Message.CREATEDPROJECT);
        await expect(this.projectNameCustomer(data.verifyProjectNameCustomer)).toHaveText(data.verifyProjectNameCustomer);
        await expect(this.projectNameCreated(data.customer)).toHaveText(data.customer);
        await expect(this.statusProject).toHaveText(data.verifyStatusProject);
    }

    async searchAndCheckProjectInTable(data: Project) {
        await this.inputSearchProject.fill(data.name);
        await expect(this.itemCustomerFirst(data.name)).toHaveText(data.name);
    }

    async moveToProjectName(data: Project) {
        await this.projectNameOnProjectTab(data.name).hover();
    }

    async clickAndDeleteProject() {
        await this.acceptAlert();
        await this.getButtonDelete().click();
        await this.getbuttonCloseAlert().click();
    }

    async searchAndverifyNoData(data: Project) {
        await this.inputSearchProject.fill(data.name);
        await expect(this.getNoData()).toBeVisible();
    }
}
