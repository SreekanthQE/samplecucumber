require('dotenv').config();
const { exec } = require("child_process")
const { defineParameterType, When, Given, Then } = require("@cucumber/cucumber")
const path = require("path")
const { expect } = require('@playwright/test');
const assert = require("assert");
const { HomePage } = require("../pages/HomePage");
const { LoginPage } = require("../pages/LoginPage");
const pageFixture = require('../support/pageFixture');
const binDir = path.resolve(__dirname, "../../bin");
const allure = require('allure-cucumberjs').default; 


Given('the user navigates to the application URL', async function () {
  await HomePage.navigateTo();
  console.log("User navigated to the application URL");
  await HomePage.clickOnLoginRegisterButton();
  console.log("User clicked on Login/Register button");
});

When('the user enters valid credentials', async function () {
  await LoginPage.login();  
  console.log("User logged in successfully");
})

Then('verify the user lands on the application home page', async function () {
  await expect(pageFixture.page).toHaveURL(/.*account\/account/);
  await expect(pageFixture.page.locator("div[class='menu_text']")).toHaveText("Welcome back "+process.env.APP_USERNAME);
});