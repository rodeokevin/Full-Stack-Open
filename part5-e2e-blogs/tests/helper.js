const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}
  
const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('[placeholder="title"]').fill(title)
    await page.locator('[placeholder="author"]').fill(author)
    await page.locator('[placeholder="url"]').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
}
  
export { loginWith, createBlog }