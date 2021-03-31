/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {CardHeader} from './styled'

const Header = ({children, css}) => {
  return <CardHeader css={css}>
    {children}
  </CardHeader>
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  css     : PropTypes.string,
}

Header.defaultProps = {
  css: '',
}

Header.displayName = 'Card.Header'

export default Header
