import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import { playwrightUtils as pw } from '../utils/playwrightUtils.js';


export class HomePage {
    async userNavigateToApplicationURL(){
        await pw.navigateTo(process.env.BASE_URL);
    }
    async clickSignUporLoginButton(){
            await pw.clickSingleElementInAllElements(LoginPageLocators.HomePageAllMenus, 'Signup / Login');
       
        await pw.verifyURL('/login');
    }
    async userLandsOnApplicationHomePage(){
         await pw.verifyURL('account/account');
    }

}
