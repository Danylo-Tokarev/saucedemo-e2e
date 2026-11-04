import { test as setup } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
  await page.waitForURL(/inventory.html/);
  await page.context().storageState({ path: authFile });
});
