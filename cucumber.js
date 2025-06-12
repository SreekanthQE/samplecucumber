// Global error and exit handlers for robust CI logging
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err && err.stack ? err.stack : err);
  if (process.stderr && process.stderr.write) {
    process.stderr.write('', () => {});
  }
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason && reason.stack ? reason.stack : reason);
  if (process.stderr && process.stderr.write) {
    process.stderr.write('', () => {});
  }
  process.exit(1);
});

process.on('exit', (code) => {
  console.log(`[PROCESS EXIT] code=${code}`);
  if (process.stderr && process.stderr.write) {
    process.stderr.write('', () => {});
  }
});

// cucumber.js
import { resolve } from 'path';

const config = {
  paths: [resolve('./src/features/**/*.feature')],
  import: [
    resolve('./src/support/hooks.js'), 
    resolve('./src/step_definitions/**/*.js'),
    // Only import other support files if needed, avoid double-importing step definitions
    // resolve('./src/support/config.js'),
    // resolve('./src/support/pageFixture.js'),
  ],
  format: [
    'html:reports/report.html',
    'summary',
    'allure-cucumberjs/reporter' 
  ],
  formatOptions: {
    allure: {
      resultsDir: 'allure-results'
    }
  },
};

export default config;