import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import BasePage from "./BasePage";
import AdminPage from "./AdminPage";

export default class PageFactory {
    constructor(private page: Page) {}

    private _loginPage?: LoginPage;
    private _basePage?: BasePage;
    private _adminPage?: AdminPage;


    loginPage() {
        return this._loginPage ??= new LoginPage(this.page);
    }

    basePage() {
        return this._basePage ??= new BasePage(this.page);
    }

    adminPage() {
        return this._adminPage ??= new AdminPage(this.page);
    }

}
