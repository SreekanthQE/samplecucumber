Feature: Login Functionality

    
    @smoke @regression @sample @verifylogin
    Scenario: Validate user is able to register a new account
        Given the user navigates to the application URL
        When the user clicks on the signup or login button
        When the user creates a new account with valid details

    Scenario: Validate user is able to login with correct email and password
        Given the user navigates to the application URL
        When the user clicks on the signup or login button
        When the user enter valid email and password
        Then the user should be redirected to the home page   


        







