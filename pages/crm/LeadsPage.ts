import { expect } from '@playwright/test';
import { CRMBasePage } from '@pages/crm/CRMBasePage';
import { Button, Message } from '@constants/crm';
import { Lead } from '@models/types/crm/lead.model'

export class LeadsPage extends CRMBasePage {

    private get buttonNewLead() {
        return this.page.locator("//a[normalize-space()='New Lead']")
    }

    private get dropdownStatus() {
        return this.page.locator("//button[@data-id='status']")
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
    await this.buttonSave.click();
    await this.page.reload();
    await expect(this.buttonNewLead).toBeVisible();
  }

  async createMultipleLeads(totalLead: number, data: Lead) {
    for (let i = 1; i <= totalLead; i++) {
      data.name = `Bin Lead ${i}`;
      console.log(`Creating Lead: ${data.name}`);

      let formOpened = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt} to open New Lead form`);

          await this.buttonNewLead.click();
          await expect(this.dropdownStatus).toBeVisible();
          console.log(`✅ New Lead form opened successfully`);
          formOpened = true;
          break;

        } catch (err) {
          console.log(`⚠️ Form didn't open on attempt ${attempt}, refreshing page`);
          await this.page.reload();
        }
      }

      if (!formOpened) {
        throw new Error(`❌ Failed to open New Lead form after 3 attempts`);
      }

      await this.addNewLead(data);
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

  async searchAndCheckDataInTable(data: Lead) {

    await this.dropdownPagination.selectOption('10');
    await this.type(this.inputSearchLead, data.search);
    await expect(this.contentLeads_info1To2).toContainText(Message.SHOWING1TO2OFENTRIES);
    await this.checkLeadNameContains(data);
  }

  async selectAllAndEnsureChecked(maxRetry = 3) {

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      console.log(`🔁 Select All attempt ${attempt}`);
      
      await this.checkboxSelectAll.scrollIntoViewIfNeeded();
      await this.checkboxSelectAll.click();

      const total = await this.checkboxSelectEach.count();
      let checked = 0;

      for (let i = 0; i < total; i++) {
        if (await this.checkboxSelectEach.nth(i).isChecked()) {
          checked++;
        }
      }

      console.log(
        `☑ Select All attempt ${attempt}: ${checked}/${total} checked`
      );

      if (checked === total && total > 0) {
        console.log('✅ Select All SUCCESS');
        return;
      }
    }

    throw new Error('❌ Select All FAILED after retries');
  }

  async deleteDataAfterSearched() {
    await this.acceptAlert();
    await this.dropdownPagination.selectOption('25');
    await this.selectAllAndEnsureChecked();
    await this.buttonBulkActions.click();
    await this.checkboxMassDelete.click();
    await this.buttonConfirm.click();
  }

  async verifyDeletedLeads(data: Lead) {
    await expect(this.getAlert(), Message.TOTALLEADSDELETE2).toBeVisible();
    await this.getbuttonCloseAlert().click();
    await this.inputSearchLead.fill(data.search);
    await expect(this.getNoData()).toBeVisible();
  }
}