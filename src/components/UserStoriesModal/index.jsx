import {IoClose} from 'react-icons/io5'
import './index.css'

const UserStoriesModal = ({storyDetails, onClose}) => {
  const {userName, storyUrl} = storyDetails

  return (
    <div className="user-story-modal-overlay">
      <div className="user-story-modal-content">
        <button
          type="button"
          className="user-story-modal-close-button"
          onClick={onClose}
        >
          <IoClose size={28} color="#ffffff" />
        </button>
        <p className="user-story-modal-username">{userName}</p>
        <img src={storyUrl} alt="user story" className="user-story-modal-image" />
      </div>
    </div>
  )
}

export default UserStoriesModal
