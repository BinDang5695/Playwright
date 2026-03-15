import { Page, Locator, expect } from '@playwright/test';
import BasePage from './BasePage';

export class HeaderPage extends BasePage {

    private readonly iconUser: Locator;
    private readonly myProfile: Locator;
    private readonly buttonLogout: Locator;
    private readonly inputSearchProjects: Locator;
    private readonly countProjects: Locator;

    constructor(page: Page) {
        super(page);

        this.iconUser = page.locator("(//img[contains(@class,'staff-profile-image')])[1]");
        this.myProfile = page.locator("//ul[@class='dropdown-menu animated fadeIn']//a[normalize-space()='My Profile']");
        this.buttonLogout = page.locator("//ul[contains(@class,'dropdown')]//a[normalize-space()='Logout']");
        this.inputSearchProjects = page.locator("//input[@aria-controls='DataTables_Table_0']");
        this.countProjects = page.locator("//select[@name='DataTables_Table_0_length']");
    }

    async openUserMenu(): Promise<void> {
        await expect(this.iconUser).toBeVisible();
        await this.iconUser.click();
    }

    async openMyProfile(): Promise<void> {
        await this.openUserMenu();
        await expect(this.myProfile).toBeVisible();
        await this.myProfile.click();
    }

    async searchAndCheckPagination(): Promise<void> {

        await expect(this.countProjects).toBeVisible();
        await this.countProjects.selectOption('10');
        await this.waitForTableStable();
        await this.inputSearchProjects.fill('project');
        await this.waitForTableStable();

        const lastRow = this.page.locator('//tbody/tr[last()]/td[1]/a[1]');
        const rowCount = await lastRow.count();

        if (rowCount > 0) {
            try {
                await lastRow.scrollIntoViewIfNeeded();
            } catch (error) {
                console.log('⚠️ Last row scroll skipped (element detached)');
            }
        }
        await this.waitForTableStable();
        await this.checkLeadNameContains('project');

        for (let pageNum = 2; pageNum <= 100; pageNum++) {
            const pageButton = this.page.locator(`//a[normalize-space()='${pageNum}']`);
            const pageCount = await pageButton.count();

            if (pageCount > 0) {
                console.log(`📄 Checking page ${pageNum}`);
                await pageButton.scrollIntoViewIfNeeded();
                await pageButton.click();
                await this.waitForTableStable();
                await this.checkLeadNameContains('project');
            } else {
                console.log(`⛔ Page ${pageNum} does not exist, stopping pagination check`);
                break;
            }
        }
    }


    async checkLeadNameContains(value: string): Promise<void> {
        const matchedRows: string[] = [];

        for (let i = 1; i <= 1000; i++) {
            const leadCell = this.page.locator(`//tbody/tr[${i}]/td[1]/a[1]`);

            if (!(await leadCell.count())) {
                console.log(`⛔ Row ${i} does not exist, stop looping`);
                break;
            }

            const text = (await leadCell.textContent())?.trim() || '';
            console.log(`🔹 Row ${i}: "${text}"`);

            if (this.normalizeText(text).includes(this.normalizeText(value))) {
                matchedRows.push(text);
            }
        }

        console.log(`✅ Rows matching "${value}": ${matchedRows.length}`);
        expect(matchedRows.length).toBeGreaterThan(0);
    }

    async waitForTableStable(): Promise<void> {
        const tableBody = this.page.locator('//tbody');
        await expect(tableBody).toBeVisible();
        await this.page.waitForLoadState('networkidle');
    }

    async logout(): Promise<void> {
        await this.iconUser.scrollIntoViewIfNeeded();
        await this.openUserMenu();
        await expect(this.buttonLogout).toBeVisible();
        await this.buttonLogout.click();
    }
}
