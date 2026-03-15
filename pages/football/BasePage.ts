import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected readonly page: Page;

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
  }




}
