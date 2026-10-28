import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly itemName: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectItemName(name: string): Promise<void> {
    await expect(this.itemName).toHaveText(name);
  }

  async checkout(): Promise<void> {
    await this.checkoutBtn.click();
  }
}