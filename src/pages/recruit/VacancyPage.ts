
import { Page } from "@playwright/test";
import { BasePage } from "../basepage/BasePage";

export class VacancyPage extends BasePage {

     constructor(page: Page) {
        super(page);
    }

    private recruitmentMenu = this.page.getByRole("link", { name: "Recruitment" });
    private vacanciesTab = this.page.getByRole("link", { name: "Vacancies" });
    private addButton = this.page.getByRole("button", { name: "Add" });
    private vacancyNameTextbox = this.page.getByRole("textbox").nth(1);
    private jobTitleDropdown = this.page.locator("form i");
    private descriptionTextbox = this.page.getByRole("textbox", {name: "Type description here"});
    private hiringManagerTextbox = this.page.getByRole("textbox", {name: "Type for hints..."});
    private numberOfPositionsTextbox = this.page.getByRole("textbox").nth(4);
    private saveButton = this.page.locator('button[type="submit"]');

   async navigateToVacancies(): Promise<void> {
    await this.click(this.vacanciesTab);
  }

    async clickVacanciesTab() {
        await this.click(this.recruitmentMenu);
    await this.page.getByRole("link", { name: "Vacancies" }).waitFor();
        await this.click(this.vacanciesTab);
    }

    async clickAdd(): Promise<void> {
    await this.click(this.addButton);
}

    async enterVacancyName(vacancyName: string) {
        await this.fill(this.vacancyNameTextbox, vacancyName);
    }

    async selectJobTitle(jobTitle: string) {
        await this.click(this.jobTitleDropdown);
    console.log("Job Title we are looking for:", jobTitle);
        const jobTitleOption = this.page.getByRole("option", { name: jobTitle,  exact: true });
        await this.click(jobTitleOption);
    }

    async enterDescription(description: string) {
        await this.fill(this.descriptionTextbox, description);
    }

    async selectHiringManager(employeeName: string) {
        await this.fill(this.hiringManagerTextbox, employeeName);
        const employeeOption = this.page.getByRole("option", {name: employeeName});
        await this.click(employeeOption);
    }

    async enterNumberOfPositions(numberOfPositions: string) {
        await this.fill(this.numberOfPositionsTextbox, numberOfPositions);
    }

    async clickSave() {
         await this.saveButton.click({ force: true });
           await this.page.waitForTimeout(2000);
       await this.saveButton.click({ force: true });    
         await this.page.waitForTimeout(2000);
    }

    async getVacancyRow(vacancyName: string): Promise<string> {
        const row = this.page.getByRole("row", {name: new RegExp(vacancyName)});
    const rows = await this.page.getByRole("row").allTextContents();
      await this.page.waitForTimeout(1000);
    console.log("Vacancy we are looking for:", vacancyName);
        return (await row.textContent())?.trim() ?? "";
    }
}
