import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
	loginField = '[id="inputUsername"]';
	passwordField = '[id="inputPassword"]';
	signInButton = '[id="login_button"]';
	logoutButton = '[id="logout"]';

	constructor(page: Page) {
		super(page);
	}

	async goto() {
		await test.step(`Navigate to Login Page`, async () => {
			await this.page.goto(process.env.BASEURL);
		});
	}

	async Login(user: string, password: string) {
		await test.step(`Login as "${user}"`, async () => {
			console.time(`start Login`);
			await this.page.fill(this.loginField, user);
			await this.page.fill(this.passwordField, password);
			await this.clickOnElement(this.signInButton, 'Login button');
			
		});
	}

	async VerifyLoginSuccess() {
		await test.step(`Verify Login Success (Logout button is present)`, async () => {
			await expect(this.page.locator(this.logoutButton)).toBeVisible();
		});
	}

	async Logout() {
		await test.step(`Logout`, async () => {
			console.time(`start Logout`);
			await this.clickOnElement(this.logoutButton, 'click logout button');
		});
	}

	async VerifyLogoutSuccess() {
		await test.step(`Verify Logout Success (Login button is present)`, async () => {
			await expect(this.page.locator(this.loginField)).toBeVisible();
		});
	}
}
