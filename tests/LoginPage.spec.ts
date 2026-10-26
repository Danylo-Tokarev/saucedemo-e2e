import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test.describe('Login Page', () => {
  test('valid login redirects to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    await loginPage.goto();
    await loginPage.login(process.env.USER_NAME!,process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/inventory.html/);
  });
});
