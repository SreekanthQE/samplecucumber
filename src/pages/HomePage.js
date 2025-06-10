import * as actionUtils from '../utils/playwrightUtils.js';
import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';


export class HomePage {

    static async navigateTo() {
        await actionUtils.navigateTo(process.env.BASE_URL);
    }
    static async clickOnLoginRegisterButton() {
        await actionUtils.clickByText(LoginPageLocators.LoginPageLoginRegister);
        await actionUtils.waitForPageLoad();
    }
}
