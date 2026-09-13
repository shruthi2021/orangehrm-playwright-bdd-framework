import { BasePage } from "../basepage/BasePage";
import { Page } from "@playwright/test";

export class JobTitlePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Navigation
    private adminMenu = this.page.getByRole("link", { name: "Admin" });
    private jobMenu = this.page.getByRole("listitem").filter({ hasText: "Job" });
    private jobTitlesMenu = this.page.getByRole("listitem").filter({ hasText: /^Job Titles$/ });

    // Job Title Form
    private addButton = this.page.getByRole("button", { name: "Add" });
    private jobTitleTextbox = this.page.getByRole("textbox").nth(1);
    private descriptionTextbox = this.page.getByRole("textbox", {name: "Type description here"});
    private browseButton = this.page.getByText("Browse");
    private fileInput = this.page.getByRole("button", { name: "Choose File" });
    private noteTextbox = this.page.getByRole("textbox", {name: "Add note"
    });

    // Buttons
    private saveButton = this.page.getByRole("button", { name: "Save" });

    // Validation
     private successToast = this.page.getByText("Successfully Saved", { exact: true });

    // Navigation

    async navigateToJobTitles(): Promise<void> {
        await this.click(this.adminMenu);
        await this.click(this.jobMenu);
        await this.click(this.jobTitlesMenu);
    }

    // Create Job Title

    async clickAdd(): Promise<void> {
        await this.click(this.addButton);
    }

    async enterJobTitle(jobTitle: string): Promise<void> {
        await this.fill(this.jobTitleTextbox, jobTitle);
    }

    async enterDescription(description: string): Promise<void> {
        await this.fill(this.descriptionTextbox, description);
    }

    async uploadAttachment(filePath: string): Promise<void> {
       // await this.click(this.browseButton);
        await this.fileInput.setInputFiles(filePath);
    }

    async enterNote(note: string): Promise<void> {
        await this.fill(this.noteTextbox, note);
    }

    async clickSave(): Promise<void> {
        await this.click(this.saveButton);
    }

    // Data retrieval for validation

    async getSuccessToast(): Promise<string> {
        return (await this.successToast.textContent())?.trim() ?? "";
    }

    async getJobTitleRow(jobTitle: string): Promise<string> {
        const row = this.page.getByRole("row", { name: new RegExp(jobTitle)});
        return (await row.textContent())?.trim() ?? "";
    }
}
