import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Add new Knowledge Base, verify and delete Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuKnowledgeBase();
        await pages.knowledgeBasePage().clickButtonNewArticle();
        await pages.knowledgeBasePage().addNewArticle();
        await pages.basePage().clickMenuKnowledgeBase();
        await pages.knowledgeBasePage().switchBetweenTabTest();
        await pages.knowledgeBasePage().deleteCreatedArticle();
        await pages.headerPage().logout();
    });
});
