import { test } from '@fixtures/crm.fixture';
import { expenseData, updatedExpenseData } from '@data/crm/expenses.data';
import { Menu } from '@constants/crm';

test.describe('CRM Test Suite', () => {

    test('Create Expense, update and delete Successfully', async ({ expensesPage, CRMBasePage }) => {
        const role = process.env.ROLE;
        test.skip(role !== 'admin')
        await CRMBasePage.clickByMenuText(Menu.EXPENSES);
        await expensesPage.clickButtonRecordExpense();
        await expensesPage.addNewExpense(expenseData);
        await expensesPage.verifyCreatedExpense(expenseData);
        await expensesPage.updateExpense(updatedExpenseData);
        await expensesPage.verifyUpdatedExpense(updatedExpenseData);
        await expensesPage.verifyTooltipContent();
        await expensesPage.deleteExpense();
        await expensesPage.verifyDeletedExpense(updatedExpenseData);
    });
});
