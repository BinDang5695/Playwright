import { Page } from "@playwright/test";
import LoginPage from "./LoginPage";
import CustomersPage from "./CustomersPage";
import BasePage from "./BasePage";
import ContactsPage from "./ContactsPage";
import HeaderPage from "./HeaderPage";
import ProjectsPage from "./ProjectsPage";
import TasksPage from "./TasksPage";
import ExpensesPage from "./ExpensesPage";
import ContractsPage from "./ContractsPage";
import KnowledgeBasePage from "./KnowledgeBasePage";
import LeadsPage from "./LeadsPage";
import ItemsPage from "./ItemsPage";
import ProposalsPage from "./ProposalsPage";

export default class PageFactory {
    constructor(private page: Page) { }

    private _loginPage?: LoginPage;
    private _customersPage?: CustomersPage;
    private _basePage?: BasePage;
    private _contactsPage?: ContactsPage;
    private _headerPage?: HeaderPage;
    private _projectsPage?: ProjectsPage;
    private _tasksPage?: TasksPage;
    private _expensesPage?: ExpensesPage;
    private _contractsPage?: ContractsPage;
    private _knowledgeBasePage?: KnowledgeBasePage;
    private _leadsPage?: LeadsPage;
    private _itemsPage?: ItemsPage;
    private _proposalsPage?: ProposalsPage;

    loginPage() {
        return this._loginPage ??= new LoginPage(this.page);
    }

    customersPage() {
        return this._customersPage ??= new CustomersPage(this.page);
    }

    basePage() {
        return this._basePage ??= new BasePage(this.page);
    }

    contactsPage() {
        return this._contactsPage ??= new ContactsPage(this.page);
    }

    headerPage() {
        return this._headerPage ??= new HeaderPage(this.page);
    }

    projectsPage() {
        return this._projectsPage ??= new ProjectsPage(this.page);
    }

    tasksPage() {
        return this._tasksPage ??= new TasksPage(this.page);
    }

    expensesPage() {
        return this._expensesPage ??= new ExpensesPage(this.page);
    }

    contractsPage() {
        return this._contractsPage ??= new ContractsPage(this.page);
    }

    knowledgeBasePage() {
        return this._knowledgeBasePage ??= new KnowledgeBasePage(this.page);
    }

    leadsPage() {
        return this._leadsPage ??= new LeadsPage(this.page);
    }

    itemsPage() {
        return this._itemsPage ??= new ItemsPage(this.page);
    }

    proposalsPage() {
        return this._proposalsPage ??= new ProposalsPage(this.page);
    }
}
