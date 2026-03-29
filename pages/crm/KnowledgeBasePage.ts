import { Page } from '@playwright/test';
import { Article } from '@models/types/knowledge.model'
import { Button, Message, Dropdown, Option, Input, Label, Checkbox } from '@constants/crm';
import { CRMBasePage } from './CRMBasePage';

export class KnowledgeBasePage extends CRMBasePage {

    get buttonNewArticle() {
        return this.getLinkByText(Button.NEWARTICLE);
    }

    get inputSubject() {
        return this.getInputById(Input.SUBJECT);
    }

    get checkboxInternalArticle() {
        return this.getLabelText(Label.INTERNALARTICLE);
    }

    get checkboxDisabled() {
        return this.getCheckbox(Checkbox.DISABLED);
    }

    get buttonSave() {
        return this.getButton3(Button.SAVE);
    }

    createdArticle(subject: string, page?: Page) {
        return this.getTable2(subject, page);
    }

    nameArticle(subject: string, page?: Page) {
        return this.getValue6(subject, page);
    }

    descriptionArticle(description: string, page?: Page) {
        return this.getValue7(description, page);
    }

    buttonYes(page?: Page) {
        return this.getButtonByText(Button.YES, page);
    }

    messageNotification(page?: Page) {
        return this.getButton4(Message.ANSWER_RESPONSE, page);
    }

    async clickButtonNewArticle() {
        await this.click(this.buttonNewArticle);
    }

    async addNewArticle(data: Article) {
        await this.type(this.inputSubject, data.subject);
        await this.selectDropdownNotSearch(Dropdown.ARTICLEGROUP, Option.JAVA);
        await this.check(this.checkboxInternalArticle);
        await this.check(this.checkboxDisabled);
        await this.type(this.editorBody, data.description);
        await this.click(this.buttonSave);
    }

    async switchBetweenTabTest(data: Article) {
        await this.hover(this.createdArticle(data.subject));
        await this.waitVisible(this.buttonView);

        const [tab2] = await Promise.all([this.page.context().waitForEvent('page'), this.click(this.buttonView)]);

        await this.verifyText(this.nameArticle(data.subject, tab2), data.subject);
        await this.verifyText(this.descriptionArticle(data.description, tab2), data.description);
        await this.buttonYes(tab2).click();
        await this.verifyText(this.messageNotification(tab2), data.messageFirst);
        await this.buttonYes(tab2).click();
        await this.verifyText(this.messageNotification(tab2), data.messageSecond);
        await this.page.bringToFront();
    }

    async deleteCreatedArticle(data: Article) {
        await this.acceptAlert();
        await this.hover(this.createdArticle(data.subject));
        await this.click(this.buttonDelete);
        await this.click(this.getbuttonCloseAlert());
    }
}
