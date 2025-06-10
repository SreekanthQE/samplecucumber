import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import { playwrightUtils } from '../utils/playwrightUtils.js';


export class HomePage {

    static async navigateTo() {
        await playwrightUtils.navigateTo(process.env.BASE_URL);
        console.log("User navigated to the application URL");
    }
    static async clickOnLoginRegisterButton() {
        console.log("Waiting for Login/Register button to be visible...");        console.log("Clicking Login/Register button...");
        await playwrightUtils.clickByText(LoginPageLocators.LoginPageLoginRegister);
        await playwrightUtils.waitForPageLoad(20000);
        console.log("User clicked on Login/Register button and waited for page load");
    }
}
