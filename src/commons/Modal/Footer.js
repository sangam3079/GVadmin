/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {FooterWrapper} from './styled'

const Footer = ({children, footerCss, ...props}) => {
  return (
    <FooterWrapper footerCss={footerCss} {...props}>
      {children}
    </FooterWrapper>
  )
}

Footer.propTypes = {
  border   : PropTypes.bool,
  children : PropTypes.node.isRequired,
  footerCss: PropTypes.string,
}

Footer.defaultProps = {
  footerCss: '',
  border   : true,
}

export default Footer
