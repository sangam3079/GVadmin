/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {CardFooter} from './styled'

const Footer = ({children, css}) => {
  return <CardFooter css={css}>{children}</CardFooter>
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  css     : PropTypes.string,
}

Footer.defaultProps = {
  css: '',
}

Footer.displayName = 'Card.Footer'

export default Footer
