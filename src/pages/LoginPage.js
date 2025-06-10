import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import 'dotenv/config';
import { playwrightUtils } from '../utils/playwrightUtils.js';

export class LoginPage {
    static async enterUserName() {
        await playwrightUtils.fillInput(LoginPageLocators.LoginPageUserName, process.env.APP_USERNAME);
        console.log("User name entered: ");
    }
    static async enterPassWord() {
        await playwrightUtils.fillInput(LoginPageLocators.LoginPagePassWord, process.env.APP_PASSWORD);
        console.log("Password entered: ");
    }
    static async clickLoginBtn() {
        await playwrightUtils.clickByLocator(LoginPageLocators.LoginPageLoginBtn);
        await playwrightUtils.waitForPageLoad();
        console.log("User clicked on Login Button")
    }
    static async login() {
        await this.enterUserName();
        await this.enterPassWord();
        await this.clickLoginBtn();
    }

}