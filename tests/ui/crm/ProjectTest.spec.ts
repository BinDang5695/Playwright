import { test } from './BaseTest';
import { Menu } from '@constants/crm';
import { projectData } from '@data/crm/project.data';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Project Successfully', async ({ projectsPage, CRMBasePage }) => {
        await CRMBasePage.clickValue(Menu.PROJECTS);
        await projectsPage.verifyNavigateToProjectPage();
        await projectsPage.clickNewProject();
        await projectsPage.submitDataForNewProject(projectData);
        await projectsPage.verifyProjectCreated(projectData);
        await CRMBasePage.clickValue(Menu.PROJECTS);
        await projectsPage.searchAndCheckProjectInTable(projectData);
        await projectsPage.moveToProjectName(projectData);
        await projectsPage.clickAndDeleteProject();
        await CRMBasePage.clickValue(Menu.PROJECTS);
        await projectsPage.searchAndverifyNoData(projectData);
    });
});
