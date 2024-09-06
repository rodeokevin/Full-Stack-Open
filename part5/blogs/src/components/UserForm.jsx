import { useState, forwardRef, useImperativeHandle } from 'react'

const UserForm = forwardRef(({ createUser, users, setErrorMessage }, refs) => {

  const [newUsername, setNewUsername] = useState('')
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const [newPassword, setNewPassword] = useState('')
  const handlePasswordChange = (event) => {
      setNewPassword(event.target.value)
  }

  const resetFields = () => {
    setNewUsername('')
    setNewName('')
    setNewPassword('')
  }

  useImperativeHandle(refs, () => {
    return {
      resetFields
    }
  })

  const addUser = (event) => {
    event.preventDefault()
    const newUserObject = {
      username: newUsername,
      name: newName,
      password: newPassword,
    }

    // If the username already exists, operation fails
    const findUser = (username) => {
      const found = users.find(user => user.username.toLowerCase() === username.toLowerCase())
      return found ? found : null
    }

    const foundUser = findUser(newUserObject.username)

    // Operation fails if username is taken
    if (foundUser) {
      setErrorMessage(`${foundUser.username} already exists`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else {
      createUser(newUserObject)
      resetFields()
    }
  }

    return (
      <>
        <h2>Create a user:</h2>
        <form onSubmit={addUser}>
        
        <div>
          Username <input value={newUsername} onChange={handleUsernameChange}/>
        </div>
        <div>
          Name <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
        Password <input value={newPassword} onChange={handlePasswordChange} type="password"/>
        </div>
          <button type="submit">create</button>
        </form>
      </>
    )
})

UserForm.displayName = 'UserForm'
export default UserForm