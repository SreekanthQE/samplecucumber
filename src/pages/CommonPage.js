
//import * as utils  from '../../node_modules/playwright-ultimate-utils';
const utils = require('playwright-ultimate-utils');

import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
export class CommonPage{

    async userNavigateToApplicationURL(){
        await utils.gotoURL(process.env.BASE_URL);
         
    }
    async userClicksOnSubMenu(menuText){
        await utils.clickFirstMatchingElementInAllElements(LoginPageLocators.HomePageAllMenus, menuText);
    }
    async userLandsOnApplicationHomePage(){
        await utils.verifyUrl('account/account');
    }
}