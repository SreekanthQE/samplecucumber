import { Logger } from './logger.js';
import fs from 'fs';
import { pageFixture } from '../support/pageFixture.js';
import { expect } from '@playwright/test';

/**
 * Utility class for common Playwright actions and assertions
 * This class provides methods for navigation, element interaction, assertions, and more.
 */
export class playwrightUtils {
  static async navigateTo(url) {
  if (!url) throw new Error("URL is required for navigation");

  try {
    const page = pageFixture.getPage();
    if (!page) throw new Error("pageFixture.page is not initialized");

    await page.goto(url, { waitForLoadState: 'networkidle' });

    Logger.log(`Navigated to ${url} (waitForLoadState: networkidle)`);
  } catch (error) {
    Logger.error(`Failed to navigate to ${url}: ${error}`);
    throw error;
  }
  }

  static async goBack() {
    try {
      const page = pageFixture.getPage();
      if (!page) throw new Error('pageFixture.page is not initialized');
      await page.goBack();
      Logger.log('Navigated back');
    } catch (error) {
      Logger.error('Failed to navigate back: ' + error);
      const screenshotPath = `error-goBack-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error('Navigation back failed');
    }
  }

  static async goForward() {
    try {
      const page = pageFixture.getPage();
      if (!page) throw new Error('pageFixture.page is not initialized');
      await page.goForward();
      Logger.log('Navigated forward');
    } catch (error) {
      Logger.error('Failed to navigate forward: ' + error);
      const screenshotPath = `error-goForward-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error('Navigation forward failed');
    }
  }

