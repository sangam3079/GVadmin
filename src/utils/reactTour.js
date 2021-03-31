/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/          
import React, { useState } from 'react'
import Tour from 'reactour'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'constants/theme'

const FinishButton = styled.div`
  color: ${theme.color.primary};
`

const TakeTour = ({ steps, skip, openAgain, onClose }) => {
  const [isTourOpen, setOpen] = useState(!skip)

  const closeTour = () => {
    setOpen(false)
    openAgain && onClose(false)
  }
  return (
    <Tour
      lastStepNextButton={
        <FinishButton onClick={closeTour}>Finish</FinishButton>
      }
      steps={steps}
      isOpen={isTourOpen || openAgain}
      onRequestClose={() => closeTour()}
    />
  )
}

TakeTour.propTypes = {
  onClose  : PropTypes.func,
  openAgain: PropTypes.any,
  skip     : PropTypes.any,
  steps    : PropTypes.any,
}

export default TakeTour
