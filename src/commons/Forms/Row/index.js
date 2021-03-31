/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Div = styled.div`
  display: flex;
  margin-bottom: 15px;
  > :not(:first-child) {
    margin-left: 15px;
  }
  ${({ css }) => css}
`

const Row = ({ children, css, ...props }) => {
  return (
    <Div {...props} css={css}>
      {children}
    </Div>
  )
}

Row.propTypes = {
  children: PropTypes.node,
  css     : PropTypes.string,
}

export default Row
