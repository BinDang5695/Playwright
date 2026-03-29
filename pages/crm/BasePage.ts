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
        await this.page.reload({ waitUntil: 'domcontentloaded' });
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

    async openNewTab(triggerLocator: Locator): Promise<Page> {
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.click(triggerLocator)
        ]);
        await newTab.waitForLoadState('domcontentloaded');
        return newTab;
    }

    async doubleClick(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.dblclick();
    }

    async selectOption(locator: Locator, value: string | number) {
        await expect(locator).toBeVisible();
        await locator.selectOption(String(value));
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

    async expectEqual(actual: number, expected: number, message?: string) {
        if (message) {
            console.log(message);
        }
        await expect(actual).toBe(expected);
    }

    async expectGreaterThan(actual: number, expected: number, message?: string) {
        if (message) {
            console.log(message);
        }
        await expect(actual).toBeGreaterThan(expected);
    }

    async verifyText(locator: Locator, expected: string | string[]) {
        await expect(locator).toHaveText(expected);
    }

    async verifyValue(locator: Locator, expected: string) {
        await expect(locator).toHaveValue(expected);
    }

    async verifyContainsText(locator: Locator, expected: string | string[]) {
        await expect(locator).toContainText(expected);
    }

    async verifyUrlContains(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    async verifyUrlNotContains(text: string) {
        await expect(this.page).not.toHaveURL(new RegExp(text));
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

    async scrollIntoView(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.scrollIntoViewIfNeeded();
    }

    async verifyAttribute(locator: Locator, attribute: string, value: string) {
        await expect(locator).toBeVisible();
        await expect(locator).toHaveAttribute(attribute, value);
    }

    async getTextContent(locator: Locator): Promise<string> {
        const text = await locator.textContent();
        return text?.trim() || '';
    }

    async getTextAsNumber(locator: Locator): Promise<number> {
        const text = await this.getTextContent(locator);
        return parseInt(text || '0', 10);
    }

    async verifyEquals(locator: Locator, expected: string): Promise<boolean> {
        const actual = await this.getTextContent(locator);
        console.log(`Verify equals: "${actual}" 🟰 "${expected}"`);
        const isEqual = actual === expected;

        if (isEqual) {
            console.log('✅ Text matches');
        } else {
            console.log(`❌ Text mismatch: expected "${expected}", got "${actual}"`);
        }

        return isEqual;
    }

    async pressEscape() {
        await this.page.keyboard.press('Escape');
    }

    async waitForNetwork() {
        await this.page.waitForLoadState('networkidle');
    }

    async retryAction(action: () => Promise<void>, maxRetry = 2) {
        for (let attempt = 1; attempt <= maxRetry; attempt++) {
            try {
                console.log(`👉 Add New Proposal - Attempt ${attempt}`);
                await action();
                return;
            } catch (error) {
                console.warn(`❌ Failed at attempt ${attempt}`, error);
                if (attempt === maxRetry) throw error;
                await this.reloadPage();
                await this.waitForNetwork();
            }
        }
    }

    normalizeText(text: string | null | undefined): string {
        if (!text) return '';
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/\u00A0/g, ' ')
            .trim()
            .toUpperCase();
    }


}