/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import styled from 'styled-components'
import PropTypes from 'prop-types'

import theme from 'constants/theme'

function textColor(color) {
  if (color === 'primary') {
    return theme.color.text.primary
  }
  if (color === 'secondary') {
    return theme.color.text.secondary
  }
  return color
}

const Text = styled.p`
  color: ${({color}) => textColor(color)};
  font-size: ${({size}) => size}em;
  ${({align}) =>
    align &&
    `
    text-align: center;
  `}
`

export const Header = styled.div `
  color: ${theme.color.primary};
  font-size: 24px;
`

Text.propTypes = {
  color: PropTypes.string,
  size : PropTypes.number,
}

Text.defaultProps = {
  color: theme.color.text.primary,
  size : 1,
}

export default Text
