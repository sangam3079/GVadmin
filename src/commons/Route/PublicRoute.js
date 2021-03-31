/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

import {isLogin} from 'utils'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  // console.log('i am public route')
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  location  : PropTypes.object,
  restricted: PropTypes.bool,
}

PublicRoute.defaultProps = {
  restricted: false,
}

export default PublicRoute
