import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleGuestSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {
   return (
     <div>
       <h2>Login to application</h2>
 
       <form onSubmit={handleSubmit}>
         <div>
           username
           <input
             value={username}
             onChange={handleUsernameChange}
             data-testid='username'
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
             data-testid='password'
           />
          </div>
          <button type="submit">login</button>
          
       </form>
       <button onClick={handleGuestSubmit}>login as guest</button>
     </div>
   )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
 
 export default LoginForm