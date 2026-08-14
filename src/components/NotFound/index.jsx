import {Link} from 'react-router'
import notFoundIllustration from '../../assets/not-found-illustration.svg'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src={notFoundIllustration}
      alt="page not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-text">
      we are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage.
    </p>
    <Link to="/" className="not-found-home-link">
      <button type="button" className="not-found-home-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
