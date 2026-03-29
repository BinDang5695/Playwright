import { test as baseTest, Page } from '@playwright/test';
import { LoginPage } from '@pages/crm/LoginPage';
import { CustomersPage } from '@pages/crm/CustomersPage';
import { LeadsPage } from '@pages/crm/LeadsPage';
import { ContactsPage } from '@pages/crm/ContactsPage';
import { ContractsPage } from '@pages/crm/ContractsPage';
import { ExpensesPage } from '@pages/crm/ExpensesPage';
import { ProjectsPage } from '@pages/crm/ProjectsPage';
import { ProposalsPage } from '@pages/crm/ProposalsPage';
import { KnowledgeBasePage } from '@pages/crm/KnowledgeBasePage';
import { ItemsPage } from '@pages/crm/ItemsPage';
import { TasksPage } from '@pages/crm/TasksPage';
import { CRMBasePage } from '@pages/crm/CRMBasePage';

export type PageFixtureType = {
    authenticatedPage: Page;
    loginPage: LoginPage;
    CRMBasePage: CRMBasePage;
    customersPage: CustomersPage;
    leadsPage: LeadsPage;
    projectsPage: ProjectsPage;
    contactsPage: ContactsPage;
    contractsPage: ContractsPage;
    expensesPage: ExpensesPage;
    proposalsPage: ProposalsPage;
    knowledgeBasePage: KnowledgeBasePage;
    itemsPage: ItemsPage;
    tasksPage: TasksPage;
};

type ExtendParams = Parameters<typeof baseTest.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {

    authenticatedPage: async ({ page }, use) => {
        await page.goto(process.env.BASE_URL!);
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    CRMBasePage: async ({ authenticatedPage }, use) => {
        await use(new CRMBasePage(authenticatedPage));
    },

    customersPage: async ({ authenticatedPage }, use) => {
        await use(new CustomersPage(authenticatedPage));
    },

    leadsPage: async ({ authenticatedPage }, use) => {
        await use(new LeadsPage(authenticatedPage));
    },

    projectsPage: async ({ authenticatedPage }, use) => {
        await use(new ProjectsPage(authenticatedPage));
    },

    contactsPage: async ({ authenticatedPage }, use) => {
        await use(new ContactsPage(authenticatedPage));
    },

    contractsPage: async ({ authenticatedPage }, use) => {
        await use(new ContractsPage(authenticatedPage));
    },

    expensesPage: async ({ authenticatedPage }, use) => {
        await use(new ExpensesPage(authenticatedPage));
    },

    proposalsPage: async ({ authenticatedPage }, use) => {
        await use(new ProposalsPage(authenticatedPage));
    },

    knowledgeBasePage: async ({ authenticatedPage }, use) => {
        await use(new KnowledgeBasePage(authenticatedPage));
    },

    itemsPage: async ({ authenticatedPage }, use) => {
        await use(new ItemsPage(authenticatedPage));
    },

    tasksPage: async ({ authenticatedPage }, use) => {
        await use(new TasksPage(authenticatedPage));
    },
};