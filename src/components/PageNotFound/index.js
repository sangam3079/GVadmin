/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'

const PageNotFound = ({ location }) => (
  <>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </>
)

PageNotFound.propTypes = {
  location: PropTypes.object,
}

export default PageNotFound
