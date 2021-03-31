/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import cookie from 'utils/cookie'
import Button from 'commons/Buttons/NormalButton'

const ErrorPage = ({ location, history, onButtonClick }) => {
  const homePage = '/home/explore'

  return (
    <Container>
      <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
      <h1 style={{ marginTop: 10 }}>Oops!! Something went wrong.</h1>
      <Paragraph>
        There was some internal issue while trying
        to perform the operation. You can try signing out and signing in again.
        If the problem persists, please contact system admin.
      </Paragraph>
      <div style={{ display: 'flex' }}>

        <Button
          plain
          style={{ marginRight: 10 }}
          onClick={() => {
            location.pathname !== homePage ? history.replace(homePage) : history.push(homePage)
            onButtonClick && onButtonClick()
          }}>Go to Home
          Page</Button>
        <Button
          onClick={() => {
            cookie.clearAll()
            history.push('/')
            onButtonClick && onButtonClick()
          }}>Sign Out</Button>
      </div>
    </Container>
  )
}

const Container = styled.div `
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`,

  Paragraph = styled.div `
  padding: 20px 0;
  width: 520px;
  text-align: center;
`

ErrorPage.propTypes = {
  history      : PropTypes.object,
  location     : PropTypes.object,
  onButtonClick: PropTypes.func
}

export default withRouter(ErrorPage)
