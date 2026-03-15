import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Task Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuTasks();
        await pages.tasksPage().verifyNavigateToTasksPage();
        await pages.tasksPage().clickButtonSwitchToKanBan();
        await pages.tasksPage().verifyNavigateToKanbanPage();
        await pages.tasksPage().clickButtonAddNewTask();
        await pages.tasksPage().verifyAddNewTaskPopUp();
        await pages.tasksPage().submitDataForNewTask();
        await pages.tasksPage().verifyNewTaskAfterCreated();
        await pages.tasksPage().markCompletedAndRefreshPage();
        await pages.tasksPage().verifyCompleteTasksAfterRefreshed();
        await pages.tasksPage().editTask();
        await pages.tasksPage().searchAndVerifyAfterSearch();
        await pages.tasksPage().dragAndDrop();
        await pages.tasksPage().verifyTotalTasksAfterDragDrop();
        await pages.tasksPage().searchAndDeleteTask();
        await pages.tasksPage().searchAfterDeleted();
        await pages.tasksPage().verifyNoDataAfterDeleted();
        await pages.tasksPage().clickDismissAlert();
        await pages.headerPage().logout();
    });
});
