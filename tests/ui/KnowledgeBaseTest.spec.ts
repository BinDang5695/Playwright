import { test } from '@fixtures/ui.fixture';
import { Menu } from '@constants/crm';
import { articleData } from '@data/ui/knowledge.data';
import { Message } from '@constants/crm';
import type { Page } from '@playwright/test';

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
            await knowledgeBasePage.inputToCreateNewArticle(articleData);
        });

        await test.step('Create a new article', async () => {
            await knowledgeBasePage.clickButtonSave();
        });

        await test.step('Verify the article is created successfully', async () => {
            await knowledgeBasePage.verifyArticleAdded(articleData);
        });
    });


    test('[KNOWLEDGE_002] View article and submit feedback successfully - Then delete article after switch to main tab', async ({ BasePage, knowledgeBasePage }) => {

        let articleTab: Page;

        await test.step('Hover to article', async () => {
            await knowledgeBasePage.hoverToArticle(articleData);
        });

        await test.step('Open article in new tab', async () => {
            articleTab = await knowledgeBasePage.openArticleInNewTab();
        });

        await test.step('Verify article detail', async () => {
            await knowledgeBasePage.verifyArticleDetail(articleTab, articleData);
        });

        await test.step('Vote article first time', async () => {
            await knowledgeBasePage.voteArticle(articleTab);
        });

        await test.step('Verify first feedback message', async () => {
            await knowledgeBasePage.verifyFeedbackMessage(articleTab, Message.THANKSFORYOUFEEDBACK);
        });

        await test.step('Vote article second time', async () => {
            await knowledgeBasePage.voteArticle(articleTab);
        });

        await test.step('Verify second feedback message', async () => {
            await knowledgeBasePage.verifyFeedbackMessage(articleTab, Message.YOUCANVOTEONCEIN24HOURS);
        });

        await test.step('Switch back to main tab', async () => {
            await knowledgeBasePage.switchBackToMainTab();
        });

        await test.step('Search for the existing article', async () => {
            await knowledgeBasePage.searchKnowledgeBase(articleData);
        });

        await test.step('Hover to article', async () => {
            await knowledgeBasePage.hoverToArticle(articleData);
        });

        await test.step('Delete the article', async () => {
            await BasePage.deleteRecordAfterHover();
        });

        await test.step('Verify the article is deleted successfully', async () => {
            await BasePage.verifyNoItem(Message.NO_ENTRIES_FOUND);
        });

    });

});