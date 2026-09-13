Feature: Admin Module

    #Scenario: Create application user for an existing employee

    Given user is logged into OrangeHRM application
    And user creates a new employee

    When user navigates to Admin module
    And user clicks on Add button
    And user enters application user details
    And user clicks on Admin Save button

    Then application user should be created successfully
    And newly created application user should be displayed in user list

  #Scenario: Search application user by employee name
    Given user is logged into OrangeHRM application
    And user creates a new employee
    When user navigates to Admin module
    And user searches employee using employee name
    Then matching employee should be displayed


  Scenario: Search employee by status

    Given user is logged into OrangeHRM application
    When user navigates to Admin module
    And user searches employees with status "Enabled"
    Then only enabled employees should be displayed

