import { expect } from '@playwright/test';
import BasePage from './BasePage';
import ReceiptPage from '../ReceiptPage';

export class ExpensesPage extends BasePage {

    private buttonRecordExpense = () => this.page.locator("//a[normalize-space()='Record Expense']");
    private inputName = () => this.page.locator("//input[@id='expense_name']");
    private inputNote = () => this.page.locator("//textarea[@id='note']");
    private dropdownExpenseCategory = () => this.page.locator("//button[@data-id='category']");
    private inputExpenseCategory = () => this.page.locator("//input[@aria-controls='bs-select-2']");
    private optionBinCategory = () => this.page.locator("//span[normalize-space()='Bin Category']");
    private inputExpenseDate = () => this.page.locator("//input[@id='date']");
    private inputAmount = () => this.page.locator("//input[@id='amount']");
    private dropdownPaymentMode = () => this.page.locator("//button[@data-id='paymentmode']");
    private inputPaymentMode = () => this.page.locator("//input[@aria-controls='bs-select-6']");
    private optionBank = () => this.page.locator("//a[normalize-space()='Bank']");
    private inputReference = () => this.page.locator("//input[@id='reference_no']");
    private dropdownRepeatEvery = () => this.page.locator("//button[@data-id='repeat_every']");
    private optionWeek = () => this.page.locator("//span[normalize-space()='Week']");
    private checkboxInfinity = () => this.page.locator("//label[normalize-space()='Infinity']");
    private inputTotalCycles = () => this.page.locator("//input[@id='cycles']");
    private buttonSave = () => this.page.locator("//div[@class='btn-bottom-toolbar text-right']//button[@type='submit'][normalize-space()='Save']");
    private buttonCreateNewInvoice = () => this.page.locator("//a[normalize-space()='Create New Invoice']");
    private toogleItem = () => this.page.locator("//i[@data-title='New lines are not supported for item description. Use the item long description instead.']");
    private tooltipContent = () => this.page.locator(".tooltip-inner");
    private alertSuccess = () => this.page.locator("//span[@class='alert-title']");
    private expenseName = () => this.page.locator("//h4[@id='expenseName']");
    private expenseNote = () => this.page.locator("//div[normalize-space()='Bin Note']");
    private expenseCategory = () => this.page.locator("//h3[@id='expenseCategory']");
    private expenseDate = () => this.page.locator("//span[normalize-space()='18-11-2026']");
    private expenseAmount = () => this.page.locator("//span[contains(normalize-space(),'$1,000.00')]");
    private expensePaymentMode = () => this.page.locator("//span[contains(normalize-space(),'Paid Via Bank')]");
    private expenseRef = () => this.page.locator("//span[normalize-space()='#1000']");
    private expenseRepeat = () => this.page.locator("//b[normalize-space()='25-11-2026']");
    private expenseCyclesRemaining = () => this.page.locator("//b[normalize-space()='10']");
    private attachedReceipt = () => this.page.locator("//a[normalize-space()='UK.jpg']");
    private buttonEditExpense = () => this.page.locator("//i[contains(@class,'pen')]");
    private updatedExpenseAmount = () => this.page.locator("//span[contains(normalize-space(),'$2,000.00')]");
    private buttonDeleteExpense = () => this.page.locator("//a[contains(@class,'delete')]//i[contains(@class,'remove')]");
    private inputSearchExpenses = () => this.page.locator("//input[@aria-controls='expenses']");
    private noDataAfterDelete = () => this.page.locator("//td[@class='dataTables_empty']");
    private buttonX = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");

    async clickButtonRecordExpense() {
        await this.buttonRecordExpense().click();
    }

    async addNewExpense() {
        const receiptPage = new ReceiptPage(this.page);
        await receiptPage.attachReceipt('test_data/UK.jpg');
        await this.inputName().fill('Bin Name');
        await this.inputNote().fill('Bin Note');
        await this.dropdownExpenseCategory().click();
        await this.inputExpenseCategory().fill('Bin Category');
        await this.optionBinCategory().click();
        await this.inputExpenseDate().fill('18-11-2026');
        await this.inputAmount().fill('1000');
        await this.dropdownPaymentMode().click();
        await this.inputPaymentMode().fill('Bank');
        await this.optionBank().click();
        await this.inputReference().fill('#1000');
        await this.dropdownRepeatEvery().click();
        await this.optionWeek().click();
        await this.checkboxInfinity().click();
        await this.inputTotalCycles().fill('10');
        await this.buttonSave().click();
    }

    async verifyCreatedExpense() {
        await expect(this.expenseName()).toHaveText('Bin Name');
        await expect(this.expenseNote()).toHaveText('Bin Note');
        await expect(this.expenseCategory()).toHaveText('Bin Category');
        await expect(this.expenseDate()).toHaveText('18-11-2026');
        await expect(this.expenseAmount()).toHaveText('$1,000.00');
        await expect(this.expensePaymentMode()).toHaveText('Paid Via Bank');
        await expect(this.expenseRef()).toHaveText('#1000');
        await expect(this.expenseRepeat()).toHaveText('25-11-2026');
        await expect(this.expenseCyclesRemaining()).toHaveText('10');
        await expect(this.attachedReceipt()).toHaveText('UK.jpg');
    }

    async updateExpense() {
        await this.buttonEditExpense().click();
        await this.inputName().fill('Bin Name Updated');
        await this.inputNote().fill('Bin Note Updated');
        await this.inputAmount().fill('2000');
        await this.buttonSave().click();
    }

    async verifyUpdatedExpense() {
        await expect(this.alertSuccess()).toHaveText('Expense updated successfully.');
        await expect(this.expenseName()).toHaveText('Bin Name Updated');
        await expect(this.updatedExpenseAmount()).toHaveText('$2,000.00');
    }

    async deleteExpense() {
        await this.page.on('dialog', dialog => dialog.accept());
        await this.buttonDeleteExpense().click();
    }

    async verifyDeletedExpense() {
        await expect(this.alertSuccess()).toBeVisible();
        await expect(this.alertSuccess()).toHaveText('Expense deleted');
        await this.buttonX().click();
        await this.inputSearchExpenses().fill('Bin Category');
        await expect(this.noDataAfterDelete()).toHaveText('No entries found');
        await this.menuSales.click();
        await this.menuInvoices.click();
        await this.buttonCreateNewInvoice().click();
    }

    async verifyTooltipContent() {
        await this.toogleItem().hover();
        await expect(this.tooltipContent()).toHaveText(
            'New lines are not supported for item description. Use the item long description instead.'
        );
    }
}
