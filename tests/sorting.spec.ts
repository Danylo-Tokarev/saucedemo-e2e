import { test, expect } from "@playwright/test";
import { InventoryPage } from "../Pages/InventoryPage";

test.describe("Inventory sorting", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test("should sort products by name A-Z", async () => {
    await inventoryPage.sortBy("az");
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test("should sort products by name Z-A", async () => {
    await inventoryPage.sortBy("za");
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test("should sort products by price low to high", async () => {
    await inventoryPage.sortBy("lohi");
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });

  test("should sort products by price high to low", async () => {
    await inventoryPage.sortBy("hilo");
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });
});
