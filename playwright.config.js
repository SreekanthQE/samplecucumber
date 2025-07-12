import { devices } from '@playwright/test';

const config = {
  testDir: './src',
  timeout: 60 * 1000,
  retries: process.env.CI ? 2 : 0,
  outputDir: 'test-results/',
  expect: { timeout: 5000 },
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright'],
    ['list'],
  ],
  use: {
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
  ],
};

export default config;