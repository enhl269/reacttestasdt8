import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { ReactComponent as Logo } from '../../images/justify.svg';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApprovedReviewList from '../AdminAccess/ApprovedReviewList'
import RejectedReviewList from '../AdminAccess/RejectedReviewList'
import ApprovedApplicantList from '../AdminAccess/ApprovedApplicantList'
import RejectedApplicantList from '../AdminAccess/BlockedApplicantList'
import AllJobsList from '../UserAccess/AllJobsList'
import AllBookmarkJobList from '../UserAccess/AllBookmarkJobList'
import AllViewedJobsList from '../UserAccess/AllViewedJobsList'
import JobCategoryList from '../UserAccess/JobCategoryList'
import JobListPerCategory from '../UserAccess/JobListPerCategory'
import ReviewListJobCompanyCategory from '../UserAccess/ReviewListJobCompanyCategory'
import logoUrl from '../../images/logo.PNG';
import JobDetail from '../UserAccess/JobDetail';
import UserList from '../AdminAccess/UserList'
import CreateUser from '../CreateUser'
import authservice from '../../_helpersvc/authservice';
import EditUser from '../EditUser';
import Login from '../Login';
import Home from '../Home/Home';

export default function Navbar() {

  <img src={logoUrl} alt="Tesla" />
  //declare state. false to full menu(screen less 500px)
  const [toggleMenu, setToggleMenu] = useState(false)
  
  const role = localStorage.getItem('roles')
  //const user = JSON.parse(localStorage.getItem('user'))
  const[cuser,setUser] = useState(null)
  const[crole,setRole] = useState(null)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  //if toggle menu is false , go to true
  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }  

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
   }
    window.addEventListener('resize', changeWidth)
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  useEffect(() => {
    setRole(role)
  }, [])
  
  return (
    <Router>
      <nav>
        {(toggleMenu || screenWidth > 500) && (
          <ul className="list">
            <li className="item">
              <Link to={"/Home"} className="item">
                Home
              </Link>
            </li>

            <li className="item">
              <Link to={"/AllJobsList"} className="item">
                All Jobs
              </Link>
            </li>
            
          {(crole === '[APPLICANT]') ? <li className="item">
              <Link to={"/AllBookmarkJobList"} className="item">
                Bookmarks
              </Link>
            </li>:""}
            {(crole === '[APPLICANT]')  ? <li className="item">
              <Link to={"/AllViewedJobsList"} className="item">
                Viewed
              </Link>
            </li>:""}
            <li className="item">
              <Link to={"/JobCategoryList"} className="item">
                Job Categories
              </Link>
            </li>
            {(crole === '[ADMIN]') ?  <li className="item">
              <Link to={"/ApprovedApplicantList"} className="item">
                Approved Applicants
              </Link>
            </li>:""}
            {(crole === '[ADMIN]') ?  <li className="item">
              <Link to={"/RejectedApplicantList"} className="item">
                Blocked Applicants
              </Link>
            </li>:""}
            {(crole === '[ADMIN]') ?  <li className="item">
              <Link to={"/ApprovedReviewList"} className="item">
                Approved Reviews
              </Link>
            </li>:""}
            {(crole === '[ADMIN]') ?  <li className="item">
              <Link to={"/RejectedReviewList"} className="item">
                Rejected Reviews
              </Link>
            </li>:""}
            {(crole === '[ADMIN]') ?  <li className="item">
              <Link to={"/UserList"} className="item">
                All Users
              </Link>
            </li>:""}
            {crole == null ? <li className="item">
              <Link to={"/CreateUser"} className="item">
                Register
              </Link>
            </li>:""}
            {crole == null ? <li className="item">
              <Link to={"/login"} className="item">
                Login
              </Link>
            </li>:""}
            {crole !== null ? <li className="item">
              <Link to={"/EditUser"} className="item">
                Edit Profile
              </Link>
            </li>:""}
            { crole !== null ? <li className="item">
              <Link to={"/logout"} className="item">
                Logout
              </Link>
            </li>:""}
          </ul>
        )}
        <button onClick={toggleNav} className="btn1" ><Logo /></button>
      </nav>

      <Switch>
         <Route exact path='/' component={Home} />
         <Route exact path='/Home' component={Home} />
        <Route exact path='/ApprovedReviewList' component={ApprovedReviewList} />
        <Route exact path='/RejectedReviewList' component={RejectedReviewList} />
        <Route exact path='/ApprovedApplicantList' component={ApprovedApplicantList} />
        <Route exact path='/RejectedApplicantList' component={RejectedApplicantList} />
        <Route exact path='/AllJobsList' component={AllJobsList} />
        <Route exact path='/AllViewedJobsList' component={AllViewedJobsList} />
        <Route exact path='/AllBookmarkJobList' component={AllBookmarkJobList} />
        <Route exact path='/JobCategoryList' component={JobCategoryList} />
        <Route exact path='/JobListPerCategory' component={JobListPerCategory} />
        <Route exact path='/j/:id' component={JobListPerCategory} />
        <Route exact path='/ReviewListJobCompanyCategory' component={ReviewListJobCompanyCategory} />
        <Route exact path='/job/detail/:id/:id2/:id3' component={JobDetail} />
        <Route exact path='/s/:id/:id2' component={ReviewListJobCompanyCategory} />
        <Route exact path='/CreateUser' component={CreateUser} />
        <Route exact path='/UserList' component={UserList} />
        <Route exact path='/EditUser' component={EditUser} />
        <Route path='/users/:username' component={EditUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={authservice.logout} />
      </Switch>
    </Router>


  )
}
