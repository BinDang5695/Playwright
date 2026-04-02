import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Dropdown, Toogle } from '@constants/crm';
import { Expense } from '@models/types/crm/expenses.model'
import { expect } from '@playwright/test';

export class ExpensesPage extends CRMBasePage {

    private get buttonRecordExpense() {
        return this.page.locator("//a[normalize-space()='Record Expense']")
    }

    private get inputName() {
        return this.page.locator("#expense_name")
    }

    private get inputNote() {
        return this.page.locator("#note")
    }

    optionBinCategory(name: string) {
        return this.page.locator(`//span[normalize-space()='${name}']`)
    }
    
    private get inputExpenseDate() {
        return this.page.locator("#date")
    }

    private get inputAmount() {
        return this.page.locator("#amount")
    }

    private get inputReference() {
        return this.page.locator("#reference_no")
    }

    private get checkboxInfinity() {
        return this.page.locator("//label[normalize-space()='Infinity']")
    }

    private get inputTotalCycles() {
        return this.page.locator("#cycles")
    }

    private get buttonSave() {
        return this.page.locator("//div[@class='btn-bottom-toolbar text-right']//button[@type='submit'][normalize-space()='Save']")
    }

    hoverToogle() {
        return this.page.locator(`//a[@data-title='Toggle full view']`);
    }
    
    tooltipContent() {
        return this.page.locator('.tooltip-inner', { hasText: 'Toggle full view' })
    }

    private get expenseName() {
        return this.page.locator("#expenseName")
    }

    expenseNote(name: string) {
        return this.page.locator(`//div[normalize-space()='${name}']`)
    }

    private get expenseCategory() {
        return this.page.locator("#expenseCategory")
    }

    expenseDate(date: string) {
        return this.page.locator(`//span[normalize-space()='${date}']`)
    }

    expenseAmount(amount: string) {
        return this.page.locator(`//span[contains(normalize-space(),'${amount}')]`)
    }

    private get expensePaymentMode() {
        return this.page.locator("//span[contains(normalize-space(),'Paid Via Bank')]")
    }
    
    expenseRef(amount: string) {
        return this.page.locator(`//span[normalize-space()='${amount}']`)
    }

    expenseRepeat(date: string) {
        return this.page.locator(`//span[normalize-space()='${date}']`)
    }

    expenseCyclesRemaining(date: string) {
        return this.page.locator(`//b[normalize-space()='${date}']`)
    }

    attachedReceipt(receiptName: string) {
        return this.page.locator(`//a[normalize-space()='${receiptName}']`)
    }

    private get buttonEditExpense() {
        return this.page.locator("//i[contains(@class,'pen')]")
    }

    updatedExpenseAmount(amount: string) {
        return this.page.locator(`//span[contains(normalize-space(),'${amount}')]`)
    }

    private get buttonDeleteExpense() {
        return this.page.locator("//a[contains(@class,'delete')]//i[contains(@class,'remove')]")
    }

    private get inputSearchExpenses() {
        return this.page.locator("//input[@aria-controls='expenses']")
    }
       
    async clickButtonRecordExpense() {
        await this.buttonRecordExpense.click();
    }

    async addNewExpense(data: Expense) {
        await this.attachFile(data.receipt);
        await this.type(this.inputName, data.name);
        await this.type(this.inputNote, data.note);
        await this.selectDropdownBySpanText(Dropdown.CATEGORY, data.category);
        await this.type(this.inputExpenseDate, data.expenseDate);
        await this.type(this.inputAmount, data.amount);
        await this.selectDropdownBySpanText(Dropdown.PAYMENTMODE, data.paymentMode);
        await this.type(this.inputReference, data.reference);
        await this.selectDropdownBySpanText(Dropdown.REPEAT_EVERY, data.repeatEvery);
        await this.click(this.checkboxInfinity);
        await this.type(this.inputTotalCycles, data.totalCycles);
        await this.click(this.buttonSave);
    }

    async verifyCreatedExpense(data: Expense) {
        await expect(this.expenseName).toHaveText(data.name);
        await expect(this.expenseNote(data.note)).toHaveText(data.note);
        await expect(this.expenseCategory).toHaveText(data.category);
        await expect(this.expenseDate(data.expenseDate)).toHaveText(data.expenseDate);
        await expect(this.expenseAmount(data.verifyAmount)).toHaveText(data.verifyAmount);
        await expect(this.expensePaymentMode).toHaveText(data.verifyPaymentMode);
        await expect(this.expenseRef(data.reference)).toHaveText(data.reference);
        await expect(this.expenseRepeat(data.expenseDate)).toHaveText(data.expenseDate);
        await expect(this.expenseCyclesRemaining(data.totalCycles)).toHaveText(data.totalCycles);
        const fileName = data.receipt.split('/').pop();
        await expect(this.attachedReceipt(fileName!)).toHaveText(fileName!);
    }

    async updateExpense(data: Expense) {
        await this.buttonEditExpense.click();
        await this.inputName.fill(data.name);
        await this.inputNote.fill(data.note);
        await this.inputAmount.fill(data.amount);
        await this.buttonSave.click();
    }

    async verifyUpdatedExpense(data: Expense) {
        await expect(this.getAlert()).toHaveText(data.alertSuccess);
        await this.getbuttonCloseAlert().click();
        await expect(this.expenseName).toHaveText(data.name);
        await expect(this.expenseNote(data.note)).toHaveText(data.note);
        await expect(this.expenseAmount(data.verifyAmount)).toHaveText(data.verifyAmount);

    }

    async verifyTooltipContent() {
        await this.hoverToogle().hover();
        await this.tooltipContent(), Toogle.FULLVIEW;
    }

    async deleteExpense() {
        await this.acceptAlert();
        await this.buttonDeleteExpense.click();
    }

    async verifyDeletedExpense(data: Expense) {
        await expect(this.getAlert()).toHaveText(data.deleteAlertSuccess);
        await this.getbuttonCloseAlert().click();
        await this.inputSearchExpenses.fill(data.category);
        await expect(this.getNoData()).toBeVisible();
    }

}
