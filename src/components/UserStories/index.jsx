import {useRef, useState} from 'react'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import UserStory from '../UserStory'
import UserStoriesModal from '../UserStoriesModal'
import './index.css'

const UserStories = ({storiesList}) => {
  const scrollRef = useRef(null)
  const [selectedStory, setSelectedStory] = useState(null)

  const scrollByAmount = amount => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({left: amount, behavior: 'smooth'})
    }
  }

  const onClickPrev = () => scrollByAmount(-300)
  const onClickNext = () => scrollByAmount(300)

  const onClickStory = story => setSelectedStory(story)
  const onCloseModal = () => setSelectedStory(null)

  return (
    <div className="user-stories-container">
      <button
        type="button"
        className="stories-nav-button"
        onClick={onClickPrev}
        aria-label="scroll left"
      >
        <MdChevronLeft size={22} />
      </button>
      <ul className="user-stories-list" ref={scrollRef}>
        {storiesList.map(story => (
          <UserStory
            key={story.user_id}
            storyDetails={{
              userName: story.user_name,
              storyUrl: story.story_url,
            }}
            onClick={() => onClickStory(story)}
          />
        ))}
      </ul>
      <button
        type="button"
        className="stories-nav-button"
        onClick={onClickNext}
        aria-label="scroll right"
      >
        <MdChevronRight size={22} />
      </button>
      {selectedStory && (
        <UserStoriesModal
          storyDetails={{
            userName: selectedStory.user_name,
            storyUrl: selectedStory.story_url,
          }}
          onClose={onCloseModal}
        />
      )}
    </div>
  )
}

export default UserStories
