import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { LoginPage } from '../pages/crm/LoginPage';

async function globalSetup(): Promise<void> {
  dotenv.config({
    path: path.resolve(__dirname, `profiles/.env.${process.env.env || 'crm-dev'}`),
    override: true
  });

  const baseURL = process.env.BASE_URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!baseURL) throw new Error('BASE_URL undefined');
  if (!username) throw new Error('USERNAME undefined');
  if (!password) throw new Error('PASSWORD undefined');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.loginCRM(username, password);
  await loginPage.verifyLoginSuccess();

  const authDir = path.resolve('playwright/.auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await context.storageState({ path: path.resolve('playwright/.auth/user.json') });
  await browser.close();

  console.log('✅ Auth setup done.');
}

export default globalSetup;