import { expect } from '@playwright/test';
import { Article } from '@models/types/ui/knowledge.model'
import { Dropdown, Message } from '@constants/crm';
import { BasePage } from '@pages/BasePage';

export class KnowledgeBasePage extends BasePage {

    private get buttonNewArticle() {
        return this.page.locator("//a[normalize-space()='New Article']")
    }

    private get inputSubject() {
        return this.page.locator("#subject")
    }

    private get checkboxInternalArticle() {
        return this.page.locator("//label[normalize-space()='Internal Article']")
    }

    private get checkboxDisabled() {
        return this.page.locator("//div[@class='panel-body']//label[@for='disabled'][normalize-space()='Disabled']")
    }

    private get buttonSave() {
        return this.page.locator("//div[@class='panel-footer text-right']//button[@type='submit'][normalize-space()='Save']")
    }

    private get inputSearchArticle() {
        return this.page.locator("//input[@aria-controls='DataTables_Table_0']")
    }

    private createdArticle(name: string) {
        return this.page.locator(`//tr[@class='has-row-options odd']//a[contains(text(),'${name}')]`)
    }

    private nameArticle(name: string) {
        return `//h4[normalize-space()='${name}']`
    }

    private descriptionArticle(description: string) {
        return `//p[normalize-space()='${description}']`
    }

    private get buttonYes() {
        return ("//button[normalize-space()='Yes']")
    }

    private get messageNotification() {
        return ("//div[@class='answer_response']")
    }

    async clickButtonNewArticle() {
        await this.buttonNewArticle.click();
    }

    async addNewArticle(data: Article) {
        await this.inputSubject.fill(data.subject);
        await this.selectDropdownBySpanText(Dropdown.ARTICLEGROUP, data.group);
        await this.checkboxInternalArticle.check();
        await this.checkboxDisabled.check();
        await this.editorBody.fill(data.description);
        await this.buttonSave.click();
    }

    async verifyArticleAdded(data: Article) {
        await expect(this.inputSubject).toHaveValue(data.subject);
        await expect(this.getDropdownByDataId(Dropdown.ARTICLEGROUP)).toHaveText(data.group);
        await expect(this.checkboxInternalArticle).toBeChecked;
        await expect(this.checkboxDisabled).toBeChecked();
        await expect(this.editorBody).toHaveText(data.description);
    }

    async switchBetweenTabTest(data: Article) {

        await this.createdArticle(data.subject).hover();
        await expect(this.buttonView).toBeVisible();

        const [tab2] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.buttonView.click()
        ]);

        await expect(tab2.locator(this.nameArticle(data.subject))).toHaveText(data.subject);
        await expect(tab2.locator(this.descriptionArticle(data.description))).toHaveText(data.description);
        await tab2.locator(this.buttonYes).click();
        await expect(tab2.locator(this.messageNotification)).toHaveText(Message.THANKSFORYOUFEEDBACK);
        await tab2.locator(this.buttonYes).click();
        await expect(tab2.locator(this.messageNotification)).toHaveText(Message.YOUCANVOTEONCEIN24HOURS);
        await this.page.bringToFront();
    }

    async hoverToArticle(data: Article) {
        await this.createdArticle(data.subject).hover();
    }

    async searchKnowledgeBase(data: Article) {
        await this.inputSearchArticle.fill(data.subject);
    }

}
