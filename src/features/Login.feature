Feature: Login Functionality

    @sample
    Scenario: Validate user is able to log in to the application successfully
        Given the user navigates to the application URL
        When the user enters valid credentials
        Then verify the user lands on the application home page
