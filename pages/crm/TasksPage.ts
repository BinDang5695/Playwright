import { expect } from '@playwright/test';
import { CRMBasePage } from './CRMBasePage';
import { Button, Header, Number, Input, Status, Label, Href, Delay } from '@constants/crm';
import { DateHelpers } from '../../models/helpers/DateHelpers';
import { Task } from '@models/types/task.model'

export class TasksPage extends CRMBasePage {

    get buttonNewTask() {
        return this.getLinkByText(Button.NEWTASK);
    }

    get titleTaskPage() {
        return this.getValue(Header.TASKS_SUMMARY);
    } 

    get switchToKanBan() {
        return this.getLi(Button.VERTICAL);
    }

    get switchToList() {
        return this.getLi(Button.TABLE_LIST);
    }

    get completeTaskTotal() {
        return this.getStatus(Status.COMPLETE);
    }

    get notStartedTaskTotal() {
        return this.getStatus(Status.NOTSTARTED);
    }

    get titleAddNewTaskPopUp() {
        return this.getValue6(Header.ADDNEWTASK);
    }

    get inputStartDate() {
        return this.getInputById(Input.STARTDATE);
    }

    get titleSubject() {
        return this.getLabel(Label.NAME);
    }

    get inputSubject() {
        return this.getInputById(Input.NAME);
    }

    get saveTask() {
        return this.getButtonByText(Button.SAVE);
    }

    get taskName() {
        return this.getTab4(Header.MODAL_TITLE);
    }

    get taskStatus() {
        return this.getSpan(Status.INPROGRESS);
    }

    get markComplete() {
        return this.getLi(Button.FA_CHECK);
    }

    get searchOnKanBan() {
        return this.getInputById(Input.SEARCH);
    }

    get nodataNotStarted() {
        return this.getTab5(Number.ONE);
    }

    get nodataInprogress() {
        return this.getTab5(Number.FOUR);
    }

    get nodataTesting() {
        return this.getTab5(Number.THREE);
    }

    get nodataAwaitingFeedback() {
        return this.getTab5(Number.TWO);
    }

    get menu() {
        return this.getBText(Button.TRIGGER);
    }

    get editOption() {
        return this.getCheckbox3(Href.EDIT);
    }

    binTask(data: string) {
        return this.getValue(data);
    }

    get from() {
        return this.getTab6(Number.FIVE);
    }

    get to() {
        return this.getTab5(Number.ONE);
    }

    get searchOnList() {
        return this.getInputAriaControls(Input.TASKS);
    }

    binEditedTaskOnList(data: string) {
        return this.getLinkByText(data);
    }

    async verifyNavigateToTasksPage() {
        await this.verifyText(this.titleTaskPage, Header.TASKS_SUMMARY);
    }

    async clickButtonSwitchToKanBan() {
        await this.click(this.switchToKanBan);
    }

    async scrollHorizontal() {
        await this.page.mouse.wheel(500, 0);
    }

    async verifyNavigateToKanbanPage() {
        await this.waitVisible(this.switchToList);
    }

    async clickButtonAddNewTask() {
        await this.click(this.buttonNewTask);
    }

    async verifyAddNewTaskPopUp() {
        await this.verifyText(this.titleAddNewTaskPopUp, Header.ADDNEWTASK);
        await this.verifyText(this.titleSubject, Header.SUBJECT);
        const value = await this.inputStartDate.inputValue();
        expect(value).toContain(DateHelpers.getTodayDDMMYYYY());
    }

    async submitDataForNewTask(data: Task) {
        await this.type(this.inputSubject, data.subject);
        await this.click(this.saveTask);
    }

    async verifyNewTaskAfterCreated(data: Task) {
        await this.verifyText(this.getAlert(), data.alertAddNewTaskSuccess);
        await this.waitVisible(this.taskName);
        const rawText = await this.taskName.textContent();
        expect(this.normalizeText(rawText)).toBe(data.taskName);
        await this.verifyText(this.taskStatus, Status.INPROGRESS);
    }

    async markCompletedAndRefreshPage(data: Task) {
        await this.click(this.markComplete);
        await this.click(this.closePopUp);
        await this.reloadPage();
        await this.waitVisible(this.binTask(data.subject));
    }

    async verifyCompleteTasksAfterRefreshed(data: Task) {
        await this.verifyText(this.completeTaskTotal, data.completeTaskTotal);
    }

    async editTask(data: Task) {
        await this.click(this.binTask(data.subject));
        await this.click(this.menu);
        await this.click(this.editOption);
        await this.type(this.inputSubject, data.updatedSubject);
        await this.click(this.saveTask);
        await this.click(this.getbuttonCloseAlert());
        await this.click(this.closePopUp);
    }

    async searchAndVerifyAfterSearch(data: Task) {
        await this.type(this.searchOnKanBan, data.updatedSubject, Delay.ONE_HUNDRED_MILLISECONDS);
        await this.page.waitForTimeout(1000);
        await this.verifyText(this.nodataNotStarted, data.noData);
        await this.verifyText(this.nodataInprogress, data.noData);
        await this.verifyText(this.nodataTesting, data.noData);
        await this.verifyText(this.nodataAwaitingFeedback, data.noData);
        await this.scrollHorizontal();
    }

    async dragAndDropTask() {
        await this.dragAndDrop(this.from, this.to);
    }

    async verifyTotalTasksAfterDragDrop(data: Task) {
        await this.verifyText(this.completeTaskTotal, data.completeTaskAfterDragDrop);
        await this.verifyText(this.notStartedTaskTotal, data.notStartedTaskTotal);
    }

    async searchAndDeleteTask(data: Task) {
        await this.acceptAlert();
        await this.click(this.switchToList);
        await this.type(this.searchOnList, data.updatedSubject);
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.hover(this.binEditedTaskOnList(data.updatedSubject));
        await this.click(this.buttonDelete);
    }

    async searchAfterDeleted(data: Task) {
        await this.type(this.searchOnList, data.updatedSubject);
    }

    async verifyNoDataAfterDeleted() {
        await this.waitVisible(this.getNoData());
    }

    async clickDismissAlert() {
        await this.click(this.getbuttonCloseAlert());
    }

}
