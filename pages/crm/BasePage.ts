import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {

    constructor(public page: Page) { }

    async getPageTitle() {
        return await this.page.title();
    }

    getCurrentUrl() {
        return this.page.url();
    }

    async pressKey(key: string) {
        await this.page.keyboard.press(key);
    }

    async waitForResponse(endpoint: string, statusCode: number) {
        return await this.page.waitForResponse(
            resp => resp.url().includes(endpoint) && resp.status() === statusCode
        );
    }

    async expectEqual(actual: number, expected: number, message?: string) {
        if (message) {
            console.log(message);
        }
        await expect(actual).toBe(expected);
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

    async click(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async type(locator: Locator, text: string, delay?: number) {
        await expect(locator).toBeVisible();

        if (delay) {
            await locator.pressSequentially(text, { delay });
        } else {
            await locator.fill(text);
        }
    }

    async acceptAlertAndVerify(expectedMessage: string) {
        this.page.once('dialog', async dialog => {
            await expect(dialog.message()).toContain(expectedMessage);
            await dialog.accept();
        });
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
                await this.page.reload();
                await this.page.waitForLoadState('networkidle');
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