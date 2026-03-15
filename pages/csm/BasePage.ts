import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;
  protected readonly menuDashboard: Locator;
  protected readonly menuProducts: Locator;
  protected readonly menuCategory: Locator;
  protected readonly menuUploadedFiles: Locator;
  protected readonly menuAllProducts: Locator;

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
    this.menuDashboard = page.locator("//span[normalize-space()='Dashboard']");
    this.menuProducts = page.locator("//span[normalize-space()='Products']");
    this.menuCategory = page.locator("//span[normalize-space()='Category']");
    this.menuUploadedFiles = page.locator("//span[normalize-space()='Uploaded Files']");
    this.menuAllProducts = page.locator("//span[normalize-space()='All products']");
  }

  async clickMenuDashboard(): Promise<this> {
    await this.menuDashboard.click();
    return this;
  }

  async clickMenuProducts(): Promise<this> {
    await this.menuProducts.click();
    return this;
  }

  async clickMenuCategory(): Promise<this> {
    await this.menuCategory.click();
    return this;
  }

  async clickMenuUploadedFiles(): Promise<this> {
    await this.menuUploadedFiles.click();
    return this;
  }

  async clickMenuAllProduct(): Promise<this> {
    await this.menuAllProducts.click();
    return this;
  }



}
