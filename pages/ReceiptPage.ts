import { Page, expect } from '@playwright/test';
import path from 'path';

export default class ReceiptPage {
  constructor(private page: Page) {}

  private fileInput = () => this.page.locator('input[type="file"]');

  async attachReceipt(relativeFilePath: string) {
    const absoluteFilePath = path.resolve(relativeFilePath);

    await this.fileInput().setInputFiles(absoluteFilePath);

    await expect(this.page.locator('.dz-preview')).toBeVisible({ timeout: 5000 });
  }
}
