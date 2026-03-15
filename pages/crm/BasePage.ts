import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {

    constructor(public page: Page) { }

    async getPageTitle() {
        return await this.page.title();
    }

    getCurrentUrl() {
        return this.page.url();
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async reloadPage() {
        await this.page.reload();
    }

    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    async waitForResponse(endpoint: string, statusCode: number) {
        return await this.page.waitForResponse(
            resp => resp.url().includes(endpoint) && resp.status() === statusCode
        );
    }

    async click(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async doubleClick(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.dblclick();
    }

    async hover(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.hover();
    }

    async type(locator: Locator, text: string, delay?: number) {
        await expect(locator).toBeVisible();

        if (delay) {
            await locator.pressSequentially(text, { delay });
        } else {
            await locator.fill(text);
        }
    }

    async clearAndType(locator: Locator, text: string) {
        await locator.clear();
        await locator.fill(text);
    }

    async pressEnter(locator: Locator) {
        await locator.press('Enter');
    }

    async check(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.check();
    }

    async uncheck(locator: Locator) {
        await locator.uncheck();
    }

    async uploadFile(locator: Locator, filePath: string) {
        await locator.setInputFiles(filePath);
    }

    async waitVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async verifyText(locator: Locator, expected: string | RegExp) {
        await expect(locator).toHaveText(expected);
    }

    async verifyValue(locator: Locator, expected: string) {
        await expect(locator).toHaveValue(expected);
    }

    async verifyUrlContains(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    getElementByText(text: string) {
        return this.page.getByText(text, { exact: true });
    }

    async clickElementByText(text: string) {
        await this.click(this.getElementByText(text));
    }

    getVerticalMenu(tab: string) {
        return this.page.locator("a[data-bs-target^='#nav']").getByText(tab);
    }

    async dragAndDrop(source: Locator, target: Locator) {
        await expect(source).toBeVisible();
        await expect(target).toBeVisible();
        await source.dragTo(target);
    }

    async acceptAlert() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async dismissAlert() {
        this.page.once('dialog', async dialog => {
            await dialog.dismiss();
        });
    }

    async acceptPrompt(text: string) {
        this.page.once('dialog', async dialog => {
            await dialog.accept(text);
        });
    }

    async acceptAlertAndVerify(expectedMessage: string) {
        this.page.once('dialog', async dialog => {
            await expect(dialog.message()).toContain(expectedMessage);
            await dialog.accept();
        });
    }

}