// cucumber.js
import { resolve } from 'path';

const config = {
  paths: [resolve('./src/features/**/*.feature')],
  import: [
    resolve('./src/support/hooks.js'), // hooks.js must be first!
    resolve('./src/step_definitions/**/*.js'),
    resolve('./src/support/**/*.js')
  ],
  format: [
    'html:reports/report.html',
    'summary',
    'allure-cucumberjs/reporter' // ✅ THIS is the correct formatter
  ],
  formatOptions: {
    allure: {
      resultsDir: 'allure-results'
    }
  }
};

export default config;