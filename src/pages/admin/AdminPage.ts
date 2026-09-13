import { Page } from "@playwright/test";
import { BasePage } from "../basepage/BasePage";

export class AdminPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

     private adminMenu = this.page.getByRole("link", { name: "Admin" });
    private addButton = this.page.getByRole("button", { name: /Add/ });

    private userRoleDropdown = this.page.getByText("-- Select --").first();
    private statusDropdown = this.page.locator("div").filter({ hasText: /^-- Select --$/ }).nth(2);

    private employeeNameTextbox = this.page.getByRole("textbox", { name: "Type for hints..." });
    private usernameTextbox = this.page.getByRole("textbox").nth(2);
    private passwordTextbox = this.page.getByRole("textbox").nth(3);
    private confirmPasswordTextbox = this.page.getByRole("textbox").nth(4);
    private saveButton = this.page.getByRole("button", { name: "Save" });
     private employeeNameCells = this.page.locator("div.oxd-table-body div[role='row'] div:nth-child(4)");
    private statusCells = this.page.locator("div.oxd-table-body div[role='row'] div:nth-child(5)");
    private searchButton = this.page.getByRole("button", { name: "Search" });
    private userstatusDropdown = this.page.getByText("-- Select --").last();

     async clickAdminMenu(): Promise<void> {
        await this.click(this.adminMenu);
    }

    async clickAddButton(): Promise<void> {
        await this.click(this.addButton);
    }
     async selectDropdown(dropdown: any, value: string): Promise<void> {
        await this.click(dropdown);
        await this.page.getByRole("option", { name: value }).click();
    }

    async selectUserRole(role: string): Promise<void> {
        await this.selectDropdown(this.userRoleDropdown, role);
    }

    async selectStatus(status: string): Promise<void> {
        await this.selectDropdown(this.statusDropdown, status);
    }

    // async selectEmployee(employeeName: string): Promise<void> {
    //     await this.fill(this.employeeNameTextbox, employeeName);
    //     const suggestion = this.page.getByText(employeeName);
    //     await suggestion.waitFor({ state: "visible" });
    //     await this.page.getByText(employeeName).click();
    // }

       async selectEmployee(employeeName: string): Promise<void> {
        await this.fill(this.employeeNameTextbox, employeeName);
        await this.page.waitForTimeout(2000);
        console.log("Employee Name:", employeeName);
        const suggestion = this.page.getByRole("option").getByText(employeeName);;
        await suggestion.waitFor({ state: "visible" });
       await suggestion.click(); 
    }
        async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameTextbox, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordTextbox, password);
    }

    async enterConfirmPassword(password: string): Promise<void> {
        await this.fill(this.confirmPasswordTextbox, password);
    }

    async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton);
    }

    async isApplicationUserDisplayed(employeeName: string): Promise<boolean> {
 const rowCount = await this.employeeNameCells.count();
    for (let i = 0; i < rowCount; i++) {
        const text = await this.employeeNameCells.nth(i).textContent();
        if (text?.trim() === employeeName) {
            return true;
        }
    }
    return false;
}
async clickSearchButton(): Promise<void> {
    await this.click(this.searchButton);
await this.page.waitForTimeout(5000);
}

async areAllEmployeesInStatus(status: string): Promise<boolean> {
    const rowCount = await this.statusCells.count();

    for (let i = 0; i < rowCount; i++) {
        const text = await this.statusCells.nth(i).textContent();
        if (text?.trim() !== status) {
            return false;
        }
    }
    return true;
}
async selectuserStatus(status: string): Promise<void> {
        await this.selectDropdown(this.userstatusDropdown, status);
    }

}