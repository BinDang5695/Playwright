import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

const envName = process.env.env;
const project = process.env.project;

if (envName) {
    dotenv.config({
        path: path.resolve(__dirname, `env/profiles/.env.${envName}`),
        override: true,
    });
}

const needsAuth = project !== 'api';

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
      name: "saucedemo-chrome",
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
      name: "saucedemo-edge",
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
      name: "cms-chrome-admin",
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        storageState: '.auth/cms-admin.json',
      },
    },
        {
      name: "cms-edge-admin",
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
        storageState: '.auth/cms-admin.json',
      },
    },
    {
      name: 'crm-chrome-admin',
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        storageState: '.auth/crm-admin.json',
      },
    },
    {
      name: 'crm-edge-admin',
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
        storageState: '.auth/crm-admin.json',
      },
    },
{
      name: 'crm-chrome-pm',
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
        storageState: '.auth/crm-pm.json',
      },
    },
    {
      name: 'crm-edge-pm',
      retries: 1,
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
        storageState: '.auth/crm-pm.json',
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