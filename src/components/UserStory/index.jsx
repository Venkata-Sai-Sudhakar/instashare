import './index.css'

const UserStory = ({storyDetails, onClick}) => {
  const {userName, storyUrl} = storyDetails

  return (
    <li className="user-story-item">
      <button type="button" className="user-story-button" onClick={onClick}>
        <div className="user-story-image-border">
          <img src={storyUrl} alt="user story" className="user-story-image" />
        </div>
        <p className="user-story-name">{userName}</p>
      </button>
    </li>
  )
}

export default UserStory
