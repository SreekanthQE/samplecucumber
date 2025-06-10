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
import { pageFixture } from '../support/pageFixture.js';

Given('the user navigates to the application URL',{timeout: 15000}, async function () {
  await HomePage.navigateTo();
  await HomePage.clickOnLoginRegisterButton();
});

When('the user enters valid credentials',{timeout: 15000}, async function () {
  await LoginPage.login();
  
})

Then('verify the user lands on the application home page',{timeout: 15000}, async function () {
  await HomePage.verifyURL();
  await HomePage.verifyProfileNameIsDisplayed();
});