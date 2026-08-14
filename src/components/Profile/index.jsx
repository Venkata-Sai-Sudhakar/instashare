import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const Profile = ({profileDetails, profileImageAlt, storyImageAlt, postImageAlt}) => {
  const {
    userName,
    profilePic,
    followersCount,
    followingCount,
    postsCount,
    userBio,
    stories,
    posts,
  } = profileDetails

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profilePic} alt={profileImageAlt} className="profile-image" />
        <div className="profile-info">
          <h1 className="profile-username">{userName}</h1>
          <ul className="profile-stats-list">
            <li className="profile-stat-item">
              <span className="profile-stat-count">{postsCount}</span> posts
            </li>
            <li className="profile-stat-item">
              <span className="profile-stat-count">{followersCount}</span>{' '}
              followers
            </li>
            <li className="profile-stat-item">
              <span className="profile-stat-count">{followingCount}</span>{' '}
              following
            </li>
          </ul>
          <p className="profile-name-bold">{userName}</p>
          <p className="profile-bio">{userBio}</p>
        </div>
      </div>

      {stories && stories.length > 0 && (
        <ul className="profile-stories-list">
          {stories.map(story => (
            <li key={story.id} className="profile-story-item">
              <img src={story.image} alt={storyImageAlt} className="profile-story-image" />
            </li>
          ))}
        </ul>
      )}

      <div className="profile-posts-heading-container">
        <BsGrid3X3 size={16} />
        <h1 className="profile-posts-heading">Posts</h1>
      </div>

      {posts && posts.length > 0 ? (
        <ul className="profile-posts-grid">
          {posts.map(post => (
            <li key={post.id} className="profile-post-item">
              <img src={post.image} alt={postImageAlt} className="profile-post-image" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="profile-no-posts-container">
          <div className="profile-no-posts-icon-container">
            <BiCamera size={22} />
          </div>
          <p className="profile-no-posts-text">No Posts Yet</p>
        </div>
      )}
    </div>
  )
}

export default Profile
