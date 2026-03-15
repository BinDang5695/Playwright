import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;
  protected readonly menuAdmin: Locator;
  protected readonly menuDashboard: Locator;

  protected normalizeText(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toUpperCase();
  }

  constructor(page: Page) {
    this.page = page;
    this.menuAdmin = page.locator("//span[normalize-space()='Admin']");
    this.menuDashboard = page.locator("(//span[normalize-space()='Dashboard'])[1]");

  }

  async clickMenuAdmin(): Promise<this> {
    await this.clickWithRetry(this.menuAdmin);
    return this;
  }

  async clickMenuDashboard(): Promise<this> {

    await this.menuDashboard.click();
    return this;
  }

  async clickWithRetry(
    locator: Locator,
    options?: {
      name?: string;
      maxRetry?: number;
      timeout?: number;
      hoverBeforeClick?: boolean;
      force?: boolean;
    }
  ) {
    const {
      name = 'element',
      maxRetry = 10,
      timeout = 20000,
      hoverBeforeClick = false,
      force = false
    } = options || {};

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      try {
        console.log(`🖱️ [${name}] click attempt ${attempt}/${maxRetry}`);

        await locator.waitFor({ state: 'visible', timeout });
        await locator.waitFor({ state: 'attached', timeout });

        if (hoverBeforeClick) {
          await locator.hover();
        }

        await locator.click({ timeout, force });

        console.log(`✅ [${name}] click SUCCESS`);
        return;
      } catch (err: any) {
        console.log(
          `⚠️ [${name}] click FAILED (attempt ${attempt}): ${err.message}`
        );

        if (attempt === maxRetry) {
          throw new Error(`❌ Click FAILED after ${maxRetry} attempts: ${name}`);
        }

        await locator.page().waitForTimeout(1000);
      }
    }
  }

}
