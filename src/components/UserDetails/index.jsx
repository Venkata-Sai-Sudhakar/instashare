import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import FailureView from '../FailureView'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import {apiStatusConstants} from '../PostsList'
import './index.css'

const UserDetails = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileDetails, setProfileDetails] = useState(null)

  const getUserDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get(JWT_COOKIE_KEY)
    const url = `/api/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {user_details: userDetails} = data
        setProfileDetails({
          userName: userDetails.user_name,
          profilePic: userDetails.profile_pic,
          followersCount: userDetails.followers_count,
          followingCount: userDetails.following_count,
          postsCount:
            userDetails.posts_count ??
            (userDetails.posts ? userDetails.posts.length : 0),
          userBio: userDetails.user_bio,
          stories: userDetails.stories || [],
          posts: userDetails.posts || [],
        })
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getUserDetails()
  }, [getUserDetails])

  const renderContent = () => {
    if (apiStatus === apiStatusConstants.inProgress) {
      return (
        <div className="profile-loader-container" data-testid="loader">
          <ThreeDots color="#4094EF" height={50} width={50} />
        </div>
      )
    }
    if (apiStatus === apiStatusConstants.failure) {
      return <FailureView onRetry={getUserDetails} />
    }
    if (apiStatus === apiStatusConstants.success) {
      return (
        <Profile
          profileDetails={profileDetails}
          profileImageAlt="user profile"
          storyImageAlt="user story"
          postImageAlt="user post"
        />
      )
    }
    return null
  }

  return (
    <div className="user-details-container">
      <Header />
      {renderContent()}
    </div>
  )
}

export default UserDetails
