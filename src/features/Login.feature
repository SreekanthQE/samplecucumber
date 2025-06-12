Feature: Login Functionality

    Background:
        Given the user navigates to the application URL
    
    @smoke @regression @sample @createnewaccount
    Scenario: Validate user is able to register a new account
       When the user clicks on the "Signup / Login" submenu
        When the user creates a new account with valid details

    @smoke @regression @sample @verifylogin
    Scenario: Validate user is able to login with correct email and password
        When the user clicks on the "Signup / Login" submenu
        When the user enter valid email and password
        Then the user should be redirected to the home page 

    @smoke @regression @sample @verifylogout    
    Scenario: Validate user is able to logout successfully
        When the user clicks on the "Signup / Login" submenu
        When the user enter valid email and password
        Then the user should be redirected to the home page
        When the user clicks on the logout button
        Then the user should be redirected to the login page 

    @smoke @regression @sample1 @verifyRegisterWithExistingEmail
    Scenario: Verify user is not able to register with existing email and password
       When the user clicks on the "Signup / Login" submenu
       Then verify the user should see 'Email Address already exist!'
       Then verify the user is able to see 'New User Signup!'
       When the user enter existing new user signup name and email 
       Then verify the user should see 'Email Address already exist!'    

    @smoke @regression @sample1 @verifycontactusform
     Scenario: Verify user is able to submit contact us form
        When the user clicks on the "Contact us" submenu
        When the user fill up the contact us form with valid details

    @smoke @regression @sample1 @verifytestcasespage
     Scenario: Verify the testcases page
        When the user clicks on the "Test Cases" submenu 
        Then the user is navigated to test cases page successfully    







