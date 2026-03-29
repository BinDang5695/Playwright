import { test } from './BaseTest';
import { proposalData } from '@data/crm/proposal.data';
import { Menu } from '@constants/crm';
import { ExportFileType } from '@models/types/file.model';

const fileTypes: { type: ExportFileType; tag: string }[] = [
    { type: 'pdf', tag: '@P1' },
    { type: 'excel', tag: '@P2' },
    { type: 'csv', tag: '@P3' },
];

test.describe.serial('CRM Test Suite', () => {

    fileTypes.forEach(({ type, tag }) => {
        test(`Manage Proposals ${type.toUpperCase()} File ${tag}`, async ({ proposalsPage, CRMBasePage }) => {
            await CRMBasePage.clickValue2(Menu.SALES);
            await CRMBasePage.clickValue(Menu.PROPOSALS);
            await proposalsPage.clickButtonNewProposal();
            await proposalsPage.addNewProposal(proposalData);
            await proposalsPage.verifyTooltip();
            await proposalsPage.searchCreatedProposal(proposalData);
            await proposalsPage.captureUITableData();
            await proposalsPage.exportAndVerifyContentFile(type);
            await proposalsPage.deleteCreatedProposal();
        });
    });
});