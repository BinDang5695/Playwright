import { test } from '@fixtures/ui.fixture';
import { proposalData } from '@data/ui/proposal.data';
import { Menu } from '@constants/crm';
import { ExportFileType } from '@models/types/file.model';

const fileTypes: { type: ExportFileType; tag: string }[] = [
    { type: 'pdf', tag: '@P1' },
    { type: 'excel', tag: '@P2' },
    { type: 'csv', tag: '@P3' },
];

test.describe.serial('Admin - Proposal Test Suite', () => {

    test.use({
        role: 'admin',
    });

    test.beforeEach(async ({ BasePage }) => {

        await test.step('Navigate to Sales > Proposals', async () => {
            await BasePage.clickByMenuText(Menu.SALES);
            await BasePage.clickByMenuName(Menu.PROPOSALS);
        });
    });


    fileTypes.forEach(({ type, tag }) => {

        test(`[PROPOSAL] Manage Proposal Export ${type.toUpperCase()} File ${tag}`, async ({ proposalsPage }) => {

            await test.step('Open the New Proposal form', async () => {
                await proposalsPage.clickButtonNewProposal();
            });

            await test.step('Create a new proposal', async () => {
                await proposalsPage.addNewProposal(proposalData);
            });

            await test.step('Verify proposal tooltip information', async () => {
                await proposalsPage.verifyTooltip();
            });

            await test.step('Search for the created proposal', async () => {
                await proposalsPage.searchCreatedProposal(proposalData);
            });

            await test.step('Capture proposal table data', async () => {
                await proposalsPage.captureUITableData(proposalData);
            });

            await test.step(`Export proposal to ${type.toUpperCase()} and verify content`, async () => {
                await proposalsPage.exportAndVerifyContentFile(type);
            });

            await test.step('Delete the created proposal', async () => {
                await proposalsPage.deleteCreatedProposal(proposalData);
            });

        });

    });

});