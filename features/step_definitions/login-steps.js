const { exec } = require("child_process")

const { defineParameterType, When, Given,Then } = require("@cucumber/cucumber")
const path = require("path")
let poManager 
const { expect } = require('@playwright/test');
 const {POManager} = require('../../pages/POManager');
const assert = require("assert");
const { HomePage } = require("../../pages/HomePage");
const { LoginPage } = require("../../pages/LoginPage");
const binDir = path.resolve(__dirname, "../../bin")
console.log(binDir)


defineParameterType({
  name: "command", 
  regexp: /`(.+)`/,
  transformer: (cmd) => cmd,
})

Given('the user navigates to the application URL',{timeout: 60 * 1000}, async function() {
  const homePage = new HomePage(this.page);
  await homePage.navigateToURL();
  await expect(this.page).toHaveURL(process.env.BASE_URL + '/');
});

When('the user enters valid credentials', async function(){
  const homePage = new HomePage(this.page);
  await homePage.clickLoginOrRegister();
  const loginPage = new LoginPage(this.page);
  await loginPage.login();
 //await expect(this.page).toHaveURL(/.*account\/login/);
})
Then('verify the user lands on the application home page', async function(){

})