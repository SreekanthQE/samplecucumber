// loginStorageState.js
const { chromium } = require('@playwright/test');
const { LoginPageLocators } = require('./src/pageobjects/loginPageLocators');
require('dotenv').config();

async function loginAndSaveStorageState() {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationteststore.com');

  console.log('Username:', process.env.APP_USERNAME);
  console.log('Password:', process.env.APP_PASSWORD);
  await page.waitForLoadState('networkidle');
  page.getByText('Login or register').click();
  await page.fill(LoginPageLocators.LoginPageUserName, process.env.APP_USERNAME);
  await page.fill(LoginPageLocators.LoginPagePassWord, process.env.APP_PASSWORD);
  page.locator(LoginPageLocators.LoginPageLoginBtn).filter({hasText: 'Login'}).click();

  await page.waitForLoadState('networkidle');

  // Save session
  await context.storageState({ path: 'storageLogin.json' });

  await browser.close();
}
loginAndSaveStorageState();
module.exports = { loginAndSaveStorageState };
