/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'

import {IconButton, StyledIcon} from './styled'

const IconableButton = ({children, type, icon, iconConfig, ...props}) => {
  return (
    <IconButton {...props} type={type}>
      <StyledIcon icon={icon} {...iconConfig} />
      {children}
    </IconButton>
  )
}

IconableButton.propTypes = {
  children: PropTypes.node.isRequired,
  color   : PropTypes.string,
  icon    : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  iconConfig: PropTypes.shape({
    size    : PropTypes.string,
    color   : PropTypes.string,
    position: PropTypes.oneOf(['right', 'left']),
    iconCss : PropTypes.string,
  }),
  primary  : PropTypes.bool,
  secondary: PropTypes.bool,
  type     : PropTypes.oneOf(['submit', 'button']),
}

IconableButton.defaultProps = {
  primary   : true,
  iconConfig: {
    position: 'right',
  },
  type: 'button',
}

IconableButton.displayName = 'Button.Icon'

export default IconableButton
