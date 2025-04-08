import { LoginPage, MainPage } from "./index";

export class Steam {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginPage = new LoginPage(page);
  }
}
