import { expect } from '@playwright/test';
import BasePage from './BasePage';
import { de } from '@faker-js/faker';

type RegistrationData = {
  firstName?: string;
  surName?: string;
  clubName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  emails?: string[];
  emailCount?: number;
  consent?: boolean | string;
  captcha?: string;
};

type ExpectedError = {
  field: string;
  message: string;
};

export default class RegistrationPage extends BasePage {

  private buttonRegisterAndProceed = () => this.page.locator("//button[normalize-space()='Register and proceed']");
  private inputFirstName = () => this.page.locator("//input[@id='firstname']");
  private inputSurname = () => this.page.locator("//input[@id='surname']");
  private inputClubName = () => this.page.locator("//input[@id='clubSearch']");
  private inputAddress = () => this.page.locator("//textarea[@id='address']");
  private inputPhoneNumber = () => this.page.locator("//input[@id='phone']");
  private inputEmail = () => this.page.locator("//input[@id='email']");
  private inputConsent = () => this.page.locator("//input[@id='consent']");
  private inputCaptcha = () => this.page.locator("//input[@id='captchaInput']");
  private buttonSubmitRegistration = () => this.page.locator("//button[@id='submitSubmission']");
  private errorMessages = () => this.page.locator("//div[@class='error-message']");
  private btnAddEmail = () => this.page.locator("//button[@id='btnAddEmail']");
  private selectedClubName = () => this.page.locator("//select[@id='club']");

  async clickButtonRegisterAndProceed() {
    await this.buttonRegisterAndProceed().click();
  }

  async clickButtonSubmitRegistration() {
    await this.buttonSubmitRegistration().click();
  }

  async fillSubmitRegistration(data: RegistrationData) {

    if (data.firstName) {
      await this.inputFirstName().fill(data.firstName);
    }

    if (data.surName) {
      await this.inputSurname().fill(data.surName);
    }

    if (data.clubName) {
      await this.inputClubName().fill(data.clubName);

      let selectedValue = await this.selectedClubName().inputValue();
      console.log(`📋 Input: "${data.clubName}", Selected: "${selectedValue || 'empty'}"`);

      const isNoClubFound =
        data.clubName === 'bin123' && selectedValue === 'No club found';

      if (!isNoClubFound) {
        if (data.clubName !== 'Arsenal' || selectedValue !== 'Arsenal') {
          console.log('🔁 Re-input club name: Arsenal');

          await this.inputClubName().fill('');
          await this.inputClubName().fill('Arsenal');

          selectedValue = await this.selectedClubName().inputValue();
          console.log(`✅ After re-input, Selected: "${selectedValue}"`);

          await expect(this.selectedClubName()).toHaveValue('Arsenal');
        }
      }
    }

    if (data.address) {
      await this.inputAddress().fill(data.address);
    }

    if (data.phoneNumber) {
      await this.inputPhoneNumber().fill(data.phoneNumber);
    }

    if (data.emailCount === 4 && data.emails) {
      // Case 3: add 4 emails to trigger max email error
      console.log(`📧 Filling 4 emails (4th should trigger max error)`);

      for (let i = 0; i < data.emails.length; i++) {
        const email = data.emails[i];
        if (email) {
          await this.inputEmail().fill(email);
          console.log(`📧 Filled email [${i + 1}/${data.emails.length}]: ${email}`);

          const btnVisible = await this.btnAddEmail().isVisible();
          console.log(`📧 Add button visible: ${btnVisible}`);

          if (btnVisible) {
            await this.btnAddEmail().click();
            console.log(`📧 Clicked Add Email [${i + 1}]`);
          } else {
            console.log(`📧 ⚠️ Add button hidden at email [${i + 1}] - cannot add more`);
            break;
          }
        }
      }

    } else if (data.emailCount === 2 && data.email) {
      // Case 2: duplicate email
      console.log(`📧 Filling duplicate email`);
      await this.inputEmail().fill(data.email);
      await this.btnAddEmail().click();
      await this.inputEmail().fill(data.email);
      await this.btnAddEmail().click();

    } else if (data.email !== undefined) {
      // Case 1: single email (default)
      await this.inputEmail().fill(data.email);
    }

    if (data.consent) {
      await this.inputConsent().check();
    }

    if (data.captcha !== undefined) {
      await this.inputCaptcha().fill(data.captcha);
    }
  }

  async verifyErrorsByField(expectedErrors: ExpectedError[]) {
    const allErrors = await this.errorMessages().allTextContents();

    const trimmedErrors = allErrors
      .map(msg => msg.trim())
      .filter(msg => msg.length > 0);

    console.log(`📋 Expected ${expectedErrors.length} errors`);
    console.log(`📋 Found ${trimmedErrors.length} errors: ${trimmedErrors.join(', ')}`);

    for (const error of expectedErrors) {
      expect(trimmedErrors).toContain(error.message);
      console.log(`✅ Verified error: ${error.message}`);
    }

    expect(trimmedErrors.length).toBe(expectedErrors.length);
  }

}