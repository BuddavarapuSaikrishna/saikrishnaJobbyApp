import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

const ProfileCard = () => {
  const [profileData, setProfileData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstants.initial)

  const userData = async () => {
    setApiStatus(apiConstants.progress)
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      setProfileData(updateData)
      setApiStatus(apiConstants.success)
    } else {
      setApiStatus(apiConstants.failure)
    }
  }

  useEffect(() => {
    userData()
  }, [])

  const onClickRetry = () => {
    userData()
  }

  const renderProfileView = () => {
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="profile-card">
        <img className="profile-img" src={profileImageUrl} alt={name} />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="profile-loader-container " id="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="profile-failure-view">
      <button className="Retry-btn" type="button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
  const ProfileStatusView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderProfileView()
      case apiConstants.failure:
        return renderFailureView()
      case apiConstants.progress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <div>{ProfileStatusView()}</div>
}

export default ProfileCard
