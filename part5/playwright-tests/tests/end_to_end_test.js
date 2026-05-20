
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username_field = page.getByLabel('username')
    await expect(username_field).toBeVisible()
    const password_field = page.getByLabel('password')
    await expect(password_field).toBeVisible()
    
  })

  describe('Login', () => {

    beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

    test('succeeds with correct credentials', async ({ page }) => {
        const username_field = page.getByLabel('username')
        await expect(username_field).toBeVisible()
        const password_field = page.getByLabel('password')
        await expect(password_field).toBeVisible()
        const submit_button = page.getByRole('button', { name: 'login' })
        await username_field.fill('testuser')
        await password_field.fill('testuser')
        await submit_button.click()

        await expect(page.getByRole('button', { name: 'login' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()




    })

    test('fails with wrong credentials', async ({ page }) => {
      const username_field = page.getByLabel('username')
        await expect(username_field).toBeVisible()
        const password_field = page.getByLabel('password')
        await expect(password_field).toBeVisible()
        const submit_button = page.getByRole('button', { name: 'login' })
        await username_field.fill('fakeuser')
        await password_field.fill('fakepass')
        await submit_button.click()

        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()

    })
  })


})