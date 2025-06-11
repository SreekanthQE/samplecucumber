import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import { playwrightUtils as pw } from '../utils/playwrightUtils.js';


export class HomePage {
    async userNavigateToApplicationURL(){
        await pw.navigateTo(process.env.BASE_URL);
    }
    async clickSignUporLoginButton(){
        await pw.closeCookieBannerIfPresent(); // Close cookie banner if present (for CI reliability)
        await pw.clickBySelector(LoginPageLocators.HomePageSignUporLoginButton);
        await pw.verifyURL('/login');
    }
    async userLandsOnApplicationHomePage(){
         await pw.verifyURL('account/account');
    }

}
