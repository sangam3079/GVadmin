/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {HeaderWrapper} from './styled'

const Header = ({children, headerCss, ...props}) => {
  return (
    <HeaderWrapper headerCss={headerCss} {...props}>
      {children}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  border   : PropTypes.bool,
  children : PropTypes.node.isRequired,
  headerCss: PropTypes.string,
}

Header.defaultProps = {
  headerCss: '',
  border   : true,
}
export default Header
