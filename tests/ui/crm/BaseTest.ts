import { test as base, expect } from '@playwright/test';
import { pageFixture, PageFixtureType } from '@fixtures/page.fixture';

export const test = base.extend<PageFixtureType>(pageFixture);

export { expect };