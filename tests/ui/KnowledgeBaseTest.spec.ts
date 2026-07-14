import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
import { articleData } from '@data/ui/knowledge.data';

test.describe.serial('Admin - Knowledge Base Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Knowledge Base', async () => {
            await BasePage.clickByMenuName(Menu.KNOWLEDGE_BASE);
        });
    });


    test('[KNOWLEDGE_001] Create new article successfully', async ({ knowledgeBasePage }) => {

        await test.step('Open the New Article form', async () => {
            await knowledgeBasePage.clickButtonNewArticle();
        });

        await test.step('Create a new article', async () => {
            await knowledgeBasePage.addNewArticle(articleData);
        });

        await test.step('Verify the article is created successfully', async () => {
            await knowledgeBasePage.verifyArticleAdded(articleData);
        });
    });


    test('[KNOWLEDGE_002] View article and submit feedback successfully', async ({ knowledgeBasePage }) => {

        await test.step('Open the article and switch between tabs', async () => {
            await knowledgeBasePage.switchBetweenTabTest(articleData);
        });
    });


    test('[KNOWLEDGE_003] Delete article successfully', async ({ BasePage, knowledgeBasePage }) => {

        await test.step('Search for the existing article', async () => {
            await knowledgeBasePage.searchKnowledgeBase(articleData);
        });

        await test.step('Delete the article', async () => {
            await knowledgeBasePage.hoverToArticle(articleData);
            await BasePage.deleteRecord();
        });
    });

});