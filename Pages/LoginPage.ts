import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly button: Locator;
    private readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.button = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');

    }

    async goto(): Promise<void> {
    await this.page.goto('/');
 }

    async login(user: string, pass: string): Promise<void>{
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.button.click();
        }

    async expectError(message: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(message);
}
}