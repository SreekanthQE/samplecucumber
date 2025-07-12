import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import 'dotenv/config';
<<<<<<< HEAD
import * as utils from 'playwright-magic-utils';

=======
import * 
>>>>>>> 58afde6f4ac6d6fdef5d4f19dd11695b7a6b8758

export class LoginPage {
    async userClicksOnLogoutButton(){
       await pw.clickSingleElementInAllElements(LoginPageLocators.HomePageAllMenus, 'Logout');
        await pw.waitForPageLoad('networkidle');
    }
    async enterName(){
        await utils.fillInput(LoginPageLocators.LoginPageName, await FakerUtils.generateRandomFirstName());
    }
    async enterEmailAddress(){
        await utils.fillInput(LoginPageLocators.LoginPageEmailAddress, await FakerUtils.generateRandomEmail());
    }
    async clickSignUptBtn(){
        await utils.clickEleByLocator(LoginPageLocators.LoginPageSignUpBtn)
    }
    async userCreatesNewAccount(){
        await this.enterSignUpDetails();
        await this.clickTitleOnMr();
        await this.fillPassword();
        await this.selectDateOfBirth();
        await this.fillFirstName();
        await this.fillLastName();
        await this.fillCompany();
        await this.fillAddress1();
        await this.fillAddress2();
        await this.selectCountry();
        await this.fillState();
        await this.fillCity();
        await this.fillZipCode();
        await this.fillMobileNumber();
        await this.clickCreateAccountButton();
    }
    async userEntersValidEmailAndPassword(){
         await this.enterValidLoginEmailAddress();
         await this.fillValidLoginPassword();
         await this.clickLoginAccountLoginButton();

    }
    async enterSignUpDetails(){
        await this.enterName();
        await this.enterEmailAddress();
        await this.clickSignUptBtn();
    }
    async clickTitleOnMr(){
        await utils.clickEleByLocator(LoginPageLocators.LoginPageTitleMr);
    }
    async clickTitleOnMrs(){
        await utils.clickEleByLocator(LoginPageLocators.LoginPageTitleMrs);
    }
    async fillPassword(){
        await utils.fillInput(LoginPageLocators.LoginPagePassword, process.env.APP_PASSWORD);
    }
    async selectDateOfBirth(){
        await utils.selectOption(LoginPageLocators.LoginPageDayOfBirth, '5');
       await utils.selectOption(LoginPageLocators.LoginPageMonthOfBirth, 'March');
       await utils.selectOption(LoginPageLocators.LoginPageYearOfBirth, '1947');
    }
    async fillFirstName(){
        await utils.fillInput(LoginPageLocators.LoginPageFirstName, await FakerUtils.generateRandomFirstName());
    }
    async fillLastName(){
        await utils.fillInput(LoginPageLocators.LoginPageLastName, await FakerUtils.generateRandomLastName());
    }
    async fillCompany(){
        await utils.fillInput(LoginPageLocators.LoginPageCompany, await FakerUtils.generateRandomCompany());
    }
    async fillAddress1(){
        await utils.fillInput(LoginPageLocators.LoginPageAddress1, await FakerUtils.generateRandomStreetAddress());
    }
    async fillAddress2(){
        await utils.fillInput(LoginPageLocators.LoginPageAddress2, await FakerUtils.generateRandomStreetAddress());
    }
    async selectCountry(){
        await utils.selectOption(LoginPageLocators.LoginPageCountry, 'India');
    }
    async fillState(){
        await utils.fillInput(LoginPageLocators.LoginPageState, await FakerUtils.generateRandomState());
    }
    async fillCity(){
        await utils.fillInput(LoginPageLocators.LoginPageCity, await FakerUtils.generateRandomCity());
    }
    async fillZipCode(){
        await utils.fillInput(LoginPageLocators.LoginPageZipCode, await FakerUtils.generateRandomZipCode());
    }
    async fillMobileNumber(){
        await utils.fillInput(LoginPageLocators.LoginPageMobileNumber, await FakerUtils.generateRandomPhoneNumber());
    }
    async clickCreateAccountButton() {
        await utils.clickEleByText(LoginPageLocators.LoginPageCreateAccountText);
        await utils.assertElementVisible(LoginPageLocators.LoginPageAccountCreatedText);
        await utils.assertElementText(LoginPageLocators.LoginPageAccountCreatedText, 'Account Created!');
        await utils.assertElementText(LoginPageLocators.LoginPageAccountCongratsMessage, 'Congratulations! Your new account has been successfully created!');
        await utils.assertElementText(LoginPageLocators.LoginPageAccountAdditionalInfo, 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
        await utils.assertElementVisible(LoginPageLocators.LoginPageContinueBtn);
    }
    async enterValidLoginEmailAddress(){
        await utils.fillInput(LoginPageLocators.LoginAccountEmailAddress, process.env.APP_LOGIN_EMAIL);
    }
    async fillValidLoginPassword(){
        await utils.fillInput(LoginPageLocators.LoginAccountPassword, process.env.APP_PASSWORD);
    }
    async clickLoginAccountLoginButton(){
        await utils.clickEleByLocator(LoginPageLocators.LoginAccountLoginBtn);
    }
    async verifyUserIsLoggedIn(){
        await utils.assertElementVisible(LoginPageLocators.LoginPageLogOutBtn);
        await utils.assertElementText(LoginPageLocators.LoginPageLogOutBtn, 'Logout');
        await utils.assertElementVisible(LoginPageLocators.LoginPageDeleteAccountBtn);
    }
    async userShouldBeRedirectedToLoginPage(){
        await utils.verifyURL('/login');
        await utils.assertElementInAllElements(LoginPageLocators.HomePageAllMenus, 'Signup / Login');
    }
    async enterExistingUserSignUpDetailsAndSubmitIt(){
        await utils.fillInput(LoginPageLocators.LoginPageExistingUserSignUpName, process.env.APP_USERNAME);
        await utils.fillInput(LoginPageLocators.LoginPageExistingUserSignUpEmail, process.env.APP_LOGIN_EMAIL);
        await this.ClickExistingUserSignUpButton();
    }
    async verifyUserIsAbleToSeeSignUpText(userSignUpText){
        await utils.assertElementVisible(LoginPageLocators.LoginPageNewSignUpText);
        await utils.assertElementText(LoginPageLocators.LoginPageNewSignUpText, userSignUpText);
    }
    async ClickExistingUserSignUpButton(){
        await utils.clickEleByLocator(LoginPageLocators.LoginPageExistingUserSignupBtn);
    }
    async verifyUserShouldSeeEmailExistsText(emailExistingUserSignUpText){
        await utils.assertElementTextByText('Email Address already exist!', 'Email Address already exist!');
    }
    async fillContactUsFormWithValidDetails(){
        await utils.fillInput(LoginPageLocators.ContactUsFormName, await FakerUtils.generateRandomFirstName());
        await utils.fillInput(LoginPageLocators.ContactUsFormEmail, await FakerUtils.generateRandomEmail());
        await utils.fillInput(LoginPageLocators.ContactUsFormSubject, await FakerUtils.generateRandomSubject());
        await utils.fillInput(LoginPageLocators.ContactUsFormMessage, await FakerUtils.generateRandomMessage());
        await utils.uploadFile(LoginPageLocators.ContactUsUploadFile, './src/testdata/files/uploadSample.txt');
        await utils.clickEleByLocator(LoginPageLocators.ContactUsSubmitBtn);
    }

}