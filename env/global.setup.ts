import { chromium } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';
import { LoginPage } from '@pages/LoginPage';
import { Users } from './users';
import { ENV_NAME } from './environment';

export default async function globalSetup() {

    console.log(
        `Environment: ${ENV_NAME}`
    );

    const baseURL = process.env.BASE_URL;

    if (!baseURL) {
        throw new Error('Missing BASE_URL');
    }

    const browser = await chromium.launch({
        headless: false,
    });

    for (const [role, account] of Object.entries(Users)) {

        if (!account.username || !account.password) {
            throw new Error(
                `Missing credentials for role: ${role}`
            );
        }

        console.log(`Login as ${role}`);

        const context = await browser.newContext({
            baseURL,
        });

        const page = await context.newPage();

        const loginPage = new LoginPage(page);

        await loginPage.loginCRM(
            account.username,
            account.password
        );

        await loginPage.verifyLoginSuccess();

        const authFile = path.resolve(
            `.auth/${ENV_NAME}/${role}.json`
        );

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