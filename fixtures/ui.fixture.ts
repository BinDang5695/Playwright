import { test as baseTest, expect, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { CustomersPage } from '@pages/CustomersPage';
import { LeadsPage } from '@pages/LeadsPage';
import { ContactsPage } from '@pages/ContactsPage';
import { ContractsPage } from '@pages/ContractsPage';
import { ExpensesPage } from '@pages/ExpensesPage';
import { ProjectsPage } from '@pages/ProjectsPage';
import { ProposalsPage } from '@pages/ProposalsPage';
import { KnowledgeBasePage } from '@pages/KnowledgeBasePage';
import { ItemsPage } from '@pages/ItemsPage';
import { TasksPage } from '@pages/TasksPage';
import { BasePage } from '@pages/BasePage';
import type { UserRole } from '@env/users';
import { ENV_NAME } from '@env/environment';

export type PageFixtureType = {
    authenticatedPage: Page;
    loginPage: LoginPage;
    guestPage: Page;
    guestLoginPage: LoginPage;
    BasePage: BasePage;
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
    role: UserRole;
};

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ authenticatedPage }: { authenticatedPage: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(authenticatedPage));
    };
}

export const test = baseTest.extend<PageFixtureType>({
    role: ['admin', { option: true }],

    authenticatedPage: async ({ browser, role }, use) => {

        const context = await browser.newContext({
            storageState: `.auth/${ENV_NAME}/${role}.json`,
        });
        const page = await context.newPage();
        await page.goto(process.env.BASE_URL!);
        await use(page);
        await context.close();
    },

    loginPage: async ({ authenticatedPage }, use) => {
        await use(new LoginPage(authenticatedPage));
    },

    guestPage: async ({ browser }, use) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(process.env.BASE_URL!);
        await use(page);
        await context.close();
    },

    guestLoginPage: async ({ guestPage }, use) => {
        await use(new LoginPage(guestPage));
    },

    BasePage: createPageFixture(BasePage),
    customersPage: createPageFixture(CustomersPage),
    leadsPage: createPageFixture(LeadsPage),
    projectsPage: createPageFixture(ProjectsPage),
    contactsPage: createPageFixture(ContactsPage),
    contractsPage: createPageFixture(ContractsPage),
    expensesPage: createPageFixture(ExpensesPage),
    proposalsPage: createPageFixture(ProposalsPage),
    knowledgeBasePage: createPageFixture(KnowledgeBasePage),
    itemsPage: createPageFixture(ItemsPage),
    tasksPage: createPageFixture(TasksPage),
});

export { expect };