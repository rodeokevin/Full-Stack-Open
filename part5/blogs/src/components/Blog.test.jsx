import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Blog initially renders title and author but not URL or likes', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'kevin',
      url: 'test.com',
      likes: 3,
      user: {
        username: 'root',
        name: 'tester'
      }
    }

    const currentUser = {
        username: 'root',
    }
  
    const { container } = render(<Blog blog={blog} currentUser={currentUser} />)
  
    const titleauthorLess = container.querySelector('.titleAuthorLess')
    expect(titleauthorLess).toBeDefined()

    const url = container.querySelector('.url')
    expect(url).toBeDefined()
    expect(url).not.toBeVisible()

    const likes = container.querySelector('.likes')
    expect(likes).toBeDefined()
    expect(likes).not.toBeVisible()

    const user = container.querySelector('.user')
    expect(user).toBeDefined()
    expect(user).not.toBeVisible()
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'kevin',
        url: 'test.com',
        likes: 3,
        user: {
          username: 'root',
          name: 'tester'
        }
    }

    const currentUser = {
        username: 'root',
    }
  
    const { container } = render(<Blog blog={blog} currentUser={currentUser} />)
  
    const clickUser = userEvent.setup()
    const button = screen.getByText('view')
    await clickUser.click(button)
  
    const titleAuthorMore = container.querySelector('.titleAuthorMore')
    expect(titleAuthorMore).toBeDefined()
    expect(titleAuthorMore).toBeVisible()

    const url = container.querySelector('.url')
    expect(url).toBeDefined()
    expect(url).toBeVisible()

    const likes = container.querySelector('.likes')
    expect(likes).toBeDefined()
    expect(likes).toBeVisible()

    const user = container.querySelector('.user')
    expect(user).toBeDefined()
    expect(user).toBeVisible()
})

test('clicking the like button calls event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'kevin',
        url: 'test.com',
        likes: 3,
        user: {
          username: 'root',
          name: 'tester'
        }
    }

    const currentUser = {
        username: 'root',
    }
    
    const mockHandler = vi.fn()
  
    render(<Blog blog={blog} currentUser={currentUser} handleLike={mockHandler} />)

    const clickUser = userEvent.setup()
    const buttonView = screen.getByText('view')
    await clickUser.click(buttonView)
  
    const user = userEvent.setup()
    const buttonLike = screen.getByText('Like')
    await user.click(buttonLike)
    await user.click(buttonLike)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })