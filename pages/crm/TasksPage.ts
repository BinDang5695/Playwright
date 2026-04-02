import { expect } from '@playwright/test';
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Header, Status } from '@constants/crm';
import { DateHelpers } from '@models/helpers/DateHelpers';
import { Task } from '@models/types/crm/task.model'

export class TasksPage extends CRMBasePage {

    private get buttonNewTask() {
        return this.page.locator("//a[normalize-space()='New Task']")
    }

    private get titleTaskPage() {
        return this.page.locator("//span[normalize-space()='Tasks Summary']")
    }

    private get switchToKanBan() {
        return this.page.locator("//i[@class='fa-solid fa-grip-vertical']")
    }

    private get switchToList() {
        return this.page.locator("//i[@class='fa-solid fa-table-list']")
    }

    private get completeTaskTotal() {
        return this.page.locator("//div[@class='panel-heading'][contains(text(),'Complete')]")
    }

    private get notStartedTaskTotal() {
        return this.page.locator("//div[@class='panel-heading'][contains(text(),'Not Started')]")
    }

    private get titleAddNewTaskPopUp() {
        return this.page.locator("//h4[normalize-space()='Add new task']")
    }

    private get inputStartDate() {
        return this.page.locator("#startdate")
    }

    private get titleSubject() {
        return this.page.locator("//label[@for='name']")
    }

    private get inputSubject() {
        return this.page.locator("#name")
    }

    private get saveTask() {
        return this.page.locator("//button[normalize-space()='Save']")
    }

    private get taskName() {
        return this.page.locator("//h4[contains(@class,'modal-title ')]")
    }

    private get taskStatus() {
        return this.page.locator("//span[contains(@class,'trigger') and normalize-space()='In Progress']")
    }

    private get markComplete() {
        return this.page.locator("//i[@class='fa fa-check']")
    }

    private get searchOnKanBan() {
        return this.page.locator("#search")
    }

    private get nodataNotStarted() {
        return this.page.locator("//ul[@data-col-status-id='1']//h4[contains(.,'No Tasks Found')]")
    }

    private get nodataInprogress() {
        return this.page.locator("//ul[@data-col-status-id='4']//h4[contains(.,'No Tasks Found')]")
    }

    private get nodataTesting() {
        return this.page.locator("//ul[@data-col-status-id='3']//h4[contains(.,'No Tasks Found')]")
    }

    private get nodataAwaitingFeedback() {
        return this.page.locator("//ul[@data-col-status-id='2']//h4[contains(.,'No Tasks Found')]")
    }

    private get menu() {
        return this.page.locator("//a[@class='trigger manual-popover mright5']")
    }

    private get editOption() {
        return this.page.locator("//div[@class='popover-content']//ul//li//a[@href='#'][normalize-space()='Edit']")
    }

    binTask(name: string) {
        return this.page.locator(`//span[normalize-space()='${name}']`)
    }

    private get from() {
        return this.page.locator("//ul[@data-task-status-id='5']")
    }

    private get to() {
        return this.page.locator(`//ul[@data-col-status-id='1']//h4[contains(.,'No Tasks Found')]`)
    }

    private get searchOnList() {
        return this.page.locator(`//input[@aria-controls='tasks']`)
    }

    binEditedTaskOnList(updatedName: string) {
        return this.page.locator(`//a[normalize-space()='${updatedName}']`)
    }


    async verifyNavigateToTasksPage() {
        await expect(this.titleTaskPage).toBeVisible();
    }

    async clickButtonSwitchToKanBan() {
        await this.switchToKanBan.click();
    }

    async scrollHorizontal() {
        await this.page.mouse.wheel(500, 0);
    }

    async verifyNavigateToKanbanPage() {
        await expect(this.switchToList).toBeVisible();
    }

    async clickButtonAddNewTask() {
        await this.buttonNewTask.click();
    }

    async verifyAddNewTaskPopUp() {
        await expect(this.titleAddNewTaskPopUp).toHaveText(Header.ADDNEWTASK);
        await expect(this.titleSubject).toHaveText(Header.SUBJECT);
        const value = await this.inputStartDate.inputValue();
        expect(value).toContain(DateHelpers.getTodayDDMMYYYY());
    }

    async submitDataForNewTask(data: Task) {
        await this.inputSubject.fill(data.subject);
        await this.saveTask.click();
    }

    async verifyNewTaskAfterCreated(data: Task) {
        await expect(this.getAlert()).toHaveText(data.alertAddNewTaskSuccess);
        await expect(this.taskName).toBeVisible();
        const rawText = await this.taskName.textContent();
        expect(this.normalizeText(rawText)).toBe(data.taskName);
        await expect(this.taskStatus).toHaveText(Status.INPROGRESS);
    }

    async markCompletedAndRefreshPage(data: Task) {
        await this.markComplete.click();
        await this.closePopUp.click();
        await this.page.reload();
        await expect(this.binTask(data.subject)).toBeVisible();
    }

    async verifyCompleteTasksAfterRefreshed(data: Task) {
        await expect(this.completeTaskTotal).toHaveText(data.completeTaskTotal);
    }

    async editTask(data: Task) {
        await this.binTask(data.subject).click();
        await this.menu.click();
        await this.editOption.click();
        await this.inputSubject.fill(data.updatedSubject);
        await this.saveTask.click();
        await this.getbuttonCloseAlert().click();
        await this.closePopUp.click();
    }

    async searchAndVerifyAfterSearch(data: Task) {
        await this.searchOnKanBan.pressSequentially(data.updatedSubject, { delay: 100 });
        await expect(this.nodataNotStarted).toHaveText(data.noData);
        await expect(this.nodataInprogress).toHaveText(data.noData);
        await expect(this.nodataTesting).toHaveText(data.noData);
        await expect(this.nodataAwaitingFeedback).toHaveText(data.noData);
        await this.scrollHorizontal();
    }

    async dragAndDropTask() {
        await this.from.dragTo(this.to);
    }

    async verifyTotalTasksAfterDragDrop(data: Task) {
        await expect(this.completeTaskTotal).toHaveText(data.completeTaskAfterDragDrop);
        await expect(this.notStartedTaskTotal).toHaveText(data.notStartedTaskTotal);
    }

    async searchAndDeleteTask(data: Task) {
        await this.acceptAlert();
        await this.switchToList.click();
        await this.searchOnList.fill(data.updatedSubject);
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.binEditedTaskOnList(data.updatedSubject).hover();
        await this.buttonDelete.click();
    }

    async searchAfterDeleted(data: Task) {
        await this.searchOnList.fill(data.updatedSubject);
    }

    async verifyNoDataAfterDeleted() {
        await expect(this.getNoData()).toBeVisible();
    }

    async clickDismissAlert() {
        await this.getbuttonCloseAlert().click();
    }

}
