# Playwright Cucumber Automation Framework

This project is an end-to-end test automation framework using [Playwright](https://playwright.dev/) and [Cucumber.js](https://github.com/cucumber/cucumber-js) with support for Allure reporting and GitHub Actions CI.

## Features

- **Playwright** for fast, reliable browser automation (Chromium, Firefox, WebKit)
- **Cucumber.js** for BDD-style feature files and step definitions
- **Allure Reports** for rich test reporting
- **GitHub Actions** workflow for CI/CD
- Tag-based scenario selection (e.g., `@smoke`, `@regression`)
- Page Object Model structure

## Project Structure

```
src/
  features/         # Cucumber feature files
  pages/            # Page Object classes
  pageobjects/      # Locators for pages
  step-definitions/ # Step definitions for Cucumber
  utils/            # Utility classes (e.g., playwrightUtils.js)
allure-results/     # Allure raw results (gitignored)
allure-report/      # Allure HTML report (gitignored)
reports/            # HTML reports (gitignored)
.github/workflows/  # GitHub Actions workflow files
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```sh
npm install
```

### Run tests locally

```sh
npx playwright install
npx cucumber-js src/features --exit
```

#### Run with a tag

```sh
npx cucumber-js src/features --tags "@smoke" --exit
```

#### Run a specific scenario

```sh
npx cucumber-js src/features --name "Validate user is able to log in to the application successfully" --exit
```

### Generate Allure Report

```sh
npm install -g allure-commandline --no-save
allure generate allure-results --clean -o allure-report
allure open allure-report
```

### GitHub Actions

- The workflow file is at `.github/workflows/playwright.yml`.
- You can trigger the workflow manually and select browser, tag, feature, and scenario from dropdowns.

## Customization

- Add new tags (e.g., `@smoke`, `@regression`) in your feature files.
- Update the tag dropdown options in `.github/workflows/playwright.yml` as needed.

## .gitignore

- `node_modules/`, `allure-results/`, `allure-report/`, `reports/`, and `playwright-report/` are ignored by default.

---
