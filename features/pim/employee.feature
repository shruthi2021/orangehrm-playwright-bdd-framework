Feature: Employee Management

#Scenario: Add Employee With Login Details
#Given user is logged into OrangeHRM application
#When user navigates to PIM module
#And user clicks on Add Employee button
#And user enters employee details
#And user uploads employee photo
#And user enables Create Login Details option
#And user enters login credentials
#And user clicks on Save button
#Then employee should be added successfully
#And user enters employee personal details



#Scenario: Search Employee By Employee ID
Given user is logged into OrangeHRM application
When user navigates to PIM module
And user clicks on Add Employee button
And user enters employee details
And user uploads employee photo
And user enables Create Login Details option
And user enters login credentials
And user clicks on Save button
Then employee should be added successfully
When user searches employee using employee id
Then employee record should be displayed in search results

#Scenario: Delete Employee By Employee ID

Given user is logged into OrangeHRM application
When user navigates to PIM module
And user clicks on Add Employee button
And user enters employee details
And user uploads employee photo
And user enables Create Login Details option
And user enters login credentials
And user clicks on Save button
Then employee should be added successfully
When user searches employee using employee id

And user deletes the employee
And user searches employee using employee id again
Then employee should not be displayed in search results


#Scenario: Edit Employee Personal Details

Given user is logged into OrangeHRM application
#When user navigates to PIM module
##And user clicks on Add Employee button
#And user enters employee details
#And user uploads employee photo
#And user enables Create Login Details option
#And user enters login credentials
#And user clicks on Save button
And user creates a new employee
Then employee should be added successfully

When user searches employee using employee id
And user clicks edit employee icon
And user updates driver license number
And user saves employee details

When user searches employee using employee id
And user clicks edit employee icon

Then updated driver license number should be displayed

# Scenario: Edit Employee
# Given user is logged into OrangeHRM application
# When user updates employee details
# Then employee details should be updated successfully

# Scenario: Delete Employee
# Given user is logged into OrangeHRM application
# When user deletes an employee
# Then employee should be removed successfully