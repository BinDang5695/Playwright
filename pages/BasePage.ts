import { Page, Locator, expect } from '@playwright/test';
import path from 'path';
import { ExportFileType } from '@models/types/ui/file.model';
import { extractTextFromPDF, readExcelAsText, deleteFile } from '@models/helpers/FileHelpers';
import { ExportData } from '@models/types/ui/export-data.model';
import fs from 'fs';

export class BasePage {

  constructor(public page: Page) { }

  get getAlert() {
    return this.page.locator(`//span[@class='alert-title']`);
  }

  get getNoData() {
    return this.page.locator(`//td[@class='dataTables_empty']`);
  }

  get getbuttonCloseAlert() {
    return this.page.locator(`//button[@data-dismiss='alert']//span[@aria-hidden='true'][normalize-space()='×']`);
  }

  get getFile() {
    return this.page.locator(`input[type="file"]`);
  }

  get buttonView() {
    return this.page.locator("//a[normalize-space()='View']");
  }

  get buttonEdit() {
    return this.page.locator("//div[@class='row-options']//a[contains(text(),'Edit')]");
  }

  get buttonDelete() {
    return this.page.locator("//a[normalize-space()='Delete']");
  }

  get checkboxSelectAll() {
    return this.page.locator(".checkbox.mass_select_all_wrap:visible");
  }

  get checkboxSelectEach() {
    return this.page.locator("//div[@class='checkbox']//input[@type='checkbox']");
  }

  get buttonBulkActions() {
    return this.page.locator("//span[normalize-space()='Bulk Actions']");
  }

  get checkboxMassDelete() {
    return this.page.locator("//label[normalize-space()='Mass Delete']");
  }

  get buttonMore() {
    return this.page.locator("//button[normalize-space()='More']")
  }

  get buttonConfirm() {
    return this.page.locator("//a[normalize-space()='Confirm']");
  }

  get closePopUp() {
    return this.page.locator("//div[contains(@class,'modal') and contains(@class,'in')]//div[contains(@class,'modal-header')]/button[@aria-label='Close']");
  }

  get buttonExport() {
    return this.page.locator("//span[normalize-space()='Export']")
  }

  get optionPDF() {
    return this.page.locator("//a[normalize-space()='PDF']")
  }

  get optionExcel() {
    return this.page.locator("//a[normalize-space()='Excel']")
  }

  get optionCSV() {
    return this.page.locator("//a[normalize-space()='CSV']")
  }

  get editorBody() {
    return this.page.frameLocator('#article-form iframe#description_ifr').locator('#tinymce');
  }
  
  getLinkByText(text: string) {
    return this.page.locator(`//a[normalize-space()='${text}']`);
  }

  getByMenuText(text: string) {
    return this.page.locator(`//span[@class='menu-text'][normalize-space()='${text}']`);
  }

  getBySpanText(text: string) {
    return this.page.locator(`//span[normalize-space()='${text}']`);
  }

  getDropdownByDataId(text: string | number) {
    return this.page.locator(`//button[@data-id='${text}']`);
  }

  getDropdownSearchByIndex(index: number) {
    return this.page.locator(`//input[@aria-controls='bs-select-${index}']`);
  }

  getSpanByTextClass(value: string | number) {
    return this.page.locator(`//span[@class='text'][normalize-space()='${value}']`);
  }

  async expectEqual(actual: number, expected: number, message?: string) {
    if (message) {
      console.log(message);
    }
    await expect(actual).toBe(expected);
  }

