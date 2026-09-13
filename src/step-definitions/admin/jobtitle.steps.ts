
import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../world/CustomWorld";
import { JobTitlePage } from "../../pages/admin/JobTitlePage";
import { JobTitleService } from "../../services/recruit/JobTitleService";

let jobTitlePage: JobTitlePage;
let jobTitleService: JobTitleService;

When("user navigates to Job Titles page", async function (this: CustomWorld) {
        jobTitlePage = new JobTitlePage(this.page);
        jobTitleService = new JobTitleService(jobTitlePage);
        await jobTitlePage.navigateToJobTitles();
    }
);

When("user creates a new job title with description and attachment", async function (this: CustomWorld) {
        const jobTitle =  `Automation Tester ${Date.now()}`
        const description = "Description is -------------";
        const filePath = "src/data/test-data/Job Description.txt";
        const note = "add note here";
        await jobTitleService.createJobTitle(jobTitle, description, filePath, note);
     this.scenarioContext.jobTitle = jobTitle;
    }
);

Then("job title should be created successfully",async function (this: CustomWorld) {
        const toast = await jobTitlePage.getSuccessToast();
        expect(toast).toContain("Successfully Saved");
    }
);

Then("created job title details should be displayed in the job title list",async function (this: CustomWorld) {
        const  jobTitle = this.scenarioContext.jobTitle
        const row = await jobTitlePage.getJobTitleRow(jobTitle);
        expect(row).toContain(jobTitle);   
    }
);
