import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';
import { ENV_NAME } from './env/environment';

dotenv.config({
    path: path.resolve(__dirname, `env/profiles/.env.${ENV_NAME}`),
    override: true,
});

console.log(`Running ENV: ${ENV_NAME}`);
console.log(`BASE_URL: ${process.env.BASE_URL}`);

export default defineConfig({

    globalSetup: './env/global.setup.ts',
    fullyParallel: true,
    workers: 1,
    timeout: 90 * 1000,
    expect: {
        timeout: 15 * 1000,
    },
    use: {
        baseURL: process.env.BASE_URL,
        browserName: 'chromium',
        headless: false,
        viewport: null,
        launchOptions: {
            args: ['--start-maximized'],
        },
        actionTimeout: 20 * 1000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chrome',
            testDir: './tests/ui',
            use: {
                channel: 'chrome',
            },
        },
        {
            name: 'edge',
            testDir: './tests/ui',
            use: {
                channel: 'msedge',
            },
        },
        {
            name: 'api',
            testDir: './tests/api',
            use: {},
        },
    ],

    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results' }],
    ],
});