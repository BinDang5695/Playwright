import { expect } from '@playwright/test';
import BasePage from './BasePage';

export class TasksPage extends BasePage {

    private titleTaskPage = () => this.page.locator("//span[normalize-space()='Tasks Summary']");
    private switchToKanBan = () => this.page.locator("//i[@class='fa-solid fa-grip-vertical']");
    private switchToList = () => this.page.locator("//i[@class='fa-solid fa-table-list']");
    private completeTaskTotal = () => this.page.locator("(//div[@class='panel-heading'])[5]");
    private notStartedTaskTotal = () => this.page.locator("(//div[@class='panel-heading'])[1]");
    private completeTaskAfterDragDrop = () => this.page.locator("//div[@class='panel-heading' and normalize-space()='Complete - 0 Tasks']");
    private newTaskButton = () => this.page.locator("//a[normalize-space()='New Task']");
    private titleAddNewTaskPopUp = () => this.page.locator("//h4[normalize-space()='Add new task']");
    private inputStartDate = () => this.page.locator("//input[@id='startdate']");
    private titleSubject = () => this.page.locator("//label[@for='name']");
    private inputSubject = () => this.page.locator("//input[@id='name']");
    private saveTask = () => this.page.locator("//button[normalize-space()='Save']");
    private alertAddNewTaskSuccess = () => this.page.locator("//span[@class='alert-title']");
    private taskName = () => this.page.locator("//h4[contains(@class,'modal-title ')]");
    private taskStatus = () => this.page.locator("//span[contains(@class,'trigger') and normalize-space()='In Progress']");
    private markComplete = () => this.page.locator("//i[@class='fa fa-check']");
    private closePopUp = () => this.page.locator("//div[@class='modal-header task-single-header']//button[@aria-label='Close']");
    private searchOnKanBan = () => this.page.locator("//input[@id='search']");
    private nodataNotStarted = () => this.page.locator("(//h4[normalize-space()='No Tasks Found'])[1]");
    private nodataInprogress = () => this.page.locator("(//h4[normalize-space()='No Tasks Found'])[2]");
    private nodataTesting = () => this.page.locator("(//h4[normalize-space()='No Tasks Found'])[3]");
    private nodataAwaitingFeedback = () => this.page.locator("(//h4[normalize-space()='No Tasks Found'])[4]");
    private menu = () => this.page.locator("//a[@class='trigger manual-popover mright5']");
    private editOption = () => this.page.locator("//div[@class='popover-content']//ul//li//a[@href='#'][normalize-space()='Edit']");
    private binTask = () => this.page.locator("//span[normalize-space()='Bin Task']");
    private from = () => this.page.locator("//ul[5]//li[1]//div[1]//div[2]//div[1]//ul[1]//li[1]");
    private to = () => this.page.locator("//ul[1]//li[1]//div[1]//div[2]//div[1]//ul[1]//li[1]");
    private searchOnList = () => this.page.locator("//input[@aria-controls='tasks']");
    private binEditedTaskOnList = () => this.page.locator("//a[normalize-space()='NashTech']");
    private deleteTask = () => this.page.locator("//a[normalize-space()='Delete']");
    private nodataTask = () => this.page.locator("//td[@class='dataTables_empty']");
    private dismissAlert = () => this.page.locator("//button[@data-dismiss='alert']");

    async verifyNavigateToTasksPage() {
        await expect(this.titleTaskPage()).toHaveText('Tasks Summary');
        await expect(this.switchToKanBan()).toBeVisible();
    }

    async clickButtonSwitchToKanBan() {
        await this.switchToKanBan().click();
    }

    async scrollHorizontal() {
        await this.page.mouse.wheel(500, 0);
    }

    async verifyNavigateToKanbanPage() {
        await expect(this.switchToList()).toBeVisible();
    }

    async clickButtonAddNewTask() {
        await this.page.waitForLoadState('networkidle');
        await this.newTaskButton().click();
    }

    async verifyAddNewTaskPopUp() {
        await expect(this.titleAddNewTaskPopUp()).toBeVisible();
        await expect(this.titleAddNewTaskPopUp()).toHaveText('Add new task');

        await expect(this.inputSubject()).toBeVisible();
        await expect(this.titleSubject()).toHaveText('* Subject');

        await expect(this.inputStartDate()).toBeVisible();

        const value = await this.inputStartDate().inputValue();
        const today = new Date().toLocaleDateString('en-GB').replaceAll('/', '-');
        expect(value).toContain(today);
    }

    async submitDataForNewTask() {
        await this.inputSubject().fill('Bin Task');
        await this.saveTask().click();
    }

    async verifyNewTaskAfterCreated() {
        await expect(this.alertAddNewTaskSuccess()).toBeVisible();
        await expect(this.alertAddNewTaskSuccess()).toHaveText('Task added successfully.');

        await expect(this.taskName()).toBeVisible();
        const rawText = await this.taskName().textContent();
        const normalizedText = rawText?.replace(/\s+/g, ' ').trim();

        expect(normalizedText).toBe('Bin Task In Progress');

        await expect(this.taskStatus()).toBeVisible();
        await expect(this.taskStatus()).toHaveText('In Progress');
    }

    async markCompletedAndRefreshPage() {
        await this.markComplete().click();
        await this.closePopUp().click();
        await this.page.reload();
        await expect(this.binTask()).toBeVisible();
    }

    async verifyCompleteTasksAfterRefreshed() {
        await expect(this.completeTaskTotal()).toBeVisible();
        await expect(this.completeTaskTotal()).toHaveText('Complete - 1 Tasks');
    }

    async editTask() {
        await this.binTask().click();
        await this.menu().click();
        await this.editOption().click();
        await this.inputSubject().fill('NashTech');
        await this.saveTask().click();
        await this.closePopUp().click();
    }

    async searchAndVerifyAfterSearch() {
        await this.searchOnKanBan().fill('NashTech');
        await expect(this.nodataNotStarted()).toHaveText('No Tasks Found');
        await expect(this.nodataInprogress()).toHaveText('No Tasks Found');
        await expect(this.nodataTesting()).toHaveText('No Tasks Found');
        await expect(this.nodataAwaitingFeedback()).toHaveText('No Tasks Found');
        await this.scrollHorizontal();
    }

    async dragAndDrop() {
        await this.from().dragTo(this.to());
    }

    async verifyTotalTasksAfterDragDrop() {
        await expect(this.completeTaskAfterDragDrop()).toHaveText('Complete - 0 Tasks');
        await expect(this.notStartedTaskTotal()).toHaveText('Not Started - 1 Tasks');
    }

    async searchAndDeleteTask() {
        await this.page.on('dialog', dialog => dialog.accept());
        await this.switchToList().click();
        await this.searchOnList().fill('NashTech');
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.binEditedTaskOnList().hover();
        await this.deleteTask().click();
    }

    async searchAfterDeleted() {
        await this.searchOnList().fill('NashTech');
    }

    async verifyNoDataAfterDeleted() {
        await expect(this.nodataTask()).toHaveText('No matching records found');
    }

    async clickDismissAlert() {
        await expect(this.dismissAlert()).toBeVisible();
        await this.dismissAlert().click();
    }

}
