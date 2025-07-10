import { setDefaultTimeout, After, Before, AfterStep } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import { pageFixture } from './pageFixture.js';
import { setPage, setContext } from 'playwright-ultimate-utils';

setDefaultTimeout(60000); // Set global step timeout to 60 seconds

Before({ timeout: 15000 }, async function () {
  // This hook will be executed before all scenarios
  const isCI = process.env.CI === 'true';
  const headless = isCI ? true : false;
  const browserType = process.env.BROWSER || 'chromium';;
  console.log(`Using browser: ${browserType}`);

  console.log(`Running in CI: ${isCI}`);
  console.log(`Launching browser with headless: ${headless}`);

  const browser = await playwright[browserType].launch({
    headless: headless,
  });
  const context = await browser.newContext({
    viewport: {width: 1520, height: 728}
  });
  const page = await context.newPage();

  // Set on singleton instance
  pageFixture.setBrowser(browser);
  pageFixture.setContext(context);
  pageFixture.setPage(page);
  setContext(context);
  setPage(page);
});

AfterStep(async function () {
  const page = pageFixture.getPage();
  if (!page) return;
  try {
    const screenshot = await page.screenshot();
    await this.attach(screenshot, 'image/png');
  } catch (err) {
    console.error('Error capturing screenshot in AfterStep:', err);
    throw err; // Always re-throw so Allure and Cucumber see the error
  }
});

After(async function () {
  try {
    const page = pageFixture.getPage();
    if (page) {
      const context = page.context();
      const browser = context.browser();
      await page.close();
      await context.close();
      await browser.close();
      pageFixture.setPage(null);
      pageFixture.setContext(null);
      pageFixture.setBrowser(null);
    }
  } catch (err) {
    console.error('Error during browser/page cleanup in After hook:', err);
    throw err; // Always re-throw so Allure and Cucumber see the error
  }
  console.log('Test scenario cleanup complete. Browser, context, and page closed.');
});



