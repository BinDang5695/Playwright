import { defineConfig, FullProject } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.env || 'crm-dev';
dotenv.config({
  path: `env/profiles/.env.${envName}`,
});

export default defineConfig({

    globalSetup: './env/global.setup.ts',
    fullyParallel: true,
    testDir: './tests/',
    workers: 2,
    timeout: 90 * 1000, //timeout for each test
    expect: {
        timeout: 15 * 1000, //timeout for each expect condition
    },
    projects:[
      {
        name: "chrome",
        testDir: './tests/ui',
        retries: 1,
        use: {
              browserName: 'chromium',
              channel: 'chrome',
              headless: false,
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
            }
      },

      {
        name: "edge",
        testDir: './tests/ui',
        retries: 1,
        use: {
              browserName: 'chromium',
              channel: 'msedge',
              headless: false,
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
            }
      },
      
      {
        name: 'api',
        testDir: './tests/api',
        retries: 1,
        use: {
            baseURL: process.env.API_BASE_URL,
            storageState: undefined,
            headless: true
        }
      },

    ],
    use: {
        baseURL: process.env.BASE_URL,
        storageState: 'playwright/.auth/user.json',
        actionTimeout: 20 * 1000, //timeout for each action like click, fill
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    
    reporter: [
        ['list'],
        ['html', {open: 'never'}],
        ['allure-playwright', {
            outputFolder: ({ project }: { project: FullProject }) => `allure-results/${project.name}`
        }]
    ]

});