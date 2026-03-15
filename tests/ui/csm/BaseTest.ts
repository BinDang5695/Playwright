import { test as base } from '@playwright/test';
import PageFactory from '../../../models/pages/csm/PageFactory';

type Fixtures = {
    pages: PageFactory;
};

export const test = base.extend<Fixtures>({
    pages: async ({ page }, use) => {
        await use(new PageFactory(page));
    }
});

export { expect } from '@playwright/test';
