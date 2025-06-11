import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import 'dotenv/config';
import { playwrightUtils as pw } from '../utils/playwrightUtils.js';
import { FakerUtils } from '../utils/fakerUtils.js';


export class LoginPage {
    
    async enterName(){
        await pw.fillInput(LoginPageLocators.LoginPageName, await FakerUtils.generateRandomFirstName());
    }
    async enterEmailAddress(){
        await pw.fillInput(LoginPageLocators.LoginPageEmailAddress, await FakerUtils.generateRandomEmail());
    }
    async clickSignUptBtn(){
        await pw.clickBySelector(LoginPageLocators.LoginPageSignUpBtn)
    }

    async enterSignUpDetails(){
        await this.enterName();
        await this.enterEmailAddress();
        await this.clickSignUptBtn();
    }
    async clickTitleOnMr(){
        await pw.clickBySelector(LoginPageLocators.LoginPageTitleMr);
    }
    async clickTitleOnMrs(){
        await pw.clickBySelector(LoginPageLocators.LoginPageTitleMrs);
    }
    async fillPassword(){
        await pw.fillInput(LoginPageLocators.LoginPagePassword, process.env.APP_PASSWORD);
    }
    async selectDateOfBirth(){
       await pw.selectOption(LoginPageLocators.LoginPageDayOfBirth, '5');
       await pw.selectOption(LoginPageLocators.LoginPageMonthOfBirth, 'March');
       await pw.selectOption(LoginPageLocators.LoginPageYearOfBirth, '1947');
    }
    async fillFirstName(){
        await pw.fillInput(LoginPageLocators.LoginPageFirstName, await FakerUtils.generateRandomFirstName());
    }
    async fillLastName(){
        await pw.fillInput(LoginPageLocators.LoginPageLastName, await FakerUtils.generateRandomLastName());
    }
    async fillCompany(){
        await pw.fillInput(LoginPageLocators.LoginPageCompany, await FakerUtils.generateRandomCompany());
    }
    async fillAddress1(){
        await pw.fillInput(LoginPageLocators.LoginPageAddress1, await FakerUtils.generateRandomStreetAddress());
    }
    async fillAddress2(){
        await pw.fillInput(LoginPageLocators.LoginPageAddress2, await FakerUtils.generateRandomStreetAddress());
    }
    async selectCountry(){
        await pw.selectOption(LoginPageLocators.LoginPageCountry, 'India');
    }
    async fillState(){
        await pw.fillInput(LoginPageLocators.LoginPageState, await FakerUtils.generateRandomState());
    }
    async fillCity(){
        await pw.fillInput(LoginPageLocators.LoginPageCity, await FakerUtils.generateRandomCity());
    }
    async fillZipCode(){
        await pw.fillInput(LoginPageLocators.LoginPageZipCode, await FakerUtils.generateRandomZipCode());
    }
    async fillMobileNumber(){
        await pw.fillInput(LoginPageLocators.LoginPageMobileNumber, await FakerUtils.generateRandomPhoneNumber());
    }
    async clickCreateAccountButton() {
        await pw.clickByText(LoginPageLocators.LoginPageCreateAccountText);
        await pw.assertElementVisible(LoginPageLocators.LoginPageAccountCreatedText);
        await pw.assertElementText(LoginPageLocators.LoginPageAccountCreatedText, 'Account Created!');
        await pw.assertElementText(LoginPageLocators.LoginPageAccountCongratsMessage, 'Congratulations! Your new account has been successfully created!')
        await pw.assertElementText(LoginPageLocators.LoginPageAccountAdditionalInfo, 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
        await pw.assertElementVisible(LoginPageLocators.LoginPageContinueBtn);
    }
    static async enterValidLoginEmailAddress(){
        const locator = await pw.getLocator(LoginPageLocators.LoginAccountEmailAddress);
        await pw.fillInput(locator.first(), process.env.APP_USERNAME);
    }
    static async fillValidLoginPassword(){
        await pw.fillInput(LoginPageLocators.LoginAccountPassword, process.env.APP_PASSWORD);
    }
    
}