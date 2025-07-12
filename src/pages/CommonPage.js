<<<<<<< HEAD
import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import * as utils from 'playwright-magic-utils';
=======
>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758

//import * as utils  from '../../node_modules/playwright-ultimate-utils';
const utils = require('playwright-ultimate-utils');

import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
export class CommonPage{

    async userNavigateToApplicationURL(){
<<<<<<< HEAD
        await utils.gotoURL(process.env.APP_BASE_URL);
        await utils.waitForPageLoad();
    }
    async userClicksOnSubMenu(menuText){
        await utils.clickEleByText(menuText);
    }
    async userLandsOnApplicationHomePage(){
        await utils.expectUrlToMatch('account/account');
=======
        await utils.gotoURL(process.env.BASE_URL);
         
    }
    async userClicksOnSubMenu(menuText){
        await utils.clickFirstMatchingElementInAllElements(LoginPageLocators.HomePageAllMenus, menuText);
    }
    async userLandsOnApplicationHomePage(){
        await utils.verifyUrl('account/account');
>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758
    }
}