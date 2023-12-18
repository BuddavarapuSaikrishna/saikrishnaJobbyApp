import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FilterGroup from '../FilterGroup'
import JobDetails from '../JobDetails'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Jobs = () => {
  const [jobsData, setJobsData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)
  const [employment, setEmployment] = useState([])
  const [salary, setSalary] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const jobsDetailsData = async () => {
    setApiStatus(apiConstants.progress)
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment.join()}&minimum_package=${salary}&search=${searchInput}`

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const UpdatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      setJobsData(UpdatedData)
      setApiStatus(apiConstants.success)
    } else {
      setApiStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    jobsDetailsData()
  }, [employment, salary])

  const onClickRetry = () => {
    jobsDetailsData()
  }

  const getEmploymentType = id => {
    if (employment.includes(id)) {
      const filterData = employment.filter(each => each !== id)
      setEmployment(filterData)
    } else {
      setEmployment(prev => [...prev, id])
    }
  }

  const ChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onEnterKeyDown = event => {
    if (event.key === 'Enter') {
      jobsDetailsData()
    }
  }

  const onSubmitSearchInput = () => {
    jobsDetailsData()
  }

  const getSalary = id => {
    setSalary(id)
  }

  const SuccessView = () => {
    const nojobs = jobsData.length === 0

    return nojobs ? (
      <div className="data-not-found-container">
        <img
          className="failure-view-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="JobsDetailsList-container">
        {jobsData.map(eachItem => (
          <JobDetails JobInformation={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  const FailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="Retry-btn" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="profile-loader-container " id="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderJobsView = () => {
    switch (apiStatus) {
      case apiConstants.progress:
        return renderLoadingView()

      case apiConstants.success:
        return SuccessView()

      case apiConstants.failure:
        return FailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="Jobs-container">
        <div className="sidebar-container">
          <div className="mobile-responsive-search-bar">
            <input
              className="mobile-input-search-bar"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={ChangeSearchInput}
              onKeyDown={onEnterKeyDown}
            />
            <div className="mobile-search-icon-div">
              <BsSearch
                className="mobile-search-icon"
                onClick={onSubmitSearchInput}
              />
            </div>
          </div>
          <ProfileCard />
          <hr className="horizontal-line" />
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            getEmploymentType={getEmploymentType}
            getSalary={getSalary}
          />
        </div>
        <div className="Job-details-container">
          <div className="website-responsive-search-bar">
            <input
              className="input-search-bar"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={ChangeSearchInput}
              onKeyDown={onEnterKeyDown}
            />
            <div className="search-icon-div">
              <BsSearch className="search-icon" onClick={onSubmitSearchInput} />
            </div>
          </div>
          {renderJobsView()}
        </div>
      </div>
    </>
  )
}

export default Jobs
