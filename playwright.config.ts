import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.env;
const project = process.env.project;
dotenv.config({
  path: `env/profiles/.env.${envName}`,
  override: true,
});
const needsAuth = project !== 'api' && project !== 'fb';

export default defineConfig({

  globalSetup: needsAuth ? './env/global.setup.ts' : undefined,
  fullyParallel: true,
  workers: process.env.CI ? 1 : 1,
  testDir: './tests/',
  timeout: 90 * 1000, //timeout for each test
  expect: {
    timeout: 15 * 1000, //timeout for each expect condition
  },
  projects: [
    {
      name: 'api',
      retries: 1,
      use: {
        baseURL: process.env.API_BASE_URL,
        storageState: undefined,
        headless: true
      }
    },
    {
      name: "fb-chrome",
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
{
      name: "fb-edge",
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      name: "cms-chrome",
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
      },
    },
        {
      name: "cms-edge",
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
        storageState: '.auth/cms-user.json',
      },
    },
    {
      name: 'crm-chrome',
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
      },
    },
    {
      name: 'crm-edge',
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
        storageState: '.auth/crm-user.json',
      },
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
    ['html', { open: 'never' }],
    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ]

});