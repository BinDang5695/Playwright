import { expect } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { Button, Message } from '@constants/crm';
import { Lead } from '@models/types/ui/lead.model'

export class LeadsPage extends BasePage {

  private get buttonNewLead() {
    return this.page.locator("//a[normalize-space()='New Lead']")
  }

  private get inputName() {
    return this.page.locator("//div[@class='col-md-6']//input[@id='name']")
  }

  private get buttonSave() {
    return this.page.locator("#lead-form-submit")
  }

  private get dropdownPagination() {
    return this.page.locator("//select[@name='leads_length']")
  }

  private get inputSearchLead() {
    return this.page.locator("//input[@aria-controls='leads']")
  }

  private get contentLeads_info1To2() {
    return this.page.locator("//div[@id='leads_info' and contains(., 'Showing 1 to 2 of 2 entries')]")
  }

  private get leadNameCells() {
    return this.page.locator("//table//tbody/tr/td[3]")
  }

  async addNewLead(data: Lead) {

    await this.selectDropdownByType(Button.STATUS, data.status);
    await this.selectDropdownBySpanText(Button.SOURCE, data.source);
    await this.inputName.fill(data.name);
  }

  async clickButtonSave() {
    await this.buttonSave.click();
  }

  async createMultipleLeads(totalLead: number, data: Lead) {
    for (let i = 1; i <= totalLead; i++) {
      data.name = `Bin Lead ${i}`;
      console.log(`Creating Lead: ${data.name}`);

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await this.buttonNewLead.click();
          break;

        } catch (err) {
          await this.reloadPage();
        }
      }

      await this.addNewLead(data);
      await this.clickButtonSave();
      await this.reloadPage();
    }
  }

  async checkLeadNameContains(value: string | Lead) {
    const searchValue = typeof value === 'string' ? value : value.name;
    const texts = await this.leadNameCells.allTextContents();
    const normalizedValue = this.normalizeText(searchValue);
    const matched = texts.filter(text => this.normalizeText(text).includes(normalizedValue));
    console.log(`📋 Total rows: ${texts.length} | ✅ Matched: ${matched.length}`);
    expect(matched.length).toBeGreaterThan(0);
  }

  async selectLeadsLength(length: number) {
    await this.dropdownPagination.selectOption(`${length}`);
  }

  async searchLeads(data: Lead) {
    await this.type(this.inputSearchLead, data.search);
  }

  async checkNumberOfLeads(data: Lead) {
    await expect(this.contentLeads_info1To2).toContainText(Message.SHOWING1TO2OFENTRIES);
    await this.checkLeadNameContains(data);
  }

  async verifyAlertTotalDeletedLeads(data: Lead) {
    await expect(this.getAlert, Message.TOTALLEADSDELETE2).toBeVisible();
  }
  
}