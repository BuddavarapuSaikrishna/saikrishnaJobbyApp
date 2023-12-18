import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobItemDetails = props => {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [jobDataDetails, setJobDataDetails] = useState([])
  const [similarJobsData, setSimilarJobsData] = useState([])

  const getJobItemDetails = async () => {
    const {match} = props
    const {params} = match
    const {id} = params

    setApiStatus(apiConstants.progress)

    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const UpdateJobsDetails = [data.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      const UpdatedSimiarJobsData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      setSimilarJobsData(UpdatedSimiarJobsData)
      setJobDataDetails(UpdateJobsDetails)

      setApiStatus(apiConstants.success)
    } else {
      setApiStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    getJobItemDetails()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      title,
      location,
      packagePerAnnum,
      rating,
    } = jobDataDetails[0]

    return (
      <>
        <Header />
        <div className="JobItemDetails-container">
          <div className="JobItemDetails-Card">
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
              <p>{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="description-container">
              <h1>Description</h1>
              <a className="visit-site" href={companyWebsiteUrl}>
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="skills">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li className="skills-list-items-container" key={each.name}>
                  <div className="skills-img-name-container">
                    <img src={each.imageUrl} alt={each.name} />
                    <p>{each.name}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h1 className="life-at-company">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                className="life-at-company-img"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similarJobs-list-container">
            {similarJobsData.map(each => (
              <SimilarJobs similarJobDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="Retry-btn">
        Retry
      </button>
    </div>
  )

  const renderJobsDetailsView = () => {
    switch (apiStatus) {
      case apiConstants.progress:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      case apiConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div>{renderJobsDetailsView()}</div>
}

export default JobItemDetails
