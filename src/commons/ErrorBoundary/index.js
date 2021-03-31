/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'
import Honeybadger from 'honeybadger-js'

import { IS_DEV, HONEYBADGER_API_KEY, HONEYBADGER_ENVIRONMENT } from 'constants/index'
import ErrorPage from './ErrorPage'

const config = {
  api_key    : HONEYBADGER_API_KEY,
  environment: HONEYBADGER_ENVIRONMENT,
}

window.honeybadger = Honeybadger.configure(config)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    IS_DEV !== 'development' && window.honeybadger.notify(error)
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorPage
        onButtonClick={() => {
          setTimeout(() => {
            this.setState({ hasError: false })
          }, 200)
        }
        } />
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
}

export default ErrorBoundary
