import { Menu } from '@constants/crm';
import { test } from '@fixtures/page.fixture';
import { contractData, updatedContractData } from '@data/crm/contract.data';
import { Message } from '@constants/crm';

test.describe('CRM Test Suite', () => {

    test('Add new Contract, verify and delete Contract Successfully', async ({ contractsPage, CRMBasePage }) => {
        await CRMBasePage.clickValue(Menu.CONTRACTS);
        await contractsPage.clickNewContract();
        await contractsPage.fillContractForm(contractData, true);
        await contractsPage.verifyContract(contractData, Message.CREATEDCONTRACT);
        await contractsPage.fillContractForm(updatedContractData);
        await contractsPage.verifyContract(updatedContractData, Message.UPDATEDCONTRACT);
        await contractsPage.deleteContract();
        await CRMBasePage.clickValue(Menu.CONTRACTS);
        await contractsPage.verifyDeletedContract(updatedContractData);
    });
});
