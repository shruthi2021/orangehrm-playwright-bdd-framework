
import { JobTitlePage } from "../../pages/admin/JobTitlePage";

export class JobTitleService {

    constructor(private jobTitlePage: JobTitlePage) {}

    async createJobTitle( jobTitle: string, description: string, filePath: string, note: string ): Promise<void> {

        await this.jobTitlePage.navigateToJobTitles();
        await this.jobTitlePage.clickAdd();

        await this.jobTitlePage.enterJobTitle(jobTitle);
        await this.jobTitlePage.enterDescription(description);
        await this.jobTitlePage.uploadAttachment(filePath);
        await this.jobTitlePage.enterNote(note);
        await this.jobTitlePage.clickSave();
    }
}
