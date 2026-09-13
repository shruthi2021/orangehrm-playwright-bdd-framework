Feature: Leave Module

  Scenario: Add entitlement, assign leave, and verify leave details

    Given user is logged into OrangeHRM application
    And user creates a new employee

    When user navigates to Add Leave Entitlements page
    And user adds leave entitlement

    And user navigates to Assign Leave page
    And user assigns leave

    And user navigates to Leave List page
    And user searches assigned leave using employee name
    And user searches assigned leave using status "Scheduled"
    And user searches assigned leave using leave type "CAN - Bereavement"

    Then assigned leave details should be displayed correctly