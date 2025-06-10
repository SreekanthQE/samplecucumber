import fs from 'fs';
import { pageFixture } from '../support/pageFixture.js';



export async function navigateTo(url) {
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

export async function goBack() {
  try {
    await pageFixture.getPage().goBack();
    console.log('Navigated back');
  } catch (error) {
    console.error('Failed to navigate back:', error);
    throw error;
  }
}
export async function goForward() {
  try {
    await pageFixture.getPage().goForward();
    console.log('Navigated forward');
  } catch (error) {
    console.error('Failed to navigate forward:', error);
    throw error;
  }
}
export async function reloadPage() {
  try {
    await pageFixture.getPage().reload();
    console.log('Page reloaded');
  } catch (error) {
    console.error('Failed to reload page:', error);
    throw error;
  }
}

export async function clickElement(selector, options = {}) {
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
export async function clickBySelector(selector, options = {}) {
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
export async function clickByText(text, options = {}) {
  const clickOptions = { timeout: 5000, ...options };
  try {
    const locator = pageFixture.getPage().locator(`text=${text}`);
    await locator.click(clickOptions);
    console.log(`Clicked element by text: ${text}`);
  } catch (error) {
    console.error(`Failed to click element by text '${text}':`, error);
    throw error;
  }
}

// Click by role
export async function clickByRole(role, options = {}) {
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
export async function clickByLocator(locator, options = {}) {
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
export async function clickByTestId(testId, options = {}) {
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
export async function clickByLabel(label, options = {}) {
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

export async function fillInput(selector, value) {
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

export async function checkCheckbox(selector) {
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

export async function uncheckCheckbox(selector) {
  try {
    await pageFixture.getPage().uncheck(selector);
    console.log(`Unchecked checkbox ${selector}`);
  } catch (error) {
    console.error(`Failed to uncheck checkbox ${selector}:`, error);
    throw error;
  }
}

export async function selectOption(selector, value) {
  try {
    await pageFixture.getPage().selectOption(selector, value);
    console.log(`Selected option ${value} in ${selector}`);
  } catch (error) {
    console.error(`Failed to select option ${value} in ${selector}:`, error);
    throw error;
  }
}

// Iframe actions
export async function fillInIframe(frameSelector, inputSelector, value) {
  const frame = await pageFixture.getPage().frame({ selector: frameSelector });
  await frame.fill(inputSelector, value);
  console.log(`Filled iframe ${frameSelector} input ${inputSelector} with value: ${value}`);
}

export async function clickInIframe(frameSelector, elementSelector) {
  const frame = await pageFixture.getPage().frame({ selector: frameSelector });
  await frame.click(elementSelector);
  console.log(`Clicked ${elementSelector} in iframe ${frameSelector}`);
}

// Assertions
export async function assertElementText(selector, expectedText) {
  const text = await pageFixture.getPage().textContent(selector);
  if (text !== expectedText) {
    throw new Error(`Expected text "${expectedText}" but found "${text}"`);
  }
  console.log(`Element ${selector} has expected text: ${expectedText}`);
}

export async function assertElementVisible(selector) {
  const visible = await pageFixture.getPage().isVisible(selector);
  if (!visible) throw new Error(`Element ${selector} is not visible`);
  console.log(`Element ${selector} is visible`);
}

export async function assertElementChecked(selector) {
  const checked = await pageFixture.getPage().isChecked(selector);
  if (!checked) throw new Error(`Element ${selector} is not checked`);
  console.log(`Element ${selector} is checked`);
}

export async function assertElementNotChecked(selector) {
  const checked = await pageFixture.getPage().isChecked(selector);
  if (checked) throw new Error(`Element ${selector} is checked but should not be`);
  console.log(`Element ${selector} is not checked`);
}

// Screenshot
export async function takeScreenshot(path) {
  await pageFixture.getPage().screenshot({ path });
  console.log(`Screenshot taken and saved to ${path}`);
}

export async function screenshotElement(selector, path) {
  const el = await pageFixture.getPage().$(selector);
  await el.screenshot({ path });
  console.log(`Screenshot of ${selector} saved to ${path}`);
}

// Waits
export async function waitForTimeout(ms) {
  await pageFixture.getPage().waitForTimeout(ms);
  console.log(`Waited for ${ms} ms`);
}
export async function waitForSelector(selector, options) {
  await pageFixture.getPage().waitForSelector(selector, options);
  console.log(`Waited for selector ${selector}`);
}
export async function waitForURL(urlOrRegex, options) {
  await pageFixture.getPage().waitForURL(urlOrRegex, options);
  console.log(`Waited for URL: ${urlOrRegex}`);
}

// Keyboard
export async function pressKey(selector, key) {
  await pageFixture.getPage().press(selector, key);
  console.log(`Pressed key ${key} on ${selector}`);
}
export async function typeText(selector, text, options) {
  await pageFixture.getPage().type(selector, text, options);
  console.log(`Typed text '${text}' in ${selector}`);
}
export async function keyboardDown(key) {
  await pageFixture.getPage().keyboard.down(key);
  console.log(`Keyboard down: ${key}`);
}
export async function keyboardUp(key) {
  await pageFixture.getPage().keyboard.up(key);
  console.log(`Keyboard up: ${key}`);
}

// Mouse
export async function mouseMove(x, y) {
  await pageFixture.getPage().mouse.move(x, y);
  console.log(`Mouse moved to (${x}, ${y})`);
}
export async function mouseClick(x, y, options) {
  await pageFixture.getPage().mouse.click(x, y, options);
  console.log(`Mouse clicked at (${x}, ${y})`);
}
export async function mouseDown(options) {
  await pageFixture.getPage().mouse.down(options);
  console.log('Mouse down');
}
export async function mouseUp(options) {
  await pageFixture.getPage().mouse.up(options);
  console.log('Mouse up');
}

// File upload/download
export async function setInputFiles(selector, files) {
  await pageFixture.getPage().setInputFiles(selector, files);
  console.log(`Set input files for ${selector}`);
}
export async function waitForDownload(callback) {
  const [ download ] = await Promise.all([
    pageFixture.getPage().waitForEvent('download'),
    callback()
  ]);
  console.log('Download started');
  return download;
}

// Dialogs
export async function handleDialog(action = 'accept', promptText = '') {
  pageFixture.getPage().once('dialog', async dialog => {
    if (action === 'accept') await dialog.accept(promptText);
    else await dialog.dismiss();
    console.log(`Dialog ${action}ed`);
  });
}

// Cookies & Storage
export async function getCookies() {
  const cookies = await pageFixture.getPage().context().cookies();
  console.log('Got cookies');
  return cookies;
}
export async function setCookies(cookies) {
  await pageFixture.getPage().context().addCookies(cookies);
  console.log('Set cookies');
}
export async function clearCookies() {
  await pageFixture.getPage().context().clearCookies();
  console.log('Cleared cookies');
}
export async function getLocalStorage() {
  const data = await pageFixture.getPage().evaluate(() => ({ ...localStorage }));
  console.log('Got localStorage');
  return data;
}
export async function setLocalStorage(key, value) {
  await pageFixture.getPage().evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
  console.log(`Set localStorage ${key}`);
}
export async function clearLocalStorage() {
  await pageFixture.getPage().evaluate(() => localStorage.clear());
  console.log('Cleared localStorage');
}
export async function getSessionStorage() {
  const data = await pageFixture.getPage().evaluate(() => ({ ...sessionStorage }));
  console.log('Got sessionStorage');
  return data;
}
export async function setSessionStorage(key, value) {
  await pageFixture.getPage().evaluate(([k, v]) => sessionStorage.setItem(k, v), [key, value]);
  console.log(`Set sessionStorage ${key}`);
}
export async function clearSessionStorage() {
  await pageFixture.getPage().evaluate(() => sessionStorage.clear());
  console.log('Cleared sessionStorage');
}

// Element state
export async function isEnabled(selector) {
  const enabled = await pageFixture.getPage().isEnabled(selector);
  console.log(`Element ${selector} enabled: ${enabled}`);
  return enabled;
}
export async function isDisabled(selector) {
  const disabled = await pageFixture.getPage().isDisabled(selector);
  console.log(`Element ${selector} disabled: ${disabled}`);
  return disabled;
}
export async function isEditable(selector) {
  const editable = await pageFixture.getPage().isEditable(selector);
  console.log(`Element ${selector} editable: ${editable}`);
  return editable;
}
export async function isHidden(selector) {
  const hidden = await pageFixture.getPage().isHidden(selector);
  console.log(`Element ${selector} hidden: ${hidden}`);
  return hidden;
}

// Attribute & property
export async function getAttribute(selector, attr) {
  const value = await pageFixture.getPage().getAttribute(selector, attr);
  console.log(`Got attribute ${attr} from ${selector}: ${value}`);
  return value;
}
export async function getProperty(selector, prop) {
  const value = await pageFixture.getPage().$eval(selector, (el, p) => el[p], prop);
  console.log(`Got property ${prop} from ${selector}: ${value}`);
  return value;
}

// Focus/blur
export async function focus(selector) {
  await pageFixture.getPage().focus(selector);
  console.log(`Focused on ${selector}`);
}
export async function blur(selector) {
  await pageFixture.getPage().$eval(selector, el => el.blur());
  console.log(`Blurred ${selector}`);
}

// Scroll
export async function scrollTo(selector) {
  await pageFixture.getPage().$eval(selector, el => el.scrollIntoView());
  console.log(`Scrolled to ${selector}`);
}
export async function scrollBy(x, y) {
  await pageFixture.getPage().evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
  console.log(`Scrolled by (${x}, ${y})`);
}

// Misc
export async function getTitle() {
  const title = await pageFixture.getPage().title();
  console.log(`Page title: ${title}`);
  return title;
}
export async function getURL() {
  const url = pageFixture.getPage().url();
  console.log(`Page URL: ${url}`);
  return url;
}
export async function getText(selector) {
  const text = await pageFixture.getPage().textContent(selector);
  console.log(`Got text from ${selector}: ${text}`);
  return text;
}
export async function getInnerHTML(selector) {
  const html = await pageFixture.getPage().innerHTML(selector);
  console.log(`Got innerHTML from ${selector}`);
  return html;
}
export async function getOuterHTML(selector) {
  const html = await pageFixture.getPage().evaluate(sel => document.querySelector(sel).outerHTML, selector);
  console.log(`Got outerHTML from ${selector}`);
  return html;
}
export async function countElements(selector) {
  const count = await pageFixture.getPage().$$eval(selector, els => els.length);
  console.log(`Counted ${count} elements for ${selector}`);
  return count;
}
export async function isChecked(selector) {
  const checked = await pageFixture.getPage().isChecked(selector);
  console.log(`Element ${selector} checked: ${checked}`);
  return checked;
}
export async function isVisible(selector) {
  const visible = await pageFixture.getPage().isVisible(selector);
  console.log(`Element ${selector} visible: ${visible}`);
  return visible;
}
export async function isHiddenElement(selector) {
  const hidden = await pageFixture.getPage().isHidden(selector);
  console.log(`Element ${selector} hidden: ${hidden}`);
  return hidden;
}
export async function dragAndDrop(source, target) {
  await pageFixture.getPage().dragAndDrop(source, target);
  console.log(`Dragged ${source} to ${target}`);
}
export async function doubleClick(selector) {
  await pageFixture.getPage().dblclick(selector);
  console.log(`Double clicked ${selector}`);
}
export async function rightClick(selector) {
  await pageFixture.getPage().click(selector, { button: 'right' });
  console.log(`Right clicked ${selector}`);
}
export async function hover(selector) {
  await pageFixture.getPage().hover(selector);
  console.log(`Hovered over ${selector}`);
}

// Network interception/mocking
export async function interceptRequest(url, handler) {
  await pageFixture.getPage().route(url, handler);
  console.log(`Intercepted requests to ${url}`);
}
export async function removeRequestInterception(url) {
  await pageFixture.getPage().unroute(url);
  console.log(`Removed interception for ${url}`);
}

// Device/viewport emulation
export async function setViewportSize(width, height) {
  await pageFixture.getPage().setViewportSize({ width, height });
  console.log(`Set viewport size to ${width}x${height}`);
}
export async function emulateDevice(device) {
  const { devices } = require('playwright');
  await pageFixture.getPage().context().newPage(devices[device]);
  console.log(`Emulated device: ${device}`);
}

// Browser context management
export async function newContext(browser, options) {
  const context = await browser.newContext(options);
  console.log('Created new browser context');
  return context;
}
export async function closeContext(context) {
  await context.close();
  console.log('Closed browser context');
}

// Multiple tab/window handling
export async function getAllPages(context) {
  const pages = context.pages();
  console.log(`Got ${pages.length} pages`);
  return pages;
}
export async function switchToPage(context, index) {
  const pages = context.pages();
  if (index < 0 || index >= pages.length) throw new Error('Invalid page index');
  console.log(`Switched to page at index ${index}`);
  return pages[index];
}

// Accessibility
export async function getAccessibilitySnapshot(options) {
  const snapshot = await pageFixture.getPage().accessibility.snapshot(options);
  console.log('Got accessibility snapshot');
  return snapshot;
}

// PDF generation
export async function saveAsPDF(path, options) {
  await pageFixture.getPage().pdf({ path, ...options });
  console.log(`Saved page as PDF to ${path}`);
}

// Custom wait conditions
export async function waitForEnabled(selector, timeout = 5000) {
  await pageFixture.getPage().waitForFunction(sel => document.querySelector(sel)?.disabled === false, selector, { timeout });
  console.log(`Waited for ${selector} to be enabled`);
}
export async function waitForDisabled(selector, timeout = 5000) {
  await pageFixture.getPage().waitForFunction(sel => document.querySelector(sel)?.disabled === true, selector, { timeout });
  console.log(`Waited for ${selector} to be disabled`);
}

// Clipboard actions
export async function writeToClipboard(text) {
  await pageFixture.getPage().evaluate(t => navigator.clipboard.writeText(t), text);
  console.log('Wrote to clipboard');
}
export async function readFromClipboard() {
  const text = await pageFixture.getPage().evaluate(() => navigator.clipboard.readText());
  console.log('Read from clipboard');
  return text;
}

// File existence check (Node.js)
export function fileExists(path) {
  const exists = fs.existsSync(path);
  console.log(`File ${path} exists: ${exists}`);
  return exists;
}

// Performance metrics
export async function getPerformanceMetrics() {
  const metrics = await pageFixture.getPage().metrics();
  console.log('Got performance metrics');
  return metrics;
}

// Emulate offline/online
export async function setOffline(offline = true) {
  await pageFixture.getPage().context().setOffline(offline);
  console.log(`Set offline mode: ${offline}`);
}

// Screenshot comparison placeholder (for visual regression)
// You can use a library like pixelmatch or resemblejs for actual comparison
export function compareScreenshots(imgPath1, imgPath2) {
  console.log(`Compare screenshots: ${imgPath1} vs ${imgPath2}`);
  // Implement with a visual diff library as needed
}

export async function waitForPageLoad(timeout = 30000) {
  try {
    await pageFixture.getPage().waitForLoadState('networkidle', { timeout });
    console.log('Page has fully loaded');
  } catch (error) {
    console.error('Page load timed out:', error);
    throw error;
  }
}

export async function waitForElementVisible(selector, timeout = 5000) {
  try {
    await pageFixture.getPage().waitForSelector(selector, { state: 'visible', timeout });
    console.log(`Element ${selector} is visible`);
  } catch (error) {
    console.error(`Element ${selector} not visible within ${timeout}ms:`, error);
    throw error;
  }
}
