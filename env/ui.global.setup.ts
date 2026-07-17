import { chromium, type Browser } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '@pages/LoginPage';
import { Users } from './users';
import { ENV_NAME } from './environment';

export default async function globalSetup() {

    const browser = await chromium.launch();

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

    console.log(`Checking storage: ${authFile}`);

    if (!fs.existsSync(authFile)) {
        console.log('Auth file missing');
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

            console.log('Session expired');

            return false;
        }

        await page.getByText('Dashboard')
            .waitFor({
                timeout: 5000
            });

        console.log('Storage valid');

        return true;

    } catch {

        console.log('Storage invalid');
        return false;

    } finally {

        await context.close();

    }
}