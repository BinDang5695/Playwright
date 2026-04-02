import { Menu } from '@constants/crm';
import { test } from '@fixtures/crm.fixture';
import { contractData, updatedContractData } from '@data/crm/contract.data';

test.describe('CRM Test Suite', () => {

    test('Add new Contract, verify and delete Contract Successfully', async ({ contractsPage, CRMBasePage }) => {
        await CRMBasePage.clickByMenuName(Menu.CONTRACTS);
        await contractsPage.clickButtonNewContract();
        await contractsPage.addNewContract(contractData);
        await contractsPage.verifyCreatedContract(contractData);
        await contractsPage.updateContract(updatedContractData);
        await contractsPage.verifyUpdatedContract(updatedContractData);
        await contractsPage.deleteContract();
        await CRMBasePage.clickByMenuName(Menu.CONTRACTS);
        await contractsPage.verifyDeletedContract(updatedContractData);
    });
});
