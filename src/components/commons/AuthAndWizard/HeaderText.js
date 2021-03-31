import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Row from 'commons/Forms/Row'
import Message from 'commons/Message'

const HeaderText = ({ text, subText, message }) => {
  return (
    <Wrapper>
      {message && <Row style={{ display: 'block' }}><Message message={message} /></Row>}
      <Text>{text}</Text>
      {subText && <SubText>{subText}</SubText>}
    </Wrapper>
  )
}

const Wrapper = styled.div `
  padding: 10px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`,
  Text = styled.div `
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 33px;
`,
  SubText = styled.div `
  font-size: 16px;
  line-height: 19px;
  opacity: 0.5;
`

HeaderText.propTypes = {
  message: PropTypes.object,
  subText: PropTypes.string,
  text   : PropTypes.string
}

export default HeaderText

