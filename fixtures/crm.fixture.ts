import { test as baseTest, expect, Page } from '@playwright/test';
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

function createPageFixture<T>(PageClass: new (page: Page) => T) {
    return async ({ authenticatedPage }: { authenticatedPage: Page }, use: (page: T) => Promise<void>) => {
        await use(new PageClass(authenticatedPage));
    };
}

export const test = baseTest.extend<PageFixtureType>({

    authenticatedPage: async ({ page }, use) => {
        await page.goto(process.env.BASE_URL!);
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    CRMBasePage: createPageFixture(CRMBasePage),
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