import * as playwrightUtils from '../utils/playwrightUtils.js';
import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';


export class HomePage {

    static async navigateTo() {
        await playwrightUtils.navigateTo(process.env.BASE_URL);
    }
    static async clickOnLoginRegisterButton() {
        await playwrightUtils.clickByText(LoginPageLocators.LoginPageLoginRegister);
        await playwrightUtils.waitForPageLoad();
    }
}
