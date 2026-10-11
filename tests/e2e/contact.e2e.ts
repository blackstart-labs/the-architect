import { test, expect } from '@playwright/test';

test('contact waits for provider confirmation and never sends the access key from the browser', async ({
	page
}) => {
	let release!: () => void;
	const gate = new Promise<void>((resolve) => (release = resolve));
	await page.route('**/api/contact', async (route) => {
		expect(route.request().postDataJSON()).toMatchObject({
			name: 'Test owner',
			email: 'owner@example.com'
		});
		expect(route.request().postDataJSON()).not.toHaveProperty('access_key');
		await gate;
		await route.fulfill({ json: { success: true, message: 'Your inquiry has been sent.' } });
	});
	await page.goto('/');
	await page.getByLabel('Your name').fill('Test owner');
	await page.getByLabel('Email address').fill('owner@example.com');
	await page.getByLabel('Tell me about your project').fill('Residential coordination in Dhaka.');
	await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
	await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled();
	await expect(page.getByLabel('Your name')).toBeDisabled();
	await expect(page.getByLabel('Email address')).toBeDisabled();
	await expect(page.getByLabel('Tell me about your project')).toBeDisabled();
	await expect(page.getByRole('status')).toHaveCount(0);
	release();
	await expect(page.getByRole('status')).toContainText('Your inquiry has been sent.');
	await expect(page.getByLabel('Tell me about your project')).toHaveValue('');
	await expect(page.getByLabel('Your name')).toHaveValue('');
	await expect(page.getByLabel('Email address')).toHaveValue('');
	await expect(page.getByRole('button', { name: 'Send Project Inquiry' })).toBeEnabled();
});

test('contact failures preserve the draft and allow retry', async ({ page }) => {
	await page.route('**/api/contact', (route) =>
		route.fulfill({
			status: 502,
			json: { success: false, message: 'Your inquiry could not be sent. Please try again.' }
		})
	);
	await page.goto('/');
	await page.getByLabel('Your name').fill('Test owner');
	await page.getByLabel('Email address').fill('owner@example.com');
	await page.getByLabel('Tell me about your project').fill('Residential coordination in Dhaka.');
	await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
	await expect(page.getByRole('alert')).toContainText('could not be sent');
	await expect(page.getByLabel('Your name')).toHaveValue('Test owner');
	await expect(page.getByRole('button', { name: 'Send Project Inquiry' })).toBeEnabled();
	await expect(page.getByRole('status')).toHaveCount(0);
});

test('contact endpoint rejects foreign origins and invalid input without contacting Web3Forms', async ({
	request
}) => {
	const foreign = await request.post('/api/contact', {
		headers: { origin: 'https://other.example' },
		data: {}
	});
	expect(foreign.status()).toBe(403);
	const invalid = await request.post('/api/contact', {
		headers: { origin: 'http://localhost:4173' },
		data: { name: '', email: 'invalid', message: '' }
	});
	expect(invalid.status()).toBe(400);
});

for (const failure of ['network', 'malformed']) {
	test(`contact handles ${failure} responses without clearing the draft`, async ({ page }) => {
		await page.route('**/api/contact', (route) =>
			failure === 'network'
				? route.abort()
				: route.fulfill({ status: 200, contentType: 'text/plain', body: 'not JSON' })
		);
		await page.goto('/');
		await page.getByLabel('Your name').fill('Test owner');
		await page.getByLabel('Email address').fill('owner@example.com');
		await page.getByLabel('Tell me about your project').fill('Residential coordination in Dhaka.');
		await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
		await expect(page.getByRole('alert')).toContainText('Please try again');
		await expect(page.getByLabel('Your name')).toHaveValue('Test owner');
		await expect(page.getByRole('button', { name: 'Send Project Inquiry' })).toBeEnabled();
	});
}
