import { MainURL } from "./index";
import { test } from "@playwright/test";

export class LoginPage extends MainURL {
  constructor(page) {
    super(page);
    this.signInInput = page.locator(
      '#responsive_page_template_content input[type="text"]'
    );
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async loginUser(accountName, password) {
    await test.step("Login to the account", async () => {
      await this.signInInput.click();
      await this.signInInput.fill(accountName);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await this.signInButton.click();
    });
  }
}
