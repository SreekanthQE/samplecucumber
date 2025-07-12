import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import * as utils from 'playwright-magic-utils';

export class CommonPage{

    async userNavigateToApplicationURL(){
        await utils.gotoURL(process.env.APP_BASE_URL);
        await utils.waitForPageLoad();
    }
    async userClicksOnSubMenu(menuText){
        await utils.clickEleByText(menuText);
    }
    async userLandsOnApplicationHomePage(){
        await utils.expectUrlToMatch('account/account');
    }
}