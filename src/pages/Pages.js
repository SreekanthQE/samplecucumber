import { LoginPage } from './LoginPage.js';
import { HomePage } from './HomePage.js';
import { TestCasesPage } from './TestCasesPage.js';
import { ApitestingPage } from './ApitestingPage.js';
import { CartPage } from './CartPage.js';
import { CommonPage } from './CommonPage.js';
import { ContactusPage } from './ContactusPage.js';
import { ProductsPage } from './ProductsPage.js';
import { SignUpLoginPage } from './SignUpLoginPage.js';
import { VideoTutorialsPage } from './VideoTutorialsPage.js';


class Pages {
  constructor() {
    this.loginPage = new LoginPage();
    this.homePage = new HomePage();
    this.testCasesPage = new TestCasesPage();
    this.apitestingPage = new ApitestingPage();
    this.cartPage = new CartPage();
    this.commonPage = new CommonPage();
    this.contactusPage = new ContactusPage();
    this.productsPage = new ProductsPage();
    this.signuplogPage = new SignUpLoginPage();
    this.videoTutorialsPage = new VideoTutorialsPage();
  }
}

export const pages = new Pages();
