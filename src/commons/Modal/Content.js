/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {ContentWrapper} from './styled'

const Content = ({children, contentCss}) => {
  return <ContentWrapper contentCss={contentCss}>{children}</ContentWrapper>
}

Content.propTypes = {
  children  : PropTypes.node.isRequired,
  contentCss: PropTypes.string,
}

Content.defaultProps = {
  contentCss: '',
}

export default Content
