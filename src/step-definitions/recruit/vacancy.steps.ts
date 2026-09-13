
import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../world/CustomWorld";
import { VacancyPage } from "../../pages/recruit/VacancyPage";
import { VacancyService } from "../../services/recruit/VacancyService";
import { JobTitlePage } from "../../pages/admin/JobTitlePage";
import { JobTitleService } from "../../services/recruit/JobTitleService";

let vacancyPage: VacancyPage;
let vacancyService: VacancyService;

let jobTitlePage: JobTitlePage;
let jobTitleService: JobTitleService;

Given("user creates a job title", async function (this: CustomWorld) {

    jobTitlePage = new JobTitlePage(this.page);
    jobTitleService = new JobTitleService(jobTitlePage);

    const jobTitle = `Automation Tester ${Date.now()}`;
    const description = "Description is -------------";
    const filePath = "src/data/test-data/Job Description.txt";
    const note = "add note here";

    await jobTitleService.createJobTitle(jobTitle,description,filePath,note);

    this.scenarioContext.jobTitle = jobTitle;
    const toast = await jobTitlePage.getSuccessToast();
    console.log("Job Title creation toast:", toast);
    expect(toast).toBe("Successfully Saved");
});

When("user navigates to Vacancies page", async function (this: CustomWorld) {
    vacancyPage = new VacancyPage(this.page);
    vacancyService = new VacancyService(vacancyPage);
    await vacancyPage.clickVacanciesTab();
});

When("user creates a new vacancy", async function (this: CustomWorld) {
    const vacancyName = `Automation Vacancy ${Date.now()}`;
    const jobTitle = this.scenarioContext.jobTitle;
    const employeeName =`${this.scenarioContext.employeeData.firstName} ${this.scenarioContext.employeeData.lastName}`;
    const description = "Test vacancy description";
    const numberOfPositions = "10";

    await vacancyService.createVacancy(vacancyName,jobTitle,description,employeeName,numberOfPositions);
    this.scenarioContext.vacancyName = vacancyName;
});

Then("newly created vacancy should be displayed in the vacancy list",async function (this: CustomWorld) {
        await vacancyPage.navigateToVacancies();
        const vacancyName = this.scenarioContext.vacancyName;
        const row = await vacancyPage.getVacancyRow(vacancyName);
        expect(row).toContain(vacancyName);
    }
);
