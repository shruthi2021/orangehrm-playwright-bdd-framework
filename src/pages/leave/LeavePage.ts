
import { BasePage } from "../basepage/BasePage";
import { Page} from "@playwright/test";

export class LeavePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Leave Menu
    private leaveMenu = this.page.getByRole("link", { name: "Leave", exact: true });

    // Leave Entitlements
    private entitlementsMenu = this.page.getByText("Entitlements");
    private addEntitlementsMenu = this.page.getByRole("menuitem", { name: "Add Entitlements" });

    // Assign Leave
    private assignLeaveMenu = this.page.getByRole("link", { name: "Assign Leave" });

    // Leave List
    private leaveListMenu = this.page.getByRole("link", { name: "Leave List" });

    // Employee Name
    private employeeNameTextbox = this.page.getByRole("textbox", { name: "Type for hints..." });

    // Dropdowns
    private leaveTypeDropdown = this.page.locator(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first();
    private leaveTypeSearchDropdown = this.page.locator(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").nth(1);

    // Entitlement
    private entitlementTextbox = this.page.getByRole("textbox").nth(2);

    // Date Pickers
    private fromDateCalendar = this.page.locator(".oxd-icon.bi-calendar").first();
    private toDateCalendar = this.page.locator(".oxd-icon.bi-calendar").nth(1);

    // Comment
    private commentTextbox = this.page.locator("textarea");

    // Buttons
    private saveButton = this.page.getByRole("button", { name: "Save" });
    private confirmButton = this.page.getByRole("button", { name: "Confirm" });
    private assignButton = this.page.getByRole("button", { name: "Assign" });
    private searchButton = this.page.getByRole("button", { name: "Search" });

    // Table Columns
    private employeeNameColumn = this.page.locator("div.oxd-table-body div[role='row'] div:nth-child(3)");
    private leaveTypeColumn = this.page.locator("div.oxd-table-body div[role='row'] div:nth-child(4)");
    private statusColumn = this.page.locator("div.oxd-table-body div[role='row'] div:nth-child(7)");
    private leaveStatusDropdown = this.page.locator(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").nth(0);

    // Leave Module
async clickLeaveMenu(): Promise<void> {
    await this.click(this.leaveMenu);
}

async navigateToAddEntitlements(): Promise<void> {
    await this.click(this.entitlementsMenu);
    await this.click(this.addEntitlementsMenu);
}

async selectEmployee(employeeName: string): Promise<void> {
    await this.fill(this.employeeNameTextbox, employeeName);
    await this.page.waitForTimeout(1000);

    const suggestion = this.page
        .getByRole("option")
        .getByText(employeeName);

    await suggestion.waitFor({ state: "visible" });
    await suggestion.click();
}
async selectDropdown(dropdown: any, value: string): Promise<void> {
    await this.click(dropdown);
    await this.page.getByRole("option", { name: value }).click();
}
async selectLeaveType(leaveType: string): Promise<void> {
    await this.selectDropdown(this.leaveTypeDropdown, leaveType);
}

async enterEntitlement(entitlement: string): Promise<void> {
    await this.fill(this.entitlementTextbox, entitlement);
}

async clickSave(): Promise<void> {
    await this.click(this.saveButton);
}

async clickConfirm(): Promise<void> {
    await this.click(this.confirmButton);
}
async navigateToAssignLeave(): Promise<void> {
    await this.click(this.assignLeaveMenu);
}

async selectFromDate(day: string): Promise<void> {
    await this.click(this.fromDateCalendar);
    await this.page.getByText(day, { exact: true }).click();
}

async selectToDate(day: string): Promise<void> {
    await this.click(this.toDateCalendar);
    await this.page.getByText(day, { exact: true }).click();
}

async enterComment(comment: string): Promise<void> {
    await this.fill(this.commentTextbox, comment);
}

async clickAssign(): Promise<void> {
    await this.click(this.assignButton);
}

async navigateToLeaveList(): Promise<void> {
    await this.click(this.leaveListMenu);
}

async selectLeaveStatus(status: string): Promise<void> {
    await this.selectDropdown(this.leaveStatusDropdown, status);
}

async selectLeaveTypeForSearch(leaveType: string): Promise<void> {
    await this.selectDropdown(this.leaveTypeSearchDropdown, leaveType);
}

async clickSearch(): Promise<void> {
    await this.click(this.searchButton);
}

async isEmployeeDisplayed(employeeName: string): Promise<boolean> {
    return await this.employeeNameColumn
        .getByText(employeeName)
        .isVisible();
}

async getLeaveType(): Promise<string> {
    return (await this.leaveTypeColumn.textContent())?.trim() ?? "";
}

async getStatus(): Promise<string> {
    return (await this.statusColumn.textContent())?.trim() ?? "";
}



}