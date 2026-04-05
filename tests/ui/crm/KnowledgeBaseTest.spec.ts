import { test } from '@fixtures/crm.fixture';
import { Menu } from '@constants/crm';
import { articleData } from '@data/crm/knowledge.data';

test.describe('CRM Test Suite', () => {

    test('Add new Knowledge Base, verify and delete Successfully', async ({ knowledgeBasePage, CRMBasePage }) => {
        const role = process.env.ROLE;
        test.skip(role !== 'admin')
        await CRMBasePage.clickByMenuName(Menu.KNOWLEDGE_BASE);
        await knowledgeBasePage.clickButtonNewArticle();
        await knowledgeBasePage.addNewArticle(articleData);
        await CRMBasePage.clickByMenuName(Menu.KNOWLEDGE_BASE);
        await knowledgeBasePage.switchBetweenTabTest(articleData);
        await knowledgeBasePage.deleteCreatedArticle(articleData);
    });
});
