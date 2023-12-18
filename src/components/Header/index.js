import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="Header-container">
      <div className="mobile-responsive-header">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="mobile-responsive-list">
          <Link to="/">
            <li>
              <AiFillHome className="nav-icon" />
            </li>
          </Link>

          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="nav-icon" />
            </li>
          </Link>
          <li>
            <FiLogOut className="nav-icon" onClick={onClickLogout} />
          </li>
        </ul>
      </div>
      <div className="website-responsive-header">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
