import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueBtn: Locator;
  private readonly finishBtn: Locator;
  private readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("[data-test='firstName']");
    this.lastName = page.locator("[data-test='lastName']");
    this.postalCode = page.locator("[data-test='postalCode']");
    this.continueBtn = page.locator("[data-test='continue']");
    this.finishBtn = page.locator("[data-test='finish']");
    this.completeHeader = page.locator("[data-test='complete-header']");
  }
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueBtn.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishBtn.click();
  }

  async expectCheckoutComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
  }
}
