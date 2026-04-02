import { Contact } from '@models/types/crm/contact.model';
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { expect } from '@playwright/test';

export class ContactsPage extends CRMBasePage {

    private get buttonNewContact() {
        return this.page.locator("//a[normalize-space()='New Contact']")
    }

    private get buttonSave() {
        return this.page.locator("//button[normalize-space()='Save']")
    }

    private get buttonChooseFile() {
        return this.page.locator('input[type="file"]')
    }

    private get fieldFirstName() {
        return this.page.locator("#firstname")
    }

    private get fieldLastName() {
        return this.page.locator("#lastname")
    }

    private get fieldEmail() {
        return this.page.locator("#email")
    }

    private get fieldPassword() {
        return this.page.locator("//input[@name='password']")
    }

    contactByName(name: string) {
        return this.page.getByRole('link', { name })
    }
    
    async clickButtonNewContact(): Promise<void> {
        await expect(this.buttonNewContact).toBeVisible();
        await this.buttonNewContact.click();
    }

    async addNewContact(data: Contact): Promise<void> {
        await expect(this.fieldFirstName).toBeVisible();
        await this.fieldFirstName.pressSequentially(data.firstName, { delay: 100 });
        await this.fieldLastName.pressSequentially(data.lastName, { delay: 100 });
        await this.fieldEmail.pressSequentially(data.email, { delay: 100 });
        await this.fieldPassword.pressSequentially(data.password, { delay: 100 });
        await this.buttonChooseFile.setInputFiles(data.file);
        await this.buttonSave.click();
    }

    async verifyCreatedContact(data: Contact): Promise<void> {
        await expect(this.getAlert()).toHaveText(data.messageAddedContactSuccess);
        await this.contactByName(`${data.firstName} ${data.lastName}`).click();
        await expect(this.fieldFirstName).toHaveValue(data.firstName);
        await expect(this.fieldLastName).toHaveValue(data.lastName);
        await expect(this.fieldEmail).toHaveValue(data.email);
        await expect(this.fieldPassword).toHaveValue(data.blankPassword);
        await this.getbuttonCloseAlert().click();
        await this.closePopUp.click();
    }
}