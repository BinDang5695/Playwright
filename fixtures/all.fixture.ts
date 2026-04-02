import { test as baseTest } from '@playwright/test';
import { PageFixtureType, pageFixture } from './crm.fixture';

export const test = baseTest.extend<PageFixtureType>({
  ...pageFixture
}); 

export const expect = test.expect;