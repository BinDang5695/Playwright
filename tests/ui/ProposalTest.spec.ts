import { test } from '@fixtures/ui.fixture';
import { proposalData } from '@data/ui/proposal.data';
import { Menu } from '@constants/crm';
import { ExportFileType } from '@models/types/ui/file.model';
import { customerData } from '@data/ui/customer.data';
import { ExportData } from '@models/types/ui/export-data.model';

const fileTypes: { type: ExportFileType; tag: string }[] = [
    { type: 'pdf', tag: '@P1' },
    { type: 'excel', tag: '@P2' },
    { type: 'csv', tag: '@P3' },
];

test.describe.serial('Admin - Proposal Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage, customersPage }) => {
        await test.step('Create Customer', async () => {
            await BasePage.clickByMenuName(Menu.CUSTOMERS);
            await customersPage.clickButtonAddNewCustomer();
            await customersPage.inputToAddNewCustomer(customerData);
            await customersPage.clickButtonSave();
        });
    });

    fileTypes.forEach(({ type, tag }) => {

        test(`[PROPOSAL] Manage Proposal Export ${type.toUpperCase()} File ${tag}`, async ({ BasePage, customersPage, proposalsPage }) => {

            await test.step('Navigate to Sales > Proposals', async () => {
                await BasePage.clickByMenuText(Menu.SALES);
                await BasePage.clickByMenuName(Menu.PROPOSALS);
            });

            let uiData!: ExportData;

            await test.step('Open the New Proposal form', async () => {
                await proposalsPage.clickButtonNewProposal();
            });

            await test.step('Create a new proposal', async () => {
                await proposalsPage.inputToAddNewProposal(proposalData);
            });

            await test.step('Scroll to button save', async () => {
                await proposalsPage.scrollToButtonSave();
            });

            await test.step('Click button save', async () => {
                await proposalsPage.clickButtonSave();
            });

            await test.step('Hover to tooltip', async () => {
                await proposalsPage.hoverToTooltip();
            });

            await test.step('Verify proposal tooltip information', async () => {
                await proposalsPage.verifyTooltip();
            });

            await test.step('Click button toogle table right', async () => {
                await proposalsPage.clickButtonToogleTableRight();
            });

            await test.step('Search for the created proposal', async () => {
                await proposalsPage.searchCreatedProposal(proposalData);
            });

            await test.step('Capture proposal table data', async () => {
                uiData = await proposalsPage.captureUITableData(proposalData);
            });

            await test.step(`Export proposal to ${type.toUpperCase()} and verify content`, async () => {
                await BasePage.exportAndVerifyContentFile(type, uiData);

            });
            await test.step('Wait UI stable', async () => {
                await BasePage.waitForUiStable();
            });

            await test.step('Select the created proposal', async () => {
                await proposalsPage.selectCreatedProposal(proposalData);
            });

            await test.step('Reload page', async () => {
                await BasePage.reloadPage();
            });

            await test.step('Delete the created proposal', async () => {
                await proposalsPage.deleteRecordAfterSelectDropdown();
            });

            await test.step('Delete create Customer', async () => {
                await BasePage.clickByMenuName(Menu.CUSTOMERS);
                await customersPage.searchCustomer(customerData.company);
                await customersPage.hoverToCustomer(customerData.company);
                await BasePage.deleteRecordAfterHover();
            });

        });

    });

});