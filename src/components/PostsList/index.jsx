import {ThreeDots} from 'react-loader-spinner'
import Post from '../Post'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PostsList = ({apiStatus, postsList, onRetry, emptyView}) => {
  if (apiStatus === apiStatusConstants.inProgress) {
    return (
      <div className="loader-container" data-testid="loader">
        <ThreeDots color="#4094EF" height={50} width={50} />
      </div>
    )
  }

  if (apiStatus === apiStatusConstants.failure) {
    return <FailureView onRetry={onRetry} />
  }

  if (apiStatus === apiStatusConstants.success) {
    if (postsList.length === 0 && emptyView) {
      return emptyView
    }

    return (
      <ul className="posts-list">
        {postsList.map(post => (
          <Post key={post.post_id} postDetails={post} />
        ))}
      </ul>
    )
  }

  return null
}

export default PostsList
export {apiStatusConstants}
