import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const ChangeUsername = event => {
    setUsername(event.target.value)
  }

  const ChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitFailure = err => {
    setError(err)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const LoginData = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="Login-container">
      <div className="LoginForm-container">
        <img
          className="website-logo-img"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <form onSubmit={LoginData}>
          <div>
            <label className="form-label" htmlFor="Username">
              USERNAME
            </label>
            <br />
            <input
              className="username"
              id="Username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={ChangeUsername}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="Password">
              PASSWORD
            </label>
            <br />
            <input
              className="password"
              id="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={ChangePassword}
            />
          </div>
          <p className="error-msg">{error}</p>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
