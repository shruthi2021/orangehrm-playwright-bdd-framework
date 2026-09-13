import { Page } from "@playwright/test";
import { BasePage } from "../basepage/BasePage";

export class EmployeePage extends BasePage {


constructor(page: Page) {
    super(page);
}

private pimMenu = this.page.getByRole("link", { name: "PIM" });
private addEmployeeButton = this.page.getByRole("button", { name: "Add" });
private firstNameTextbox = this.page.getByPlaceholder("First Name");
private lastNameTextbox = this.page.getByPlaceholder("Last Name");
private employeePhotoUpload = this.page.locator('input[type="file"]');
private createLoginDetailsToggle = this.page.locator('span.oxd-switch-input');
private usernameTextbox = this.page.locator('input').nth(7);
private passwordTextbox = this.page.locator('input[type="password"]').first();
private confirmPasswordTextbox = this.page.locator('input[type="password"]').last();
private saveButton = this.page.getByRole("button", { name: "Save" });
private successToastMessage = this.page.locator(".oxd-toast--success");
private employeeIdTextbox = this.page.locator('.oxd-input--active').nth(4)
private personalDetailsEmployeeId = this.page.getByRole('textbox').nth(4)

private driversLicenseTextbox = this.page.locator(".oxd-input").nth(6);
    private licenseExpiryDateTextbox = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
    private nationalityDropdown = this.page.locator(".oxd-select-text-input").first()
    private maritalStatusDropdown = this.page.locator(".oxd-select-text-input").nth(1);
    private dateOfBirthTextbox = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1);
    private personalDetailsSaveButton = this.page.getByRole('button', { name: 'Save' }).first();
    private bloodGroupDropdown = this.page.locator(".oxd-select-text-input").nth(2)
    private customFieldsSaveButton = this.page.getByRole('button', { name: 'Save' }).last();

private employeeIdSearchTextbox =  this.page.locator('.oxd-input').nth(1);
private searchButton =  this.page.getByRole('button', { name: 'Search' });
private searchResultEmployeeId = this.page.locator('.oxd-table-card [role="cell"]').nth(1);

private deleteIcon =this.page.locator(".oxd-icon.bi-trash").first();
private confirmDeleteButton =this.page.getByRole("button", {name: "Yes, Delete"});
private searchResultRows = this.page.locator(".oxd-table-card");

private editEmployeeIcon = this.page.locator(".oxd-icon.bi-pencil-fill").first();



async clickPIM() {
    await this.pimMenu.click();
}

async clickAddEmployee() {
    await this.addEmployeeButton.click();
}

async enterFirstName(firstName: string) {
    await this.firstNameTextbox.fill(firstName);
}
async enterLastName(lastName: string) {
    await this.lastNameTextbox.fill(lastName);
}

async uploadEmployeePhoto(filePath: string) {
    await this.employeePhotoUpload.setInputFiles(filePath);
}

async enableLoginDetails() {
    await this.createLoginDetailsToggle.click();
}
async enterUsername(username: string) {
    await this.usernameTextbox.fill(username);
}

async enterPassword(password: string) {
    await this.passwordTextbox.fill(password);
}

async enterConfirmPassword(password: string) {
    await this.confirmPasswordTextbox.fill(password);
}

async clickSave() {
    await this.saveButton.click();
}
async waitForSuccessToast() {
    await this.waitForVisible(this.successToastMessage);
}
async getToastMessage(): Promise<string | null> {
    return await this.successToastMessage.textContent();
}

async getEmployeeId(): Promise<string> {
const value =await this.employeeIdTextbox.inputValue();
    console.log("Employee ID Field Value:", value);
    return value.trim();
}

async getDisplayedFirstName(): Promise<string> {
    return (await this.firstNameTextbox.inputValue()).trim();
}

async getDisplayedLastName(): Promise<string> {
    return (await this.lastNameTextbox.inputValue()).trim();
}

async getDisplayedEmployeeId(): Promise<string> {
    return (await this.personalDetailsEmployeeId.inputValue()).trim();
}

async waitForFirstNameField() {
    await this.firstNameTextbox.waitFor({state: "visible"});
}

 async enterDriversLicenseNumber(value: string) {
        await this.driversLicenseTextbox.fill(value);
    }
 async enterLicenseExpiryDate(value: string) {
        await this.licenseExpiryDateTextbox.fill(value);
    }
    async enterDateOfBirth(value: string) {
        await this.dateOfBirthTextbox.fill(value);
    }
 async selectNationality(value: string) {
        await this.nationalityDropdown.click();
        await this.page.getByRole('option', { name: value }).click();
    }
async selectMaritalStatus(value: string) {
        await this.maritalStatusDropdown.click();
        await this.page.getByRole('option', { name: value }).click();
    }

async selectGender(gender: string) {
        const value = gender.toLowerCase() === "male" ? "1" : "2";
        await this.page.locator(`input[type="radio"][value="${value}"]`).click({ force: true });
    }

async selectBloodGroup(value: string) {
        await this.bloodGroupDropdown.click();
        await this.page.getByRole('option', { name: value }).click();
    }
 async clickPersonalSave() {
        await this.personalDetailsSaveButton.click();
    }
    async clickCustomSave() {
        await this.customFieldsSaveButton.click();
    }

    async enterEmployeeIdForSearch(employeeId: string) {
    await this.employeeIdSearchTextbox.fill(employeeId);
}

async clickSearch() {
    await this.searchButton.click();
}

async getSearchResultEmployeeId(): Promise<string> {
    return (await this.searchResultEmployeeId.textContent())?.trim() ?? "";
}

async clickDeleteIcon() {
    await this.deleteIcon.click();
}
async clickConfirmDelete() {
    await this.confirmDeleteButton.click();
}
async deleteEmployee() {
    await this.clickDeleteIcon();
    await this.clickConfirmDelete();
    await this.page.waitForTimeout(2000)
}
async isEmployeePresentInResults(): Promise<boolean> {
    const count =await this.searchResultRows.count();
    return count > 0;
}
async clickEditEmployee() {
    await this.editEmployeeIcon.click();
}
async updateDriversLicenseNumber(value: string) {
    await this.driversLicenseTextbox.clear();
    await this.driversLicenseTextbox.fill(value);
}

async getDriversLicenseNumber(): Promise<string> {
  await this.driversLicenseTextbox.waitFor({state: "visible"});
    await this.page.waitForTimeout(2000);
    return await this.driversLicenseTextbox.inputValue();
}

}
