import { Menu, Url, Input, Header, Button } from '../../constants/crm';
import { CRMBasePage } from './CRMBasePage';

export class LoginPage extends CRMBasePage {

    get headerLogin() {
        return this.getValue3(Header.LOGIN);
    }

    get inputEmail() {
        return this.getInputById(Input.EMAIL);
    }

    get inputPassword() {
        return this.getInputById(Input.PASSWORD);
    }

    get checkboxRememberMe() {
        return this.getInputById(Input.REMEMBER);
    }

    get buttonLogin() {
        return this.getButtonByText(Button.LOGIN);
    }

    get alertErrorMessage() {
        return this.getValue4();
    }

    async loginCRM(email: string, password: string) {
        await this.goto(process.env.BASE_URL!);
        await this.waitVisible(this.headerLogin);
        await this.type(this.inputEmail, email);
        await this.type(this.inputPassword, password);
        await this.check(this.checkboxRememberMe);
        await this.click(this.buttonLogin);
    }

    async verifyLoginSuccess() {
        await this.waitVisible(this.getValue(Menu.DASHBOARD));
        await this.verifyUrlNotContains(Url.AUTHENTICATION);
    }

    async verifyLoginFail(expectedMessage: string | string[]) {
        await this.verifyUrlContains(Url.AUTHENTICATION);
        await this.waitVisible(this.alertErrorMessage);
        await this.verifyText(this.alertErrorMessage, expectedMessage);
    }
}