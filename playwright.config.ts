import { defineConfig, FullProject } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.env;
dotenv.config({
  path: `env/profiles/.env.${envName}`,
});

export default defineConfig({

    globalSetup: './env/global.setup.ts',
    fullyParallel: true,
    workers: 1,
    timeout: 90 * 1000, //timeout for each test
    expect: {
        timeout: 15 * 1000, //timeout for each expect condition
    },
    projects:[
      {
        name: 'crm',
        testDir: './tests/ui/crm',
        retries: 1,
        use: {
              browserName: 'chromium',
              channel: 'chrome',
              headless: false,
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
              },
              storageState: '.auth/crm-user.json',
            }
      },

      {
        name: "cms",
        testDir: './tests/ui/cms',
        retries: 1,
        use: {
              browserName: 'chromium',
              channel: 'chrome',
              headless: false,
              viewport: null,
              launchOptions: {
              args: ['--start-maximized'],
        },
        storageState: '.auth/cms-user.json',
            }
      },
      
      {
        name: 'api',
        testDir: `./tests/api`,
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