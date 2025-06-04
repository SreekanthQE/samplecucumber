const { After, Before, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');

Before({ timeout: 15000 }, async function () {
  // This hook will be executed before all scenarios
  const isCI = process.env.CI === 'true';
  const headless = isCI ? true : false;

  console.log(`Running in CI: ${isCI}`);
  console.log(`Launching browser with headless: ${headless}`);

  const browser = await playwright.chromium.launch({
    headless: headless,
  });
  // const context = await browser.newContext({storageState: 'storageLogin.json'});
  const context = await browser.newContext();
  const page = await context.newPage();
  this.page = page;
});

 AfterStep(async function () {
  if (!this.page) return;
  const screenshot = await this.page.screenshot();
  this.attach(screenshot, 'image/png');
});

After(async function () {
  console.log("i am last");
});



