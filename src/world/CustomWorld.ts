import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { ScenarioContext } from "../utils/context/ScenarioContext";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    scenarioContext!: ScenarioContext;

    constructor(options: IWorldOptions) {
        super(options);
         this.scenarioContext = new ScenarioContext();
    }
}

setWorldConstructor(CustomWorld);