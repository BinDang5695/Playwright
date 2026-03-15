import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Create, Verify and Delete Project Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuCustomers();
        await pages.basePage().clickMenuProjects();
        await pages.projectsPage().verifyNavigateToProjectPage();
        await pages.projectsPage().clickButtonAddNewCustomer();
        await pages.projectsPage().submitDataForNewCustomer();
        await pages.projectsPage().verifyProjectCreated();
        await pages.basePage().clickMenuProjects();
        await pages.projectsPage().searchAndCheckCustomerInTable();
        await pages.projectsPage().moveToProjectName();
        await pages.projectsPage().clickAndDeleteProject();
        await pages.basePage().clickMenuProjects();
        await pages.projectsPage().searchAndCheckProjectInTable();
        await pages.projectsPage().verifyNoDataAfterDeletedProject();
        await pages.headerPage().logout();
    });
});
