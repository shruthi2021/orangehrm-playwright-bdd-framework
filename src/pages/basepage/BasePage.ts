import { Locator, Page, expect } from '@playwright/test'

export class BasePage
{
    constructor(protected page  : Page) {}

     async click(locator: Locator): Promise<void> {
        await locator.click();
    }

 async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }
 async clear(locator: Locator): Promise<void> {
        await locator.clear();
    }
 async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? "";
    }
  async hover(locator: Locator): Promise<void> {
        await locator.hover();
    }
async doubleClick(locator: Locator): Promise<void> {
        await locator.dblclick();
    }
async rightClick(locator: Locator): Promise<void> {
        await locator.click({ button: "right" });
    }
   async check(locator: Locator): Promise<void> {
        await locator.check();
    }
 async uncheck(locator: Locator): Promise<void> {
        await locator.uncheck();
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
 async isEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    async selectByText(locator: Locator, text: string): Promise<void> {
        await locator.selectOption({ label: text });
    }
async selectByValue(locator: Locator, value: string): Promise<void> {
        await locator.selectOption(value);
    }
async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }
 async waitForVisible(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "visible" });
    }

    async waitForHidden(locator: Locator): Promise<void> {
        await locator.waitFor({ state: "hidden" });
    }

    async verifyText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async verifyTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

}