  async acceptAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async dismissAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });
  }

  async type(locator: Locator, text: string, delay?: number) {
    await expect(locator).toBeVisible();

    if (delay) {
      await locator.pressSequentially(text, { delay });
    } else {
      await locator.fill(text);
    }
  }

  normalizeText(text: string | null | undefined): string {
    if (!text) return '';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toUpperCase();
  }

  async clickByMenuName(text: string) {
    await this.getBySpanText(text).click();
  }

  async clickByMenuText(text: string) {
    await this.getByMenuText(text).click();
  }

  async clickByLinkText(link: string) {
    await this.getLinkByText(link).click();
  }

  async deleteRecordAfterHover() {
    await this.acceptAlert();
    await this.buttonDelete.click();
    await this.getbuttonCloseAlert.click();
  }

  async deleteRecordAfterSelectCheckbox() {
    await this.acceptAlert();
    await this.buttonBulkActions.click();
    await this.checkboxMassDelete.click();
    await this.buttonConfirm.click();
  }

  async deleteRecordAfterSelectDropdown() {
    await this.acceptAlert();
    await this.buttonMore.click();
    await this.buttonDelete.click();
  }

  async clickButtonView() {
    await this.buttonView.click();
  }

  async clickButtonEdit() {
    await this.buttonEdit.click();
  }
  async clickButtonClosePopUp() {
    await this.closePopUp.click();
  }

  async clickButtonMore() {
    await this.closePopUp.click();
  }

  async clickButtonDelete() {
    await this.closePopUp.click();
  }

  async attachFile(relativeFilePath: string) {
    const absoluteFilePath = path.resolve(relativeFilePath);
    await this.getFile.setInputFiles(absoluteFilePath);
    await expect(this.page.locator('.dz-preview')).toBeVisible();
  }

  async selectDropdownWithSearch(name: string | number, searchIndex: number, value: string, searchValue?: string) {
    await this.getDropdownByDataId(name).click();
    await this.type(this.getDropdownSearchByIndex(searchIndex), searchValue ?? value, 100);
    await this.getBySpanText(value).first().click();
  }

  async selectDropdownBySpanText(name: string | number, value: string) {
    await this.getDropdownByDataId(name).click();
    await this.getBySpanText(value).first().click();
  }

  async selectDropdownByType(name: string | number, value: string) {
    await this.getDropdownByDataId(name).click();
    await this.getSpanByTextClass(value).first().click();
  }

  async verifyNoItem(expectedMessage: string) {
    await expect(this.getNoData).toHaveText(expectedMessage);
  }

  async reloadPage() {
    await this.page.reload({ waitUntil: 'networkidle' });
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

  async exportFile(type: ExportFileType): Promise<string> {
    const downloadsDir = path.resolve('downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    await this.buttonExport.click();
    const optionMap = {
      pdf: this.optionPDF,
      excel: this.optionExcel,
      csv: this.optionCSV,
    };
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      optionMap[type].click({ force: true }),
    ]);

    const fileName = download.suggestedFilename();
    const savePath = path.join(downloadsDir, fileName);
    await download.saveAs(savePath);
    return savePath;
  }

  async readExportFile(type: ExportFileType, filePath: string): Promise<string> {

    switch (type) {
      case 'pdf':
        return await extractTextFromPDF(filePath);
      case 'excel':
        return await readExcelAsText(filePath);
      case 'csv':
        return await fs.promises.readFile(filePath, 'utf8');
      default:
        throw new Error(`Unsupported export type: ${type}`);
    }
  }

  async exportAndVerifyContentFile(type: ExportFileType, uiData: ExportData): Promise<void> {

    const filePath = await this.exportFile(type);

    try {
      const fileText = await this.readExportFile(type, filePath);
      this.verifyExportContent(
        this.normalizeText(fileText),
        uiData
      );

    } finally {
      await deleteFile(filePath);
    }
  }

  async verifyExportContent(
    fileNorm: string,
    uiData: ExportData
  ) {

    console.log('📋 Verify exported data:');

    for (const [field, value] of Object.entries(uiData)) {

      console.log(`${field}: ${value}`);

      if (!value?.trim()) continue;

      expect(
        fileNorm,
        `${field} not found in exported file`
      ).toContain(this.normalizeText(value));
    }
  }

  async waitForUiStable() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForLoadState('networkidle');
  }

}

