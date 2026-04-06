import { test, expect } from '@playwright/test';

test('robot creates two todos', async ({ page }) => {
  // Go to a live demo app
  await page.goto('https://demo.playwright.dev/todomvc');

  // Add first todo
  await page.locator('.new-todo').fill('Buy milk');
  await page.keyboard.press('Enter');

  // Add second todo
  await page.locator('.new-todo').fill('Learn Playwright');
  await page.keyboard.press('Enter');

  // Add third todo
  await page.locator('.new-todo').fill('Destroy bugs 🐛');
  await page.keyboard.press('Enter');

  // You should now see 3 todos in the UI
  await expect(page.locator('.todo-list li')).toHaveCount(3);

  // Mark first todo as completed (click checkbox)
  await page.locator('.todo-list li').first().locator('input[type="checkbox"]').check();

  // Filter to show only active tasks
  await page.getByText('Active').click();

  // Should now only show 2 active tasks
  await expect(page.locator('.todo-list li')).toHaveCount(2);
});