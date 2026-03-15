// playwright-helpers.ts
import { Locator, Page, expect } from '@playwright/test';
import { LogUtils } from '../../utils/LogUtils';

export async function click(
  locator: Locator,
  name?: string,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      LogUtils.info(`Clicking ${name ?? locator}, attempt ${attempt}`);
      await locator.click({ timeout: 5000 });
      return;
    } catch (error) {
      if (attempt === retries) throw error;
      LogUtils.warn(`Retry click ${name}, attempt ${attempt}`);
    }
  }
}

export async function type(locator: Locator, text: string, name?: string) {
  LogUtils.info(`Typing "${text}" into ${name || locator.toString()}`);
  await expect(locator).toBeVisible({ timeout: 5000 });
  await locator.clear(); // clear trước
  await locator.type(text);
}

export async function shouldBeVisible(locator: Locator, name?: string) {
  LogUtils.info(`Checking visibility of ${name || locator.toString()}`);
  await expect(locator).toBeVisible({ timeout: 5000 });
}

export async function shouldHaveText(
  locator: Locator,
  expectedText: string,
  name?: string
) {
  LogUtils.info(`Checking text of ${name || locator.toString()}`);
  await expect(locator).toBeVisible({ timeout: 5000 });
  const rawText = await locator.textContent();
  const normalizedText = rawText?.replace(/\s+/g, ' ').trim();
  expect(normalizedText).toBe(expectedText);
}

export async function getText(locator: Locator, name?: string) {
  LogUtils.info(`Getting text of ${name || locator.toString()}`);
  await expect(locator).toBeVisible({ timeout: 5000 });
  const rawText = await locator.textContent();
  return rawText?.replace(/\s+/g, ' ').trim() || '';
}

export async function scrollTo(locator: Locator, name?: string) {
  LogUtils.info(`Scrolling to ${name || locator.toString()}`);
  await locator.scrollIntoViewIfNeeded();
}

export async function selectOption(
  locator: Locator,
  value: string,
  name?: string
) {
  LogUtils.info(`Selecting "${value}" in ${name || locator.toString()}`);
  await expect(locator).toBeVisible({ timeout: 5000 });
  await locator.selectOption(value);
}

export async function scrollPage(page: Page, deltaX: number, deltaY: number) {
  LogUtils.info(`Scrolling page by (${deltaX}, ${deltaY})`);
  await page.mouse.wheel(deltaX, deltaY);
}

export async function scrollPageToTop(page: Page) {
  LogUtils.info(`Scrolling page to top`);
  await page.evaluate(() => window.scrollTo(0, 0));
}

export async function scrollPageToBottom(page: Page) {
  LogUtils.info(`Scrolling page to bottom`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

export async function openURL(page: Page, url: string) {
  await page.goto(url); // mở URL
  await page.waitForLoadState('load');
  LogUtils.info(`🌐 Open URL: ${url}`);
}

export async function getCurrentURL(page: Page): Promise<string> {
  const currentUrl = page.url();
  LogUtils.info(`Current URL: ${currentUrl}`);
  return currentUrl;
}

export async function waitForPageLoaded(page: Page, timeout = 10000) {
  try {
    await page.waitForLoadState('load', { timeout });
    LogUtils.info('Page loaded successfully.');
  } catch (error) {
    LogUtils.error(`Page not loaded after waiting for ${timeout / 1000} seconds.`, error);
    throw new Error(`Page not loaded after ${timeout / 1000} seconds`);
  }
}

export async function waitForPageRefresh(page: Page, locator: Locator, timeout = 5000) {
  try {
    const oldText = await locator.textContent().catch(() => null);

    await page.reload({ waitUntil: 'load' });
    LogUtils.info('🔄 Page refreshed');

    await expect(locator).toBeVisible({ timeout });

    LogUtils.info('✅ Page is refreshed and element is reloaded successfully.');
  } catch (error: any) {
    if (error.name === 'TimeoutError') {
      LogUtils.warn(`⏳ Timeout waiting for page to refresh: ${locator}`);
    } else {
      LogUtils.error(`❌ Error waiting for page refresh: ${locator}`, error);
    }
    throw error;
  }
}

export async function moveToElement(locator: Locator, name?: string) {
  LogUtils.info(`Move to element ${name || locator.toString()}`);
  
  await expect(locator).toBeVisible({ timeout: 5000 });

  await locator.hover();
}

export async function acceptAlert(page: Page, timeout = 10000) {
  let isAccepted = false;

  const dialogHandler = async (dialog: any) => {
    LogUtils.info(`Alert found with message: "${dialog.message()}"`);
    await dialog.accept();
    LogUtils.info('Alert accepted.');
    isAccepted = true;
  };

  page.on('dialog', dialogHandler);

  const start = Date.now();
  while (!isAccepted && Date.now() - start < timeout) {
    await new Promise(r => setTimeout(r, 500));
  }

  page.off('dialog', dialogHandler);

  if (!isAccepted) {
    LogUtils.info(`No alert found after waiting for ${timeout / 1000} seconds.`);
    throw new Error(`No alert found after waiting for ${timeout / 1000} seconds.`);
  }
}

export async function dismissAlert(page: Page, timeout = 10000) {
  let isDismissed = false;

  const dialogHandler = async (dialog: any) => {
    LogUtils.info(`Alert found with message: "${dialog.message()}"`);
    await dialog.dismiss();
    LogUtils.info('Alert dismissed.');
    isDismissed = true;
  };

  page.on('dialog', dialogHandler);

  const start = Date.now();
  while (!isDismissed && Date.now() - start < timeout) {
    await new Promise(r => setTimeout(r, 500));
  }

  page.off('dialog', dialogHandler);

  if (!isDismissed) {
    LogUtils.info(`No alert found after waiting for ${timeout / 1000} seconds.`);
    throw new Error(`No alert found after waiting for ${timeout / 1000} seconds.`);
  }
}

export async function dragAndDrop(from: Locator, to: Locator): Promise<boolean> {
  try {
    LogUtils.info(`Dragging element from ${from} to ${to}`);
    await from.scrollIntoViewIfNeeded();
    await to.scrollIntoViewIfNeeded();

    await from.dragTo(to);
    LogUtils.info('Dragged and dropped successfully');
    return true;
  } catch (error) {
    LogUtils.error(`Failed to drag and drop element`, error);
    return false;
  }
}

export async function switchToIframe(page: Page, iframeLocator: Locator) {
  try {
    LogUtils.info(`Switching to iframe: ${iframeLocator}`);
    await expect(iframeLocator).toBeVisible({ timeout: 5000 });

    const frame = await iframeLocator.contentFrame();
    if (!frame) {
      throw new Error('Iframe contentFrame is null');
    }

    LogUtils.info('Switched to iframe successfully');
    return frame;
  } catch (error) {
    LogUtils.error(`Failed to switch to iframe: ${iframeLocator}`, error);
    throw error;
  }
}

