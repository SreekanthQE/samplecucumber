import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import { playwrightUtils } from '../utils/playwrightUtils.js';


export class HomePage {
    async navigateTo(){
        await playwrightUtils.navigateTo(process.env.BASE_URL);
    }
    async verifyURL(expectedUrl){
        await playwrightUtils.verifyURL(expectedUrl);
    }
    async clickSignUporLoginButton(){
        await playwrightUtils.clickLocatorByXpathOrCSS(LoginPageLocators.HomePageSignUporLoginButton)

    }

}
