import { test ,expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage"; 

const USER = process.env.USER_NAME!;
const PASS = process.env.USER_PASSWORD!;

interface LoginCase {
  desc: string;
  username: string;
  password: string;
  error: string;
}

const invalidLogins: LoginCase[] = [
  {
    desc: 'empty username',
    username: '',
    password: PASS,   // валидный пароль из env — изолируем проверку username
    error: 'Epic sadface: Username is required',
  },
  {
    desc: 'empty password',
    username: USER,        // валидный юзер из env
    password: '',                            // ПУСТО — это и есть кейс, литералом
    error: 'Epic sadface: Password is required',
  },
  {
    desc: 'wrong username and password',
    username: 'no_such_user',                // намеренно неверные = тест-данные, литералом
    password: 'wrong_pass',
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    desc: 'locked out user',
    username: 'locked_out_user',             // конкретная заблокированная личность, литералом
    password: PASS,    // пароль ВЕРНЫЙ → из env
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },
];

test.describe('InvalidLogs on LoginPage', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  }); 

  for (const data of invalidLogins) { 
    test(`login fails: ${data.desc}`, async ({ page }) => {
      await loginPage.login(data.username, data.password);
      await loginPage.expectError(data.error);
    });
  }
});