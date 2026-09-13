import { BasePage } from "../basepage/BasePage";
import { Page } from "@playwright/test";

export class TimePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
    private timeMenu = this.page.getByRole("link", { name: "Time", exact: true });
    private employeeTextbox = this.page.getByRole("textbox", { name: "Type for hints..." });
    private viewButton = this.page.locator("form").getByRole("button", { name: "View" });
    private createTimesheetButton = this.page.getByRole("button", { name: "Create Timesheet" });
    private submitButton = this.page.getByRole("button", { name: "Submit" });
    private commentTextbox = this.page.getByRole("textbox", { name: "Type here" });
    private approveButton = this.page.getByRole("button", { name: "Approve" });
    private timesheetHeading = this.page.getByText("Timesheet for");
    private timesheetStatus = this.page.locator("text=Status: Approved");

    async clickTimeMenu() {
        await this.click(this.timeMenu);
    }

    async selectEmployee(employeeName: string) {
        await this.fill(this.employeeTextbox, employeeName);
        const suggestion = this.page.getByRole("option").getByText(employeeName);
        await suggestion.click();
    }

    async clickView() {
        await this.click(this.viewButton);
    }

    async clickCreateTimesheet() {
        await this.click(this.createTimesheetButton);
    }

    async clickSubmit() {
        await this.click(this.submitButton);
    }
    async enterComment(comment: string) {
        await this.fill(this.commentTextbox, comment);
    }

    async clickApprove() {
        await this.click(this.approveButton);
    }

    async isTimesheetApproved(): Promise<boolean> {
        return await this.timesheetStatus.isVisible();
    }
    async isTimesheetHeadingDisplayed(): Promise<boolean> {
        return await this.timesheetHeading.isVisible();
    }
}