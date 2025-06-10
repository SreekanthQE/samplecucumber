import dotenv from 'dotenv';
dotenv.config();

import { exec } from 'child_process';
import { defineParameterType, When, Given, Then } from '@cucumber/cucumber';
import path from 'path';
import { expect } from '@playwright/test';
import assert from 'assert';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import * as allure from 'allure-cucumberjs';
const binDir = path.resolve('.', '../../bin');


Given('the user navigates to the application URL', async function () {
  await HomePage.navigateTo();
  await HomePage.clickOnLoginRegisterButton();
});

When('the user enters valid credentials', async function () {
  await LoginPage.login();
  
})

Then('verify the user lands on the application home page', async function () {
  await expect(pageFixture.page).toHaveURL(/.*account\/account/);
  await expect(pageFixture.page.locator("div[class='menu_text']")).toHaveText("Welcome back " + process.env.APP_USERNAME);
});