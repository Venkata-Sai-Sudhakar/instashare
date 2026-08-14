import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import FailureView from '../FailureView'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import {apiStatusConstants} from '../PostsList'
import './index.css'

const MyProfile = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [profileDetails, setProfileDetails] = useState(null)

  const getMyProfile = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get(JWT_COOKIE_KEY)
    const url = '/api/insta-share/my-profile'
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
        const {profile} = data
        setProfileDetails({
          userName: profile.user_name,
          profilePic: profile.profile_pic,
          followersCount: profile.followers_count,
          followingCount: profile.following_count,
          postsCount: profile.posts_count ?? (profile.posts ? profile.posts.length : 0),
          userBio: profile.user_bio,
          stories: profile.stories || [],
          posts: profile.posts || [],
        })
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    getMyProfile()
  }, [getMyProfile])

  const renderContent = () => {
    if (apiStatus === apiStatusConstants.inProgress) {
      return (
        <div className="profile-loader-container" data-testid="loader">
          <ThreeDots color="#4094EF" height={50} width={50} />
        </div>
      )
    }
    if (apiStatus === apiStatusConstants.failure) {
      return <FailureView onRetry={getMyProfile} />
    }
    if (apiStatus === apiStatusConstants.success) {
      return (
        <Profile
          profileDetails={profileDetails}
          profileImageAlt="my profile"
          storyImageAlt="my story"
          postImageAlt="my post"
        />
      )
    }
    return null
  }

  return (
    <div className="my-profile-container">
      <Header />
      {renderContent()}
    </div>
  )
}

export default MyProfile
