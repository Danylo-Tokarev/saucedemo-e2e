import { test } from "@playwright/test";
import { InventoryPage } from "../Pages/InventoryPage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";

test.describe("Checkout", () => {
  test("user completes a purchase end-to-end", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.goto();

    await inventoryPage.addItem("sauce-labs-backpack");
    await inventoryPage.expectCartCount(1);
    await inventoryPage.goToCart();

    await cartPage.expectItemCount(1);
    await cartPage.expectItemName("Sauce Labs Backpack");

    await cartPage.checkout();
    await checkoutPage.fillCheckoutInformation("Danylo", "Tokarev", "61055");
    await checkoutPage.finishCheckout();
    await checkoutPage.expectCheckoutComplete();
  });
});
