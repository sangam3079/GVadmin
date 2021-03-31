/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'

import NormalButton from './NormalButton'

const Content = ({ children, type, ...props }) => {
  return (
    <NormalButton {...props} type={type}>
      {children}
    </NormalButton>
  )
}

Content.propTypes = {
  children : PropTypes.node.isRequired,
  color    : PropTypes.string,
  primary  : PropTypes.bool,
  secondary: PropTypes.bool,
  type     : PropTypes.oneOf(['submit', 'button']),
}

Content.defaultProps = {
  primary: true,
  type   : 'button',
}

Content.displayName = 'Button.Content'

export default Content
