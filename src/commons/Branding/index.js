/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import robot from 'assets/images/robot.png'

const BRANDING_TEXT = 'Are you ready to prosper?'

const Branding = ({ text = BRANDING_TEXT, hideText, hideImage }) => {
  return (
    <Container>
      {!hideText && <Text>{text}</Text>}
      {/* {!hideImage && <Image src={robot} alt="GrowthAdvisorHQ Robot" />} */}
    </Container>
  )
}

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`,
  Text = styled.div `
  text-align: center;
  font-size: 30px;
  line-height: 45px;
  width: 280px;
  padding-bottom: 30px;
`,
  Image = styled.img `
    height: 350px;
    width: 200px;
  `

Branding.propTypes = {
  hideImage: PropTypes.bool,
  hideText : PropTypes.bool,
  text     : PropTypes.string
}

export default Branding
