import { When, Given, Then } from '@cucumber/cucumber';
import { pages } from '../pages/Pages.js';

Given('the user navigates to the application URL', async function () {
  await pages.commonPage.userNavigateToApplicationURL();
});

When('the user clicks on the {string} submenu', async function(menuText){
  await pages.commonPage.userClicksOnSubMenu(menuText);  
})

Then('verify the user lands on the application home page', async function () {
  await pages.commonPage.userLandsOnApplicationHomePage();
});

Then('verify the user logsoff successfully', async function(){
  await pages.commonPage.verifyURL('account/logout');
})