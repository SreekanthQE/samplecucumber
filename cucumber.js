module.exports = {
  default: {
    require: ['src/step_definitions/**/*.js', 'src/support/**/*.js'],
    paths: ['src/features'],
    format: ['allure-cucumberjs/reporter'],
    formatOptions: {
      resultsDir: 'allure-results',
    },
  },
};

//npx cucumber-js features/ErrorValidation.feature --exit
//npx cucumber-js --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js features/greeting.feature --parallel 2 --exit --format html:cucumber-report.html