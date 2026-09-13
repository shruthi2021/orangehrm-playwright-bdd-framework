Feature: Create Job Title

  Scenario: Create a new job title

    Given user is logged into OrangeHRM application
    When user navigates to Job Titles page
    And user creates a new job title with description and attachment
    Then job title should be created successfully
    And created job title details should be displayed in the job title list
