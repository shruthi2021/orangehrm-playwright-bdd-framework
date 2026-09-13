import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AdminPage } from "../../pages/admin/AdminPage";
import { EmployeeService } from "../../services/pim/EmployeeService";
import { CustomWorld } from "../../world/CustomWorld";

let adminPage: AdminPage;

When("user navigates to Admin module", async function (this: CustomWorld) {
    adminPage = new AdminPage(this.page);
    await adminPage.clickAdminMenu();
});

When("user clicks on Add button", async function () {
    await adminPage.clickAddButton();
});



When("user enters application user details", async function (this: CustomWorld) {
await adminPage.selectUserRole("Admin");
await adminPage.selectEmployee(this.scenarioContext.employeeData.firstName);
await adminPage.selectStatus("Enabled");
const uniqueUsername =`${this.scenarioContext.employeeData.username}${Date.now()}`;

this.scenarioContext.employeeData.username = uniqueUsername;
await adminPage.enterUsername(this.scenarioContext.employeeData.username);

await adminPage.enterPassword(this.scenarioContext.employeeData.password);

await adminPage.enterConfirmPassword(this.scenarioContext.employeeData.password);

});

When("user clicks on Admin Save button", async function () {
    await adminPage.clickSaveButton();
    await this.page.waitForTimeout(10000)
});

Then("application user should be created successfully", async function () {
await expect(this.page).toHaveURL(/viewSystemUsers/);
});

Then("newly created application user should be displayed in user list", async function (this: CustomWorld) {
const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
const isUserDisplayed = await adminPage.isApplicationUserDisplayed(fullName);
    expect(isUserDisplayed).toBeTruthy();
    }
);


When("user searches employees with status {string}", async function (this: CustomWorld, status: string) {
    await adminPage.selectuserStatus(status);
    await adminPage.clickSearchButton();
});

Then("only enabled employees should be displayed", async function () {
    const areAllEnabled = await adminPage.areAllEmployeesInStatus("Enabled");
    expect(areAllEnabled).toBeTruthy();
});

When("user searches employee using employee name", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    await adminPage.selectEmployee(fullName);
    await adminPage.clickSearchButton();
    await this.page.waitForTimeout(5000)
});

Then("matching employee should be displayed", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    const isDisplayed = await adminPage.isApplicationUserDisplayed(fullName);
    expect(isDisplayed).toBeTruthy();
});


