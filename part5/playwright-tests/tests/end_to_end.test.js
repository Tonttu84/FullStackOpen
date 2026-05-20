
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

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByLabel('username').fill('testuser')
  await page.getByLabel('password').fill('testuser')
  await page.getByRole('button', { name: 'login' }).click()
})

  test('a new blog can be created', async ({ page }) => {
    //make sure the blog is not already there
    await expect(page.locator('text=testTitle')).toHaveCount(0)

    await page.getByRole('button', { name: 'create new blog' }).click()
    const title =  page.getByLabel('title')
    await expect(title).toBeVisible()
    const author =  page.getByLabel('author')
    await expect(author).toBeVisible()
    const url =  page.getByLabel('url')
    await expect(url).toBeVisible()
    await title.fill('testTitle')
    await author.fill('testAuthor')
    await url.fill('testUrl')


    const submitButton = page.getByRole('button', { name: 'create' })
    await submitButton.click()

    await expect(page.getByText('testTitle', { exact: true })).toBeVisible()
    


  })
})

})