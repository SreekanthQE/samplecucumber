import fs from 'fs';
import { pageFixture } from '../support/pageFixture.js';

export class playwrightUtils {
  static async navigateTo(url) {
    if (!url) throw new Error("URL is required for navigation");
    try {
      if (!pageFixture.getPage()) throw new Error("pageFixture.page is not initialized");
      await pageFixture.getPage().goto(url, { waitUntil: 'networkidle' });
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
      console.error(`Failed to click on element ${selector}:`, error);
      throw error;
    }
  }

  // Click by selector
  static async clickBySelector(selector, options = {}) {
    try {
      const clickOptions = { timeout: 5000, ...options };
      await pageFixture.getPage().click(selector, clickOptions);
      console.log(`Clicked on element ${selector}`);
    } catch (error) {
      console.error(`Failed to click on element ${selector}:`, error);
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
      console.error(`Failed to click element by text '${text}':`, error);
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
      console.error(`Failed to click element by role '${role}':`, error);
      throw error;
    }
  }

  // Click by locator
  static async clickByLocator(locator, options = {}) {
    try {
      const clickOptions = { timeout: 5000, ...options };
      const el = pageFixture.getPage().locator(locator);
      await el.click(clickOptions);
      console.log(`Clicked element by locator: ${locator}`);
    } catch (error) {
      console.error(`Failed to click element by locator '${locator}':`, error);
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
      console.error(`Failed to click element by test id '${testId}':`, error);
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
      console.error(`Failed to click element by label '${label}':`, error);
      throw error;
    }
  }

  static async fillInput(selector, value) {
    const page = pageFixture.getPage();

    if (!selector || !value) {
      const msg = '❌ Both selector and value are required to fill input';
      console.error(msg);
      throw new Error(msg);
    }

    try {
      await page.waitForSelector(selector, { timeout: 5000 });

      const element = await page.$(selector);
      if (!element) {
        const msg = `❌ Element not found: ${selector}`;
        console.error(msg);
        throw new Error(msg);
      }

      await page.fill(selector, value);
      console.log(`✅ Filled input ${selector} with value: ${value}`);
    } catch (error) {
      console.error(`❌ Failed to fill input ${selector}: ${error.message}`);

      // Attach to Allure if available
      if (this?.attach) {
        this.attach(`Error filling input: ${selector}`, 'text/plain');
        const screenshot = await page.screenshot();
        this.attach(screenshot, 'image/png');
      }

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
      console.error(`Failed to check checkbox ${selector}:`, error);
      throw error;
    }
  }

  static async uncheckCheckbox(selector) {
    try {
      await pageFixture.getPage().uncheck(selector);
      console.log(`Unchecked checkbox ${selector}`);
    } catch (error) {
      console.error(`Failed to uncheck checkbox ${selector}:`, error);
      throw error;
    }
  }

  static async selectOption(selector, value) {
    try {
      await pageFixture.getPage().selectOption(selector, value);
      console.log(`Selected option ${value} in ${selector}`);
    } catch (error) {
      console.error(`Failed to select option ${value} in ${selector}:`, error);
      throw error;
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
    const text = await pageFixture.getPage().textContent(selector);
    if (text !== expectedText) {
      throw new Error(`Expected text "${expectedText}" but found "${text}"`);
    }
    console.log(`Element ${selector} has expected text: ${expectedText}`);
  }

  static async assertElementVisible(selector) {
    const visible = await pageFixture.getPage().isVisible(selector);
    if (!visible) throw new Error(`Element ${selector} is not visible`);
    console.log(`Element ${selector} is visible`);
  }

  static async assertElementChecked(selector) {
    const checked = await pageFixture.getPage().isChecked(selector);
    if (!checked) throw new Error(`Element ${selector} is not checked`);
    console.log(`Element ${selector} is checked`);
  }

  static async assertElementNotChecked(selector) {
    const checked = await pageFixture.getPage().isChecked(selector);
    if (checked) throw new Error(`Element ${selector} is checked but should not be`);
    console.log(`Element ${selector} is not checked`);
  }

  // Screenshot
  static async takeScreenshot(path) {
    await pageFixture.getPage().screenshot({ path });
    console.log(`Screenshot taken and saved to ${path}`);
  }

  static async screenshotElement(selector, path) {
    const el = await pageFixture.getPage().$(selector);
    await el.screenshot({ path });
    console.log(`Screenshot of ${selector} saved to ${path}`);
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
    const [ download ] = await Promise.all([
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
}
