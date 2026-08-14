import Cookies from 'js-cookie'
import {Navigate} from 'react-router'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'

// Wraps any route that requires authentication.
// If there is no jwt_token cookie, the user is redirected to /login.
const ProtectedRoute = ({children}) => {
  const jwtToken = Cookies.get(JWT_COOKIE_KEY)

  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
