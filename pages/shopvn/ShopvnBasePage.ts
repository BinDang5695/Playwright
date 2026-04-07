import BasePage from '@pages/crm/BasePage';
import { Locator } from '@playwright/test';

export class ShopvnBasePage extends BasePage {

    verifyTable(rowIndex: number, index: number) {
        return this.page.locator(`//tr[${rowIndex}]/td[${index}]`)
    }

    alertSuccess() : Locator {
        return this.page.locator("//div[@class='au-success']")
    }
}