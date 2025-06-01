// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './src',
  retries: 0,

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  // Add both HTML and Allure reporters here
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on', // off,on
  },
};

module.exports = config;
