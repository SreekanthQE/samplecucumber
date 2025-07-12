import { setDefaultTimeout, After, Before, AfterStep } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import * as magicUtils from 'playwright-magic-utils';
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

  magicUtils.setContext(context);
  magicUtils.setPage(page);

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
