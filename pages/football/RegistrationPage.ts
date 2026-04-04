import { expect } from '@playwright/test';
import { FBBasePage } from '@pages/football/FBBasePage';

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

export class RegistrationPage extends FBBasePage {

  private get buttonRegisterAndProceed() {
    return this.page.locator("//button[normalize-space()='Register and proceed']")
  }

  private get inputFirstName() {
    return this.page.locator("#firstname")
  }

  private get inputSurname() {
    return this.page.locator("#surname")
  }

  private get inputClubName() {
    return this.page.locator("#clubSearch")
  }

  private get dropdownClubName() {
    return this.page.locator("#club")
  }

  private get inputAddress() {
    return this.page.locator("#address")
  }

  private get inputPhoneNumber() {
    return this.page.locator("#phone")
  }

  private get inputEmail() {
    return this.page.locator("#email")
  }

  private get inputConsent() {
    return this.page.locator("#consent")
  }

  private get inputCaptcha() {
    return this.page.locator("#captchaInput")
  }

  private get buttonSubmitRegistration() {
    return this.page.locator("#submitSubmission")
  }

  private get errorMessages() {
    return this.page.locator("//div[@class='error-message']")
  }

  private get btnAddEmail() {
    return this.page.locator("#btnAddEmail")
  }

  async clickButtonRegisterAndProceed() {
    await this.buttonRegisterAndProceed.click();
  }

  async clickButtonSubmitRegistration() {
    await this.buttonSubmitRegistration.click();
  }

  async fillSubmitRegistration(data: RegistrationData) {

    if (data.firstName) {
      await this.inputFirstName.fill(data.firstName);
    }

    if (data.surName) {
      await this.inputSurname.fill(data.surName);
    }

    if (data.clubName) {
      await this.inputClubName.fill(data.clubName);

      const selectedValue = await this.dropdownClubName.inputValue();

      if (selectedValue === 'No club found') {
      } else {
        await this.dropdownClubName.selectOption(data.clubName);
      }
    }

    if (data.address) {
      await this.inputAddress.fill(data.address);
    }

    if (data.phoneNumber) {
      await this.inputPhoneNumber.fill(data.phoneNumber);
    }

    if (data.emailCount === 4 && data.emails) {
      // Case 3: add 4 emails to trigger max email error

      for (let i = 0; i < data.emails.length; i++) {
        const email = data.emails[i];
        if (email) {
          await this.inputEmail.fill(email);

          const btnVisible = await this.btnAddEmail.isVisible();

          if (btnVisible) {
            await this.btnAddEmail.click();
          } else {
            break;
          }
        }
      }

    } else if (data.emailCount === 2 && data.email) {
      // Case 2: duplicate email
      console.log(`📧 Filling duplicate email`);
      await this.inputEmail.fill(data.email);
      await this.btnAddEmail.click();
      await this.inputEmail.fill(data.email);
      await this.btnAddEmail.click();

    } else if (data.email !== undefined) {
      // Case 1: single email (default)
      await this.inputEmail.fill(data.email);
    }

    if (data.consent) {
      await this.inputConsent.check();
    }

    if (data.captcha !== undefined) {
      await this.inputCaptcha.fill(data.captcha);
    }
  }

  async verifyErrorsByField(expectedErrors: ExpectedError[]) {
    const allErrors = await this.errorMessages.allTextContents();

    const trimmedErrors = allErrors
      .map(msg => msg.trim())
      .filter(msg => msg.length > 0);

    for (const error of expectedErrors) {
      expect(trimmedErrors).toContain(error.message);
    }

    expect(trimmedErrors.length).toBe(expectedErrors.length);
  }

}