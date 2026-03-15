import { Locator, Page } from "@playwright/test";
import { SLUGS } from "../constants/slugs";

export const handleDropdown = async(page: Page) => {
    await page.goto(SLUGS.DROPDOWN_SLUG);
    const dropdownLocator: Locator = page.locator("#dropdown");

    // 1. Select option 01 - Index
    await page.waitForTimeout(2 * 1000);
    await dropdownLocator.selectOption({index: 1});

    // 2. Select option 02 - Index
    await page.waitForTimeout(2 * 1000);
    await dropdownLocator.selectOption({value: '2'});

    // 3. Select option 01 - label/visible text
    await page.waitForTimeout(2 * 1000);
    await dropdownLocator.selectOption({label: 'Option 1'});
}

export const handleIframe = async(page: Page, iframeSel: string) => {

    // Locate the iframe - another html page embedded into parent html page
    const iframeLocator = page.frameLocator(iframeSel);

    // Locate child element inside the frame
    const textEditorLocator = iframeLocator.locator('body p');

    // Interact with the element
    await textEditorLocator.click();
}