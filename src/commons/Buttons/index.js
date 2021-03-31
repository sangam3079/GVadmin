/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import Content from './Content'
import Icon from './Icon'
import Loading from './Loading'
import { Wrapper } from './styled'

const Button = ({ children, css }) => {
  return <Wrapper css={css}>{children}</Wrapper>
}

Button.Content = Content
Button.Icon = Icon
Button.Loading = Loading

Button.propTypes = {
  children: PropTypes.node.isRequired,
  css     : PropTypes.string,
}

Button.displayName = 'Button'

export default Button
