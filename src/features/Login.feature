Feature: Login Functionality

    Background:
        Given the user navigates to the application URL
    
    @smoke @regression @sample @createnewaccount
    Scenario: Validate user is able to register a new account
        When the user clicks on the signup or login button
        When the user creates a new account with valid details


    @smoke @regression @sample @verifylogin
    Scenario: Validate user is able to login with correct email and password
        When the user clicks on the signup or login button
        When the user enter valid email and password
        Then the user should be redirected to the home page 

    @smoke @regression @sample1 @verifylogout    
    Scenario: Validate user is able to logout successfully
        When the user clicks on the signup or login button
        When the user enter valid email and password
        Then the user should be redirected to the home page
        When the user clicks on the logout button
        Then the user should be redirected to the login page      


        







