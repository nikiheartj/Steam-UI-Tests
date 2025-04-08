import { test, expect } from "@playwright/test";
import { Steam } from "../src/page-object/steam";
import { CREDENTIAL, USERDATA } from "../src/setup/authorization";

test("Login", async ({ page }) => {
  const steam = new Steam(page);

  await steam.mainPage.openMainPage();
  await steam.mainPage.gotoLoginPage();
  await steam.loginPage.loginUser(CREDENTIAL.name, CREDENTIAL.password);

  await expect(steam.mainPage.profileName).toContainText(CREDENTIAL.name);
});

test("Add game to the bin", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "login" }).click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .fill("steamme113");
  await page.locator('input[type="password"]').click();
  await page
    .locator('input[type="password"]')
    .fill("steam.auto.tests@gmail.com1");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#account_pulldown")).toContainText(
    "steam.auto.tests"
  );

  await page.getByRole("searchbox", { name: "search" }).click();
  await page
    .getByRole("searchbox", { name: "search" })
    .fill("no rest for the wicked");
  await page.getByRole("link", { name: "Search Steam" }).locator("img").click();
  await page
    .getByRole("link", { name: "No Rest for the Wicked 18 Apr" })
    .click();
  await page.getByRole("link", { name: "Add to Cart" }).click();
  await page.getByRole("button", { name: "View My Cart" }).click();

  await expect(page.locator("#page_root")).toContainText(
    "No Rest for the Wicked"
  );
});

test("Remove game from the bin", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "login" }).click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .fill("steamme113");
  await page.locator('input[type="password"]').click();
  await page
    .locator('input[type="password"]')
    .fill("steam.auto.tests@gmail.com1");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#account_pulldown")).toContainText(
    "steam.auto.tests"
  );

  await page.getByRole("searchbox", { name: "search" }).click();
  await page
    .getByRole("searchbox", { name: "search" })
    .fill("no rest for the wicked");
  await page.getByRole("link", { name: "Search Steam" }).locator("img").click();
  await page
    .getByRole("link", { name: "No Rest for the Wicked 18 Apr" })
    .click();
  await page.getByRole("link", { name: "Add to Cart" }).click();
  await page.getByRole("button", { name: "View My Cart" }).click();

  await expect(page.locator("#page_root")).toContainText(
    "No Rest for the Wicked"
  );

  await page
    .getByRole("button", { name: "Remove No Rest for the Wicked" })
    .click();

  await expect(page.locator("#page_root")).toContainText("Your cart is empty.");
});

test("Add game to favorite", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "login" }).click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .fill("steamme113");
  await page.locator('input[type="password"]').click();
  await page
    .locator('input[type="password"]')
    .fill("steam.auto.tests@gmail.com1");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#account_pulldown")).toContainText(
    "steam.auto.tests"
  );

  await page.getByRole("searchbox", { name: "search" }).click();
  await page
    .getByRole("searchbox", { name: "search" })
    .fill("no rest for the wicked");
  await page.getByRole("link", { name: "Search Steam" }).locator("img").click();
  await page
    .getByRole("link", { name: "No Rest for the Wicked 18 Apr" })
    .click();
  await page.getByRole("link", { name: "Add to your wishlist" }).click();
  await page.getByRole("link", { name: "Wishlist (1)" }).click();

  await expect(page.locator("#StoreTemplate")).toContainText(
    "No Rest for the Wicked"
  );
});

test("Check search via category filter", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Categories" }).click();
  await page
    .getByLabel("Store Menu")
    .getByRole("link", { name: "Action", exact: true })
    .click();

  await expect(page.locator("#SaleSection_56339")).toContainText("Action");
});

test("Change language", async ({ page }) => {
  await page.goto("/");
  await page.getByText("language", { exact: true }).click();
  await page.getByRole("link", { name: "Deutsch (German)" }).click();

  await expect(page.locator("#language_pulldown")).toContainText("Sprache");
});

test("Update profile data [profile name, real name, summary] in the profile page", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "login" }).click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .fill("steamme113");
  await page.locator('input[type="password"]').click();
  await page
    .locator('input[type="password"]')
    .fill("steam.auto.tests@gmail.com1");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.locator("#account_pulldown").click();
  await page.getByRole("link", { name: "View my profile" }).click();
  await page.getByRole("link", { name: "Edit Profile", exact: true }).click();
  await page.getByRole("textbox", { name: "Profile Name" }).click();
  await page
    .getByRole("textbox", { name: "Profile Name" })
    .fill(USERDATA.profileName);
  await page.getByRole("textbox", { name: "Real Name" }).click();
  await page
    .getByRole("textbox", { name: "Real Name" })
    .fill(USERDATA.realName);
  await page.locator('textarea[name="summary"]').click();
  await page.locator('textarea[name="summary"]').fill(USERDATA.summary);
  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    await page.getByRole("textbox", { name: "Profile Name" }).inputValue()
  ).toBe(USERDATA.profileName);
  await expect(
    await page.getByRole("textbox", { name: "Real Name" }).inputValue()
  ).toBe(USERDATA.realName);
  await expect(
    await page.locator('textarea[name="summary"]').inputValue()
  ).toBe(USERDATA.summary);
});

test("Search friend by name", async ({ page }) => {
  //* needs to be finished
  await page.goto("/");
  await page.getByRole("link", { name: "login" }).click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .click();
  await page
    .locator('#responsive_page_template_content input[type="text"]')
    .fill("steamme113");
  await page.locator('input[type="password"]').click();
  await page
    .locator('input[type="password"]')
    .fill("steam.auto.tests@gmail.com1");
  await page.getByRole("button", { name: "Sign in" }).click();
});

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
//   await page.getByRole("link", { name: "login" }).click();
//   await page
//     .locator('#responsive_page_template_content input[type="text"]')
//     .click();
//   await page
//     .locator('#responsive_page_template_content input[type="text"]')
//     .fill("steamme113");
//   await page.locator('input[type="password"]').click();
//   await page
//     .locator('input[type="password"]')
//     .fill("steam.auto.tests@gmail.com1");
//   await page.getByRole("button", { name: "Sign in" }).click();

//   await expect(page.locator("#account_pulldown")).toContainText(
//     "steam.auto.tests"
//   );
// });

// test("Add game to the bin", async ({ page }) => {
//   await page.getByRole("searchbox", { name: "search" }).click();
//   await page
//     .getByRole("searchbox", { name: "search" })
//     .fill("no rest for the wicked");
//   await page.getByRole("link", { name: "Search Steam" }).locator("img").click();
//   await page
//     .getByRole("link", { name: "No Rest for the Wicked 18 Apr" })
//     .click();
//   await page.getByRole("link", { name: "Add to Cart" }).click();
//   await page.getByRole("button", { name: "View My Cart" }).click();

//   await expect(page.locator("#page_root")).toContainText(
//     "No Rest for the Wicked"
//   );
// });
