Feature: Time Module

  Scenario: Create and approve employee timesheet

    Given user is logged into OrangeHRM application
    And user creates a new employee

    When user clicks on Time menu
    And user searches employee using employee name in time module
    And user clicks on View button
    And user creates a new timesheet
    And user submits the timesheet
    And user enters approval comments "approving"
    And user approves the timesheet

    Then approved timesheet details should be displayed correctly