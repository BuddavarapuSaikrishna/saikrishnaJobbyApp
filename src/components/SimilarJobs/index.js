import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="SimilarJobs-list-items-container">
      <div className="SimilarJobs-container">
        <div className="title-rating-img-container">
          <img
            className="company-logo-url"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <p className="rating">
              <BsStarFill className="star-icon" />
              {rating}
            </p>
          </div>
        </div>
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="location-employment-salary-container">
          <div className="location-employment-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p>{location}</p>
            </div>
            <div className="employment-container">
              <BsBriefcaseFill className="briefcase-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
