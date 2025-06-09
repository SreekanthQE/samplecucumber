const { LoginPageLocators } = require('../pageobjects/loginPageLocators');
require('dotenv').config();
const playwrightUtils = require('../utils/playwrightUtils');
const pageFixture = require('../support/pageFixture');



class LoginPage{
   static async enterUserName(){
        await playwrightUtils.fillInput(LoginPageLocators.LoginPageUserName, process.env.APP_USERNAME);
        // Take screenshot and attach to Allure if available
        const screenshot = await pageFixture.page.screenshot();
        if (global.allure) {
            global.allure.attachment('Username Entered', screenshot, 'image/png');
        } else if (typeof this.attach === 'function') {
            await this.attach(screenshot, 'image/png');
        }
    }
   static  async enterPassWord(){
        await playwrightUtils.fillInput(LoginPageLocators.LoginPagePassWord, process.env.APP_PASSWORD);
    }
  static   async clickLoginBtn(){
        await playwrightUtils.clickByLocator(LoginPageLocators.LoginPageLoginBtn);
        await playwrightUtils.waitForPageLoad();
    }
  static  async login(){
        await this.enterUserName();
        await this.enterPassWord();
        await this.clickLoginBtn();
    }

}
module.exports = { LoginPage }