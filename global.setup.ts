import { test as setup, expect } from '@playwright/test';
setup('do login and save state', async ({ browser }) => {
	const context = await browser.newContext();

	const page = await context.newPage();
	
	await setup.step(`Login to App as ${process.env.AppUSERNAME}`, async () => {
		await page.goto(process.env.BASEURL!);
		await expect(page.locator('[id="username"]')).toBeVisible();
		await expect(page.locator('[id="password"]')).toBeVisible();
		await expect(page.locator('[id="login"]')).toBeVisible();

		await page.fill('[id="username"]', process.env.AppUSERNAME!);
		await page.fill('[id="password"]', process.env.AppPASSWORD!);
		await page.click('[id="login"]');
	});
	await page.context().storageState({ path: 'state.json' });
    await browser.close();
});
