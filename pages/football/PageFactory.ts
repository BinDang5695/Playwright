import { Page } from "@playwright/test";
import BasePage from "./BasePage";
import RegistrationPage from "./RegistrationPage";

export default class PageFactory {
    constructor(private page: Page) {}

    private _basePage?: BasePage;
    private _registrationPage?: RegistrationPage;

    registrationPage() {
        return this._registrationPage ??= new RegistrationPage(this.page);
    }

    basePage() {
        return this._basePage ??= new BasePage(this.page);
    }



}
