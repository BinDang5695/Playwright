import { expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { Header, Message } from '@constants/crm';
import { DateHelpers } from '@models/helpers/DateHelpers';
import { Task } from '@models/types/ui/task.model'

export class TasksPage extends BasePage {

    private get buttonNewTask() {
        return this.page.locator("//a[normalize-space()='New Task']")
    }

    private get switchToKanBan() {
        return this.page.locator("//i[@class='fa-solid fa-grip-vertical']")
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

    private binTask(name: string) {
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

    private binEditedTaskOnList(updatedName: string) {
        return this.page.locator(`//a[normalize-space()='${updatedName}']`)
    }

    async clickButtonSwitchToKanBan() {
        await this.switchToKanBan.click();
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

    async inputToCreateNewTask(data: Task) {
        await this.inputSubject.fill(data.subject);
    }

    async clickButtonSave() {
        await this.saveTask.click();
    }

    async verifyNewTaskAfterCreated(data: Task) {
        await expect(this.getAlert).toHaveText(Message.CREATEDTASK);
        await expect(this.taskName).toBeVisible();
        const rawText = await this.taskName.textContent();
        expect(this.normalizeText(rawText)).toBe(data.taskName);
        await expect(this.taskStatus).toHaveText(data.status);
    }
    async hoverToCreatedTask(data: Task) {
        await this.binTask(data.subject).hover();
    }

    async hoverToUpdatedTask(data: Task) {
        await this.binEditedTaskOnList(data.updatedSubject).hover();
    }

    async clickCreatedTask(subject: string) {
        await this.binTask(subject).click();
    }

    async markCompletedTask() {
        await this.markComplete.click();
    }

    async verifyCompleteTasksAfterRefreshed(data: Task) {
        await expect(this.completeTaskTotal).toHaveText(data.completeTaskTotal);
    }

    async clickMenu() {
        await this.menu.click();
    }

    async clickEditOption() {
        await this.editOption.click();
    }

    async editTask(data: Task) {
        await this.inputSubject.fill(data.updatedSubject);
    }

    async searchTaskOnKanBan(subject: string) {
        await this.searchOnKanBan.pressSequentially(subject, { delay: 100 });
    }

    async searchTaskOnList(subject: string) {
        await this.searchOnList.pressSequentially(subject, { delay: 100 });
    }

    async verifyAfterSearch(data: Task) {
        await expect(this.nodataNotStarted).toHaveText(data.noData);
        await expect(this.nodataInprogress).toHaveText(data.noData);
        await expect(this.nodataTesting).toHaveText(data.noData);
        await expect(this.nodataAwaitingFeedback).toHaveText(data.noData);
    }

    async dragAndDropTask() {
        await this.from.dragTo(this.to);
    }

    async verifyTotalTasksAfterDragDrop(data: Task) {
        await expect(this.completeTaskTotal).toHaveText(data.completeTaskAfterDragDrop);
        await expect(this.notStartedTaskTotal).toHaveText(data.notStartedTaskTotal);
    }

    async searchAfterDeleted(data: Task) {
        await this.searchOnList.fill(data.updatedSubject);
    }

}
