Feature: Vacancy Management

  Scenario: Create a new vacancy
    Given user is logged into OrangeHRM application
    And user creates a new employee
    And user creates a job title
    
    When user navigates to Vacancies page
    And user creates a new vacancy
    Then newly created vacancy should be displayed in the vacancy list