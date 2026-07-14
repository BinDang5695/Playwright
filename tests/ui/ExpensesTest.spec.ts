import { test } from '@fixtures/ui.fixture';
import { expenseData, updatedExpenseData } from '@data/ui/expenses.data';
import { Menu } from '@constants/crm';
import { Message } from '@constants/crm';

test.describe.serial('Admin - Expenses Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Expenses', async () => {
            await BasePage.clickByMenuText(Menu.EXPENSES);
        });
    });

    test('[EXPENSE_001] Create expense successfully', async ({ expensesPage }) => {

        await test.step('Open the Record Expense form', async () => {
            await expensesPage.clickButtonRecordExpense();
        });

        await test.step('Create a new expense', async () => {
            await expensesPage.addNewExpense(expenseData);
        });

        await test.step('Verify the expense is created successfully', async () => {
            await expensesPage.verifyCreatedExpense(expenseData);
        });
    });

    test('[EXPENSE_002] Update expense successfully', async ({ expensesPage }) => {

        await test.step('Search for the existing expense', async () => {
            await expensesPage.searchExpense(expenseData);
        });

        await test.step('Open the Edit Expense form', async () => {
            await expensesPage.hoverToExpense(expenseData);
            await expensesPage.clickButtonEdit();
        });

        await test.step('Update the expense information', async () => {
            await expensesPage.updateExpense(updatedExpenseData);
        });

        await test.step('Verify the expense is updated successfully', async () => {
            await expensesPage.verifyUpdatedExpense(updatedExpenseData);
        });
    });

    test('[EXPENSE_003] Verify toggle full view tooltip', async ({ BasePage, expensesPage }) => {

        await test.step('Search for the existing expense', async () => {
            await expensesPage.searchExpense(updatedExpenseData);
        });

        await test.step('Open the Expense details', async () => {
            await expensesPage.hoverToExpense(updatedExpenseData);
            await BasePage.clickButtonView();
        });

        await test.step('Verify the tooltip content', async () => {
            await expensesPage.verifyTooltipContent();
        });
    });

    test('[EXPENSE_004] Delete expense successfully', async ({ BasePage, expensesPage }) => {

        await test.step('Search for the existing expense', async () => {
            await expensesPage.searchExpense(updatedExpenseData);
        });

        await test.step('Delete the expense', async () => {
            await expensesPage.hoverToExpense(updatedExpenseData);
            await expensesPage.deleteRecord();
        });

        await test.step('Verify the expense is deleted successfully', async () => {
            await expensesPage.searchExpense(updatedExpenseData);
            await BasePage.verifyNoItem(Message.NO_ENTRIES_FOUND);
        });
    });

});