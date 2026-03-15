import { expect } from '@playwright/test';
import BasePage from './BasePage';

export class KnowledgeBasePage extends BasePage {

    private buttonNewArticle = () => this.page.locator("//a[normalize-space()='New Article']");
    private inputSubject = () => this.page.locator("//input[@id='subject']");
    private dropdownGroup = () => this.page.locator("//button[@data-id='articlegroup']");
    private searchGroup = () => this.page.locator("//input[@aria-label='Search']");
    private optionJava = () => this.page.locator("//span[normalize-space()='java']");
    private checkboxInternalArticle = () => this.page.locator("//label[normalize-space()='Internal Article']");
    private checkboxDisabled = () => this.page.locator("//div[@class='panel-body']//label[@for='disabled'][normalize-space()='Disabled']");
    private iframeDescription = () => this.page.frameLocator('#article-form iframe#description_ifr');
    private editorBody = () => this.iframeDescription().locator('#tinymce');
    private buttonSave = () => this.page.locator("//div[@class='panel-footer text-right']//button[@type='submit'][normalize-space()='Save']");
    private createdArticle = () => this.page.locator("//tr[@class='has-row-options odd']//a[contains(text(),'Bin Article')]");
    private buttonView = () => this.page.locator("//a[normalize-space()='View']");
    private buttonDelete = () => this.page.locator("//a[normalize-space()='Delete']");
    private nameArticle = "//h4[normalize-space()='Bin Article']";
    private descriptionArticle = "//p[normalize-space()='Bin article description']";
    private buttonYes = "//button[normalize-space()='Yes']";
    private messageNotification = "//div[@class='answer_response']";
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");

    async clickButtonNewArticle() {
        await this.buttonNewArticle().click();
    }

    async enterDescription(content: string) {
        await this.editorBody().fill(content);
    }

    async addNewArticle() {
        await this.inputSubject().fill('Bin Article');
        await this.dropdownGroup().click();
        await this.searchGroup().fill('java');
        await this.optionJava().click();
        await this.checkboxInternalArticle().check();
        await this.checkboxDisabled().check();
        await this.enterDescription('Bin article description');
        await this.buttonSave().click();
    }

    async switchBetweenTabTest() {
        const tab1 = this.page;

        await this.createdArticle().hover();
        await expect(this.buttonView()).toBeVisible({ timeout: 5000 });

        const [tab2] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.buttonView().click()
        ]);

        await tab2.waitForLoadState('domcontentloaded');

        await expect(tab2.locator(this.nameArticle)).toHaveText('Bin Article');
        await expect(tab2.locator(this.descriptionArticle))
            .toHaveText('Bin article description');

        await tab2.locator(this.buttonYes).click();
        await expect(tab2.locator(this.messageNotification))
            .toHaveText('Thanks for your feedback');

        await tab2.locator(this.buttonYes).click();
        await expect(tab2.locator(this.messageNotification))
            .toHaveText('You can vote once in 24 hours');

        await tab1.bringToFront();
    }

    async deleteCreatedArticle() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.createdArticle().hover();
        await this.buttonDelete().click();
        await this.buttonX().click();
    }
}
