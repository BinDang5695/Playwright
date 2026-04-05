import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { LoginPage as CRMLoginPage } from '../pages/crm/LoginPage';
import { LoginPage as CMSLoginPage } from '../pages/cms/LoginPage';

async function loginApp(app: 'crm' | 'cms', envFile: string): Promise<void> {
    const envPath = path.resolve(__dirname, 'profiles', envFile);
    
    console.log(`Loading env from: ${envPath}`);
    console.log(`File exists: ${fs.existsSync(envPath)}`);
    
    const result = dotenv.config({ path: envPath, override: true });
    
    if (result.error) {
        throw new Error(`Failed to load env file: ${envPath} — ${result.error.message}`);
    }

    const baseURL = process.env.BASE_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const role = process.env.ROLE ?? 'admin';
    const authStatePath = `.auth/${app}-${role}.json`;

    if (!baseURL) throw new Error(`[${app}] BASE_URL undefined`);
    if (!username) throw new Error(`[${app}] USERNAME undefined`);
    if (!password) throw new Error(`[${app}] PASSWORD undefined`);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    if (app === 'cms') {
        const loginPage = new CMSLoginPage(page);
        await loginPage.loginCMS(username, password);
        await loginPage.verifyLoginSuccess();
    } else {
        const loginPage = new CRMLoginPage(page);
        await loginPage.loginCRM(username, password);
        await loginPage.verifyLoginSuccess();
    }

    const authDir = path.resolve('.auth');
    if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

    await context.storageState({ path: path.resolve(authStatePath) });
    await browser.close();

    console.log(`✅ [${app}] Auth saved → ${authStatePath}`);
}

async function globalSetup(): Promise<void> {
    const envName = process.env.env;

    if (!envName) {
        await loginApp('crm', `.env.crm-dev-admin`);
        await loginApp('crm', `.env.crm-dev-pm`);
        await loginApp('cms', `.env.cms-dev-admin`);
        return;
    }

    if (envName.startsWith('cms')) {
        await loginApp('cms', `.env.${envName}`);
    } else if (envName === 'crm-dev-admin') {
        await loginApp('crm', `.env.crm-dev-admin`);
    } else if (envName === 'crm-dev-pm') {
        await loginApp('crm', `.env.crm-dev-pm`);
    } else {
        await loginApp('crm', `.env.crm-dev-admin`);
        await loginApp('crm', `.env.crm-dev-pm`);
        await loginApp('cms', `.env.cms-dev-admin`);
    }
}

export default globalSetup;