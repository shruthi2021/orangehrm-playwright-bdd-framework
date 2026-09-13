import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ConfigManager } from "../../config/ConfigManager";

let loginPage: LoginPage;

Given("user is on login page", async function()
{
await this.page.goto(ConfigManager.baseURL, { waitUntil: "load", timeout: 60000 });
this.loginPage = new LoginPage(this.page);

})
When("user enters valid username and password", async function()
{
    console.log("USERNAME:", ConfigManager.username);
    console.log("PASSWORD:", ConfigManager.password);
    await this.loginPage.enterUsername(ConfigManager.username);
    await this.loginPage.enterPassword(ConfigManager.password);

})
When("user clicks on login button", async function()
{
 await this.loginPage.clickLogin();

})
Then("user should be navigated to dashboard page", async function()
{
  await expect(this.page).toHaveURL(/dashboard/);
})

