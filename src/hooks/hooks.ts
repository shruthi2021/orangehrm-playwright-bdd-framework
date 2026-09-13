import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
setDefaultTimeout(60000);

Before(async function () {

    this.browser = await chromium.launch({
        headless: false
    });

     this.context = await  this.browser.newContext();

     this.page = await  this.context.newPage();

});

After(async function () {

    await  this.page.close();

    await  this.context.close();

    await  this.browser.close();

});