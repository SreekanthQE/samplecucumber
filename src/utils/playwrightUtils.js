const pageFixture = require('../support/pageFixture');
const fs = require('fs');

async function navigateTo(url) {
  if (!url) throw new Error("URL is required for navigation");
  try {
    await pageFixture.page.goto(url, { waitUntil: 'networkidle' });
    console.log(`Navigated to ${url}`);
  } catch (error) {
    console.error(`Failed to navigate to ${url}:`, error);
    throw error;
  }
}

async function goBack() {
  try {
    await pageFixture.page.goBack();
    console.log('Navigated back');
  } catch (error) {
    console.error('Failed to navigate back:', error);
    throw error;
  }
}
async function goForward() {
  try {
    await pageFixture.page.goForward();
    console.log('Navigated forward');
  } catch (error) {
    console.error('Failed to navigate forward:', error);
    throw error;
  }
}
async function reloadPage() {
  try {
    await pageFixture.page.reload();
    console.log('Page reloaded');
  } catch (error) {
    console.error('Failed to reload page:', error);
    throw error;
  }
}

async function clickElement(selector, options = {}) {
  try {
    // Set default timeout to 5000ms if not provided
    const clickOptions = { timeout: 5000, ...options };
    // Try normal selector first
    if (await pageFixture.page.$(selector)) {
      await pageFixture.page.click(selector, clickOptions);
      console.log(`Clicked on element ${selector}`);
      return;
    }
    // Try getByText
    const byText = await pageFixture.page.getByText?.(selector);
    if (byText) {
      await byText.click(clickOptions);
      console.log(`Clicked element by text: ${selector}`);
      return;
    }
    // Try getByRole
    const byRole = await pageFixture.page.getByRole?.(selector);
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
async function clickBySelector(selector, options = {}) {
  try {
    const clickOptions = { timeout: 5000, ...options };
    await pageFixture.page.click(selector, clickOptions);
    console.log(`Clicked on element ${selector}`);
  } catch (error) {
    console.error(`Failed to click on element ${selector}:`, error);
    throw error;
  }
}

// Click by text
async function clickByText(text, options = {}) {
  const clickOptions = { timeout: 5000, ...options };
  try {
    const locator = pageFixture.page.locator(`text=${text}`);
    await locator.click(clickOptions);
    console.log(`Clicked element by text: ${text}`);
  } catch (error) {
    console.error(`Failed to click element by text '${text}':`, error);
    throw error;
  }
}

// Click by role
async function clickByRole(role, options = {}) {
  try {
    const clickOptions = { timeout: 5000, ...options };
    const byRole = await pageFixture.page.getByRole?.(role);
    if (!byRole) throw new Error(`Element with role '${role}' not found`);
    await byRole.click(clickOptions);
    console.log(`Clicked element by role: ${role}`);
  } catch (error) {
    console.error(`Failed to click element by role '${role}':`, error);
    throw error;
  }
}

// Click by locator
async function clickByLocator(locator, options = {}) {
  try {
    const clickOptions = { timeout: 5000, ...options };
    const el = pageFixture.page.locator(locator);
    await el.click(clickOptions);
    console.log(`Clicked element by locator: ${locator}`);
  } catch (error) {
    console.error(`Failed to click element by locator '${locator}':`, error);
    throw error;
  }
}

// Click by test id
async function clickByTestId(testId, options = {}) {
  const clickOptions = { timeout: 5000, ...options };
  try {
    const el = pageFixture.page.getByTestId?.(testId);
    if (!el) throw new Error(`Element with test id '${testId}' not found`);
    await el.click(clickOptions);
    console.log(`Clicked element by test id: ${testId}`);
  } catch (error) {
    console.error(`Failed to click element by test id '${testId}':`, error);
    throw error;
  }
}

// Click by label
async function clickByLabel(label, options = {}) {
  const clickOptions = { timeout: 5000, ...options };
  try {
    const el = pageFixture.page.getByLabel?.(label);
    if (!el) throw new Error(`Element with label '${label}' not found`);
    await el.click(clickOptions);
    console.log(`Clicked element by label: ${label}`);
  } catch (error) {
    console.error(`Failed to click element by label '${label}':`, error);
    throw error;
  }
}

async function fillInput(selector, value) {
  if (!selector || !value) {
    throw new Error("Both selector and value are required to fill input");
  }
  await pageFixture.page.waitForSelector(selector, { timeout: 5000 });
  if (!(await pageFixture.page.$(selector))) {
    throw new Error(`Element not found: ${selector}`);
  }
  try {
    await pageFixture.page.fill(selector, value);
    console.log(`Filled input ${selector} with value: ${value}`);
  } catch (error) {
    console.error(`Failed to fill input ${selector}:`, error);
    throw error;
  }
}

async function checkCheckbox(selector) {
  if (!selector) {
    throw new Error("Selector is required to check checkbox");
  }
  await pageFixture.page.waitForSelector(selector, { timeout: 5000 });
  if (!(await pageFixture.page.$(selector))) {
    throw new Error(`Element not found: ${selector}`);
  }
  try {
    await pageFixture.page.check(selector);
    console.log(`Checked checkbox ${selector}`);
  } catch (error) {
    console.error(`Failed to check checkbox ${selector}:`, error);
    throw error;
  }
}

async function uncheckCheckbox(selector) {
  try {
    await pageFixture.page.uncheck(selector);
    console.log(`Unchecked checkbox ${selector}`);
  } catch (error) {
    console.error(`Failed to uncheck checkbox ${selector}:`, error);
    throw error;
  }
}

async function selectOption(selector, value) {
  try {
    await pageFixture.page.selectOption(selector, value);
    console.log(`Selected option ${value} in ${selector}`);
  } catch (error) {
    console.error(`Failed to select option ${value} in ${selector}:`, error);
    throw error;
  }
}

// Iframe actions
async function fillInIframe(frameSelector, inputSelector, value) {
  const frame = await pageFixture.page.frame({ selector: frameSelector });
  await frame.fill(inputSelector, value);
  console.log(`Filled iframe ${frameSelector} input ${inputSelector} with value: ${value}`);
}

async function clickInIframe(frameSelector, elementSelector) {
  const frame = await pageFixture.page.frame({ selector: frameSelector });
  await frame.click(elementSelector);
  console.log(`Clicked ${elementSelector} in iframe ${frameSelector}`);
}

// Assertions
async function assertElementText(selector, expectedText) {
  const text = await pageFixture.page.textContent(selector);
  if (text !== expectedText) {
    throw new Error(`Expected text "${expectedText}" but found "${text}"`);
  }
  console.log(`Element ${selector} has expected text: ${expectedText}`);
}

async function assertElementVisible(selector) {
  const visible = await pageFixture.page.isVisible(selector);
  if (!visible) throw new Error(`Element ${selector} is not visible`);
  console.log(`Element ${selector} is visible`);
}

async function assertElementChecked(selector) {
  const checked = await pageFixture.page.isChecked(selector);
  if (!checked) throw new Error(`Element ${selector} is not checked`);
  console.log(`Element ${selector} is checked`);
}

async function assertElementNotChecked(selector) {
  const checked = await pageFixture.page.isChecked(selector);
  if (checked) throw new Error(`Element ${selector} is checked but should not be`);
  console.log(`Element ${selector} is not checked`);
}

// Screenshot
async function takeScreenshot(path) {
  await pageFixture.page.screenshot({ path });
  console.log(`Screenshot taken and saved to ${path}`);
}

async function screenshotElement(selector, path) {
  const el = await pageFixture.page.$(selector);
  await el.screenshot({ path });
  console.log(`Screenshot of ${selector} saved to ${path}`);
}

// Waits
async function waitForTimeout(ms) {
  await pageFixture.page.waitForTimeout(ms);
  console.log(`Waited for ${ms} ms`);
}
async function waitForSelector(selector, options) {
  await pageFixture.page.waitForSelector(selector, options);
  console.log(`Waited for selector ${selector}`);
}
async function waitForURL(urlOrRegex, options) {
  await pageFixture.page.waitForURL(urlOrRegex, options);
  console.log(`Waited for URL: ${urlOrRegex}`);
}

// Keyboard
async function pressKey(selector, key) {
  await pageFixture.page.press(selector, key);
  console.log(`Pressed key ${key} on ${selector}`);
}
async function typeText(selector, text, options) {
  await pageFixture.page.type(selector, text, options);
  console.log(`Typed text '${text}' in ${selector}`);
}
async function keyboardDown(key) {
  await pageFixture.page.keyboard.down(key);
  console.log(`Keyboard down: ${key}`);
}
async function keyboardUp(key) {
  await pageFixture.page.keyboard.up(key);
  console.log(`Keyboard up: ${key}`);
}

// Mouse
async function mouseMove(x, y) {
  await pageFixture.page.mouse.move(x, y);
  console.log(`Mouse moved to (${x}, ${y})`);
}
async function mouseClick(x, y, options) {
  await pageFixture.page.mouse.click(x, y, options);
  console.log(`Mouse clicked at (${x}, ${y})`);
}
async function mouseDown(options) {
  await pageFixture.page.mouse.down(options);
  console.log('Mouse down');
}
async function mouseUp(options) {
  await pageFixture.page.mouse.up(options);
  console.log('Mouse up');
}

// File upload/download
async function setInputFiles(selector, files) {
  await pageFixture.page.setInputFiles(selector, files);
  console.log(`Set input files for ${selector}`);
}
async function waitForDownload(callback) {
  const [ download ] = await Promise.all([
    pageFixture.page.waitForEvent('download'),
    callback()
  ]);
  console.log('Download started');
  return download;
}

// Dialogs
async function handleDialog(action = 'accept', promptText = '') {
  pageFixture.page.once('dialog', async dialog => {
    if (action === 'accept') await dialog.accept(promptText);
    else await dialog.dismiss();
    console.log(`Dialog ${action}ed`);
  });
}

// Cookies & Storage
async function getCookies() {
  const cookies = await pageFixture.page.context().cookies();
  console.log('Got cookies');
  return cookies;
}
async function setCookies(cookies) {
  await pageFixture.page.context().addCookies(cookies);
  console.log('Set cookies');
}
async function clearCookies() {
  await pageFixture.page.context().clearCookies();
  console.log('Cleared cookies');
}
async function getLocalStorage() {
  const data = await pageFixture.page.evaluate(() => ({ ...localStorage }));
  console.log('Got localStorage');
  return data;
}
async function setLocalStorage(key, value) {
  await pageFixture.page.evaluate(([k, v]) => localStorage.setItem(k, v), [key, value]);
  console.log(`Set localStorage ${key}`);
}
async function clearLocalStorage() {
  await pageFixture.page.evaluate(() => localStorage.clear());
  console.log('Cleared localStorage');
}
async function getSessionStorage() {
  const data = await pageFixture.page.evaluate(() => ({ ...sessionStorage }));
  console.log('Got sessionStorage');
  return data;
}
async function setSessionStorage(key, value) {
  await pageFixture.page.evaluate(([k, v]) => sessionStorage.setItem(k, v), [key, value]);
  console.log(`Set sessionStorage ${key}`);
}
async function clearSessionStorage() {
  await pageFixture.page.evaluate(() => sessionStorage.clear());
  console.log('Cleared sessionStorage');
}

// Element state
async function isEnabled(selector) {
  const enabled = await pageFixture.page.isEnabled(selector);
  console.log(`Element ${selector} enabled: ${enabled}`);
  return enabled;
}
async function isDisabled(selector) {
  const disabled = await pageFixture.page.isDisabled(selector);
  console.log(`Element ${selector} disabled: ${disabled}`);
  return disabled;
}
async function isEditable(selector) {
  const editable = await pageFixture.page.isEditable(selector);
  console.log(`Element ${selector} editable: ${editable}`);
  return editable;
}
async function isHidden(selector) {
  const hidden = await pageFixture.page.isHidden(selector);
  console.log(`Element ${selector} hidden: ${hidden}`);
  return hidden;
}

// Attribute & property
async function getAttribute(selector, attr) {
  const value = await pageFixture.page.getAttribute(selector, attr);
  console.log(`Got attribute ${attr} from ${selector}: ${value}`);
  return value;
}
async function getProperty(selector, prop) {
  const value = await pageFixture.page.$eval(selector, (el, p) => el[p], prop);
  console.log(`Got property ${prop} from ${selector}: ${value}`);
  return value;
}

// Focus/blur
async function focus(selector) {
  await pageFixture.page.focus(selector);
  console.log(`Focused on ${selector}`);
}
async function blur(selector) {
  await pageFixture.page.$eval(selector, el => el.blur());
  console.log(`Blurred ${selector}`);
}

// Scroll
async function scrollTo(selector) {
  await pageFixture.page.$eval(selector, el => el.scrollIntoView());
  console.log(`Scrolled to ${selector}`);
}
async function scrollBy(x, y) {
  await pageFixture.page.evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
  console.log(`Scrolled by (${x}, ${y})`);
}

// Misc
async function getTitle() {
  const title = await pageFixture.page.title();
  console.log(`Page title: ${title}`);
  return title;
}
async function getURL() {
  const url = pageFixture.page.url();
  console.log(`Page URL: ${url}`);
  return url;
}
async function getText(selector) {
  const text = await pageFixture.page.textContent(selector);
  console.log(`Got text from ${selector}: ${text}`);
  return text;
}
async function getInnerHTML(selector) {
  const html = await pageFixture.page.innerHTML(selector);
  console.log(`Got innerHTML from ${selector}`);
  return html;
}
async function getOuterHTML(selector) {
  const html = await pageFixture.page.evaluate(sel => document.querySelector(sel).outerHTML, selector);
  console.log(`Got outerHTML from ${selector}`);
  return html;
}
async function countElements(selector) {
  const count = await pageFixture.page.$$eval(selector, els => els.length);
  console.log(`Counted ${count} elements for ${selector}`);
  return count;
}
async function isChecked(selector) {
  const checked = await pageFixture.page.isChecked(selector);
  console.log(`Element ${selector} checked: ${checked}`);
  return checked;
}
async function isVisible(selector) {
  const visible = await pageFixture.page.isVisible(selector);
  console.log(`Element ${selector} visible: ${visible}`);
  return visible;
}
async function isHiddenElement(selector) {
  const hidden = await pageFixture.page.isHidden(selector);
  console.log(`Element ${selector} hidden: ${hidden}`);
  return hidden;
}
async function dragAndDrop(source, target) {
  await pageFixture.page.dragAndDrop(source, target);
  console.log(`Dragged ${source} to ${target}`);
}
async function doubleClick(selector) {
  await pageFixture.page.dblclick(selector);
  console.log(`Double clicked ${selector}`);
}
async function rightClick(selector) {
  await pageFixture.page.click(selector, { button: 'right' });
  console.log(`Right clicked ${selector}`);
}
async function hover(selector) {
  await pageFixture.page.hover(selector);
  console.log(`Hovered over ${selector}`);
}

// Network interception/mocking
async function interceptRequest(url, handler) {
  await pageFixture.page.route(url, handler);
  console.log(`Intercepted requests to ${url}`);
}
async function removeRequestInterception(url) {
  await pageFixture.page.unroute(url);
  console.log(`Removed interception for ${url}`);
}

// Device/viewport emulation
async function setViewportSize(width, height) {
  await pageFixture.page.setViewportSize({ width, height });
  console.log(`Set viewport size to ${width}x${height}`);
}
async function emulateDevice(device) {
  const { devices } = require('playwright');
  await pageFixture.page.context().newPage(devices[device]);
  console.log(`Emulated device: ${device}`);
}

// Browser context management
async function newContext(browser, options) {
  const context = await browser.newContext(options);
  console.log('Created new browser context');
  return context;
}
async function closeContext(context) {
  await context.close();
  console.log('Closed browser context');
}

// Multiple tab/window handling
async function getAllPages(context) {
  const pages = context.pages();
  console.log(`Got ${pages.length} pages`);
  return pages;
}
async function switchToPage(context, index) {
  const pages = context.pages();
  if (index < 0 || index >= pages.length) throw new Error('Invalid page index');
  console.log(`Switched to page at index ${index}`);
  return pages[index];
}

// Accessibility
async function getAccessibilitySnapshot(options) {
  const snapshot = await pageFixture.page.accessibility.snapshot(options);
  console.log('Got accessibility snapshot');
  return snapshot;
}

// PDF generation
async function saveAsPDF(path, options) {
  await pageFixture.page.pdf({ path, ...options });
  console.log(`Saved page as PDF to ${path}`);
}

// Custom wait conditions
async function waitForEnabled(selector, timeout = 5000) {
  await pageFixture.page.waitForFunction(sel => document.querySelector(sel)?.disabled === false, selector, { timeout });
  console.log(`Waited for ${selector} to be enabled`);
}
async function waitForDisabled(selector, timeout = 5000) {
  await pageFixture.page.waitForFunction(sel => document.querySelector(sel)?.disabled === true, selector, { timeout });
  console.log(`Waited for ${selector} to be disabled`);
}

// Clipboard actions
async function writeToClipboard(text) {
  await pageFixture.page.evaluate(t => navigator.clipboard.writeText(t), text);
  console.log('Wrote to clipboard');
}
async function readFromClipboard() {
  const text = await pageFixture.page.evaluate(() => navigator.clipboard.readText());
  console.log('Read from clipboard');
  return text;
}

// File existence check (Node.js)
function fileExists(path) {
  const exists = fs.existsSync(path);
  console.log(`File ${path} exists: ${exists}`);
  return exists;
}

// Performance metrics
async function getPerformanceMetrics() {
  const metrics = await pageFixture.page.metrics();
  console.log('Got performance metrics');
  return metrics;
}

// Emulate offline/online
async function setOffline(offline = true) {
  await pageFixture.page.context().setOffline(offline);
  console.log(`Set offline mode: ${offline}`);
}

// Screenshot comparison placeholder (for visual regression)
// You can use a library like pixelmatch or resemblejs for actual comparison
function compareScreenshots(imgPath1, imgPath2) {
  console.log(`Compare screenshots: ${imgPath1} vs ${imgPath2}`);
  // Implement with a visual diff library as needed
}

async function waitForPageLoad(timeout = 30000) {
  try {
    await pageFixture.page.waitForLoadState('networkidle', { timeout });
    console.log('Page has fully loaded');
  } catch (error) {
    console.error('Page load timed out:', error);
    throw error;
  }
}

async function waitForElementVisible(selector, timeout = 5000) {
  try {
    await pageFixture.page.waitForSelector(selector, { state: 'visible', timeout });
    console.log(`Element ${selector} is visible`);
  } catch (error) {
    console.error(`Element ${selector} not visible within ${timeout}ms:`, error);
    throw error;
  }
}

// Highlight helpers
async function highlightElement(selector) {
  await pageFixture.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.__oldOutline = el.style.outline;
      el.style.outline = '3px solid orange';
    }
  }, selector);
}

