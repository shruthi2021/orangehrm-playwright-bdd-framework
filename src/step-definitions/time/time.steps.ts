import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { TimePage } from "../../pages/time/TimePage";
import { CustomWorld } from "../../world/CustomWorld";

let timePage: TimePage;

When("user clicks on Time menu", async function () {
    timePage = new TimePage(this.page);
    await timePage.clickTimeMenu();
    await this.page.waitForTimeout(1000);
});

When("user searches employee using employee name in time module", async function (this: CustomWorld) {
    const fullName =  `${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    await timePage.selectEmployee(fullName);
});

When("user clicks on View button", async function () {
    await timePage.clickView();
    await this.page.waitForTimeout(1000);
});

When("user creates a new timesheet", async function () {
    await timePage.clickCreateTimesheet();
    await this.page.waitForTimeout(1000);
});

When("user submits the timesheet", async function () {
    await timePage.clickSubmit();
    await this.page.waitForTimeout(1000);
});

When("user enters approval comments {string}", async function (comment: string) {
    await timePage.enterComment(comment);
});

When("user approves the timesheet", async function () {
    await timePage.clickApprove();
    await this.page.waitForTimeout(5000);
});

Then("approved timesheet details should be displayed correctly", async function () {
expect(await timePage.isTimesheetHeadingDisplayed()).toBeTruthy();
expect(await timePage.isTimesheetApproved()).toBeTruthy();
});