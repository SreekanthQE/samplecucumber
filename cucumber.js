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