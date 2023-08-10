/* eslint-disable @typescript-eslint/no-var-requires */
import { expect, Page, test } from '@playwright/test';

export class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
		if (process.env.VERIFY_CONSOLE === 'YES') {
			type consoleErrorObject = {
				msg?: string;
				arg?: any[];
				url?: string;
				errorMessage?: string;
				stack?: any;
			};
			const catchedError: consoleErrorObject = {};
			this.page.on('console', (msg) => {
				if (msg.type() === 'error') {
					if (
						!msg.text().includes('https://developers.google.com')) {
						catchedError.msg = msg.text();
						catchedError.url = msg.location().url;
						for (const arg of msg.args()) catchedError.arg.push(arg.jsonValue());
                        expect(catchedError, `Verify browser console for errors`).toEqual({});
					}
				}
			});
			this.page.on('pageerror', (err) => {
				catchedError.errorMessage = err.message;
				catchedError.stack = err.stack;
				expect(catchedError, `Verify browser console for page errors`).toEqual({});
			});
		}
	}

	async clickOnElement(elementSelector: string, elementDescription?: string) {
		await test.step(`Click on "${elementDescription}"`, async () => {
			await this.page.click(elementSelector, { timeout: 30000 });
		});
	}
	
}
