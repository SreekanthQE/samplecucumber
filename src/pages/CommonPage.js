import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import { playwrightUtils as pw } from '../utils/playwrightUtils.js';

export class CommonPage{

    async userNavigateToApplicationURL(){
        await pw.navigateTo(process.env.BASE_URL);
    }
    async userClicksOnSubMenu(menuText){
         await pw.clickSingleElementInAllElements(LoginPageLocators.HomePageAllMenus, menuText);
    }
    async userLandsOnApplicationHomePage(){
         await pw.verifyURL('account/account');
    }
}