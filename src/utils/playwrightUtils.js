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
      if (!pageFixture.getPage()) throw new Error("pageFixture.page is not initialized");
      await pageFixture.getPage().goto(url, { timeout: 40000});
      console.log(`Navigated to ${url}`);
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
      throw error;
    }
  }

  static async goBack() {
    try {
      await pageFixture.getPage().goBack();
      console.log('Navigated back');
    } catch (error) {
      console.error('Failed to navigate back:', error);
      throw error;
    }
  }

  static async goForward() {
    try {
      await pageFixture.getPage().goForward();
      console.log('Navigated forward');
    } catch (error) {
      console.error('Failed to navigate forward:', error);
      throw error;
    }
  }

  static async reloadPage() {
    try {
      await pageFixture.getPage().reload();
      console.log('Page reloaded');
    } catch (error) {
      console.error('Failed to reload page:', error);
      throw error;
    }
  }

  static async clickElement(selector, options = {}) {
    try {
      // Set default timeout to 5000ms if not provided
      const clickOptions = { timeout: 5000, ...options };
      // Try normal selector first
      if (await pageFixture.getPage().$(selector)) {
        await pageFixture.getPage().click(selector, clickOptions);
        console.log(`Clicked on element ${selector}`);
        return;
      }
      // Try getByText
      const byText = await pageFixture.getPage().getByText?.(selector);
      if (byText) {
        await byText.click(clickOptions);
        console.log(`Clicked element by text: ${selector}`);
        return;
      }
      // Try getByRole
      const byRole = await pageFixture.getPage().getByRole?.(selector);
      if (byRole) {
        await byRole.click(clickOptions);
        console.log(`Clicked element by role: ${selector}`);
        return;
      }
      throw new Error(`Element not found by selector, text, or role: ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `clickElement(${selector})`);
    }
  }

  // Click by selector
  static async clickBySelector(selector, options = {}) {
    try {
      const clickOptions = { timeout: 5000, ...options };
      await pageFixture.getPage().locator(selector).isVisible();
      await pageFixture.getPage().click(selector, clickOptions);
      console.log(`Clicked on element ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `clickBySelector(${selector})`);
    }
  }

  // Click by text
  static async clickByText(text) {
    try {
      const locator = pageFixture.getPage().locator(`text=${text}`);
      await locator.click();
      console.log(`Clicked element by text: ${text}`);
    } catch (error) {
      this.logAndThrow(error, `clickByText(${text})`);
    }
  }

  // Click by role
  static async clickByRole(role, options = {}) {
    try {
      const clickOptions = { timeout: 5000, ...options };
      const byRole = await pageFixture.getPage().getByRole?.(role);
      if (!byRole) throw new Error(`Element with role '${role}' not found`);
      await byRole.click(clickOptions);
      console.log(`Clicked element by role: ${role}`);
    } catch (error) {
      this.logAndThrow(error, `clickByRole(${role})`);
    }
  }

  // Click by locator
  static async clickLocatorByXpathOrCSS(locator, options = {}) {
    try {
      const clickOptions = { timeout: 5000, ...options };
      const el = pageFixture.getPage().locator(locator);
      await el.click(clickOptions);
      console.log(`Clicked element by locator: ${locator}`);
    } catch (error) {
      this.logAndThrow(error, `clickLocatorByXpathOrCSS(${locator})`);
    }
  }

  // Click by test id
  static async clickByTestId(testId, options = {}) {
    const clickOptions = { timeout: 5000, ...options };
    try {
      const el = pageFixture.getPage().getByTestId?.(testId);
      if (!el) throw new Error(`Element with test id '${testId}' not found`);
      await el.click(clickOptions);
      console.log(`Clicked element by test id: ${testId}`);
    } catch (error) {
      this.logAndThrow(error, `clickByTestId(${testId})`);
    }
  }

  // Click by label
  static async clickByLabel(label, options = {}) {
    const clickOptions = { timeout: 5000, ...options };
    try {
      const el = pageFixture.getPage().getByLabel?.(label);
      if (!el) throw new Error(`Element with label '${label}' not found`);
      await el.click(clickOptions);
      console.log(`Clicked element by label: ${label}`);
    } catch (error) {
      this.logAndThrow(error, `clickByLabel(${label})`);
    }
  }

  static async fillInput(selector, value) {
    if (!selector || !value) {
      const msg = '❌ Both selector and value are required to fill input';
      console.error(msg);
      throw new Error(msg);
    }
    try {
      await pageFixture.getPage().waitForSelector(selector, { timeout: 5000 });
      const element = await pageFixture.getPage().$(selector);
      if (!element) {
        const msg = `❌ Element not found: ${selector}`;
        console.error(msg);
        throw new Error(msg);
      }
      await element.focus(); 
      await pageFixture.getPage().fill(selector, value);
      console.log(`✅ Filled input ${selector} with value: ${value}`);
    } catch (error) {
      this.logAndThrow(error, `fillInput(${selector}, ${value})`);
    }
  }

  static async checkCheckbox(selector) {
    if (!selector) {
      throw new Error("Selector is required to check checkbox");
    }
    await pageFixture.getPage().waitForSelector(selector, { timeout: 5000 });
    if (!(await pageFixture.getPage().$(selector))) {
      throw new Error(`Element not found: ${selector}`);
    }
    try {
      await pageFixture.getPage().check(selector);
      console.log(`Checked checkbox ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `checkCheckbox(${selector})`);
    }
  }

  static async uncheckCheckbox(selector) {
    try {
      await pageFixture.getPage().uncheck(selector);
      console.log(`Unchecked checkbox ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `uncheckCheckbox(${selector})`);
    }
  }

  static async selectOption(selector, value) {
    try {
      await pageFixture.getPage().selectOption(selector, value);
      console.log(`Selected option ${value} in ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `selectOption(${selector}, ${value})`);
    }
  }

  // Iframe actions
  static async fillInIframe(frameSelector, inputSelector, value) {
    try {
      const frame = await pageFixture.getPage().frame({ selector: frameSelector });
      await frame.fill(inputSelector, value);
      console.log(`Filled iframe ${frameSelector} input ${inputSelector} with value: ${value}`);
    } catch (error) {
      this.logAndThrow(error, `fillInIframe(${frameSelector}, ${inputSelector}, ${value})`);
    }
  }

  static async clickInIframe(frameSelector, elementSelector) {
    try {
      const frame = await pageFixture.getPage().frame({ selector: frameSelector });
      await frame.click(elementSelector);
      console.log(`Clicked ${elementSelector} in iframe ${frameSelector}`);
    } catch (error) {
      this.logAndThrow(error, `clickInIframe(${frameSelector}, ${elementSelector})`);
    }
  }

  static async takeScreenshot(path) {
    try {
      await pageFixture.getPage().screenshot({ path });
      console.log(`Screenshot taken and saved to ${path}`);
    } catch (error) {
      this.logAndThrow(error, `takeScreenshot(${path})`);
    }
  }

  static async screenshotElement(selector, path) {
    try {
      const el = await pageFixture.getPage().$(selector);
      await el.screenshot({ path });
      console.log(`Screenshot of ${selector} saved to ${path}`);
    } catch (error) {
      this.logAndThrow(error, `screenshotElement(${selector}, ${path})`);
    }
  }

  // Waits
  static async waitForTimeout(ms) {
    try {
      await pageFixture.getPage().waitForTimeout(ms);
      console.log(`Waited for ${ms} ms`);
    } catch (error) {
      this.logAndThrow(error, `waitForTimeout(${ms})`);
    }
  }
  static async waitForSelector(selector, options) {
    try {
      await pageFixture.getPage().waitForSelector(selector, options);
      console.log(`Waited for selector ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `waitForSelector(${selector})`);
    }
  }
  static async waitForURL(urlOrRegex, options) {
    try {
      await pageFixture.getPage().waitForURL(urlOrRegex, options);
      console.log(`Waited for URL: ${urlOrRegex}`);
    } catch (error) {
      this.logAndThrow(error, `waitForURL(${urlOrRegex})`);
    }
  }

  // Keyboard
  static async pressKey(selector, key) {
    try {
      await pageFixture.getPage().press(selector, key);
      console.log(`Pressed key ${key} on ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `pressKey(${selector}, ${key})`);
    }
  }
  static async typeText(selector, text, options) {
    try {
      await pageFixture.getPage().type(selector, text, options);
      console.log(`Typed text '${text}' in ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `typeText(${selector}, ${text})`);
    }
  }
  static async keyboardDown(key) {
    try {
      await pageFixture.getPage().keyboard.down(key);
      console.log(`Keyboard down: ${key}`);
    } catch (error) {
      this.logAndThrow(error, `keyboardDown(${key})`);
    }
  }
  static async keyboardUp(key) {
    try {
      await pageFixture.getPage().keyboard.up(key);
      console.log(`Keyboard up: ${key}`);
    } catch (error) {
      this.logAndThrow(error, `keyboardUp(${key})`);
    }
  }

  // Mouse
  static async mouseMove(x, y) {
    try {
      await pageFixture.getPage().mouse.move(x, y);
      console.log(`Mouse moved to (${x}, ${y})`);
    } catch (error) {
      this.logAndThrow(error, `mouseMove(${x}, ${y})`);
    }
  }
  static async mouseClick(x, y, options) {
    try {
      await pageFixture.getPage().mouse.click(x, y, options);
      console.log(`Mouse clicked at (${x}, ${y})`);
    } catch (error) {
      this.logAndThrow(error, `mouseClick(${x}, ${y})`);
    }
  }
  static async mouseDown(options) {
    try {
      await pageFixture.getPage().mouse.down(options);
      console.log('Mouse down');
    } catch (error) {
      this.logAndThrow(error, 'mouseDown');
    }
  }
  static async mouseUp(options) {
    try {
      await pageFixture.getPage().mouse.up(options);
      console.log('Mouse up');
    } catch (error) {
      this.logAndThrow(error, 'mouseUp');
    }
  }

  // File upload/download
  static async setInputFiles(selector, files) {
    try {
      await pageFixture.getPage().setInputFiles(selector, files);
      console.log(`Set input files for ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `setInputFiles(${selector}, ${files})`);
    }
  }
  static async waitForDownload(callback) {
    try {
      const [download] = await Promise.all([
        pageFixture.getPage().waitForEvent('download'),
        callback()
      ]);
      console.log('Download started');
      return download;
    } catch (error) {
      this.logAndThrow(error, 'waitForDownload');
    }
  }

  // Dialogs
  static async handleDialog(action = 'accept', promptText = '') {
    try {
      pageFixture.getPage().once('dialog', async dialog => {
        if (action === 'accept') await dialog.accept(promptText);
        else await dialog.dismiss();
        console.log(`Dialog ${action}ed`);
      });
    } catch (error) {
      this.logAndThrow(error, `handleDialog(${action}, ${promptText})`);
    }
  }

  // Cookies & Storage
  static async getCookies() {
    try {
      const cookies = await pageFixture.getPage().context().cookies();
      console.log('Got cookies');
      return cookies;
    } catch (error) {
      this.logAndThrow(error, 'getCookies');
    }
  }
  static async setCookies(cookies) {
    try {
      await pageFixture.getPage().context().addCookies(cookies);
      console.log('Set cookies');
    } catch (error) {
      this.logAndThrow(error, 'setCookies');
    }
  }
  static async clearCookies() {
    try {
      await pageFixture.getPage().context().clearCookies();
      console.log('Cleared cookies');
    } catch (error) {
      this.logAndThrow(error, 'clearCookies');
    }
  }
  static async getLocalStorage() {
    try {
      const data = await pageFixture.getPage().evaluate(() => ({ ...localStorage }));
      console.log('Got localStorage');
      return data;
    } catch (error) {
      this.logAndThrow(error, 'getLocalStorage');
    }
  }
  static async setLocalStorage(key, value) {
    try {
      await pageFixture.getPage().evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
      console.log(`Set localStorage ${key}`);
    } catch (error) {
      this.logAndThrow(error, `setLocalStorage(${key}, ${value})`);
    }
  }
  static async clearLocalStorage() {
    try {
      await pageFixture.getPage().evaluate(() => localStorage.clear());
      console.log('Cleared localStorage');
    } catch (error) {
      this.logAndThrow(error, 'clearLocalStorage');
    }
  }
  static async getSessionStorage() {
    try {
      const data = await pageFixture.getPage().evaluate(() => ({ ...sessionStorage }));
      console.log('Got sessionStorage');
      return data;
    } catch (error) {
      this.logAndThrow(error, 'getSessionStorage');
    }
  }
  static async setSessionStorage(key, value) {
    try {
      await pageFixture.getPage().evaluate(([k, v]) => sessionStorage.setItem(k, v), [key, value]);
      console.log(`Set sessionStorage ${key}`);
    } catch (error) {
      this.logAndThrow(error, `setSessionStorage(${key}, ${value})`);
    }
  }
  static async clearSessionStorage() {
    try {
      await pageFixture.getPage().evaluate(() => sessionStorage.clear());
      console.log('Cleared sessionStorage');
    } catch (error) {
      this.logAndThrow(error, 'clearSessionStorage');
    }
  }

  // Element state
  static async isEnabled(selector) {
    try {
      const enabled = await pageFixture.getPage().isEnabled(selector);
      console.log(`Element ${selector} enabled: ${enabled}`);
      return enabled;
    } catch (error) {
      this.logAndThrow(error, `isEnabled(${selector})`);
    }
  }
  static async isDisabled(selector) {
    try {
      const disabled = await pageFixture.getPage().isDisabled(selector);
      console.log(`Element ${selector} disabled: ${disabled}`);
      return disabled;
    } catch (error) {
      this.logAndThrow(error, `isDisabled(${selector})`);
    }
  }
  static async isEditable(selector) {
    try {
      const editable = await pageFixture.getPage().isEditable(selector);
      console.log(`Element ${selector} editable: ${editable}`);
      return editable;
    } catch (error) {
      this.logAndThrow(error, `isEditable(${selector})`);
    }
  }
  static async isHidden(selector) {
    try {
      const hidden = await pageFixture.getPage().isHidden(selector);
      console.log(`Element ${selector} hidden: ${hidden}`);
      return hidden;
    } catch (error) {
      this.logAndThrow(error, `isHidden(${selector})`);
    }
  }

  // Attribute & property
  static async getAttribute(selector, attr) {
    try {
      const value = await pageFixture.getPage().getAttribute(selector, attr);
      console.log(`Got attribute ${attr} from ${selector}: ${value}`);
      return value;
    } catch (error) {
      this.logAndThrow(error, `getAttribute(${selector}, ${attr})`);
    }
  }
  static async getProperty(selector, prop) {
    try {
      const value = await pageFixture.getPage().$eval(selector, (el, p) => el[p], prop);
      console.log(`Got property ${prop} from ${selector}: ${value}`);
      return value;
    } catch (error) {
      this.logAndThrow(error, `getProperty(${selector}, ${prop})`);
    }
  }

  // Focus/blur
  static async focus(selector) {
    try {
      await pageFixture.getPage().focus(selector);
      console.log(`Focused on ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `focus(${selector})`);
    }
  }
  static async blur(selector) {
    try {
      await pageFixture.getPage().$eval(selector, el => el.blur());
      console.log(`Blurred ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `blur(${selector})`);
    }
  }

  // Scroll
  static async scrollTo(selector) {
    try {
      await pageFixture.getPage().$eval(selector, el => el.scrollIntoView());
      console.log(`Scrolled to ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `scrollTo(${selector})`);
    }
  }
  static async scrollBy(x, y) {
    try {
      await pageFixture.getPage().evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
      console.log(`Scrolled by (${x}, ${y})`);
    } catch (error) {
      this.logAndThrow(error, `scrollBy(${x}, ${y})`);
    }
  }

  // Misc
  static async getTitle() {
    try {
      const title = await pageFixture.getPage().title();
      console.log(`Page title: ${title}`);
      return title;
    } catch (error) {
      this.logAndThrow(error, 'getTitle');
    }
  }
  static async getURL() {
    try {
      const url = pageFixture.getPage().url();
      console.log(`Page URL: ${url}`);
      return url;
    } catch (error) {
      this.logAndThrow(error, 'getURL');
    }
  }
  static async getText(selector) {
    try {
      const text = await pageFixture.getPage().textContent(selector);
      console.log(`Got text from ${selector}: ${text}`);
      return text;
    } catch (error) {
      this.logAndThrow(error, `getText(${selector})`);
    }
  }
  static async getInnerHTML(selector) {
    try {
      const html = await pageFixture.getPage().innerHTML(selector);
      console.log(`Got innerHTML from ${selector}`);
      return html;
    } catch (error) {
      this.logAndThrow(error, `getInnerHTML(${selector})`);
    }
  }
  static async getOuterHTML(selector) {
    try {
      const html = await pageFixture.getPage().evaluate(sel => document.querySelector(sel).outerHTML, selector);
      console.log(`Got outerHTML from ${selector}`);
      return html;
    } catch (error) {
      this.logAndThrow(error, `getOuterHTML(${selector})`);
    }
  }
  static async countElements(selector) {
    try {
      const count = await pageFixture.getPage().$$eval(selector, els => els.length);
      console.log(`Counted ${count} elements for ${selector}`);
      return count;
    } catch (error) {
      this.logAndThrow(error, `countElements(${selector})`);
    }
  }
  static async isChecked(selector) {
    try {
      const checked = await pageFixture.getPage().isChecked(selector);
      console.log(`Element ${selector} checked: ${checked}`);
      return checked;
    } catch (error) {
      this.logAndThrow(error, `isChecked(${selector})`);
    }
  }
  static async isVisible(selector) {
    try {
      const visible = await pageFixture.getPage().isVisible(selector);
      console.log(`Element ${selector} visible: ${visible}`);
      return visible;
    } catch (error) {
      this.logAndThrow(error, `isVisible(${selector})`);
    }
  }
  static async isHiddenElement(selector) {
    try {
      const hidden = await pageFixture.getPage().isHidden(selector);
      console.log(`Element ${selector} hidden: ${hidden}`);
      return hidden;
    } catch (error) {
      this.logAndThrow(error, `isHiddenElement(${selector})`);
    }
  }
  static async dragAndDrop(source, target) {
    try {
      await pageFixture.getPage().dragAndDrop(source, target);
      console.log(`Dragged ${source} to ${target}`);
    } catch (error) {
      this.logAndThrow(error, `dragAndDrop(${source}, ${target})`);
    }
  }
  static async doubleClick(selector) {
    try {
      await pageFixture.getPage().dblclick(selector);
      console.log(`Double clicked ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `doubleClick(${selector})`);
    }
  }
  static async rightClick(selector) {
    try {
      await pageFixture.getPage().click(selector, { button: 'right' });
      console.log(`Right clicked ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `rightClick(${selector})`);
    }
  }
  static async hover(selector) {
    try {
      await pageFixture.getPage().hover(selector);
      console.log(`Hovered over ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `hover(${selector})`);
    }
  }

  // Network interception/mocking
  static async interceptRequest(url, handler) {
    try {
      await pageFixture.getPage().route(url, handler);
      console.log(`Intercepted requests to ${url}`);
    } catch (error) {
      this.logAndThrow(error, `interceptRequest(${url})`);
    }
  }
  static async removeRequestInterception(url) {
    try {
      await pageFixture.getPage().unroute(url);
      console.log(`Removed interception for ${url}`);
    } catch (error) {
      this.logAndThrow(error, `removeRequestInterception(${url})`);
    }
  }

  // Device/viewport emulation
  static async setViewportSize(width, height) {
    try {
      await pageFixture.getPage().setViewportSize({ width, height });
      console.log(`Set viewport size to ${width}x${height}`);
    } catch (error) {
      this.logAndThrow(error, `setViewportSize(${width}, ${height})`);
    }
  }
  static async emulateDevice(device) {
    try {
      const { devices } = require('playwright');
      await pageFixture.getPage().context().newPage(devices[device]);
      console.log(`Emulated device: ${device}`);
    } catch (error) {
      this.logAndThrow(error, `emulateDevice(${device})`);
    }
  }

  // Browser context management
  static async newContext(browser, options) {
    try {
      const context = await browser.newContext(options);
      console.log('Created new browser context');
      return context;
    } catch (error) {
      this.logAndThrow(error, 'newContext');
    }
  }
  static async closeContext(context) {
    try {
      await context.close();
      console.log('Closed browser context');
    } catch (error) {
      this.logAndThrow(error, 'closeContext');
    }
  }

  // Multiple tab/window handling
  static async getAllPages(context) {
    try {
      const pages = context.pages();
      console.log(`Got ${pages.length} pages`);
      return pages;
    } catch (error) {
      this.logAndThrow(error, 'getAllPages');
    }
  }
  static async switchToPage(context, index) {
    try {
      const pages = context.pages();
      if (index < 0 || index >= pages.length) throw new Error('Invalid page index');
      console.log(`Switched to page at index ${index}`);
      return pages[index];
    } catch (error) {
      this.logAndThrow(error, `switchToPage(${index})`);
    }
  }

  // Accessibility
  static async getAccessibilitySnapshot(options) {
    try {
      const snapshot = await pageFixture.getPage().accessibility.snapshot(options);
      console.log('Got accessibility snapshot');
      return snapshot;
    } catch (error) {
      this.logAndThrow(error, 'getAccessibilitySnapshot');
    }
  }

  // PDF generation
  static async saveAsPDF(path, options) {
    try {
      await pageFixture.getPage().pdf({ path, ...options });
      console.log(`Saved page as PDF to ${path}`);
    } catch (error) {
      this.logAndThrow(error, `saveAsPDF(${path})`);
    }
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
      this.logAndThrow(error, `waitForElementVisible(${selector}, ${timeout})`);
    }
  }
  static async verifyURL(expectedUrlPattern) {
  try {
      const currentUrl = pageFixture.getPage().url();
      const regex = new RegExp(expectedUrlPattern);
      if (regex.test(currentUrl)) {
        console.log(`Verified URL: ${currentUrl} matches pattern: ${expectedUrlPattern}`);
      } else {
        throw new Error(`Current URL: ${currentUrl} does not match pattern: ${expectedUrlPattern}`);
      }
    } catch (error) {
      this.logAndThrow(error, `verifyURL(${expectedUrlPattern})`);
    }
  }
  static async clickFirstElement(selector) {
    try {
      const element = await pageFixture.getPage().locator(selector).first();
      if (!element) {
        throw new Error("No elements found for selector: " + selector);
      }
      await element.click();
      console.log(`Clicked first element for selector: ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `clickFirstElement(${selector})`);
    }
  }
  // Click a single element in all elements matching selector whose text includes expectedText
  static async clickSingleElementInAllElements(selector, expectedText) {
    try {
      const page = pageFixture.getPage();
      const elements = await page.locator(selector).all();
      if (!elements.length) {
        throw new Error(`No elements found for selector: ${selector}`);
      }
      for (const ele of elements) {
        const text = (await ele.textContent() || '').trim();
        if (text.includes(expectedText)) {
          await ele.click();
          console.log(`Clicked element with text containing: ${expectedText}`);
          return;
        }
      }
      throw new Error(`No element with text containing '${expectedText}' found for selector: ${selector}`);
    } catch (error) {
      this.logAndThrow(error, `clickSingleElementInAllElements(${selector}, ${expectedText})`);
    }
  }

  // Assert that at least one element matching selector has text exactly equal to expectedText
  static async assertElementInAllElements(selector, expectedText) {
    try {
      const page = pageFixture.getPage();
      const elements = await page.locator(selector).allTextContents();
      if (!elements.length) {
        throw new Error(`No elements found for selector: ${selector}`);
      }
      for (const text of elements) {
        const trimmed = (text || '').trim();
        if (trimmed === expectedText.trim()) {
          expect(trimmed).toBe(expectedText.trim());
          console.log(`[ASSERT] Element with text '${expectedText}' found for selector: ${selector}`);
          return;
        }
      }
      throw new Error(`No element with exact text '${expectedText}' found for selector: ${selector}. Actual: ${JSON.stringify(elements)}`);
    } catch (error) {
      this.logAndThrow(error, `assertElementInAllElements(${selector}, ${expectedText})`);
    }
  }

  // Robust error logger that always logs to file and console, and flushes output for CI visibility
  static logAndThrow(error, context) {
    const message = `[ERROR] ${context}: ${error && error.message ? error.message : error}` + (error && error.stack ? `\n${error.stack}` : '');
    // Log to file if logger exists
    if (this.logger && typeof this.logger.error === 'function') {
      this.logger.error(message);
    }
    // Always log to console.error for CI visibility
    console.error(message);
    // Force flush stderr (for Node.js >= v10)
    if (process.stderr && process.stderr.write) {
      process.stderr.write('', () => {});
    }
    throw error;
  }
}
