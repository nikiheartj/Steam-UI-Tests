import { MainURL } from "./mainURL";
import { test } from "@playwright/test";

export class MainPage extends MainURL {
  constructor(page, language = "Deutsch (German)", accountName) {
    super(page);
    this.header = page.locator("#global_header");
    this.loginButton = page.getByRole("link", { name: "login" });
    this.languageDropdown = page.getByText("language", { exact: true });
    this.selectLanguage = page.getByRole("link", { name: `${language}` });
    this.profileDropdown = page.locator("#account_pulldown");
    this.profileName = page.locator("#account_dropdown");
    this.profileButton = page.getByRole("link", { name: "View my profile" });
    this.profileName1 = (accountName) =>
      page.getByRole("link", {
        name: `Account details: ${accountName}`,
      });
  }

  async gotoLoginPage() {
    await test.step("Go to Login page", async () => {
      await this.loginButton.click();
    });
  }

  async changeLanguage(language = "Deutsch (German)") {
    await test.step(`Change language to ${language}`, async () => {
      await this.languageDropdown.click();
      await this.selectLanguage.click();
    });
  }

  async openProfileDropdown() {
    await test.step("Go to Login page", async () => {
      await this.profileDropdown.click();
    });
  }

  async gotoProfilePage() {
    await test.step("Go to Login page", async () => {
      await this.profileDropdown.click();
      await this.profileButton.click();
    });
  }
}
