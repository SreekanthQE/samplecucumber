const { exec } = require("child_process")

const { defineParameterType, When, Given,Then } = require("@cucumber/cucumber")
const path = require("path")
let poManager 
const { expect } = require('@playwright/test');
 const {POManager} = require('../../pageobjects/POManager');
const assert = require("assert");
const { HomePage } = require("../../pageobjects/HomePage");
const binDir = path.resolve(__dirname, "../../bin")
console.log(binDir)

defineParameterType({
  name: "command", 
  regexp: /`(.+)`/,
  transformer: (cmd) => cmd,
})

Given('the user navigates to the application URL', async function(){
  const homePage = new HomePage(this.page);
    await expect(await homePage.navigateToURL()).toHaveURL('https://automationteststore.com/')

});

When('the user enters valid credentials', async function(){

})
Then('verify the user lands on the application home page', async function(){

})