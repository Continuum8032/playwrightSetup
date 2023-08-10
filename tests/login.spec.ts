import { test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../pageObjects/loginPage';

let loginPage: LoginPage;

test.describe.serial('PartsLedger Login and Logout Smoke Test', () => {
	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext({
			viewport: {
				width: 1920,
				height: 1080
			}
		});

		const page = await context.newPage();
	  loginPage = new LoginPage(page);
    await loginPage.goto();
	});
  test('Login to App', async () => {
		await loginPage.Login(process.env.App_FF_USERNAME, process.env.App_FF_PASSWORD);
		await loginPage.VerifyLoginSuccess();
	});
	test('Logout of App', async () => {
		await loginPage.Logout();
		await loginPage.VerifyLogoutSuccess();
	});

});