async function removeHighlight(selector) {
  await pageFixture.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el && el.__oldOutline !== undefined) {
      el.style.outline = el.__oldOutline;
      delete el.__oldOutline;
    }
  }, selector);
}

module.exports = {
  navigateTo,
  goBack,
  goForward,
  reloadPage,
  clickElement,
  clickBySelector,
  clickByText,
  clickByRole,
  clickByLocator,
  clickByTestId,
  clickByLabel,
  fillInput,
  checkCheckbox,
  uncheckCheckbox,
  selectOption,
  fillInIframe,
  clickInIframe,
  assertElementText,
  assertElementVisible,
  assertElementChecked,
  assertElementNotChecked,
  takeScreenshot,
  screenshotElement,
  waitForTimeout,
  waitForSelector,
  waitForURL,
  pressKey,
  typeText,
  keyboardDown,
  keyboardUp,
  mouseMove,
  mouseClick,
  mouseDown,
  mouseUp,
  setInputFiles,
  waitForDownload,
  handleDialog,
  getCookies,
  setCookies,
  clearCookies,
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
  getSessionStorage,
  setSessionStorage,
  clearSessionStorage,
  isEnabled,
  isDisabled,
  isEditable,
  isHidden,
  getAttribute,
  getProperty,
  focus,
  blur,
  scrollTo,
  scrollBy,
  getTitle,
  getURL,
  getText,
  getInnerHTML,
  getOuterHTML,
  countElements,
  isChecked,
  isVisible,
  isHiddenElement,
  dragAndDrop,
  doubleClick,
  rightClick,
  hover,
  interceptRequest,
  removeRequestInterception,
  setViewportSize,
  emulateDevice,
  newContext,
  closeContext,
  getAllPages,
  switchToPage,
  getAccessibilitySnapshot,
  saveAsPDF,
  waitForEnabled,
  waitForDisabled,
  writeToClipboard,
  readFromClipboard,
  fileExists,
  getPerformanceMetrics,
  setOffline,
  compareScreenshots,
  waitForPageLoad,
  waitForElementVisible,
  highlightElement,
  removeHighlight,
};
