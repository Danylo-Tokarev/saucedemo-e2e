import { test, expect } from "@playwright/test";
import { InventoryPage } from "../Pages/InventoryPage";
import { LoginPage } from "../Pages/LoginPage";

test.describe("Inventory sorting", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
  });
  test("should sort products by name A-Z", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy("az");
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });
  test("should sort products by name Z-A", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy("za");
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });
  test("should sort products by price low to high", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy("lohi");
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });
  test("should sort products by price high to low", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy("hilo");
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });
});
