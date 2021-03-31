/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {CardContent} from './styled'

const Content = ({children, css}) => {
  return <CardContent css={css}>{children}</CardContent>
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  css     : PropTypes.string,
}

Content.defaultProps = {
  css: '',
}

Content.displayName = 'Card.Content'

export default Content
