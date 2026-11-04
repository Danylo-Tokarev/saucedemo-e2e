# SauceDemo — E2E Automation

[![Playwright Tests](https://github.com/Danylo-Tokarev/saucedemo-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/Danylo-Tokarev/saucedemo-e2e/actions/workflows/playwright.yml)

End-to-end UI test automation for the **[SauceDemo](https://www.saucedemo.com)** web application,
built with **Playwright + TypeScript** on the **Page Object Model**.
Runs **cross-browser** (Chromium, Firefox, WebKit) and in **CI on every push and pull request**,
with authentication reused across tests via **`storageState`**.

---

## Tech stack

- **Playwright** (`@playwright/test`) — test runner & browser automation
- **TypeScript** — typed page objects, interfaces for test data
- **Page Object Model** — reusable, maintainable page classes
- **dotenv** — environment-based configuration
- **GitHub Actions** — CI pipeline, HTML report as an artifact

---

## What's covered

| Area | Scenarios |
|------|-----------|
| **Authentication** | Valid login → inventory; **data-driven** negative login (empty username / password, wrong credentials, locked-out user) |
| **Checkout (e2e)** | Full purchase critical path: login → add to cart → cart → checkout (customer details) → order confirmation |
| **Checkout validation** | **Data-driven** negative cases: missing first name / last name / postal code |
| **Product sorting** | Name (A→Z, Z→A) and price (low→high, high→low), verified against a computed sorted order (no hardcoded lists) |

All scenarios run across **Chromium, Firefox and WebKit**.

---

## Key practices demonstrated

- **Page Object Model** — locators and actions encapsulated in `Pages/` classes; specs read as plain scenarios
- **TypeScript** — typed locators (`Locator`), typed test-data via `interface`, `Promise<void>` method signatures
- **Data-driven testing** — a single typed dataset generates many test cases (negative login, checkout validation)
- **Authentication via `storageState`** — a dedicated **setup project** logs in once and saves the session to `playwright/.auth/user.json`; every other test starts already authenticated, while login tests opt out to test the login flow from scratch
- **Web-first assertions** — auto-waiting (`toHaveText`, `toHaveCount`, `toEqual`) instead of hard waits
- **Cross-browser execution** — Chromium / Firefox / WebKit
- **Environment-based config** — credentials via `.env` locally and GitHub Secrets in CI; no secrets in the repo
- **CI integration** — tests run automatically on push / PR, HTML report uploaded as an artifact

---

## Project structure

```
saucedemo-e2e/
├── Pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── auth.setup.ts                # logs in once, saves the session
│   ├── LoginPage.spec.ts            # valid login
│   ├── InvalidLogs.spec.ts          # data-driven negative login
│   ├── checkout.e2e.spec.ts         # full critical path
│   ├── checkout-validation.spec.ts  # data-driven form validation
│   └── sorting.spec.ts              # name & price sorting
├── .github/workflows/
│   └── playwright.yml               # CI pipeline
├── playwright.config.ts
├── .env                             # local config (gitignored)
└── package.json
```

---

## Getting started

### Prerequisites
- Node.js (LTS) and npm

### Install
```bash
npm ci                     # or: npm install
npx playwright install     # download browser binaries
```

### Configure environment
Create a `.env` file in the project root:
```env
USER_NAME=standard_user
USER_PASSWORD=secret_sauce
```
> `.env` is gitignored. `baseURL` is set in `playwright.config.ts` (`https://www.saucedemo.com`).
> In CI the credentials come from **GitHub Secrets**.

---

## Running the tests

```bash
# all tests, all browsers (setup runs first, then the suite)
npx playwright test

# a single spec
npx playwright test sorting

# a single browser
npx playwright test --project=chromium

# open the HTML report
npx playwright show-report
```

---

## How authentication works (`storageState`)

1. The **`setup`** project runs `tests/auth.setup.ts`, logs in through the UI once, and saves the browser session (cookies + localStorage) to `playwright/.auth/user.json`.
2. The browser projects declare `dependencies: ['setup']` and `use: { storageState: 'playwright/.auth/user.json' }`, so every test starts **already authenticated** — no repeated UI login.
3. Login specs call `test.use({ storageState: { cookies: [], origins: [] } })` to start **logged out**, since they test the login flow itself.

This mirrors a real-world pattern: log in once, reuse the session, keep the suite fast.

---

## CI/CD

Workflow: `.github/workflows/playwright.yml`. On every push and pull request:
checkout → setup Node → `npm ci` → install browsers → `npx playwright test` →
upload the `playwright-report/` as an artifact. Credentials are injected from GitHub Secrets.

---

## Author

**Danylo Tokarev** — Junior QA Automation Engineer
GitHub: [Danylo-Tokarev](https://github.com/Danylo-Tokarev)
