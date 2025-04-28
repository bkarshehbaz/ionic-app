Feature: Choose a company

@CucumberScenario
Scenario: Choose a Company
Given the user go to the select company page
Then title should be: Choose a company
When user click first company
Then an alert should be displayed
When user click the alert positive button

# Given the user go to the login page
When user types username
And user types password
And user clicks the submit button

Then the user should be in the select-property-page or an alert is shown
When the select property page is visible
Then
