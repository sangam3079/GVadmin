import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'

import { Wrapper, Header, ContentWrapper, RightContent, LeftContent } from 'components/commons/AuthAndWizard'

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import styled from 'styled-components'
import logo from 'assets/images/goodvibes.jpg'


const Authentication = ({ match, history, location }) => {
  const hideRobot = location.pathname === '/auth/signup'

  return (
    <div>
      <div className="row" style={{margin : 'auto'}}>
        <div 
          className="col-lg-6 d-flex flex-column justify-content-center align-items-center" 
          style={{ height : '100vh', background : '#f1f2f6'}}
        >
          <Image src={logo} alt="GoodVibes" className="d-flex justify-content-center align-items-center mt-5 mb-2"/>
          <p className="my-2 text-mutedd">Welcome to</p>
          <h1 className="my-0">GOOD VIBES</h1>
        </div>
        <div 
          className="col-lg-6 d-flex justify-content-center align-items-center"
          style={{background : 'white', padding: '25px'}}
          >
          <Switch>
            <Route
              exact
              path={`${match.url}`}
              render={() => <Redirect to={`${match.url}/login`} />}
            />
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={`${match.url}/signup`} component={Signup} />
            <Route
              path={`${match.url}/forgot-password`}
              component={ForgotPassword}
            />
            <Route
              path={`${match.url}/reset-password`}
              component={ResetPassword}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}

Authentication.propTypes = {
  history : PropTypes.object,
  location: PropTypes.object,
  match   : PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

const Image = styled.img`
    width: 300px;
    border-radius: 30px
  `

export default withRouter(Authentication)
