import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../world/CustomWorld";
import { LeavePage } from "../../pages/leave/leavePage";

let leavePage: LeavePage;

When("user navigates to Add Leave Entitlements page", async function (this: CustomWorld) {
    leavePage = new LeavePage(this.page);

    await leavePage.clickLeaveMenu();
    await leavePage.navigateToAddEntitlements();
});

When("user adds leave entitlement", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;

    await leavePage.selectEmployee(fullName);
    await leavePage.selectLeaveType("CAN - Bereavement");
    await leavePage.enterEntitlement("10");
    await leavePage.clickSave();
    await leavePage.clickConfirm();
    await this.page.waitForTimeout(5000);
});


When("user navigates to Assign Leave page", async function () {
    await leavePage.clickLeaveMenu();
    await leavePage.navigateToAssignLeave();
});

When("user assigns leave", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;

    await leavePage.selectEmployee(fullName);
    await leavePage.selectLeaveType("CAN - Bereavement");
    await leavePage.selectFromDate("20");
    await leavePage.enterComment("Leave assigned through automation");
    await leavePage.clickAssign();
    await this.page.waitForTimeout(5000);
});

When("user navigates to Leave List page", async function () {
    await leavePage.clickLeaveMenu();
    await leavePage.navigateToLeaveList();
});

When("user searches assigned leave using employee name", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    await leavePage.selectEmployee(fullName);
});

When("user searches assigned leave using status {string}", async function (status: string) {
    await leavePage.selectLeaveStatus(status);
    await this.page.waitForTimeout(5000);
});

When("user searches assigned leave using leave type {string}", async function (leaveType: string) {
    await leavePage.selectLeaveTypeForSearch(leaveType);
    await leavePage.clickSearch();
    await this.page.waitForTimeout(5000);
});

Then("assigned leave details should be displayed correctly", async function (this: CustomWorld) {
    const fullName = `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    console.log("Expected Employee:", fullName);
    const isDisplayed = await leavePage.isEmployeeDisplayed(fullName);

    console.log("Employee Displayed:", isDisplayed);
    expect(await leavePage.isEmployeeDisplayed(fullName)).toBeTruthy();
    expect(await leavePage.getLeaveType()).toBe("CAN - Bereavement");
    expect(await leavePage.getStatus()).toContain("Scheduled");
});