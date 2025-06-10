import { actionUtils } from '../utils/index.js';
import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';


export class HomePage {

    static async navigateTo() {
        await actionUtils.navigateTo(process.env.BASE_URL);
        console.log("User navigated to the application URL");
    }
    static async clickOnLoginRegisterButton() {
        await actionUtils.clickByText(LoginPageLocators.LoginPageLoginRegister);
        await actionUtils.waitForPageLoad();
        console.log("User clicked on Login/Register button");
    }
}
