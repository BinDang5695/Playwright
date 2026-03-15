import { test as baseTest } from '@playwright/test';
import { PageFixtureType, pageFixture } from './page.fixture';

export const test = baseTest.extend<PageFixtureType>({
  ...pageFixture
});

export const expect = test.expect;