import { defineParameterType, When, Given, Then } from '@cucumber/cucumber';
import { pages } from '../pages/Pages.js';

Then ('the user is navigated to test cases page successfully', async function(){
  await pages.testCasesPage.verifyUserIsOnTestCasesPage();
})
