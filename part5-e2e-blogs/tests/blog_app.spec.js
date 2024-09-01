const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Kevin',
        username: 'rodeokevin',
        password: 'fullstack'
      }
    })
    await page.goto('http://localhost:5173')
  })
  
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'ben franklin', 'jest.com')
      const locator = page.locator('.titleAuthorLess', { hasText: 'a blog created by playwright, by ben franklin' })
      await expect(locator).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {

      await createBlog(page, 'a blog created by playwright', 'ben franklin', 'jest.com')

      const locator = page.locator('.titleAuthorLess', { hasText: 'a blog created by playwright, by ben franklin' })
      await expect(locator).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      
      const likesElement = page.locator('.likes')
      const initialLikesText = await likesElement.innerText()
      const initialLikes = parseInt(initialLikesText.replace('Likes: ', ''), 10)
      
      await page.getByRole('button', { name: 'Like' }).click()
      
      await expect(page.getByText(`Likes: ${initialLikes + 1}`)).toBeVisible
    })

    test('a blog can be deleted by the user who created it', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'ben franklin', 'jest.com')
      const locator = page.locator('.titleAuthorLess', { hasText: 'a blog created by playwright, by ben franklin' })
      
      await expect(locator).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()
      
      await page.pause()
      const locatorAfter = page.locator('.titleAuthorLess')
      await page.pause()
      await expect(locatorAfter).toHaveCount(0)

    })

    test('only the user who created the blog can see delete', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'ben franklin', 'jest.com')
      const locator = page.locator('.titleAuthorLess', { hasText: 'a blog created by playwright, by ben franklin' })
      await expect(locator).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'rodeokevin', 'fullstack')
      
      const locator2 = page.locator('.titleAuthorLess', { hasText: 'a blog created by playwright, by ben franklin' })
      await expect(locator2).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      const deleteButton = page.getByRole('button', { name: 'delete' })
      await expect(deleteButton).toHaveCount(0)
    })

    test.only('blogs are arranged in order of likes with the most liked blog first', async ({ page }) => {
      const makeBlog = async (title, author, url, likes) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.locator('[placeholder="title"]').fill(title)
        await page.locator('[placeholder="author"]').fill(author)
        await page.locator('[placeholder="url"]').fill(url)
        await page.getByRole('button', { name: 'save' }).click()
        const locator = page.locator('.titleAuthorLess', { hasText: `${title}, by ${author}` })
        await expect(locator).toBeVisible()
        await page.getByText(`${title}, by ${author}`).getByRole('button', { name: 'view' }).click()
        const locator2 = page.locator('.titleAuthorMore', { hasText: `${title}, by ${author}` })
        await expect(locator2).toBeVisible()
    
        // Simulate adding likes to the blog
        for (let i = 0; i < likes; i++) {
          await page.getByRole('button', { name: 'Like' }).click()
        }
        await page.getByRole('button', { name: 'hide' }).click()
      }
    
      // Create blogs with varying likes
      await makeBlog('Blog with few likes', 'Author 1', 'http://example.com/1', 1)
      await makeBlog('Blog with most likes', 'Author 2', 'http://example.com/2', 5)
      await makeBlog('Blog with medium likes', 'Author 3', 'http://example.com/3', 3)
    
      // Get all blog elements sorted by their position
      await page.pause()
      const blogs = await page.locator('.blog').all()
    
      // Extract the likes for each blog and convert to an array
      const likes = await Promise.all(
        blogs.map(async (blog) => {
          // Ensure the details are visible to get the likes count
          await blog.getByRole('button', { name: 'view' }).click()
          const likesText = await blog.locator('.likes').innerText()
          return parseInt(likesText.replace('Likes: ', ''), 10)
        })
      )
      await page.pause()
      // Check if the likes array is sorted in descending order
      for (let i = 0; i < likes.length - 1; i++) {
        expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1])
      }
    })
  })
})