import { Expense } from '@models/types/expenses.model';

export const expenseData: Expense = {
  receipt: 'test_data/UK.jpg',
  verifyReceipt: 'UK.jpg',
  name: 'Bin Name',
  note: 'Bin Note',
  category: 'Bin Category',
  expenseDate: '18-11-2028',
  amount: '1000',
  paymentMode: 'Bank',
  verifyPaymentMode: 'Paid Via Bank',
  reference: '1000',
  totalCycles: '10',
  verifyAmount: '$1,000.00',
  alertSuccess: '',
  deleteAlertSuccess: ''
};

export const updatedExpenseData: Expense = {
  receipt: 'test_data/UK.jpg',
  verifyReceipt: 'UK.jpg',
  name: 'Bin Name Updated',
  note: 'Bin Note Updated',
  category: 'Bin Category',
  expenseDate: '18-11-2028',
  amount: '2000',
  paymentMode: 'Bank',
  verifyPaymentMode: 'Paid Via Bank',
  reference: '1000',
  totalCycles: '10',
  verifyAmount: '$2,000.00',
  alertSuccess: 'Expense updated successfully.',
  deleteAlertSuccess: 'Expense deleted',
};