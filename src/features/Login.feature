Feature: Login Functionality

    Background:
        Given the user navigates to the application URL
    
    @smoke @regression @createnewaccount
    Scenario: Validate user is able to register a new account
       When the user clicks on the "Signup / Login" submenu
        When the user creates a new account with valid details

    @smoke @regression @sample @verifylogin
    Scenario: Validate user is able to login with correct email and password
        When the user clicks on the "Signup / Login" submenu
        When the user enter valid email and password
        Then the user should be redirected to the home page 

    @smoke @regression @verifylogout    
    Scenario: Validate user is able to logout successfully
        When the user clicks on the "Signup / Login" submenu
        When the user enter valid email and password
        Then the user should be redirected to the home page
        When the user clicks on the logout button
        Then the user should be redirected to the login page 

    @smoke @regression @verifyRegisterWithExistingEmail
    Scenario: Verify user is not able to register with existing email and password
       When the user clicks on the "Signup / Login" submenu
       Then verify the user is able to see 'New User Signup!'
       When the user enter existing new user signup name and email 
       Then verify the user should see 'Email Address already exist!'    

    @smoke @regression @verifycontactusform
     Scenario: Verify user is able to submit contact us form
        When the user clicks on the "Contact us" submenu
        When the user fill up the contact us form with valid details

    @smoke @regression @verifytestcasespage
     Scenario: Verify the testcases page
        When the user clicks on the "Test Cases" submenu 
        Then the user is navigated to test cases page successfully    

    @smoke @regression @sample1 @verifyproducts
    Scenario: Verify All Products and product detail page
        When the user clicks on the "Products" submenu
        Then the user verifies all products are visible
        When the user click on "View Product" of first product
        Then the user lands on product details page and verifies product details






