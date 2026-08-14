import {useState} from 'react'
import {Link} from 'react-router'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {JWT_COOKIE_KEY} from '../../utils/cookieUtils'
import './index.css'

const Post = ({postDetails}) => {
  const {
    post_id: postId,
    user_id: userId,
    user_name: userName,
    profile_pic: profilePic,
    post_details: {image_url: imageUrl, caption},
    likes_count: initialLikesCount,
    comments,
    created_at: createdAt,
  } = postDetails

  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [isLiked, setIsLiked] = useState(false)

  const updateLikeStatus = async likeStatus => {
    const jwtToken = Cookies.get(JWT_COOKIE_KEY)
    const url = `/api/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likeStatus}),
    }
    await fetch(url, options)
  }

  const onClickLikeIcon = () => {
    setIsLiked(true)
    setLikesCount(prevCount => prevCount + 1)
    updateLikeStatus(true)
  }

  const onClickUnlikeIcon = () => {
    setIsLiked(false)
    setLikesCount(prevCount => prevCount - 1)
    updateLikeStatus(false)
  }

  return (
    <li className="post-item" data-testid="postItem">
      <div className="post-header">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-author-profile-image"
        />
        <Link to={`/users/${userId}`} className="post-username-link">
          {userName}
        </Link>
      </div>
      <img src={imageUrl} alt="post" className="post-image" />
      <div className="post-actions-container">
        <div className="icons-container">
          {isLiked ? (
            <button
              type="button"
              data-testid="unLikeIcon"
              className="icon-button"
              onClick={onClickUnlikeIcon}
            >
              <FcLike size={22} />
            </button>
          ) : (
            <button
              type="button"
              data-testid="likeIcon"
              className="icon-button"
              onClick={onClickLikeIcon}
            >
              <BsHeart size={20} />
            </button>
          )}
          <button type="button" className="icon-button">
            <FaRegComment size={20} />
          </button>
          <button type="button" className="icon-button">
            <BiShareAlt size={22} />
          </button>
        </div>
        <p className="likes-count-text">{likesCount} likes</p>
      </div>
      <p className="post-caption">{caption}</p>
      {comments && comments.length > 0 && (
        <ul className="post-comments-list">
          {comments.map(comment => (
            <li key={comment.user_id} className="post-comment-item">
              <span className="post-comment-username">{comment.user_name}</span>{' '}
              {comment.comment}
            </li>
          ))}
        </ul>
      )}
      {createdAt && <p className="post-created-at">{createdAt}</p>}
    </li>
  )
}

export default Post
