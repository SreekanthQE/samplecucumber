import { setDefaultTimeout, After, Before, AfterStep } from '@cucumber/cucumber';
import * as playwright from 'playwright';
<<<<<<< HEAD
import * as magicUtils from 'playwright-magic-utils';
=======
import { pageFixture } from './pageFixture.js';
import { setPage, setContext } from 'playwright-ultimate-utils';

>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758
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
    viewport: { width: 1520, height: 728 }
  });
  const page = await context.newPage();

<<<<<<< HEAD
  magicUtils.setContext(context);
  magicUtils.setPage(page);

=======
  // Set on singleton instance
  pageFixture.setBrowser(browser);
  pageFixture.setContext(context);
  pageFixture.setPage(page);
  setContext(context);
  setPage(page);
>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758
});

AfterStep(async function () {
  const page = magicUtils.getPage();
  if (!page) return;

  try {
    const screenshot = await page.screenshot();
    this.attach(screenshot, 'image/png');
  } catch (err) {
    console.error('Error capturing screenshot in AfterStep:', err);
    throw err;
  }
});

After(async function () {
  try {
    await magicUtils.closeAll();
    await magicUtils.setPage(null);
    await magicUtils.setContext(null);
  } catch (err) {
    console.error('Error during cleanup in After hook:', err);
    throw err;
  }

  console.log('✅ Test scenario cleanup complete. Resources closed.');
});
