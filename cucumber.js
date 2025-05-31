
module.exports = {
  default: [
    '--require features/step_definitions/**/*.js',
    '--require features/support/hooks/**/*.js',
    '--publish-quiet',
    '--format @shelex/cucumberjs-allure2-reporter',
    '--format progress',
    '--format ./features/support/hooks.js:CustomAllureFormatter',
  ].join(' '),
  default: "--publish-quiet",
};

//npx cucumber-js features/ErrorValidation.feature --exit
//npx cucumber-js --parallel 2 --exit --format html:cucumber-report.html
//npx cucumber-js features/greeting.feature --parallel 2 --exit --format html:cucumber-report.html