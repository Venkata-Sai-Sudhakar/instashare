import failureIllustration from '../../assets/failure-illustration.svg'
import './index.css'

const FailureView = ({onRetry}) => (
  <div className="failure-view-container">
    <img
      src={failureIllustration}
      alt="failure view"
      className="failure-view-image"
    />
    <p className="failure-view-text">Something went wrong. Please try again</p>
    <button type="button" className="retry-button" onClick={onRetry}>
      Try again
    </button>
  </div>
)

export default FailureView
