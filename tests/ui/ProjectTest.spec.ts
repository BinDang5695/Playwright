import { test } from '@fixtures/ui.fixture';
import { Menu, Message } from '@constants/crm';
import { projectData } from '@data/ui/project.data';
import { customerData } from '@data/ui/customer.data';

test.describe.serial('Admin - Project Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeAll(async ({ BasePage, customersPage }) => {
        await test.step('Create Customer', async () => {
            await BasePage.clickByMenuName(Menu.CUSTOMERS);
            await customersPage.clickButtonAddNewCustomer();
            await customersPage.inputToAddNewCustomer(customerData);
            await customersPage.clickButtonSave();
        });
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Projects page', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
        });
    });

    test('[PROJECT_001] Create Project Successfully', async ({ BasePage, projectsPage }) => {

        await test.step('Verify navigation to Project page', async () => {
            await projectsPage.verifyNavigateToProjectPage();
        });

        await test.step('Open the New Project form', async () => {
            await projectsPage.clickButtonNewProject();
        });

        await test.step('Input to create a new project', async () => {
            await projectsPage.inputToCreateNewProject(projectData);
        });

        await test.step('Click save button', async () => {
            await projectsPage.clickButtonSave();
        });

        await test.step('Verify the project is created successfully', async () => {
            await projectsPage.verifyProjectCreated(projectData);
        });

        await test.step('Navigate to Projects page', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
        });

        await test.step('Search created project', async () => {
            await projectsPage.searchProject(projectData);
        });

        await test.step('Verify the created project in table', async () => {
            await projectsPage.verifyCreatedProject(projectData);
        });
    });

    test('[PROJECT_002] Delete Project Successfully', async ({ BasePage, projectsPage, customersPage }) => {

        await test.step('Navigate to Projects page', async () => {
            await BasePage.clickByMenuName(Menu.PROJECTS);
        });

        await test.step('Search for the existing project', async () => {
            await projectsPage.searchProject(projectData);
        });

        await test.step('Hover to project', async () => {
            await projectsPage.hoverToProject(projectData);
        });

        await test.step('Delete the project', async () => {
            await BasePage.deleteRecordAfterHover();
        });

        await test.step('Navigate to Projects page', async () => {
            await projectsPage.searchProject(projectData);
        });

        await test.step('Verify the project is deleted successfully', async () => {
            await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
        });
    });
    
    test.afterAll(async ({ BasePage, customersPage }) => {
        await test.step('Delete created Customer', async () => {
            await BasePage.clickByMenuName(Menu.CUSTOMERS);
            await customersPage.searchCustomer(customerData.company);
            await customersPage.hoverToCustomer(customerData.company);
            await BasePage.deleteRecordAfterHover();
        });
    });

});