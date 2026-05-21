
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

        

        

    


        
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).not.toBeVisible()




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

  await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

   while (await page.getByRole('button', { name: 'view' }).count() > 0) {
      await page.getByRole('button', { name: 'view' }).first().click()

       await page.getByText('logged in').waitFor()

      const deleteButton = page.getByRole('button', { name: 'delete' })

      if (await deleteButton.count() > 0) {
        await deleteButton.first().click()

         await page.getByText('logged in').waitFor()
      }
    }

  
})

  test('a new blog can be created', async ({ page }) => {
    

    
    await page.getByText('logged in').waitFor()
    //make sure the blog is not already there
    await expect(page.getByText('testTitle')).toHaveCount(0)

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

   test('an existing blog can be liked', async ({ page }) => {

    await page.getByText('logged in').waitFor()
    //make sure the blog is not already there
    await expect(page.getByText('testTitle')).toHaveCount(0)

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

    //We have now added the testblog
    const blog = page
    .getByTestId('blog')
    .filter({ hasText: 'testTitle' })



 const viewButton = await blog.getByRole('button', { name: 'view' })
 await viewButton.click()
 await page.getByText('logged in').waitFor()
 await expect(blog).toContainText('likes: 0')

 const likeButton = await blog.getByRole('button', { name: 'like' })
 await likeButton.click()
 await page.getByText('logged in').waitFor()
 await expect(blog).toContainText('likes: 1')
 




  })

  test('creator of the blog can delete it', async ({ page }) => {

    await page.getByText('logged in').waitFor()
    //make sure the blog is not already there
    await expect(page.getByText('testTitle')).toHaveCount(0)

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

    //We have now added the testblog
    const blog = page
    .getByTestId('blog')
    .filter({ hasText: 'testTitle' })



 const viewButton =  blog.getByRole('button', { name: 'view' })
 await viewButton.click()
 await page.getByText('logged in').waitFor()


 const deleteButton =  blog.getByRole('button', { name: 'delete' })
 await deleteButton.click()
 await page.getByText('logged in').waitFor()

 await expect(blog).not.toBeVisible()

 




  })

  test('Delete button doesnt appear for non-owners', async ({ page }) => {

     await page.getByText('logged in').waitFor()
    //make sure the blog is not already there
   

     const blog = page
    .getByTestId('blog')
    .filter({ hasText: 'Bob Blog'})

    //my before each leaves the views open so I dont need to open them now

     await expect(blog).toHaveCount(1)

    await expect(blog.getByRole('button', { name: 'delete' })).toHaveCount(0)
    await expect(blog.getByRole('button', { name: 'hide' })).toBeVisible()

  })

})


})