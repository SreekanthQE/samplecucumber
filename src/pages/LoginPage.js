const { LoginPageLocators } = require('../pageobjects/loginPageLocators');
require('dotenv').config();



class LoginPage{
    constructor(page){
        this.page = page;
    }
    async enterUserName(){
        await this.page.locator(LoginPageLocators.LoginPageUserName).fill(process.env.APP_USERNAME);
    }
     async enterPassWord(){
        await this.page.locator(LoginPageLocators.LoginPagePassWord).fill(process.env.APP_PASSWORD);
    }
     async clickLoginBtn(){
        await this.page.locator(LoginPageLocators.LoginPageLoginBtn).filter({hasText: 'Login'}).click();
        await this.page.waitForLoadState('networkidle');
    }
    async login(){
        await this.enterUserName();
        await this.enterPassWord();
        await this.clickLoginBtn();
    }

}
module.exports = { LoginPage }