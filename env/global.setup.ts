import { chromium, type Browser } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '@pages/LoginPage';
import { Users } from '@env/users';
import { ENV_NAME } from '@env/environment';

export default async function globalSetup() {

    const browser = await chromium.launch({
        headless: false
    });

    const baseURL = process.env.BASE_URL!;

    for (const [role, account] of Object.entries(Users)) {

        const authFile = path.resolve(
            `.auth/${ENV_NAME}/${role}.json`
        );

        if (await isStorageValid(browser, baseURL, authFile)) {
            console.log(`${role}: reuse storage`);
            continue;
        }

        console.log(`${role}: login`);

        const context = await browser.newContext({
            baseURL
        });

        const page = await context.newPage();

        const loginPage = new LoginPage(page);

        await loginPage.loginCRM(
            account.username,
            account.password
        );

        await loginPage.verifyLoginSuccess();

        await fs.promises.mkdir(
            path.dirname(authFile),
            {
                recursive: true
            }
        );

        await context.storageState({
            path: authFile
        });

        await context.close();
    }

    await browser.close();
}

async function isStorageValid(
    browser: Browser,
    baseURL: string,
    authFile: string
): Promise<boolean> {

    if (!fs.existsSync(authFile)) {
        return false;
    }

    const context = await browser.newContext({
        baseURL,
        storageState: authFile
    });

    const page = await context.newPage();

    try {

        await page.goto('/admin/dashboard');

        await page.waitForLoadState('networkidle');

        console.log(
            'Current URL:',
            page.url()
        );

        if (page.url().includes('/authentication')) {
            return false;
        }

        await page.locator('body')
            .waitFor({
                state: 'visible'
            });

        console.log('Storage valid');

        return true;

    } catch (e) {

        console.log('Storage invalid');

        return false;

    } finally {

        await context.close();
    }
}