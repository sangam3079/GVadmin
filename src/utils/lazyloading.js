/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from 'react-topbar-progress-indicator'

ProgressBar.config({
  barColors: {
    '0'  : '#1ab394',
    '0.5': '#33FFD7',
    '1.0': '#FF5733',
  },
})
const lazyloading = (importFunc, { maxDuration, fallback = <ProgressBar /> }) => {
  const LazyComponent = lazy(() => {
    return new Promise(resolve =>
      setTimeout(() => resolve(importFunc), maxDuration),
    )
  })
  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

lazyloading.defaultProps = {
  fallback   : null,
  maxDuration: 1000,
}

lazyloading.propTypes = {
  fallback   : PropTypes.element,
  importFunc : PropTypes.func.isRequired,
  maxDuration: PropTypes.number,
}

export default lazyloading
