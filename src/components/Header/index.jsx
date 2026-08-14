import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router'
import {FaSearch} from 'react-icons/fa'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import instaShareLogo from '../../assets/insta-share-logo.svg'
import './index.css'

const Header = ({onSearch}) => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const onChangeSearchInput = event => setSearchInput(event.target.value)

  const onClickSearchIcon = () => {
    if (onSearch) {
      onSearch(searchInput)
    } else if (searchInput.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(searchInput)}`)
    }
  }

  const onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      onClickSearchIcon()
    }
  }

  const onClickLogout = () => {
    Cookies.remove(JWT_COOKIE_KEY)
    navigate('/login', {replace: true})
  }

  return (
    <nav className="header-container">
      <Link to="/" className="logo-link">
        <img
          src={instaShareLogo}
          alt="website logo"
          className="header-logo"
        />
        <h1 className="header-title">Insta Share</h1>
      </Link>
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search Caption"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onKeyDownSearch}
        />
        <button
          type="button"
          data-testid="searchIcon"
          className="search-icon-button"
          onClick={onClickSearchIcon}
        >
          <FaSearch />
        </button>
      </div>
      <div className="header-links-container">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/my-profile" className="header-link">
          Profile
        </Link>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
