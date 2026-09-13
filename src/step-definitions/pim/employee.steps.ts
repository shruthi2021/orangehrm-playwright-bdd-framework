import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { LoginPage } from "../../pages/login/LoginPage";
import { EmployeePage } from "../../pages/pim/EmployeePage";
import { ConfigManager } from "../../config/ConfigManager";
import { TestDataGenerator } from "../../utils/TestDataGenerator";
import { employeePersonalDetails, updatedEmployeePersonalDetails} from "../../data/test-data/EmployeePersonalDetails";
import { EmployeeService } from "../../services/pim/EmployeeService";


let loginPage: LoginPage;
let employeePage: EmployeePage;
let employeeId: string;
let updatedLicenseNumber: string;
let employeeService!: EmployeeService;

const employeeData = TestDataGenerator.generateEmployeeData();

Given("user is logged into OrangeHRM application", async function () {
  loginPage = new LoginPage(this.page);
  await this.page.goto(ConfigManager.baseURL);
  await loginPage.enterUsername(ConfigManager.username);
  await loginPage.enterPassword(ConfigManager.password!);
  await loginPage.clickLogin();
  await expect(this.page).toHaveURL(/dashboard/);
  employeePage = new EmployeePage(this.page);
  employeeService = new EmployeeService(employeePage);

});
When("user navigates to PIM module", async function () {
  await employeePage.clickPIM();
});


When("user clicks on Add Employee button", async function () {
  await employeePage.clickAddEmployee();
  await expect(this.page.getByRole("heading", { name: "Add Employee" })).toBeVisible();
});

When("user enters employee details", async function () {
  await employeePage.enterFirstName(employeeData.firstName);
  await employeePage.enterLastName(employeeData.lastName);
});

When("user uploads employee photo", async function () {
  await employeePage.uploadEmployeePhoto("D:/orangehrm-playwright-bdd-framework/src/data/images/empPhoto.png");
});

When("user enables Create Login Details option", async function () {
  await employeePage.enableLoginDetails();
});

When("user enters login credentials", async function () {
  await employeePage.enterUsername(employeeData.username);
  await employeePage.enterPassword(employeeData.password);
  await employeePage.enterConfirmPassword(employeeData.password);
});

When("user clicks on Save button", async function () {
  await employeePage.clickSave();
});

Then("employee should be added successfully", async function () {
  const toastMessage = await employeePage.getToastMessage();
  expect(toastMessage).toContain("Successfully Saved");
  await employeePage.waitForFirstNameField();
  employeeId = await employeePage.getEmployeeId();

  const actualFirstName = await employeePage.getDisplayedFirstName();
  const actualLastName = await employeePage.getDisplayedLastName();
  const actualEmployeeId = await employeePage.getDisplayedEmployeeId();

  console.log("Actual First Name:", actualFirstName);
  console.log("Actual Last Name:", actualLastName);
  console.log("Actual Employee ID:", actualEmployeeId);


  console.log("Expected First Name:", employeeData.firstName);
  console.log("Expected Last Name:", employeeData.lastName);
  console.log("Expected Employee ID:", employeeId);

  expect(actualFirstName).toBe(employeeData.firstName);
  expect(actualLastName).toBe(employeeData.lastName);
  expect(actualEmployeeId).toBe(employeeId);
});

When("user enters employee personal details", async function () {
  await employeePage.enterDriversLicenseNumber(employeePersonalDetails.drivingLicenseNumber);

  await employeePage.enterLicenseExpiryDate(employeePersonalDetails.licenseExpiryDate);
  await employeePage.selectNationality(employeePersonalDetails.nationality);
  await employeePage.selectMaritalStatus(employeePersonalDetails.maritalStatus);
  await employeePage.enterDateOfBirth(employeePersonalDetails.dateOfBirth);
  await employeePage.selectGender(employeePersonalDetails.gender);
  await employeePage.clickPersonalSave();

  await employeePage.selectBloodGroup(employeePersonalDetails.bloodGroup);
  await employeePage.clickCustomSave();

});

When("user searches employee using employee id", async function () {

    await employeePage.clickPIM();

    console.log("Searching Employee ID:", employeeId);

    await employeePage.enterEmployeeIdForSearch(employeeId);

    await employeePage.clickSearch();
    await this.page.waitForTimeout(3000);
});
Then("employee record should be displayed in search results", async function () {

    const actualEmployeeId = await employeePage.getSearchResultEmployeeId();

    console.log("Expected Employee ID:", employeeId);
    console.log("Actual Employee ID:", actualEmployeeId);

    expect(actualEmployeeId).toBe(employeeId);
});

When("user deletes the employee", async function () {
    await employeePage.deleteEmployee();
});
When("user searches employee using employee id again", async function () {
    await employeePage.enterEmployeeIdForSearch(employeeId);
});
Then("employee should not be displayed in search results", async function () {
    const employeeFound = await employeePage.isEmployeePresentInResults();
    expect(employeeFound).toBeFalsy();
});
When("user clicks edit employee icon", async function () {
    await employeePage.clickEditEmployee();
    await this.page.waitForTimeout(5000);
});

When("user updates driver license number", async function () {
    updatedLicenseNumber = updatedEmployeePersonalDetails.drivingLicenseNumber;
    await employeePage.updateDriversLicenseNumber( updatedLicenseNumber);
    await this.page.waitForTimeout(2000);
});

When("user saves employee details", async function () {
    await employeePage.clickPersonalSave();
    await this.page.waitForTimeout(2000);
});

Then("updated driver license number should be displayed", async function () {
    const actualLicenseNumber =await employeePage.getDriversLicenseNumber();
    console.log("Expected License Number:",updatedLicenseNumber  );
    console.log("Actual License Number:",actualLicenseNumber );
    expect(actualLicenseNumber).toBe(updatedLicenseNumber);
    await this.page.waitForTimeout(2000);
});

When('user creates a new employee', async function () {
this.scenarioContext.employeeData = TestDataGenerator.generateEmployeeData();
     this.scenarioContext.employeeId =await employeeService.createEmployee(this.scenarioContext.employeeData);
    console.log("Created Employee ID:", this.scenarioContext.employeeId);
     await this.page.waitForTimeout(5000);
});