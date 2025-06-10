import { After, Before, AfterStep, Status } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import { pageFixture } from './pageFixture.js';

Before({ timeout: 15000 }, async function () {
  // This hook will be executed before all scenarios
  const isCI = process.env.CI === 'true';
  const headless = isCI ? true : false;

  console.log(`Running in CI: ${isCI}`);
  console.log(`Launching browser with headless: ${headless}`);

  const browser = await playwright.chromium.launch({
    headless: headless,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Set on singleton instance
  pageFixture.setBrowser(browser);
  pageFixture.setContext(context);
  pageFixture.setPage(page);
});

AfterStep(async function () {
  if (!pageFixture.page) return;
  try {
    const screenshot = await pageFixture.page.screenshot();
    this.attach(screenshot, 'image/png');
    if (this.allure && typeof this.allure.addAttachment === 'function') {
      this.allure.addAttachment('Screenshot', screenshot, 'image/png');
    }
  } catch (err) {
    console.error('Error capturing screenshot in AfterStep:', err);
  }
});

After(async function () {
  try {
    if (pageFixture.page) {
      const context = pageFixture.page.context();
      const browser = context.browser();
      await pageFixture.page.close();
      await context.close();
      await browser.close();
      pageFixture.page = null;
    }
  } catch (err) {
    console.error('Error during browser/page cleanup in After hook:', err);
  }
  console.log("Test scenario cleanup complete. Browser, context, and page closed.");
});



