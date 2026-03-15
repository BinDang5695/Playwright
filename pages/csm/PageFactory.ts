import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import BasePage from "./BasePage";
import CategoryPage from "./CategoryPage";
import AllProductsPage from "./AllProductsPage";

export default class PageFactory {
    constructor(private page: Page) { }

    private _loginPage?: LoginPage;
    private _basePage?: BasePage;
    private _categoryPage?: CategoryPage;
    private _allProductsPage?: AllProductsPage;

    loginPage() {
        return this._loginPage ??= new LoginPage(this.page);
    }

    basePage() {
        return this._basePage ??= new BasePage(this.page);
    }

    categoryPage() {
        return this._categoryPage ??= new CategoryPage(this.page);
    }

    allProductsPage() {
        return this._allProductsPage ??= new AllProductsPage(this.page);
    }


}
