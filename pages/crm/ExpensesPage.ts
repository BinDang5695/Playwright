import { CRMBasePage } from './CRMBasePage';
import { Button, Dropdown, Input, Label, Option, Table, Toogle, Message } from '@constants/crm';
import { Expense } from '@models/types/expenses.model'

export class ExpensesPage extends CRMBasePage {

      get buttonRecordExpense() {
          return this.getLinkByText(Button.RECORDEXPENSE);
      }

      get inputName() {
          return this.getInputById(Input.EXPENSE_NAME);
      }

      get inputNote() {
          return this.getTextArea2(Input.NOTE);
      }

      get inputExpenseDate() {
          return this.getInputById(Input.DATE);
      }

      get inputAmount() {
          return this.getInputById(Input.AMOUNT);
      }

      get inputReference() {
          return this.getInputById(Input.REFERENCE);
      }

      get checkboxInfinity() {
          return this.getLabelText(Label.INFINITY);
      }      

      get inputTotalCycles() {
          return this.getInputById(Input.CYCLES);
      }

      get buttonSave() {
          return this.getButton2(Button.SAVE);
      }

      get hoverToogle() {
          return this.getToogle3(Toogle.FULLVIEW);
      }

      toogleItem(text: string) {
          return this.gettooltipContent(text);
      }

      get expenseName() {
          return this.getTab2(Input.EXPENSENAME);
      }

      expenseNote(note: string) {
          return this.getDivId(note);
      }

      get expenseCategory() {
          return this.getTab3(Input.EXPENSECATEGORY);
      }
      
      expenseDate(date: string) {
          return this.getValue(date);
      }

      expenseAmount(verifyAmount: string) {
          return this.getValue1(verifyAmount);
      }

      get expensePaymentMode() {
          return this.getValue1(Dropdown.PAIDVIABANK);
      }

      expenseRef(reference: string) {
          return this.getValue(reference);
      }

      expenseRepeat(date: string) {
          return this.getValue(date);
      }

      expenseCyclesRemaining(cycle: string) {
          return this.getValue5(cycle);
      }

      attachedReceipt(receipt: string) {
          return this.getLinkByText(receipt);
      }

      get buttonEditExpense() {
          return this.getLi(Button.PEN);
      }

      updatedExpenseAmount(updatedAmount: string) {
          return this.getValue1(updatedAmount);
      }

      get buttonDeleteExpense() {
          return this.getCText(Button.REMOVE);
      }

      get inputSearchExpenses() {
          return this.getInputAriaControls(Input.EXPENSES);
      }    
       
    async clickButtonRecordExpense() {
        await this.click(this.buttonRecordExpense);
    }

    async addNewExpense(data: Expense) {
        await this.attachFile(data.receipt);
        await this.type(this.inputName, data.name);
        await this.type(this.inputNote, data.note);
        await this.selectDropdownNotSearch(Dropdown.CATEGORY, data.category);
        await this.type(this.inputExpenseDate, data.expenseDate);
        await this.type(this.inputAmount, data.amount);
        await this.selectDropdownNotSearch(Dropdown.PAYMENTMODE, data.paymentMode);
        await this.type(this.inputReference, data.reference);
        await this.selectDropdownNotSearch(Dropdown.REPEAT_EVERY, Option.WEEK);
        await this.click(this.checkboxInfinity);
        await this.type(this.inputTotalCycles, data.totalCycles);
        await this.click(this.buttonSave);
    }

    async verifyCreatedExpense(data: Expense) {
        await this.verifyText(this.expenseName, data.name);
        await this.verifyText(this.expenseNote(data.note), data.note);
        await this.verifyText(this.expenseCategory, data.category);
        await this.verifyText(this.expenseDate(data.expenseDate), data.expenseDate);
        await this.verifyText(this.expenseAmount(data.verifyAmount), data.verifyAmount);
        await this.verifyText(this.expensePaymentMode, Dropdown.PAIDVIABANK);
        await this.verifyText(this.expenseRef(data.reference), data.reference);
        await this.verifyText(this.expenseRepeat(data.expenseDate), data.expenseDate);
        await this.verifyText(this.expenseCyclesRemaining(data.totalCycles), data.totalCycles);
        const fileName = data.receipt.split('/').pop();
        await this.verifyText(this.attachedReceipt(fileName!), fileName!);
    }

    async updateExpense(data: Expense) {
        await this.click(this.buttonEditExpense);
        await this.type(this.inputName, data.name);
        await this.type(this.inputNote, data.note);
        await this.type(this.inputAmount, data.amount)
        await this.click(this.buttonSave);
    }

    async verifyUpdatedExpense(data: Expense) {
        await this.verifyText(this.getAlert(), data.alertSuccess);
        await this.click(this.getbuttonCloseAlert());
        await this.verifyText(this.expenseName, data.name);
        await this.verifyText(this.expenseAmount(data.verifyAmount), data.verifyAmount);
    }

    async verifyTooltipContent() {
        await this.hover(this.hoverToogle);
        await this.verifyText(this.toogleItem(Toogle.FULLVIEW), Toogle.FULLVIEW);
    }

    async deleteExpense() {
        await this.acceptAlert();
        await this.click(this.buttonDeleteExpense);
    }

    async verifyDeletedExpense(data: Expense) {
        await this.waitVisible(this.getAlert());
        await this.verifyText(this.getAlert(), data.deleteAlertSuccess);
        await this.click(this.getbuttonCloseAlert());
        await this.type(this.inputSearchExpenses, data.category);
        await this.waitVisible(this.getNoData());
    }

}
