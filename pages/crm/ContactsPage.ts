import SystemHelper from '../../models/helpers/SystemHelper';
import { Button, Input, Delay } from '@constants/crm';
import { CRMBasePage } from './CRMBasePage';
import { Contact } from '@models/types/contact.model'

export class ContactsPage extends CRMBasePage {

    get buttonNewContact() {
        return this.getLinkByText(Button.NEWCONTACT);
    }

    get inputFirstName() {
        return this.getInputById(Input.FIRSTNAME);
    }

    get inputLastName() {
        return this.getInputById(Input.LASTNAME);
    }

    get inputEmail() {
        return this.getInputById(Input.EMAIL);
    }

    get inputPassword() {
        return this.getInputByName(Input.PASSWORD);
    }

    get inputFile() {
        return this.getInputFile(Input.FILE);
    }

    file(data: Contact) {
        return SystemHelper.getFilePath(data.file)
    }

    get clickButtonSave() {
        return this.getButtonByText(Button.SAVE);
    }

    createdContact(data: Contact) {
        return this.getLinkByText(`${data.firstName} ${data.lastName}`);
    }

    get clickButtonX() {
        return this.getbuttonX(Button.CLOSE);
    }

    async clickButtonNewContact(){
        await this.click(this.buttonNewContact);
    }

    async addNewContact(data: Contact){
        await this.type(this.inputFirstName, data.firstName, Delay.ONE_HUNDRED_MILLISECONDS);
        await this.type(this.inputLastName, data.lastName, Delay.ONE_HUNDRED_MILLISECONDS);
        await this.type(this.inputEmail, data.email, Delay.ONE_HUNDRED_MILLISECONDS);
        await this.type(this.inputPassword, data.password, Delay.ONE_HUNDRED_MILLISECONDS);
        await this.inputFile.setInputFiles(this.file(data));
        await this.click(this.clickButtonSave);
    }

    async verifyCreatedContact(data: Contact, message: string){
        await this.verifyText(this.getAlert(), message)
        await this.click(this.createdContact(data));
        await this.verifyValue(this.inputFirstName, data.firstName)
        await this.verifyValue(this.inputLastName, data.lastName)
        await this.verifyValue(this.inputEmail, data.email)
        await this.verifyValue(this.inputPassword, Input.BLANK)
        await this.click(this.clickButtonX);
    }
}