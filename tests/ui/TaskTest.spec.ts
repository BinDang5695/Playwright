import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
import { Message } from '@constants/crm';
import { taskData, updatedTaskData } from '@data/ui/task.data';

test.describe.serial('Admin - Task Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Tasks', async () => {
            await BasePage.clickByMenuName(Menu.TASKS);
        });
    });

    test('[TASK_001] Create Task Successfully', async ({ tasksPage }) => {

        await test.step('Switch to Kanban view', async () => {
            await tasksPage.clickButtonSwitchToKanBan();
        });

        await test.step('Open the New Task form', async () => {
            await tasksPage.clickButtonAddNewTask();
        });

        await test.step('Verify Add New Task popup is displayed', async () => {
            await tasksPage.verifyAddNewTaskPopUp();
        });

        await test.step('Create a new task', async () => {
            await tasksPage.inputToCreateNewTask(taskData);
        });

        await test.step('Create a new task', async () => {
            await tasksPage.clickButtonSave();
        });

        await test.step('Verify the task is created successfully', async () => {
            await tasksPage.verifyNewTaskAfterCreated(taskData);
        });

    });

    test('[TASK_002] Complete Task Successfully', async ({ BasePage, tasksPage }) => {

        await test.step('Switch to Kanban view', async () => {
            await tasksPage.clickButtonSwitchToKanBan();
        });

        await test.step('Search for the existing task', async () => {
            await tasksPage.searchTaskOnKanBan(taskData.subject);
        });

        await test.step('Hover to the created task', async () => {
            await tasksPage.hoverToCreatedTask(taskData);
        });

        await test.step('Open the created task', async () => {
            await tasksPage.clickCreatedTask(taskData.subject);
        });

        await test.step('Mark task as completed', async () => {
            await tasksPage.markCompletedTask();
        });

        await test.step('Close pop up', async () => {
            await BasePage.clickButtonClosePopUp();
        });

        await test.step('Reload page', async () => {
            await BasePage.reloadPage();
        });

        await test.step('Verify the task is completed successfully', async () => {
            await tasksPage.verifyCompleteTasksAfterRefreshed(taskData);
        });

    });

    test('[TASK_003] Edit Task Successfully', async ({ BasePage, tasksPage }) => {

        await test.step('Switch to Kanban view', async () => {
            await tasksPage.clickButtonSwitchToKanBan();
        });

        await test.step('Search for the existing task', async () => {
            await tasksPage.searchTaskOnKanBan(taskData.subject);
        });

        await test.step('Open the created task', async () => {
            await tasksPage.clickCreatedTask(taskData.subject);
        });

        await test.step('Open the menu task', async () => {
            await tasksPage.clickMenu();
        });

        await test.step('Select the edit option', async () => {
            await tasksPage.clickEditOption();
        });

        await test.step('Edit the task information', async () => {
            await tasksPage.editTask(taskData);
        });

        await test.step('Click button save', async () => {
            await tasksPage.clickButtonSave();
        });

        await test.step('Close popup', async () => {
            await BasePage.clickButtonClosePopUp();
        });

        await test.step('Verify the task is updated successfully', async () => {
            await tasksPage.verifyAfterSearch(updatedTaskData);
        });

    });

    test('[TASK_004] Drag Drop Task Successfully', async ({ tasksPage }) => {

        await test.step('Switch to Kanban view', async () => {
            await tasksPage.clickButtonSwitchToKanBan();
        });

        await test.step('Search for the task to drag and drop', async () => {
            await tasksPage.searchTaskOnKanBan(taskData.updatedSubject);
        });

        await test.step('Hover to the updated task', async () => {
            await tasksPage.hoverToUpdatedTask(taskData);
        });

        await test.step('Drag and drop the task', async () => {
            await tasksPage.dragAndDropTask();
        });

        await test.step('Verify task after drag and drop', async () => {
            await tasksPage.verifyTotalTasksAfterDragDrop(updatedTaskData);
        });

    });

    test('[TASK_005] Delete Task Successfully', async ({ BasePage, tasksPage }) => {

        await test.step('Search updated task', async () => {
            await tasksPage.searchTaskOnList(taskData.updatedSubject);
        });

        await test.step('Hover to the updated task', async () => {
            await tasksPage.hoverToUpdatedTask(taskData);
        });

        await test.step('Delete the task', async () => {
            await BasePage.deleteRecordAfterHover();
        });

        await test.step('Search updated task after delete', async () => {
            await tasksPage.searchTaskOnList(taskData.updatedSubject);
        });

        await test.step('Verify the task is deleted successfully', async () => {
            await tasksPage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
        });

    });

});