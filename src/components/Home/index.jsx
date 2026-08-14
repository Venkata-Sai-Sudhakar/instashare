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
  const [searchInput, setSearchInput] = useState('')

  const getHomePosts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get(JWT_COOKIE_KEY)
    const url = '/api/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {posts, stories} = data
        setPostsList(posts || [])
        setStoriesList(stories || [])
        setApiStatus(apiStatusConstants.success)
      } else if (response.status === 401 || response.status === 403) {
        // For demo/testing - show empty state
        setPostsList([])
        setStoriesList([])
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
    setSearchInput(searchTerm)
    if (searchTerm.trim() === '') {
      getHomePosts()
    } else {
      const filteredPosts = postsList.filter(post =>
        post.caption.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setPostsList(filteredPosts)
    }
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
