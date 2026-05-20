
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username_field = page.getByText('username')
    await expect(username_field).toBeVisible()
    const password_field = page.getByText('password')
    await expect(password_field).toBeVisible()
    
  })
})