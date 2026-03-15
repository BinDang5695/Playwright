import { test } from './BaseTest';

test.describe('CRM Test Suite', () => {

    test('Create Expense, update and delete Successfully', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuExpenses();
        await pages.expensesPage().clickButtonRecordExpense();
        await pages.expensesPage().addNewExpense();
        await pages.expensesPage().verifyCreatedExpense();
        await pages.expensesPage().updateExpense();
        await pages.expensesPage().verifyUpdatedExpense();
        await pages.expensesPage().deleteExpense();
        await pages.expensesPage().verifyDeletedExpense();
        await pages.expensesPage().verifyTooltipContent();
        await pages.headerPage().logout();
    });
});
