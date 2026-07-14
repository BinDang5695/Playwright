import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
import { projectData } from '@data/ui/project.data';

test.describe.serial('Admin - Project Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Projects', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
        });
    });

    test('[PROJECT_001] Create Project Successfully', async ({ BasePage, projectsPage }) => {

        await test.step('Verify navigation to Project page', async () => {
            await projectsPage.verifyNavigateToProjectPage();
        });

        await test.step('Open the New Project form', async () => {
            await projectsPage.clickNewProject();
        });

        await test.step('Create a new project', async () => {
            await projectsPage.submitDataForNewProject(projectData);
        });

        await test.step('Verify the project is created successfully', async () => {
            await projectsPage.verifyProjectCreated(projectData);
        });

        await test.step('Search and verify the created project in table', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
            await projectsPage.searchAndCheckProjectInTable(projectData);
        });
    });


    test('[PROJECT_002] Delete Project Successfully', async ({ BasePage, projectsPage }) => {

        await test.step('Navigate to Projects page', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
        });

        await test.step('Search for the existing project', async () => {
            await projectsPage.searchAndCheckProjectInTable(projectData);
        });

        await test.step('Delete the project', async () => {
            await projectsPage.moveToProjectName(projectData);
            await BasePage.deleteRecord();
        });

        await test.step('Verify the project is deleted successfully', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
            await projectsPage.searchAndverifyNoData(projectData);
        });
    });

});