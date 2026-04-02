import { expect } from '@playwright/test';
import { Article } from '@models/types/crm/knowledge.model'
import { Dropdown } from '@constants/crm';
import { CRMBasePage } from '@pages/crm/CRMBasePage';

export class KnowledgeBasePage extends CRMBasePage {

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

    createdArticle(name: string) {
        return this.page.locator(`//tr[@class='has-row-options odd']//a[contains(text(),'${name}')]`)
    }

    private nameArticle(name: string) {
        return `//h4[normalize-space()='${name}']`
    }

    private descriptionArticle(description: string) {
        return `//p[normalize-space()='${description}']`
    }

    private readonly SELECTOR_BUTTON_YES = `//button[normalize-space()='Yes']`;
    private readonly SELECTOR_MESSAGE_NOTIFICATION = `//div[@class='answer_response']`;

    // For other test cases
    // private getNameArticle(name: string) {
    //     return this.page.locator(this.nameArticle(name));
    // }

    // private getDescriptionArticle(description: string) {
    //     return this.page.locator(this.descriptionArticle(description));
    // }
    
    // private get buttonYes() {
    //     return this.page.locator(this.SELECTOR_BUTTON_YES)
    // }

    // private get messageNotification() {
    //     return this.page.locator(this.SELECTOR_MESSAGE_NOTIFICATION)
    // }

    async clickButtonNewArticle() {
        await this.click(this.buttonNewArticle);
    }

    async addNewArticle(data: Article) {
        await this.inputSubject.fill(data.subject);
        await this.selectDropdownBySpanText(Dropdown.ARTICLEGROUP, data.group);
        await this.checkboxInternalArticle.check();
        await this.checkboxDisabled.check();
        await this.editorBody.fill(data.description);
        await this.buttonSave.click();
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

        await tab2.locator(this.SELECTOR_BUTTON_YES).click();
        await expect(tab2.locator(this.SELECTOR_MESSAGE_NOTIFICATION)).toHaveText(data.messageFirst);

        await tab2.locator(this.SELECTOR_BUTTON_YES).click();
        await expect(tab2.locator(this.SELECTOR_MESSAGE_NOTIFICATION)).toHaveText(data.messageSecond);

        await this.page.bringToFront();
    }

    async deleteCreatedArticle(data: Article) {
        await this.acceptAlert();
        await this.createdArticle(data.subject).hover();
        await this.click(this.buttonDelete);
        await this.click(this.getbuttonCloseAlert());
    }
}
