import { test } from './BaseTest';
import { Menu } from '@constants/crm';
import { taskData } from '@data/crm/task.data';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Task Successfully', async ({ tasksPage, CRMBasePage }) => {
        await CRMBasePage.clickValue(Menu.TASKS);
        await tasksPage.verifyNavigateToTasksPage();
        await tasksPage.clickButtonSwitchToKanBan();
        await tasksPage.verifyNavigateToKanbanPage();
        await tasksPage.clickButtonAddNewTask();
        await tasksPage.verifyAddNewTaskPopUp();
        await tasksPage.submitDataForNewTask(taskData);
        await tasksPage.verifyNewTaskAfterCreated(taskData);
        await tasksPage.markCompletedAndRefreshPage(taskData);
        await tasksPage.verifyCompleteTasksAfterRefreshed(taskData);
        await tasksPage.editTask(taskData);
        await tasksPage.searchAndVerifyAfterSearch(taskData);
        await tasksPage.dragAndDropTask();
        await tasksPage.verifyTotalTasksAfterDragDrop(taskData);
        await tasksPage.searchAndDeleteTask(taskData);
        await tasksPage.searchAfterDeleted(taskData);
        await tasksPage.verifyNoDataAfterDeleted();
        await tasksPage.clickDismissAlert();
    });
});
