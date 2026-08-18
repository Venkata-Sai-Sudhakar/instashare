import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UserStories'
import PostsList from '../PostsList'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import {apiStatusConstants} from '../PostsList'
import './index.css'

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [postsList, setPostsList] = useState([])
  const [storiesList, setStoriesList] = useState([])
  const getHomePosts = useCallback(async (searchTerm = '') => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get(JWT_COOKIE_KEY)
    const query = searchTerm.trim()
      ? `?search=${encodeURIComponent(searchTerm.trim())}`
      : ''
    const postsUrl = `/api/insta-share/posts${query}`
    const storiesUrl = '/api/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const [postsResponse, storiesResponse] = await Promise.all([
        fetch(postsUrl, options),
        fetch(storiesUrl, options),
      ])

      if (postsResponse.ok && storiesResponse.ok) {
        const postsData = await postsResponse.json()
        const storiesData = await storiesResponse.json()
        setPostsList(postsData.posts || [])
        setStoriesList(storiesData.users_stories || [])
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      console.error('Error fetching feed:', error)
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getHomePosts()
  }, [getHomePosts])

  const handleSearch = searchTerm => {
    getHomePosts(searchTerm)
  }

  const emptyView = (
    <div className="empty-view-container">
      <p className="empty-view-text">No Posts Found</p>
    </div>
  )

  return (
    <div className="home-container">
      <Header onSearch={handleSearch} />
      {storiesList.length > 0 && <UserStories storiesList={storiesList} />}
      <PostsList
        apiStatus={apiStatus}
        postsList={postsList}
        onRetry={getHomePosts}
        emptyView={emptyView}
      />
    </div>
  )
}

export default Home
