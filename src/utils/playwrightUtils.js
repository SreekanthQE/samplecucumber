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
      console.error(`Error in clickElement(${selector}):`, error);
      throw error;
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
      console.error(`Error in clickBySelector(${selector}):`, error);
      throw error;
    }
  }

  // Click by text
  static async clickByText(text) {
    try {
      const locator = pageFixture.getPage().locator(`text=${text}`);
      await locator.click();
      console.log(`Clicked element by text: ${text}`);
    } catch (error) {
      console.error(`Error in clickByText(${text}):`, error);
      throw error;
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
      console.error(`Error in clickByRole(${role}):`, error);
      throw error;
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
      console.error(`Error in clickLocatorByXpathOrCSS(${locator}):`, error);
      throw error;
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
      console.error(`Error in clickByTestId(${testId}):`, error);
      throw error;
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
      console.error(`Error in clickByLabel(${label}):`, error);
      throw error;
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
      console.error(`Error in fillInput(${selector}, ${value}):`, error);
      throw error;
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
      console.error(`Error in checkCheckbox(${selector}):`, error);
      throw error;
    }
  }

  static async uncheckCheckbox(selector) {
    try {
      await pageFixture.getPage().uncheck(selector);
      console.log(`Unchecked checkbox ${selector}`);
    } catch (error) {
      console.error(`Error in uncheckCheckbox(${selector}):`, error);
      throw error;
    }
  }

  static async selectOption(selector, value) {
    try {
      await pageFixture.getPage().selectOption(selector, value);
      console.log(`Selected option ${value} in ${selector}`);
    } catch (error) {
      console.error(`Error in selectOption(${selector}, ${value}):`, error);
      throw error;
    }
  }

  // Iframe actions
  static async fillInIframe(frameSelector, inputSelector, value) {
    try {
      const frame = await pageFixture.getPage().frame({ selector: frameSelector });
      await frame.fill(inputSelector, value);
      console.log(`Filled iframe ${frameSelector} input ${inputSelector} with value: ${value}`);
    } catch (error) {
      console.error(`Error in fillInIframe(${frameSelector}, ${inputSelector}, ${value}):`, error);
      throw error;
    }
  }

  static async clickInIframe(frameSelector, elementSelector) {
    try {
      const frame = await pageFixture.getPage().frame({ selector: frameSelector });
      await frame.click(elementSelector);
      console.log(`Clicked ${elementSelector} in iframe ${frameSelector}`);
    } catch (error) {
      console.error(`Error in clickInIframe(${frameSelector}, ${elementSelector}):`, error);
      throw error;
    }
  }

  static async takeScreenshot(path) {
    try {
      await pageFixture.getPage().screenshot({ path });
      console.log(`Screenshot taken and saved to ${path}`);
    } catch (error) {
      console.error(`Error in takeScreenshot(${path}):`, error);
      throw error;
    }
  }

  static async screenshotElement(selector, path) {
    try {
      const el = await pageFixture.getPage().$(selector);
      await el.screenshot({ path });
      console.log(`Screenshot of ${selector} saved to ${path}`);
    } catch (error) {
      console.error(`Error in screenshotElement(${selector}, ${path}):`, error);
      throw error;
    }
  }

  // Waits
  static async waitForTimeout(ms) {
    try {
      await pageFixture.getPage().waitForTimeout(ms);
      console.log(`Waited for ${ms} ms`);
    } catch (error) {
      console.error(`Error in waitForTimeout(${ms}):`, error);
      throw error;
    }
  }
  static async waitForSelector(selector, options) {
    try {
      await pageFixture.getPage().waitForSelector(selector, options);
      console.log(`Waited for selector ${selector}`);
    } catch (error) {
      console.error(`Error in waitForSelector(${selector}):`, error);
      throw error;
    }
  }
  static async waitForURL(urlOrRegex, options) {
    try {
      await pageFixture.getPage().waitForURL(urlOrRegex, options);
      console.log(`Waited for URL: ${urlOrRegex}`);
    } catch (error) {
      console.error(`Error in waitForURL(${urlOrRegex}):`, error);
      throw error;
    }
  }

  // Keyboard
  static async pressKey(selector, key) {
    try {
      await pageFixture.getPage().press(selector, key);
      console.log(`Pressed key ${key} on ${selector}`);
    } catch (error) {
      console.error(`Error in pressKey(${selector}, ${key}):`, error);
      throw error;
    }
  }
  static async typeText(selector, text, options) {
    try {
      await pageFixture.getPage().type(selector, text, options);
      console.log(`Typed text '${text}' in ${selector}`);
    } catch (error) {
      console.error(`Error in typeText(${selector}, ${text}):`, error);
      throw error;
    }
  }
  static async keyboardDown(key) {
    try {
      await pageFixture.getPage().keyboard.down(key);
      console.log(`Keyboard down: ${key}`);
    } catch (error) {
      console.error(`Error in keyboardDown(${key}):`, error);
      throw error;
    }
  }
  static async keyboardUp(key) {
    try {
      await pageFixture.getPage().keyboard.up(key);
      console.log(`Keyboard up: ${key}`);
    } catch (error) {
      console.error(`Error in keyboardUp(${key}):`, error);
      throw error;
    }
  }

  // Mouse
  static async mouseMove(x, y) {
    try {
      await pageFixture.getPage().mouse.move(x, y);
      console.log(`Mouse moved to (${x}, ${y})`);
    } catch (error) {
      console.error(`Error in mouseMove(${x}, ${y}):`, error);
      throw error;
    }
  }
  static async mouseClick(x, y, options) {
    try {
      await pageFixture.getPage().mouse.click(x, y, options);
      console.log(`Mouse clicked at (${x}, ${y})`);
    } catch (error) {
      console.error(`Error in mouseClick(${x}, ${y}):`, error);
      throw error;
    }
  }
  static async mouseDown(options) {
    try {
      await pageFixture.getPage().mouse.down(options);
      console.log('Mouse down');
    } catch (error) {
      console.error('Error in mouseDown:', error);
      throw error;
    }
  }
  static async mouseUp(options) {
    try {
      await pageFixture.getPage().mouse.up(options);
      console.log('Mouse up');
    } catch (error) {
      console.error('Error in mouseUp:', error);
      throw error;
    }
  }

  // File upload/download
  static async setInputFiles(selector, files) {
    try {
      await pageFixture.getPage().setInputFiles(selector, files);
      console.log(`Set input files for ${selector}`);
    } catch (error) {
      console.error(`Error in setInputFiles(${selector}, ${files}):`, error);
      throw error;
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
      console.error('Error in waitForDownload:', error);
      throw error;
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
      console.error(`Error in handleDialog(${action}, ${promptText}):`, error);
      throw error;
    }
  }

  // Cookies & Storage
  static async getCookies() {
    try {
      const cookies = await pageFixture.getPage().context().cookies();
      console.log('Got cookies');
      return cookies;
    } catch (error) {
      console.error('Error in getCookies:', error);
      throw error;
    }
  }
  static async setCookies(cookies) {
    try {
      await pageFixture.getPage().context().addCookies(cookies);
      console.log('Set cookies');
    } catch (error) {
      console.error('Error in setCookies:', error);
      throw error;
    }
  }
  static async clearCookies() {
    try {
      await pageFixture.getPage().context().clearCookies();
      console.log('Cleared cookies');
    } catch (error) {
      console.error('Error in clearCookies:', error);
      throw error;
    }
  }
  static async getLocalStorage() {
    try {
      const data = await pageFixture.getPage().evaluate(() => ({ ...localStorage }));
      console.log('Got localStorage');
      return data;
    } catch (error) {
      console.error('Error in getLocalStorage:', error);
      throw error;
    }
  }
  static async setLocalStorage(key, value) {
    try {
      await pageFixture.getPage().evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
      console.log(`Set localStorage ${key}`);
    } catch (error) {
      console.error(`Error in setLocalStorage(${key}, ${value}):`, error);
      throw error;
    }
  }
  static async clearLocalStorage() {
    try {
      await pageFixture.getPage().evaluate(() => localStorage.clear());
      console.log('Cleared localStorage');
    } catch (error) {
      console.error('Error in clearLocalStorage:', error);
      throw error;
    }
  }
  static async getSessionStorage() {
    try {
      const data = await pageFixture.getPage().evaluate(() => ({ ...sessionStorage }));
      console.log('Got sessionStorage');
      return data;
    } catch (error) {
      console.error('Error in getSessionStorage:', error);
      throw error;
    }
  }
  static async setSessionStorage(key, value) {
    try {
      await pageFixture.getPage().evaluate(([k, v]) => sessionStorage.setItem(k, v), [key, value]);
      console.log(`Set sessionStorage ${key}`);
    } catch (error) {
      console.error(`Error in setSessionStorage(${key}, ${value}):`, error);
      throw error;
    }
  }
  static async clearSessionStorage() {
    try {
      await pageFixture.getPage().evaluate(() => sessionStorage.clear());
      console.log('Cleared sessionStorage');
    } catch (error) {
      console.error('Error in clearSessionStorage:', error);
      throw error;
    }
  }

  // Element state
  static async isEnabled(selector) {
    try {
      const enabled = await pageFixture.getPage().isEnabled(selector);
      console.log(`Element ${selector} enabled: ${enabled}`);
      return enabled;
    } catch (error) {
      console.error(`Error in isEnabled(${selector}):`, error);
      throw error;
    }
  }
  static async isDisabled(selector) {
    try {
      const disabled = await pageFixture.getPage().isDisabled(selector);
      console.log(`Element ${selector} disabled: ${disabled}`);
      return disabled;
    } catch (error) {
      console.error(`Error in isDisabled(${selector}):`, error);
      throw error;
    }
  }
  static async isEditable(selector) {
    try {
      const editable = await pageFixture.getPage().isEditable(selector);
      console.log(`Element ${selector} editable: ${editable}`);
      return editable;
    } catch (error) {
      console.error(`Error in isEditable(${selector}):`, error);
      throw error;
    }
  }
  static async isHidden(selector) {
    try {
      const hidden = await pageFixture.getPage().isHidden(selector);
      console.log(`Element ${selector} hidden: ${hidden}`);
      return hidden;
    } catch (error) {
      console.error(`Error in isHidden(${selector}):`, error);
      throw error;
    }
  }

  // Attribute & property
  static async getAttribute(selector, attr) {
    try {
      const value = await pageFixture.getPage().getAttribute(selector, attr);
      console.log(`Got attribute ${attr} from ${selector}: ${value}`);
      return value;
    } catch (error) {
      console.error(`Error in getAttribute(${selector}, ${attr}):`, error);
      throw error;
    }
  }
  static async getProperty(selector, prop) {
    try {
      const value = await pageFixture.getPage().$eval(selector, (el, p) => el[p], prop);
      console.log(`Got property ${prop} from ${selector}: ${value}`);
      return value;
    } catch (error) {
      console.error(`Error in getProperty(${selector}, ${prop}):`, error);
      throw error;
    }
  }

  // Focus/blur
  static async focus(selector) {
    try {
      await pageFixture.getPage().focus(selector);
      console.log(`Focused on ${selector}`);
    } catch (error) {
      console.error(`Error in focus(${selector}):`, error);
      throw error;
    }
  }
  static async blur(selector) {
    try {
      await pageFixture.getPage().$eval(selector, el => el.blur());
      console.log(`Blurred ${selector}`);
    } catch (error) {
      console.error(`Error in blur(${selector}):`, error);
      throw error;
    }
  }

  // Scroll
  static async scrollTo(selector) {
    try {
      await pageFixture.getPage().$eval(selector, el => el.scrollIntoView());
      console.log(`Scrolled to ${selector}`);
    } catch (error) {
      console.error(`Error in scrollTo(${selector}):`, error);
      throw error;
    }
  }
  static async scrollBy(x, y) {
    try {
      await pageFixture.getPage().evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
      console.log(`Scrolled by (${x}, ${y})`);
    } catch (error) {
      console.error(`Error in scrollBy(${x}, ${y}):`, error);
      throw error;
    }
  }

  // Misc
  static async getTitle() {
    try {
      const title = await pageFixture.getPage().title();
      console.log(`Page title: ${title}`);
      return title;
    } catch (error) {
      console.error('Error in getTitle:', error);
      throw error;
    }
  }
  static async getURL() {
    try {
      const url = pageFixture.getPage().url();
      console.log(`Page URL: ${url}`);
      return url;
    } catch (error) {
      console.error('Error in getURL:', error);
      throw error;
    }
  }
  static async getText(selector) {
    try {
      const text = await pageFixture.getPage().textContent(selector);
      console.log(`Got text from ${selector}: ${text}`);
      return text;
    } catch (error) {
      console.error(`Error in getText(${selector}):`, error);
      throw error;
    }
  }
  static async getInnerHTML(selector) {
    try {
      const html = await pageFixture.getPage().innerHTML(selector);
      console.log(`Got innerHTML from ${selector}`);
      return html;
    } catch (error) {
      console.error(`Error in getInnerHTML(${selector}):`, error);
      throw error;
    }
  }
  static async getOuterHTML(selector) {
    try {
      const html = await pageFixture.getPage().evaluate(sel => document.querySelector(sel).outerHTML, selector);
      console.log(`Got outerHTML from ${selector}`);
      return html;
    } catch (error) {
      console.error(`Error in getOuterHTML(${selector}):`, error);
      throw error;
    }
  }
  static async countElements(selector) {
    try {
      const count = await pageFixture.getPage().$$eval(selector, els => els.length);
      console.log(`Counted ${count} elements for ${selector}`);
      return count;
    } catch (error) {
      console.error(`Error in countElements(${selector}):`, error);
      throw error;
    }
  }
  static async isChecked(selector) {
    try {
      const checked = await pageFixture.getPage().isChecked(selector);
      console.log(`Element ${selector} checked: ${checked}`);
      return checked;
    } catch (error) {
      console.error(`Error in isChecked(${selector}):`, error);
      throw error;
    }
  }
  static async isVisible(selector) {
    try {
      const visible = await pageFixture.getPage().isVisible(selector);
      console.log(`Element ${selector} visible: ${visible}`);
      return visible;
    } catch (error) {
      console.error(`Error in isVisible(${selector}):`, error);
      throw error;
    }
  }
  static async isHiddenElement(selector) {
    try {
      const hidden = await pageFixture.getPage().isHidden(selector);
      console.log(`Element ${selector} hidden: ${hidden}`);
      return hidden;
    } catch (error) {
      console.error(`Error in isHiddenElement(${selector}):`, error);
      throw error;
    }
  }
  static async dragAndDrop(source, target) {
    try {
      await pageFixture.getPage().dragAndDrop(source, target);
      console.log(`Dragged ${source} to ${target}`);
    } catch (error) {
      console.error(`Error in dragAndDrop(${source}, ${target}):`, error);
      throw error;
    }
  }
  static async doubleClick(selector) {
    try {
      await pageFixture.getPage().dblclick(selector);
      console.log(`Double clicked ${selector}`);
    } catch (error) {
      console.error(`Error in doubleClick(${selector}):`, error);
      throw error;
    }
  }
  static async rightClick(selector) {
    try {
      await pageFixture.getPage().click(selector, { button: 'right' });
      console.log(`Right clicked ${selector}`);
    } catch (error) {
      console.error(`Error in rightClick(${selector}):`, error);
      throw error;
    }
  }
  static async hover(selector) {
    try {
      await pageFixture.getPage().hover(selector);
      console.log(`Hovered over ${selector}`);
    } catch (error) {
      console.error(`Error in hover(${selector}):`, error);
      throw error;
    }
  }

  // Network interception/mocking
  static async interceptRequest(url, handler) {
    try {
      await pageFixture.getPage().route(url, handler);
      console.log(`Intercepted requests to ${url}`);
    } catch (error) {
      console.error(`Error in interceptRequest(${url}):`, error);
      throw error;
    }
  }
  static async removeRequestInterception(url) {
    try {
      await pageFixture.getPage().unroute(url);
      console.log(`Removed interception for ${url}`);
    } catch (error) {
      console.error(`Error in removeRequestInterception(${url}):`, error);
      throw error;
    }
  }

  // Device/viewport emulation
  static async setViewportSize(width, height) {
    try {
      await pageFixture.getPage().setViewportSize({ width, height });
      console.log(`Set viewport size to ${width}x${height}`);
    } catch (error) {
      console.error(`Error in setViewportSize(${width}, ${height}):`, error);
      throw error;
    }
  }
  static async emulateDevice(device) {
    try {
      const { devices } = require('playwright');
      await pageFixture.getPage().context().newPage(devices[device]);
      console.log(`Emulated device: ${device}`);
    } catch (error) {
      console.error(`Error in emulateDevice(${device}):`, error);
      throw error;
    }
  }

  // Browser context management
  static async newContext(browser, options) {
    try {
      const context = await browser.newContext(options);
      console.log('Created new browser context');
      return context;
    } catch (error) {
      console.error('Error in newContext:', error);
      throw error;
    }
  }
  static async closeContext(context) {
    try {
      await context.close();
      console.log('Closed browser context');
    } catch (error) {
      console.error('Error in closeContext:', error);
      throw error;
    }
  }

  // Multiple tab/window handling
  static async getAllPages(context) {
    try {
      const pages = context.pages();
      console.log(`Got ${pages.length} pages`);
      return pages;
    } catch (error) {
      console.error('Error in getAllPages:', error);
      throw error;
    }
  }
  static async switchToPage(context, index) {
    try {
      const pages = context.pages();
      if (index < 0 || index >= pages.length) throw new Error('Invalid page index');
      console.log(`Switched to page at index ${index}`);
      return pages[index];
    } catch (error) {
      console.error(`Error in switchToPage(${index}):`, error);
      throw error;
    }
  }

  // Accessibility
  static async getAccessibilitySnapshot(options) {
    try {
      const snapshot = await pageFixture.getPage().accessibility.snapshot(options);
      console.log('Got accessibility snapshot');
      return snapshot;
    } catch (error) {
      console.error('Error in getAccessibilitySnapshot:', error);
      throw error;
    }
  }

  // PDF generation
  static async saveAsPDF(path, options) {
    try {
      await pageFixture.getPage().pdf({ path, ...options });
      console.log(`Saved page as PDF to ${path}`);
    } catch (error) {
      console.error(`Error in saveAsPDF(${path}):`, error);
      throw error;
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
      console.error(`Error in waitForElementVisible(${selector}, ${timeout}):`, error);
      throw error;
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
      console.error(`Error in verifyURL(${expectedUrlPattern}):`, error);
      throw error;
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
      console.error(`Error in clickFirstElement(${selector}):`, error);
      throw error;
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
          await ele.first().click();
          console.log(`Clicked element with text containing: ${expectedText}`);
          return;
        }
      }
      throw new Error(`No element with text containing '${expectedText}' found for selector: ${selector}`);
    } catch (error) {
      console.error(`Error in clickSingleElementInAllElements(${selector}, ${expectedText}):`, error);
      throw error;
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
      console.error(`Error in assertElementInAllElements(${selector}, ${expectedText}):`, error);
      throw error;
    }
  }

  // Assertions
  static async assertElementVisible(selector) {
    try {
      const visible = await pageFixture.getPage().isVisible(selector);
      if (!visible) throw new Error(`Element ${selector} is not visible`);
      console.log(`Element ${selector} is visible`);
    } catch (error) {
      console.error(`Error in assertElementVisible(${selector}):`, error);
      throw error;
    }
  }

  static async assertElementText(selector, expectedText) {
    try {
      const text = await pageFixture.getPage().textContent(selector);
      if (text && text.trim() === expectedText.trim()) {
        expect(text.trim()).toBe(expectedText.trim());
        console.log(`Element ${selector} has expected text: ${expectedText}`);
        return;
      }
      throw new Error(`Expected text "${expectedText}" but found "${text}"`);
    } catch (error) {
      console.error(`Error in assertElementText(${selector}, ${expectedText}):`, error);
      throw error;
    }
  }

  static async assertElementTextByText(selectorText, expectedText) {
  try {
    const selector = pageFixture.getPage().getByText(selectorText);
    await selector.waitFor({ state: 'visible', timeout: 5000 });
    const text = await selector.textContent();
    if (!text) {
      throw new Error(`Element with text '${selectorText}' found, but no text content`);
    }
    const actualText = text.trim();
    const expected = expectedText.trim();
    if (actualText !== expected) {
      throw new Error(`Expected text "${expected}" but found "${actualText}"`);
    }
    console.log(`✅ Element with text '${selectorText}' has expected text: "${expected}"`);
  } catch (error) {
    throw new Error(`❌ assertElementTextByText("${selectorText}", "${expectedText}") failed: ${error.message}`);
  }
  }

}
