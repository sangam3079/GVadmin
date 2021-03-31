/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'constants/theme'

const Box = styled.span`
  background: ${props => props.background};
  color: ${props => props.color};
  max-width: 100%;
  box-sizing: border-box;
  width: ${props => props.width && props.width};
  border-radius: 4px;
`

const App = ({ content, className, ...props }) => {
  return(
    <Box className={className} {...props}>
      {content}
    </Box>
  )
}

App.propTypes = {
  background: PropTypes.string,
  className : PropTypes.string,
  color     : PropTypes.string,
  content   : PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  width     : PropTypes.string
}

App.defaultProps = {
  background: theme.color.primary,
  color     : theme.color.white,
}

App.displayName = 'Box'

export default App
