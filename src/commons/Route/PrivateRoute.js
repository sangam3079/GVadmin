import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { get } from 'lodash'
import { Route, Redirect } from 'react-router-dom'
import { isLogin , isRightDevice } from 'utils'

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const renderContent = props => {
    const {
      location: { pathname },
    } = props

    if (!isLogin()) {
      return (
        <Redirect
          to={{
            pathname: '/auth/login',
            state   : { from: props.location },
          }}
        />
      )
    }

    return typeof render === 'function' ? (
      render(props)
    ) : (
      <Component {...props} {...rest} />
    )
  }
  return <Route render={renderContent} />
}


PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  location: PropTypes.object,
  render  : PropTypes.func,
}

export default PrivateRoute
