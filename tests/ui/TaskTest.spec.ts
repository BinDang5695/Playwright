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

        await test.step('Verify navigation to Tasks page', async () => {
            await tasksPage.verifyNavigateToTasksPage();
        });

        await test.step('Switch to Kanban view', async () => {
            await tasksPage.clickButtonSwitchToKanBan();
        });

        await test.step('Verify navigation to Kanban page', async () => {
            await tasksPage.verifyNavigateToKanbanPage();
        });

        await test.step('Open the New Task form', async () => {
            await tasksPage.clickButtonAddNewTask();
        });

        await test.step('Verify Add New Task popup is displayed', async () => {
            await tasksPage.verifyAddNewTaskPopUp();
        });

        await test.step('Create a new task', async () => {
            await tasksPage.submitDataForNewTask(taskData);
        });

        await test.step('Verify the task is created successfully', async () => {
            await tasksPage.verifyNewTaskAfterCreated(taskData);
        });

    });


    test('[TASK_002] Complete Task Successfully', async ({ tasksPage }) => {

        await test.step('Search for the existing task', async () => {
            await tasksPage.searchTask(taskData.subject);
        });

        await test.step('Open the created task', async () => {
            await tasksPage.hoverAndClickCreatedTask(taskData);
        });

        await test.step('Mark task as completed', async () => {
            await tasksPage.markCompletedAndRefreshPage(taskData);
        });

        await test.step('Verify the task is completed successfully', async () => {
            await tasksPage.verifyCompleteTasksAfterRefreshed(taskData);
        });

    });


    test('[TASK_003] Edit Task Successfully', async ({ tasksPage }) => {

        await test.step('Search for the existing task', async () => {
            await tasksPage.searchTask(taskData.subject);
        });

        await test.step('Edit the task information', async () => {
            await tasksPage.editTask(taskData);
        });

        await test.step('Verify the task is updated successfully', async () => {
            await tasksPage.verifyAfterSearch(updatedTaskData);
        });

    });


    test('[TASK_004] Drag Drop Task Successfully', async ({ tasksPage }) => {

        await test.step('Search for the task to drag and drop', async () => {
            await tasksPage.searchTask(taskData.updatedSubject);
        });

        await test.step('Drag and drop the task', async () => {
            await tasksPage.dragAndDropTask();
        });

        await test.step('Verify task after drag and drop', async () => {
            await tasksPage.verifyTotalTasksAfterDragDrop(updatedTaskData);
        });

    });


    test('[TASK_005] Delete Task Successfully', async ({ tasksPage }) => {

        await test.step('Switch to List view', async () => {
            await tasksPage.clickButtonSwitchToList();
        });

        await test.step('Search and delete the task', async () => {
            await tasksPage.searchAndDeleteTask(updatedTaskData);
        });

        await test.step('Search for deleted task', async () => {
            await tasksPage.searchAfterDeleted(updatedTaskData);
        });

        await test.step('Verify the task is deleted successfully', async () => {
            await tasksPage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
        });

    });

});