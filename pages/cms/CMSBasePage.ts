import BasePage from '@pages/crm/BasePage';

export class CMSBasePage extends BasePage {

  getBySpanText(text: string | number) {
    return this.page.locator(`//span[normalize-space()='${text}']`);
  }

  async clickByMenuName(text: string | number) {
    await this.click(this.getBySpanText(text));
  }

  

}




