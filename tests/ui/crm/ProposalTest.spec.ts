import { test } from './BaseTest';

test.describe.serial('CRM Test Suite', () => {

    test('Manage Proposals PDF File @P1', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuProposals();
        await pages.proposalsPage().clickButtonNewProposal();
        await pages.proposalsPage().addNewProposalWithRetry();
        await pages.proposalsPage().verifyTooltip();
        await pages.proposalsPage().searchCreatedProposal();
        await pages.proposalsPage().captureUITableData();
        await pages.proposalsPage().exportAndVerifyContentFile('pdf');
        await pages.proposalsPage().deleteCreatedProposal();
        await pages.headerPage().logout();
    });

    test('Manage Proposals Excel File @P2', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuProposals();
        await pages.proposalsPage().clickButtonNewProposal();
        await pages.proposalsPage().addNewProposalWithRetry();
        await pages.proposalsPage().verifyTooltip();
        await pages.proposalsPage().searchCreatedProposal();
        await pages.proposalsPage().captureUITableData();
        await pages.proposalsPage().exportAndVerifyContentFile('excel');
        await pages.proposalsPage().deleteCreatedProposal();
        await pages.headerPage().logout();
    });

    test('Manage Proposals CSV File @P3', async ({ pages }) => {
        await pages.loginPage().loginCRM('admin@example.com', '123456');
        await pages.basePage().clickMenuSales();
        await pages.basePage().clickMenuProposals();
        await pages.proposalsPage().clickButtonNewProposal();
        await pages.proposalsPage().addNewProposalWithRetry();
        await pages.proposalsPage().verifyTooltip();
        await pages.proposalsPage().searchCreatedProposal();
        await pages.proposalsPage().captureUITableData();
        await pages.proposalsPage().exportAndVerifyContentFile('csv');
        await pages.proposalsPage().deleteCreatedProposal();
        await pages.headerPage().logout();
    });
});
