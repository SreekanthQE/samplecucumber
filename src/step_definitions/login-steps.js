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
  await homePage.userNavigateToApplicationURL();
});

Then('verify the user lands on the application home page', async function () {
  await homePage.userLandsOnApplicationHomePage();
});

When('the user clicks on the logout button', async function(){
  await loginPage.userClicksOnLogoutButton();
  
})

Then('verify the user logsoff successfully', async function(){
  await homePage.verifyURL('account/logout');
})

When('the user clicks on the signup or login button', async function(){
  await homePage.clickSignUporLoginButton();
    
})
Then('the user creates a new account with valid details', async function(){
    await loginPage.userCreatesNewAccount();
})

When('the user enter valid email and password', async function(){
  await loginPage.userEntersValidEmailAndPassword();
})

Then('the user should be redirected to the home page', async function(){
  await loginPage.verifyUserIsLoggedIn();
})

Then ('the user should be redirected to the login page', async function(){
  await loginPage.userShouldBeRedirectedToLoginPage();
  
})