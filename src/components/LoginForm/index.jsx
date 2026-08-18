import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import loginIllustration from '../../assets/login-illustration.svg'
import instaShareLogo from '../../assets/insta-share-logo.svg'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const jwtToken = Cookies.get(JWT_COOKIE_KEY)
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitSuccess = token => {
    Cookies.set(JWT_COOKIE_KEY, token, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMessage => {
    setShowError(true)
    setErrorMsg(errorMessage)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    // The Vite proxy avoids CORS in development. The direct endpoint remains
    // available when the app is served without that proxy.
    let url = '/api/login'
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    
    try {
      let response = await fetch(url, options)
      
      // If the development proxy is unavailable, use the documented API URL.
      if (!response.ok && (response.status === 403 || response.status === 404)) {
        url = 'https://apis.ccbp.in/login'
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(userDetails),
        }
        response = await fetch(url, options)
      }
      
      const data = await response.json()
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg || 'Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      onSubmitFailure('An error occurred. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          src={loginIllustration}
          alt="website login"
          className="login-image"
        />
      </div>
      <div className="login-form-container">
        <img
          src={instaShareLogo}
          alt="website logo"
          className="website-logo"
        />
        <h1 className="website-title">Insta Share</h1>
        <form className="form" onSubmit={submitForm}>
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Enter username"
            value={username}
            onChange={onChangeUsername}
          />
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={onChangePassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
