import { test } from '@fixtures/ui.fixture';
import { contractData, updatedContractData } from '@data/ui/contract.data';
import { Menu, Message } from '@constants/crm';
import { ROLES } from '@constants/crm';
import { customerData } from '@data/ui/customer.data';

for (const role of ROLES) {

    test.describe.serial(`${role} - Contract Test Suite`, () => {

        test.use({
            role,
        });

        test.beforeAll(async ({ BasePage, customersPage }) => {
            await test.step('Create Customer', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
                await customersPage.clickButtonAddNewCustomer();
                await customersPage.addNewCustomer(customerData);
            });
        });

        test.beforeEach(async ({ BasePage }) => {

            await test.step('Navigate to Contracts page', async () => {
                await BasePage.clickByMenuName(Menu.CONTRACTS);
            });

        });


        test('[CONTRACT_001] Create contract successfully', async ({ contractsPage }) => {

            await test.step('Open the New Contract form', async () => {
                await contractsPage.clickButtonNewContract();
            });

            await test.step('Create a new contract', async () => {
                await contractsPage.addNewContract(contractData);
            });

            await test.step('Verify the contract is created successfully', async () => {
                await contractsPage.verifyCreatedContract(contractData);
            });

        });


        test('[CONTRACT_002] Update contract successfully', async ({ BasePage, contractsPage }) => {

            await test.step('Search for the existing contract', async () => {
                await contractsPage.searchContract(contractData);
            });

            await test.step('Open the Edit Contract form', async () => {
                await contractsPage.hoverToContract(contractData);
                await BasePage.clickButtonEdit();
            });

            await test.step('Update the contract information', async () => {
                await contractsPage.updateContract(updatedContractData);
            });

            await test.step('Verify the contract is updated successfully', async () => {
                await contractsPage.verifyUpdatedContract(updatedContractData);
            });

        });


        test('[CONTRACT_003] Delete contract successfully', async ({ BasePage, contractsPage, customersPage }) => {

            await test.step('Search for the existing contract', async () => {
                await contractsPage.searchContract(updatedContractData);
            });

            await test.step('Delete the contract', async () => {
                await contractsPage.hoverToContract(updatedContractData);
                await BasePage.deleteRecord();
            });

            await test.step('Verify the contract is deleted successfully', async () => {
                await contractsPage.searchContract(updatedContractData);
                await BasePage.verifyNoItem(Message.NO_MATCHING_RECORDS_FOUND);
            });

            await test.step('Delete create Customer', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
                await customersPage.searchCustomer(customerData);
                await customersPage.hoverToCustomer(customerData);
                await BasePage.deleteRecord();
            });

        });

    });
}