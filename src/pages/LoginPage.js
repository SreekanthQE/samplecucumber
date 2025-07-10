import { LoginPageLocators } from '../pageobjects/loginPageLocators.js';
import 'dotenv/config';
import * 

export class LoginPage {
    async userClicksOnLogoutButton(){
       await pw.clickSingleElementInAllElements(LoginPageLocators.HomePageAllMenus, 'Logout');
        await pw.waitForPageLoad('networkidle');
    }
    async enterName(){
        await pw.fillInput(LoginPageLocators.LoginPageName, await FakerUtils.generateRandomFirstName());
    }
    async enterEmailAddress(){
        await pw.fillInput(LoginPageLocators.LoginPageEmailAddress, await FakerUtils.generateRandomEmail());
    }
    async clickSignUptBtn(){
        await pw.clickBySelector(LoginPageLocators.LoginPageSignUpBtn)
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
        await pw.assertElementText(LoginPageLocators.LoginPageAccountCongratsMessage, 'Congratulations! Your new account has been successfully created!');
        await pw.assertElementText(LoginPageLocators.LoginPageAccountAdditionalInfo, 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
        await pw.assertElementVisible(LoginPageLocators.LoginPageContinueBtn);
    }
    async enterValidLoginEmailAddress(){
        await pw.fillInput(LoginPageLocators.LoginAccountEmailAddress, process.env.APP_LOGIN_EMAIL);
    }
    async fillValidLoginPassword(){
        await pw.fillInput(LoginPageLocators.LoginAccountPassword, process.env.APP_PASSWORD);
    }
    async clickLoginAccountLoginButton(){
        await pw.clickBySelector(LoginPageLocators.LoginAccountLoginBtn);
    }
    async verifyUserIsLoggedIn(){
        await pw.assertElementVisible(LoginPageLocators.LoginPageLogOutBtn);
        await pw.assertElementText(LoginPageLocators.LoginPageLogOutBtn, 'Logout');
        await pw.assertElementVisible(LoginPageLocators.LoginPageDeleteAccountBtn);
    }
    async userShouldBeRedirectedToLoginPage(){
        await pw.verifyURL('/login');
        await pw.assertElementInAllElements(LoginPageLocators.HomePageAllMenus, 'Signup / Login');
    }
    async enterExistingUserSignUpDetailsAndSubmitIt(){
        await pw.fillInput(LoginPageLocators.LoginPageExistingUserSignUpName, process.env.APP_USERNAME);
        await pw.fillInput(LoginPageLocators.LoginPageExistingUserSignUpEmail, process.env.APP_LOGIN_EMAIL);
        await this.ClickExistingUserSignUpButton();
    }
    async verifyUserIsAbleToSeeSignUpText(userSignUpText){
        await pw.assertElementVisible(LoginPageLocators.LoginPageNewSignUpText);
        await pw.assertElementText(LoginPageLocators.LoginPageNewSignUpText, userSignUpText);
    }
    async ClickExistingUserSignUpButton(){
        await pw.clickBySelector(LoginPageLocators.LoginPageExistingUserSignupBtn);
    }
    async verifyUserShouldSeeEmailExistsText(emailExistingUserSignUpText){
        await pw.assertElementTextByText('Email Address already exist!', 'Email Address already exist!');
    }
    async fillContactUsFormWithValidDetails(){
        await pw.fillInput(LoginPageLocators.ContactUsFormName, await FakerUtils.generateRandomFirstName());
        await pw.fillInput(LoginPageLocators.ContactUsFormEmail, await FakerUtils.generateRandomEmail());
        await pw.fillInput(LoginPageLocators.ContactUsFormSubject, await FakerUtils.generateRandomSubject());
        await pw.fillInput(LoginPageLocators.ContactUsFormMessage, await FakerUtils.generateRandomMessage());
        await pw.uploadFile(LoginPageLocators.ContactUsUploadFile, './src/testdata/files/uploadSample.txt');
        await pw.clickBySelector(LoginPageLocators.ContactUsSubmitBtn);
    }

}