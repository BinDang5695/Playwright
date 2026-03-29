import { expect } from '@playwright/test';
import { CRMBasePage } from './CRMBasePage';
import { Button, Table, Dropdown, Number, Input, Search, Message } from '@constants/crm';
import { Lead } from '@models/types/lead.model'

export class LeadsPage extends CRMBasePage {

    get buttonNewLead() {
        return this.getLinkByText(Button.NEWLEAD);
    }

    get dropdownStatus() {
        return this.getDropdown(Button.STATUS);
    }   

    get inputName() {
        return this.getCheckbox2(Input.NAME);
    }

    get buttonSave() {
        return this.getButtonById(Button.LEAD_FORM_SUBMIT);
    }

    get dropdownPagination() {
        return this.getDropdownSelect(Dropdown.LEADS_LENGTH);
    }

    get inputSearchLead() {
        return this.getInputAriaControls(Search.LEADS);
    }

    get contentLeads_info1To1() {
        return this.getDivText(Table.LEADS_INFO);
    }
    
    get leadNameCells() {
        return this.getCells(Number.THREE);
    }

  async addNewLead(data: Lead) {

    await this.selectDropdownNotSearch2(Button.STATUS, data.status);
    await this.selectDropdownNotSearch(Button.SOURCE, data.source);
    await this.type(this.inputName, data.name);
    await this.click(this.buttonSave);
    await this.reloadPage();
    await this.waitVisible(this.buttonNewLead);
  }

  async createMultipleLeads(totalLead: number, data: Lead) {
    for (let i = 1; i <= totalLead; i++) {
      data.name = `Bin Lead ${i}`;
      console.log(`Creating Lead: ${data.name}`);

      let formOpened = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt} to open New Lead form`);

          await this.click(this.buttonNewLead);
          await this.waitVisible(this.dropdownStatus);
          console.log(`✅ New Lead form opened successfully`);
          formOpened = true;
          break;

        } catch (err) {
          console.log(`⚠️ Form didn't open on attempt ${attempt}, refreshing page`);
          await this.reloadPage();
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

    await this.selectOption(this.dropdownPagination, Number.TEN);
    await this.type(this.inputSearchLead, "Bin Lead");
    await this.verifyContainsText(this.contentLeads_info1To1, Table.SHOWING1TO2OF2);
    await this.checkLeadNameContains(data);
  }

  async selectAllAndEnsureChecked(maxRetry = 3) {

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      console.log(`🔁 Select All attempt ${attempt}`);
      
      await this.scrollIntoView(this.checkboxSelectAll);
      await this.click(this.checkboxSelectAll);

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
    await this.selectOption(this.dropdownPagination, Number.TWENTYFIVE);
    await this.selectAllAndEnsureChecked();
    await this.click(this.buttonBulkActions);
    await this.click(this.checkboxMassDelete);
    await this.click(this.buttonConfirm);
  }

  async verifyDeletedLeads(data: Lead) {
    await this.verifyText(this.getAlert(), Message.TOTALLEADSDELETE2);
    await this.click(this.getCloseAlert());
    await this.type(this.inputSearchLead, data.name);
    await this.waitVisible(this.getNoData());
  }
}