import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import './index.css'

const JobDetails = props => {
  const {JobInformation} = props

  const {
    employmentType,
    id,
    title,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    companyLogoUrl,
  } = JobInformation

  return (
    <Link className="JobDetails-link" to={`/jobs/${id}`}>
      <li className="JobDetails-List-Items">
        <div className="JobDetails-card">
          <div className="companyLogo-rating-container">
            <img
              className="companyLogoUrl-img"
              src={companyLogoUrl}
              alt={title}
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <p className="rating">
                <span>
                  <BsStarFill className="rating-icon" />
                </span>
                {rating}
              </p>
            </div>
          </div>
          <div className="location-employment-package-container">
            <div className="location-employment-container">
              <div className="location-container">
                <MdLocationOn />
                <p className="location">{location}</p>
              </div>
              <div className="employment-container">
                <BsFillBriefcaseFill />
                <p className="employmentType">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobDetails
