import { VacancyPage } from "../../pages/recruit/VacancyPage";

export class VacancyService {

    constructor(private vacancyPage: VacancyPage) {}

    async createVacancy(vacancyName: string, jobTitle: string, description: string, hiringManager: string, numberOfPositions: string): Promise<void> {
        await this.vacancyPage.clickAdd();
        await this.vacancyPage.enterVacancyName(vacancyName);
        await this.vacancyPage.selectJobTitle(jobTitle);
        await this.vacancyPage.enterDescription(description);
        await this.vacancyPage.selectHiringManager(hiringManager);
        await this.vacancyPage.enterNumberOfPositions(numberOfPositions);
        await this.vacancyPage.clickSave();
    }
}
