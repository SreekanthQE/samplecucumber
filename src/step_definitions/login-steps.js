  import { defineParameterType, When, Given, Then } from '@cucumber/cucumber';
import path from 'path';
import * as allure from 'allure-cucumberjs';
const binDir = path.resolve('.', '../../bin');
import { pages } from '../pages/Pages.js';





When('the user clicks on the logout button', async function(){
  await pages.loginPage.userClicksOnLogoutButton();
  
})

Then('the user creates a new account with valid details', async function(){
    await pages.loginPage.userCreatesNewAccount();
})

When('the user enter valid email and password', async function(){
  await pages.loginPage.userEntersValidEmailAndPassword();
})

Then('the user should be redirected to the home page', async function(){
  await pages.loginPage.verifyUserIsLoggedIn();
})

Then ('the user should be redirected to the login page', async function(){
  await pages.loginPage.userShouldBeRedirectedToLoginPage();

})

When('the user enter existing new user signup name and email', async function(){
  await pages.loginPage.enterExistingUserSignUpDetailsAndSubmitIt();
})
When('verify the user is able to see {string}', async function(userSignUpText){
  await pages.loginPage.verifyUserIsAbleToSeeSignUpText(userSignUpText);
})

Then('verify the user should see {string}', async function(emailExistingUserSignUpText){
  await pages.loginPage.verifyUserShouldSeeEmailExistsText(emailExistingUserSignUpText);
})

When ('the user fill up the contact us form with valid details', async function(){
  await pages.loginPage.fillContactUsFormWithValidDetails();
})

