import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basepage/BasePage";

export class LoginPage extends BasePage{
   
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameTextbox = page.locator('input[name="username"]');
        this.passwordTextbox = page.locator('input[name="password"]');
      this.loginButton = page.locator('button[type="submit"]');
    }

     async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameTextbox, username);
    }

     async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordTextbox, password);
    }

     async clickLogin(): Promise<void> {
        await this.click(this.loginButton);
    }
  async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

}