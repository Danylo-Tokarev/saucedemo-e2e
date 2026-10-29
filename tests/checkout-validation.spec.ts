import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { CartPage } from "../Pages/CartPage";
import { InventoryPage } from "../Pages/InventoryPage";
import { CheckoutPage } from "../Pages/CheckoutPage";

interface CheckoutCase {
  desc: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  error: string;
}
const checkoutCases: CheckoutCase[] = [
  {
    desc: "empty first name",
    firstName: "",
    lastName: "Tokarev",
    postalCode: "12345",
    error: "Error: First Name is required",
  },
  {
    desc: "empty last name",
    firstName: "Danylo",
    lastName: "",
    postalCode: "12345",
    error: "Error: Last Name is required",
  },
  {
    desc: "empty postal code",
    firstName: "Danylo",
    lastName: "Tokarev",
    postalCode: "",
    error: "Error: Postal Code is required",
  },
];

test.describe("Checkout validation", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
    await inventoryPage.addItem("sauce-labs-backpack");
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });
  for (const testCase of checkoutCases) {
    test(testCase.desc, async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillCheckoutInformation(
        testCase.firstName,
        testCase.lastName,
        testCase.postalCode,
      );
      await checkoutPage.expectErrorMessage(testCase.error);
    });
  }
});
