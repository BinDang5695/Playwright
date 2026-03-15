import { expect } from '@playwright/test';
import BasePage from './BasePage';
import { de } from '@faker-js/faker';

export class LeadsPage extends BasePage {

  private buttonNewLead = () => this.page.locator("//a[normalize-space()='New Lead']");
  private dropdownStatus = () => this.page.locator("//button[@data-id='status']");
  private inputStatus = () => this.page.locator("//div[@class='dropdown bootstrap-select input-group-btn _select_input_group bs3 open']//input[@aria-label='Search']");
  private optionActive = () => this.page.locator("//span[@class='text'][normalize-space()='Active']");
  private dropdownSource = () => this.page.locator("//button[@data-id='source']");
  private inputSource = () => this.page.locator("//div[@class='dropdown bootstrap-select input-group-btn _select_input_group bs3 open']//input[@aria-label='Search']");
  private optionFacebook = () => this.page.locator("//span[normalize-space()='Facebook']");
  private dropdownTags = () => this.page.locator("//div[@id='inputTagsWrapper']//input[@placeholder='Tag']");
  private optionSelenium = () => this.page.locator("//li[contains(@class,'menu')]//div[normalize-space()='Selenium']");
  private inputName = () => this.page.locator("//div[@class='col-md-6']//input[@id='name']");
  private buttonSave = () => this.page.locator("//button[@id='lead-form-submit']");
  private dropdownPagination = () => this.page.locator("//select[@name='leads_length']");
  private inputSearchLead = () => this.page.locator("//input[@aria-controls='leads']");
  private contentLeads_info1To1 = () => this.page.locator("//div[@id='leads_info' and contains(., 'Showing 1 to 2 of 2 entries')]");
  private checkboxSelectAllLead = () => this.page.locator(".checkbox.mass_select_all_wrap:visible");
  private allBinLeadcheckbox = () => this.page.locator("//div[@class='checkbox']//input[@type='checkbox']");
  private buttonBulkActions = () => this.page.locator("//span[normalize-space()='Bulk Actions']");
  private checkboxMassDelete = () => this.page.locator("//label[normalize-space()='Mass Delete']");
  private buttonConfirm = () => this.page.locator("//a[normalize-space()='Confirm']");
  private alertSuccess = () => this.page.locator("//span[@class='alert-title']");
  private noDataAfterDelete = () => this.page.locator("//td[@class='dataTables_empty']");
  private buttonXAlert = () => this.page.locator("//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']");
  private leadNameCells = () => this.page.locator("//table//tbody/tr/td[3]");

  


  async addNewLead(leadName: string) {

    await this.clickWithRetry(this.dropdownStatus());
    await this.inputStatus().fill('Active');
    await this.optionActive().click();

    await this.dropdownSource().click();
    await this.inputSource().fill('Facebook');
    await this.optionFacebook().click();

    await this.dropdownTags().click();
    await this.dropdownTags().fill('Selenium');
    await this.optionSelenium().click();

    await this.inputName().fill(leadName);

    await this.buttonSave().click();
    await this.page.reload({ waitUntil: 'networkidle' });
    await expect(this.buttonNewLead()).toBeVisible();
  }

  async createMultipleLeads(totalLead: number) {
    for (let i = 1; i <= totalLead; i++) {
      const leadName = `Bin Lead ${i}`;

      console.log(`Creating Lead: ${leadName}`);

      let formOpened = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt} to open New Lead form`);

          await this.clickWithRetry(this.buttonNewLead());

          await this.dropdownStatus().waitFor({ state: 'visible' });
          console.log(`✅ New Lead form opened successfully`);
          formOpened = true;
          break;

        } catch (err) {
          console.log(`⚠️ Form didn't open on attempt ${attempt}, refreshing page`);
          await this.page.reload({ waitUntil: 'networkidle' });
        }
      }

      if (!formOpened) {
        throw new Error(`❌ Failed to open New Lead form after 3 attempts`);
      }

      await this.addNewLead(leadName);
    }
  }

  async checkLeadNameContains(value: string) {
    const texts = await this.leadNameCells().allTextContents();

    console.log(`📋 Total lead rows: ${texts.length}`);

    texts.forEach((text, index) => {
      console.log(`  🔹 Row ${index + 1}: "${text.trim()}"`);
    });

    const matched = texts.filter(text =>
      this.normalizeText(text).includes(this.normalizeText(value))
    );

    console.log(`✅ Rows matching "${value}": ${matched.length}`);

    expect(matched.length).toBeGreaterThan(0);
  }

  async searchAndCheckDataInTable(columnIndex: number, data: string) {

    const dropdown = this.dropdownPagination();

    await expect(dropdown).toBeVisible();
    await this.dropdownPagination().selectOption('10');
    await expect(this.inputSearchLead()).toBeVisible();
    await this.inputSearchLead().fill('Bin Lead');
    await expect(this.contentLeads_info1To1()).toBeVisible();
    await this.checkLeadNameContains(data);
  }

  async selectAllAndEnsureChecked(maxRetry = 3) {
    const selectAll = this.checkboxSelectAllLead();
    const checkboxes = this.allBinLeadcheckbox();

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      console.log(`🔁 Select All attempt ${attempt}`);
      
      await selectAll.scrollIntoViewIfNeeded();
      await selectAll.click();
      await this.page.waitForTimeout(300);

      const total = await checkboxes.count();
      let checked = 0;

      for (let i = 0; i < total; i++) {
        if (await checkboxes.nth(i).isChecked()) {
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
    this.page.once('dialog', dialog => dialog.accept());
    await this.dropdownPagination().selectOption('25');
    await this.selectAllAndEnsureChecked();
    await this.buttonBulkActions().click();
    await expect(this.checkboxMassDelete()).toBeVisible();
    await this.checkboxMassDelete().click();
    await this.buttonConfirm().click();
  }

  async verifyDeletedLeads() {
    await expect(this.alertSuccess()).toBeVisible();
    await expect(this.alertSuccess()).toHaveText('Total leads deleted: 2');
    await this.buttonXAlert().click();
    await this.inputSearchLead().fill('Bin Lead');
    await expect(this.noDataAfterDelete()).toBeVisible();
    await expect(this.noDataAfterDelete()).toHaveText('No matching records found');
  }
}