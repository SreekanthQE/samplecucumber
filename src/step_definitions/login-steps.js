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
const loginPage = new LoginPage();
const homePage = new HomePage();

Given('the user navigates to the application URL', async function () {
  await homePage.navigateTo();
});

Then('verify the user lands on the application home page', async function () {
  await homePage.verifyURL('account/account');
  await homePage.verifyProfileNameIsDisplayed();
});

When('the user clicks on the logout button', async function(){
  await loginPage.clickLogoffButton();
})

Then('verify the user logsoff successfully', async function(){
  await homePage.verifyURL('account/logout');
})

When('the user clicks on the signup or login button', async function(){
    await homePage.clickSignUporLoginButton();
    await homePage.verifyURL('/login');
})
Then('the user creates a new account with valid details', async function(){
    await loginPage.enterSignUpDetails();
    await loginPage.clickTitleOnMr();
    await loginPage.fillPassword();
    await loginPage.selectDateOfBirth();
    await loginPage.fillFirstName();
    await loginPage.fillLastName();
    await loginPage.fillCompany();
    await loginPage.fillAddress1();
    await loginPage.fillAddress2();
    await loginPage.selectCountry();
    await loginPage.fillState();
    await loginPage.fillCity(); 
    await loginPage.fillZipCode();
    await loginPage.fillMobileNumber();
    await loginPage.clickCreateAccountButton();
})

When('the user enter valid email and password', async function(){
  await loginPage.enterValidLoginEmailAddress();
  await loginPage.fillValidLoginPassword();
})