  static async reloadPage() {
    try {
      const page = pageFixture.getPage();
      if (!page) throw new Error('pageFixture.page is not initialized');
      await page.reload();
      Logger.log('Page reloaded');
    } catch (error) {
      Logger.error('Failed to reload page: ' + error);
      const screenshotPath = `error-reloadPage-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error('Reload page failed');
    }
  }
  static async getLocator(selector){
    Logger.log(`[GET LOCATOR] Getting locator for selector: ${selector}`);    
    const locator = pageFixture.getPage().locator(selector);
    Logger.log(`[GET LOCATOR] Locator for selector "${selector}" obtained successfully`);
    return locator;
  }

  static async clickElement(selector, options = {}) {
    const locator = await this.getLocator(selector);
    if (!locator) {
      throw new Error(`Locator for selector "${selector}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click ${selector}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked on ${selector}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click ${selector}: ${error}`);
      const screenshotPath = `error-click-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on selector: ${selector}`);
    }
  }

  // Click by selector
  static async clickBySelector(selector, options = {}) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`Locator for selector "${selector}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for ${selector} to be visible...`);
      console.log(`[CLICK] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click ${selector}`);
      console.log(`[CLICK] Attempting to click ${selector}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked on ${selector}`);
      console.log(`[SUCCESS] Clicked on ${selector}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click ${selector}: ${error}`);
      console.error(`[ERROR] Failed to click ${selector}:`, error);
      const screenshotPath = `error-clickBySelector-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on selector: ${selector}`);
    }
  }

  // Click by text
  static async clickByText(text, options = {}) {
    const locator = pageFixture.getPage().locator(`text=${text}`);
    if (!locator) {
      throw new Error(`Locator for text "${text}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for text=${text} to be visible...`);
      console.log(`[CLICK] Waiting for text=${text} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click text=${text}`);
      console.log(`[CLICK] Attempting to click text=${text}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked element by text: ${text}`);
      console.log(`[SUCCESS] Clicked element by text: ${text}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click element by text '${text}': ${error}`);
      console.error(`[ERROR] Failed to click element by text '${text}':`, error);
      const screenshotPath = `error-clickByText-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on text: ${text}`);
    }
  }

  // Click by role
  static async clickByRole(role, options = {}) {
    const locator = pageFixture.getPage().getByRole?.(role);
    if (!locator) {
      throw new Error(`Locator for role "${role}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for role=${role} to be visible...`);
      console.log(`[CLICK] Waiting for role=${role} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click role=${role}`);
      console.log(`[CLICK] Attempting to click role=${role}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked element by role: ${role}`);
      console.log(`[SUCCESS] Clicked element by role: ${role}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click element by role '${role}': ${error}`);
      console.error(`[ERROR] Failed to click element by role '${role}':`, error);
      const screenshotPath = `error-clickByRole-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on role: ${role}`);
    }
  }

  // Click by locator
  static async clickLocatorByXpathOrCSS(locatorStr, options = {}) {
    const locator = pageFixture.getPage().locator(locatorStr);
    if (!locator) {
      throw new Error(`Locator for "${locatorStr}" not found.`);
    }
    try {
      const timeout = options.timeout || 15000; // Increased default timeout for CI
      Logger.log(`[CLICK] Waiting for ${locatorStr} to be visible...`);
      console.log(`[CLICK] Waiting for ${locatorStr} to be visible...`);
      await expect(locator).toBeVisible({ timeout });
      Logger.log(`[CLICK] Attempting to click ${locatorStr}`);
      console.log(`[CLICK] Attempting to click ${locatorStr}`);
      await locator.click({ timeout, ...options });
      Logger.log(`[SUCCESS] Clicked element by locator: ${locatorStr}`);
      console.log(`[SUCCESS] Clicked element by locator: ${locatorStr}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click element by locator '${locatorStr}': ${error}`);
      console.error(`[ERROR] Failed to click element by locator '${locatorStr}':`, error);
      const screenshotPath = `error-clickLocatorByXpathOrCSS-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on locator: ${locatorStr}`);
    }
  }

  // Click by test id
  static async clickByTestId(testId, options = {}) {
    const locator = pageFixture.getPage().getByTestId?.(testId);
    if (!locator) {
      throw new Error(`Locator for test id "${testId}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for test id=${testId} to be visible...`);
      console.log(`[CLICK] Waiting for test id=${testId} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click test id=${testId}`);
      console.log(`[CLICK] Attempting to click test id=${testId}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked element by test id: ${testId}`);
      console.log(`[SUCCESS] Clicked element by test id: ${testId}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click element by test id '${testId}': ${error}`);
      console.error(`[ERROR] Failed to click element by test id '${testId}':`, error);
      const screenshotPath = `error-clickByTestId-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on test id: ${testId}`);
    }
  }

  // Click by label
  static async clickByLabel(label, options = {}) {
    const locator = pageFixture.getPage().getByLabel?.(label);
    if (!locator) {
      throw new Error(`Locator for label "${label}" not found.`);
    }
    try {
      Logger.log(`[CLICK] Waiting for label=${label} to be visible...`);
      console.log(`[CLICK] Waiting for label=${label} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      Logger.log(`[CLICK] Attempting to click label=${label}`);
      console.log(`[CLICK] Attempting to click label=${label}`);
      await locator.click({ timeout: 5000, ...options });
      Logger.log(`[SUCCESS] Clicked element by label: ${label}`);
      console.log(`[SUCCESS] Clicked element by label: ${label}`);
    } catch (error) {
      Logger.error(`[ERROR] Failed to click element by label '${label}': ${error}`);
      console.error(`[ERROR] Failed to click element by label '${label}':`, error);
      const screenshotPath = `error-clickByLabel-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Click failed on label: ${label}`);
    }
  }

  static async fillInput(selector, value) {
    if (!selector || !value) {
      const msg = '[FILL] ❌ Both selector and value are required to fill input';
      console.error(msg);
      throw new Error(msg);
    }
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[FILL] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[FILL] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      await locator.focus();
      console.log(`[FILL] Filling ${selector} with value: ${value}`);
      await locator.fill(value);
      console.log(`[SUCCESS] Filled input ${selector} with value: ${value}`);
    } catch (error) {
      console.error(`[ERROR] Failed to fill input ${selector}:`, error);
      const screenshotPath = `error-fillInput-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Fill input failed on selector: ${selector}`);
    }
  }

  static async checkCheckbox(selector) {
    if (!selector) {
      throw new Error('[CHECK] Selector is required to check checkbox');
    }
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[CHECK] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[CHECK] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      console.log(`[CHECK] Checking ${selector}`);
      await locator.check();
      console.log(`[SUCCESS] Checked checkbox ${selector}`);
    } catch (error) {
      console.error(`[ERROR] Failed to check checkbox ${selector}:`, error);
      const screenshotPath = `error-checkCheckbox-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Check failed on selector: ${selector}`);
    }
  }

  static async uncheckCheckbox(selector) {
    if (!selector) {
      throw new Error('[UNCHECK] Selector is required to uncheck checkbox');
    }
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[UNCHECK] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[UNCHECK] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      console.log(`[UNCHECK] Unchecking ${selector}`);
      await locator.uncheck();
      console.log(`[SUCCESS] Unchecked checkbox ${selector}`);
    } catch (error) {
      console.error(`[ERROR] Failed to uncheck checkbox ${selector}:`, error);
      const screenshotPath = `error-uncheckCheckbox-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Uncheck failed on selector: ${selector}`);
    }
  }

  static async selectOption(selector, value) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[SELECT] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[SELECT] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      console.log(`[SELECT] Selecting option ${value} in ${selector}`);
      await locator.selectOption(value);
      console.log(`[SUCCESS] Selected option ${value} in ${selector}`);
    } catch (error) {
      console.error(`[ERROR] Failed to select option ${value} in ${selector}:`, error);
      const screenshotPath = `error-selectOption-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Select option failed on selector: ${selector}`);
    }
  }

  // Iframe actions
  static async fillInIframe(frameSelector, inputSelector, value) {
    const frame = await pageFixture.getPage().frame({ selector: frameSelector });
    await frame.fill(inputSelector, value);
    console.log(`Filled iframe ${frameSelector} input ${inputSelector} with value: ${value}`);
  }

  static async clickInIframe(frameSelector, elementSelector) {
    const frame = await pageFixture.getPage().frame({ selector: frameSelector });
    await frame.click(elementSelector);
    console.log(`Clicked ${elementSelector} in iframe ${frameSelector}`);
  }

  // Assertions
  static async assertElementText(selector, expectedText) {
  const page = pageFixture.getPage();
  const locator = page.locator(selector);

  try {
    console.log(`[ASSERT] Waiting for element "${selector}" to be visible...`);
    await expect(locator).toBeVisible({ timeout: 5000 });

    console.log(`[ASSERT] Checking if element "${selector}" has text: "${expectedText}"`);
    await expect(locator).toHaveText(expectedText, { timeout: 5000 });

    console.log(`[SUCCESS] Element "${selector}" has expected text.`);
  } catch (error) {
    console.error(`[ERROR] Text assertion failed for "${selector}":`, error);

    const screenshotPath = `screenshots/error-assertElementText-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);

    throw new Error(`Expected text "${expectedText}" not found in selector: "${selector}"`);
  }
}

  static async assertElementVisible(selector) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[ASSERT] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[ASSERT] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      console.log(`[SUCCESS] Element ${selector} is visible`);
    } catch (error) {
      console.error(`[ERROR] Element ${selector} is not visible:`, error);
      const screenshotPath = `error-assertElementVisible-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Assert visible failed on selector: ${selector}`);
    }
  }

  static async assertElementChecked(selector) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[ASSERT] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[ASSERT] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      const checked = await locator.isChecked();
      if (!checked) throw new Error(`[ASSERT] Element ${selector} is not checked`);
      console.log(`[SUCCESS] Element ${selector} is checked`);
    } catch (error) {
      console.error(`[ERROR] Failed to assert checked for ${selector}:`, error);
      const screenshotPath = `error-assertElementChecked-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Assert checked failed on selector: ${selector}`);
    }
  }

  static async assertElementNotChecked(selector) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[ASSERT] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[ASSERT] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      const checked = await locator.isChecked();
      if (checked) throw new Error(`[ASSERT] Element ${selector} is checked but should not be`);
      console.log(`[SUCCESS] Element ${selector} is not checked`);
    } catch (error) {
      console.error(`[ERROR] Failed to assert not checked for ${selector}:`, error);
      const screenshotPath = `error-assertElementNotChecked-${Date.now()}.png`;
      await pageFixture.getPage().screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      console.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw new Error(`Assert not checked failed on selector: ${selector}`);
    }
  }

  // Screenshot
  static async takeScreenshot(path) {
    try {
      await pageFixture.getPage().screenshot({ path });
      console.log(`[SCREENSHOT] Screenshot taken and saved to ${path}`);
    } catch (error) {
      console.error(`[ERROR] Failed to take screenshot at ${path}:`, error);
      throw new Error(`Screenshot failed at path: ${path}`);
    }
  }

  static async screenshotElement(selector, path) {
    const locator = pageFixture.getPage().locator(selector);
    if (!locator) {
      throw new Error(`[SCREENSHOT] Locator for selector "${selector}" not found.`);
    }
    try {
      console.log(`[SCREENSHOT] Waiting for ${selector} to be visible...`);
      await expect(locator).toBeVisible({ timeout: 5000 });
      await locator.screenshot({ path });
      console.log(`[SCREENSHOT] Screenshot of ${selector} saved to ${path}`);
    } catch (error) {
      console.error(`[ERROR] Failed to screenshot ${selector}:`, error);
      throw new Error(`Screenshot failed for selector: ${selector}`);
    }
  }

  // Waits
  static async waitForTimeout(ms) {
    await pageFixture.getPage().waitForTimeout(ms);
    console.log(`Waited for ${ms} ms`);
  }
  static async waitForSelector(selector, options) {
    await pageFixture.getPage().waitForSelector(selector, options);
    console.log(`Waited for selector ${selector}`);
  }
  static async waitForURL(urlOrRegex, options) {
    await pageFixture.getPage().waitForURL(urlOrRegex, options);
    console.log(`Waited for URL: ${urlOrRegex}`);
  }

  // Keyboard
  static async pressKey(selector, key) {
    await pageFixture.getPage().press(selector, key);
    console.log(`Pressed key ${key} on ${selector}`);
  }
  static async typeText(selector, text, options) {
    await pageFixture.getPage().type(selector, text, options);
    console.log(`Typed text '${text}' in ${selector}`);
  }
  static async keyboardDown(key) {
    await pageFixture.getPage().keyboard.down(key);
    console.log(`Keyboard down: ${key}`);
  }
  static async keyboardUp(key) {
    await pageFixture.getPage().keyboard.up(key);
    console.log(`Keyboard up: ${key}`);
  }

  // Mouse
  static async mouseMove(x, y) {
    await pageFixture.getPage().mouse.move(x, y);
    console.log(`Mouse moved to (${x}, ${y})`);
  }
  static async mouseClick(x, y, options) {
    await pageFixture.getPage().mouse.click(x, y, options);
    console.log(`Mouse clicked at (${x}, ${y})`);
  }
  static async mouseDown(options) {
    await pageFixture.getPage().mouse.down(options);
    console.log('Mouse down');
  }
  static async mouseUp(options) {
    await pageFixture.getPage().mouse.up(options);
    console.log('Mouse up');
  }

  // File upload/download
  static async setInputFiles(selector, files) {
    await pageFixture.getPage().setInputFiles(selector, files);
    console.log(`Set input files for ${selector}`);
  }
  static async waitForDownload(callback) {
    const [download] = await Promise.all([
      pageFixture.getPage().waitForEvent('download'),
      callback()
    ]);
    console.log('Download started');
    return download;
  }

  // Dialogs
  static async handleDialog(action = 'accept', promptText = '') {
    pageFixture.getPage().once('dialog', async dialog => {
      if (action === 'accept') await dialog.accept(promptText);
      else await dialog.dismiss();
      console.log(`Dialog ${action}ed`);
    });
  }

  // Cookies & Storage
  static async getCookies() {
    const cookies = await pageFixture.getPage().context().cookies();
    console.log('Got cookies');
    return cookies;
  }
  static async setCookies(cookies) {
    await pageFixture.getPage().context().addCookies(cookies);
    console.log('Set cookies');
  }
  static async clearCookies() {
    await pageFixture.getPage().context().clearCookies();
    console.log('Cleared cookies');
  }
  static async getLocalStorage() {
    const data = await pageFixture.getPage().evaluate(() => ({ ...localStorage }));
    console.log('Got localStorage');
    return data;
  }
  static async setLocalStorage(key, value) {
    await pageFixture.getPage().evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
    console.log(`Set localStorage ${key}`);
  }
  static async clearLocalStorage() {
    await pageFixture.getPage().evaluate(() => localStorage.clear());
    console.log('Cleared localStorage');
  }
  static async getSessionStorage() {
    const data = await pageFixture.getPage().evaluate(() => ({ ...sessionStorage }));
    console.log('Got sessionStorage');
    return data;
  }
  static async setSessionStorage(key, value) {
    await pageFixture.getPage().evaluate(([k, v]) => sessionStorage.setItem(k, v), [key, value]);
    console.log(`Set sessionStorage ${key}`);
  }
  static async clearSessionStorage() {
    await pageFixture.getPage().evaluate(() => sessionStorage.clear());
    console.log('Cleared sessionStorage');
  }

  // Element state
  static async isEnabled(selector) {
    const enabled = await pageFixture.getPage().isEnabled(selector);
    console.log(`Element ${selector} enabled: ${enabled}`);
    return enabled;
  }
  static async isDisabled(selector) {
    const disabled = await pageFixture.getPage().isDisabled(selector);
    console.log(`Element ${selector} disabled: ${disabled}`);
    return disabled;
  }
  static async isEditable(selector) {
    const editable = await pageFixture.getPage().isEditable(selector);
    console.log(`Element ${selector} editable: ${editable}`);
    return editable;
  }
  static async isHidden(selector) {
    const hidden = await pageFixture.getPage().isHidden(selector);
    console.log(`Element ${selector} hidden: ${hidden}`);
    return hidden;
  }

  // Attribute & property
  static async getAttribute(selector, attr) {
    const value = await pageFixture.getPage().getAttribute(selector, attr);
    console.log(`Got attribute ${attr} from ${selector}: ${value}`);
    return value;
  }
  static async getProperty(selector, prop) {
    const value = await pageFixture.getPage().$eval(selector, (el, p) => el[p], prop);
    console.log(`Got property ${prop} from ${selector}: ${value}`);
    return value;
  }

  // Focus/blur
  static async focus(selector) {
    await pageFixture.getPage().focus(selector);
    console.log(`Focused on ${selector}`);
  }
  static async blur(selector) {
    await pageFixture.getPage().$eval(selector, el => el.blur());
    console.log(`Blurred ${selector}`);
  }

  // Scroll
  static async scrollTo(selector) {
    await pageFixture.getPage().$eval(selector, el => el.scrollIntoView());
    console.log(`Scrolled to ${selector}`);
  }
  static async scrollBy(x, y) {
    await pageFixture.getPage().evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
    console.log(`Scrolled by (${x}, ${y})`);
  }

  // Misc
  static async getTitle() {
    const title = await pageFixture.getPage().title();
    console.log(`Page title: ${title}`);
    return title;
  }
  static async getURL() {
    const url = pageFixture.getPage().url();
    console.log(`Page URL: ${url}`);
    return url;
  }
  static async getText(selector) {
    const text = await pageFixture.getPage().textContent(selector);
    console.log(`Got text from ${selector}: ${text}`);
    return text;
  }
  static async getInnerHTML(selector) {
    const html = await pageFixture.getPage().innerHTML(selector);
    console.log(`Got innerHTML from ${selector}`);
    return html;
  }
  static async getOuterHTML(selector) {
    const html = await pageFixture.getPage().evaluate(sel => document.querySelector(sel).outerHTML, selector);
    console.log(`Got outerHTML from ${selector}`);
    return html;
  }
  static async countElements(selector) {
    const count = await pageFixture.getPage().$$eval(selector, els => els.length);
    console.log(`Counted ${count} elements for ${selector}`);
    return count;
  }
  static async isChecked(selector) {
    const checked = await pageFixture.getPage().isChecked(selector);
    console.log(`Element ${selector} checked: ${checked}`);
    return checked;
  }
  static async isVisible(selector) {
    const visible = await pageFixture.getPage().isVisible(selector);
    console.log(`Element ${selector} visible: ${visible}`);
    return visible;
  }
  static async isHiddenElement(selector) {
    const hidden = await pageFixture.getPage().isHidden(selector);
    console.log(`Element ${selector} hidden: ${hidden}`);
    return hidden;
  }
  static async dragAndDrop(source, target) {
    await pageFixture.getPage().dragAndDrop(source, target);
    console.log(`Dragged ${source} to ${target}`);
  }
  static async doubleClick(selector) {
    await pageFixture.getPage().dblclick(selector);
    console.log(`Double clicked ${selector}`);
  }
  static async rightClick(selector) {
    await pageFixture.getPage().click(selector, { button: 'right' });
    console.log(`Right clicked ${selector}`);
  }
  static async hover(selector) {
    await pageFixture.getPage().hover(selector);
    console.log(`Hovered over ${selector}`);
  }

  // Network interception/mocking
  static async interceptRequest(url, handler) {
    await pageFixture.getPage().route(url, handler);
    console.log(`Intercepted requests to ${url}`);
  }
  static async removeRequestInterception(url) {
    await pageFixture.getPage().unroute(url);
    console.log(`Removed interception for ${url}`);
  }

  // Device/viewport emulation
  static async setViewportSize(width, height) {
    await pageFixture.getPage().setViewportSize({ width, height });
    console.log(`Set viewport size to ${width}x${height}`);
  }
  static async emulateDevice(device) {
    const { devices } = require('playwright');
    await pageFixture.getPage().context().newPage(devices[device]);
    console.log(`Emulated device: ${device}`);
  }

  // Browser context management
  static async newContext(browser, options) {
    const context = await browser.newContext(options);
    console.log('Created new browser context');
    return context;
  }
  static async closeContext(context) {
    await context.close();
    console.log('Closed browser context');
  }

  // Multiple tab/window handling
  static async getAllPages(context) {
    const pages = context.pages();
    console.log(`Got ${pages.length} pages`);
    return pages;
  }
  static async switchToPage(context, index) {
    const pages = context.pages();
    if (index < 0 || index >= pages.length) throw new Error('Invalid page index');
    console.log(`Switched to page at index ${index}`);
    return pages[index];
  }

  // Accessibility
  static async getAccessibilitySnapshot(options) {
    const snapshot = await pageFixture.getPage().accessibility.snapshot(options);
    console.log('Got accessibility snapshot');
    return snapshot;
  }

  // PDF generation
  static async saveAsPDF(path, options) {
    await pageFixture.getPage().pdf({ path, ...options });
    console.log(`Saved page as PDF to ${path}`);
  }

  // Custom wait conditions
  static async waitForEnabled(selector, timeout = 5000) {
    await pageFixture.getPage().waitForFunction(sel => document.querySelector(sel)?.disabled === false, selector, { timeout });
    console.log(`Waited for ${selector} to be enabled`);
  }
  static async waitForDisabled(selector, timeout = 5000) {
    await pageFixture.getPage().waitForFunction(sel => document.querySelector(sel)?.disabled === true, selector, { timeout });
    console.log(`Waited for ${selector} to be disabled`);
  }

  // Clipboard actions
  static async writeToClipboard(text) {
    await pageFixture.getPage().evaluate(t => navigator.clipboard.writeText(t), text);
    console.log('Wrote to clipboard');
  }
  static async readFromClipboard() {
    const text = await pageFixture.getPage().evaluate(() => navigator.clipboard.readText());
    console.log('Read from clipboard');
    return text;
  }

  // File existence check (Node.js)
  static fileExists(path) {
    const exists = fs.existsSync(path);
    console.log(`File ${path} exists: ${exists}`);
    return exists;
  }

  // Performance metrics
  static async getPerformanceMetrics() {
    const metrics = await pageFixture.getPage().metrics();
    console.log('Got performance metrics');
    return metrics;
  }

  // Emulate offline/online
  static async setOffline(offline = true) {
    await pageFixture.getPage().context().setOffline(offline);
    console.log(`Set offline mode: ${offline}`);
  }

  // Screenshot comparison placeholder (for visual regression)
  // You can use a library like pixelmatch or resemblejs for actual comparison
  static compareScreenshots(imgPath1, imgPath2) {
    console.log(`Compare screenshots: ${imgPath1} vs ${imgPath2}`);
    // Implement with a visual diff library as needed
  }

  static async waitForPageLoad(timeout = 30000) {
    try {
      await pageFixture.getPage().waitForLoadState('networkidle', { timeout });
      console.log('Page has fully loaded');
    } catch (error) {
      console.error('Page load timed out:', error);
      throw error;
    }
  }

  static async waitForElementVisible(selector, timeout = 5000) {
    try {
      await pageFixture.getPage().waitForSelector(selector, { state: 'visible', timeout });
      console.log(`Element ${selector} is visible`);
    } catch (error) {
      console.error(`Element ${selector} not visible within ${timeout}ms:`, error);
      throw error;
    }
  }
  static async verifyURL(expectedUrlPattern) {
  const currentUrl = pageFixture.getPage().url();
  const regex = new RegExp(expectedUrlPattern);
  if (regex.test(currentUrl)) {
    console.log(`Verified URL: ${currentUrl} matches pattern: ${expectedUrlPattern}`);
  } else {
    console.error(`Current URL: ${currentUrl} does not match pattern: ${expectedUrlPattern}`);
    throw new Error("Current URL does not match expected pattern");
  }
  }
  static async clickFirstElement(selector){
    const element = await pageFixture.getPage().locator(selector).first();
    if (!element){
      throw new Error("No elements found for selector: " + selector);
    }
    await element.click();
    console.log(`Clicked first element for selector: ${selector}`);
  }
  static async pauseThePage(){
    await pageFixture.getPage().pause();
    console.log('Paused the page');
  }
  /**
   * Find an element inside a container by tag and attribute(s) or label text.
   * @param {string} containerSelector - Selector for the container (e.g., 'div.login-form')
   * @param {string} tag - Tag name to search for (e.g., 'input', 'button')
   * @param {object} matcher - Key-value pairs to match (e.g., { placeholder: 'Email', name: 'email' })
   * @param {object} [options] - Optional: { matchLabel: true } to match by label text
   * @returns {Promise<Locator>} - Playwright Locator for the matched element
   */
  static async findElementInContainer(containerSelector, tag, matcher = {}, options = {}) {
    const page = pageFixture.getPage();
    if (!page) throw new Error('pageFixture.page is not initialized');
    try {
      Logger.log(`[FIND] Searching for <${tag}> in ${containerSelector} with matcher: ${JSON.stringify(matcher)}`);
      const container = page.locator(containerSelector);
      await expect(container).toBeVisible({ timeout: 5000 });
      let elements = container.locator(tag);
      const count = await elements.count();
      for (let i = 0; i < count; i++) {
        const el = elements.nth(i);
        let allMatch = true;
        for (const [attr, value] of Object.entries(matcher)) {
          const attrVal = await el.getAttribute(attr);
          if (attrVal !== value) {
            allMatch = false;
            break;
          }
        }
        // Optionally match by label text
        if (allMatch && options.matchLabel && matcher.label) {
          const id = await el.getAttribute('id');
          if (id) {
            const label = container.locator(`label[for='${id}']`);
            if (await label.count() > 0) {
              const labelText = await label.textContent();
              if (labelText && labelText.trim() !== matcher.label) {
                allMatch = false;
              }
            } else {
              allMatch = false;
            }
          } else {
            allMatch = false;
          }
        }
        if (allMatch) {
          Logger.log(`[FIND] Found matching <${tag}> at index ${i}`);
          return el;
        }
      }
      throw new Error(`No <${tag}> found in ${containerSelector} matching ${JSON.stringify(matcher)}`);
    } catch (error) {
      Logger.error(`[FIND ERROR] ${error}`);
      const screenshotPath = `error-findElementInContainer-${Date.now()}.png`;
      await page.screenshot({ path: `screenshots/${screenshotPath}`, fullPage: true });
      Logger.error(`[SCREENSHOT] Saved to ${screenshotPath}`);
      throw error;
    }
  }
  
  static async clickSingleElementInAllElements(selector, expectedText){
    const locators = await pageFixture.getPage().locator(selector).all();
    if (locators.length === 0) {
      throw new Error("No elements found for selector: " + selector);
    }
    for (let ele of locators) {
      const locatorText = (await ele.textContent() || '').trim();
      if (locatorText.includes(expectedText)) {
        await ele.click();
        Logger.log(`Clicked element with text containing: ${expectedText}`);
        return;
      }
    }
    throw new Error(`No element with text containing '${expectedText}' found for selector: ${selector}`);
  }
 
 static async assertElementInAllElements(selector, expectedText) {
    const locators = await pageFixture.getPage().locator(selector).allTextContents();
    if (locators.length === 0) {
      throw new Error("No elements found for selector: " + selector);
    }
    for (let ele of locators) {
      const trimmed = (ele || '').trim();
      if (trimmed === expectedText.trim()) {
        expect(trimmed).toBe(expectedText.trim());
        Logger.log(`[ASSERT] Element with text '${expectedText}' found for selector: ${selector}`);
        return;
      }
    }
    Logger.error(`[ASSERT] No element with exact text '${expectedText}' found. Actual texts: ${JSON.stringify(locators)}`);
    throw new Error(`No element with exact text '${expectedText}' found for selector: ${selector}`);
  }
 }
