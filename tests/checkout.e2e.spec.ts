import { test } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { InventoryPage } from "../Pages/InventoryPage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";

const USER = process.env.USER_NAME!;
const PASS = process.env.USER_PASSWORD!;

test.describe("Checkout", () => {
  test("user completes a purchase end-to-end", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(USER, PASS);

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
