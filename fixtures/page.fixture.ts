import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/crm/LoginPage';
import { CustomersPage } from '@pages/crm/CustomersPage';
import { LeadsPage } from '@pages/crm/LeadsPage';
import { ContactsPage } from '@pages/crm/ContactsPage';
import { ContractsPage } from '@pages/crm/ContractsPage';
import { ExpensesPage } from '@pages/crm/ExpensesPage';
import { HeaderPage } from '@pages/crm/HeaderPage';
import { ProjectsPage } from '@pages/crm/ProjectsPage';
import { ProposalsPage } from '@pages/crm/ProposalsPage';
import { KnowledgeBasePage } from '@pages/crm/KnowledgeBasePage';
import { ItemsPage } from '@pages/crm/ItemsPage';
import { TasksPage } from '@pages/crm/TasksPage';
import { CRMBasePage } from '@pages/crm/CRMBasePage';

export type PageFixtureType = {
    authenticatedPage: void;
    loginPage: LoginPage;
    CRMBasePage: CRMBasePage;
    customersPage: CustomersPage;
    leadsPage: LeadsPage;
    projectsPage: ProjectsPage;
    contactsPage: ContactsPage;
    contractsPage: ContractsPage;
    expensesPage: ExpensesPage;
    headerPage: HeaderPage;
    proposalsPage: ProposalsPage;
    knowledgeBasePage: KnowledgeBasePage;
    itemsPage: ItemsPage;
    tasksPage: TasksPage;
};

type ExtendParams = Parameters<typeof baseTest.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {

    authenticatedPage: async ({ page }, use) => {
        await page.goto(process.env.BASE_URL!);
        await use();
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    CRMBasePage: async ({ page, authenticatedPage }, use) => {
        await use(new CRMBasePage(page));
    },

    customersPage: async ({ page, authenticatedPage }, use) => {
        await use(new CustomersPage(page));
    },

    leadsPage: async ({ page, authenticatedPage }, use) => {
        await use(new LeadsPage(page));
    },

    projectsPage: async ({ page, authenticatedPage }, use) => {
        await use(new ProjectsPage(page));
    },

    contactsPage: async ({ page, authenticatedPage }, use) => {
        await use(new ContactsPage(page));
    },

    contractsPage: async ({ page, authenticatedPage }, use) => {
        await use(new ContractsPage(page));
    },

    expensesPage: async ({ page, authenticatedPage }, use) => {
        await use(new ExpensesPage(page));
    },

    headerPage: async ({ page, authenticatedPage }, use) => {
        await use(new HeaderPage(page));
    },

    proposalsPage: async ({ page, authenticatedPage }, use) => {
        await use(new ProposalsPage(page));
    },

    knowledgeBasePage: async ({ page, authenticatedPage }, use) => {
        await use(new KnowledgeBasePage(page));
    },

    itemsPage: async ({ page, authenticatedPage }, use) => {
        await use(new ItemsPage(page));
    },

    tasksPage: async ({ page, authenticatedPage }, use) => {
        await use(new TasksPage(page));
    },
};