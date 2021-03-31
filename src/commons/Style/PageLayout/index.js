/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'constants/theme'

const PageHeaderWithoutRightContent = `
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`,
  PageHeaderWrapperStyle = styled.div `
  height: 110px;
  background: ${theme.color.background.primary};
`,
  PageHeaderInnerWrapper = styled.div `
  max-width: ${props => props.fullWidth ? 'auto' : '1070px'};
  width: 100%;
  padding: 0 60px;
  display: flex;
  margin: 0 auto;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${props => props.hasNoRightContent && PageHeaderWithoutRightContent}
`,
  SubHeaderSmall = styled.div `
    font-weight: 600;
    font-size: 20px;
  `,
  SubHeaderFade = styled.div `
    font-size: 16px;
    font-weight: 600;
    color: ${theme.color.text.secondary};
  `,
  SubHeaderWrapper = styled.div `
    margin-bottom: 20px;
  `

export const PageHeaderWrapper = ({ children, hasNoRightContent, fullWidth }) => <PageHeaderWrapperStyle>
    <PageHeaderInnerWrapper hasNoRightContent={hasNoRightContent} fullWidth={fullWidth}>
      {children}
    </PageHeaderInnerWrapper>
  </PageHeaderWrapperStyle>
  ,
  PageHeaderText = styled.div `
    font-weight: 600;
    font-size: 36px;
    flex: ${props => props.noFlex ? 'initial' : 1};
    color: ${theme.color.text.primary};
  `,
  PageHeaderFade = styled.div `
    color: ${theme.color.text.gray};
    font-weight: 600;
    font-size: 18px;
  `,
  FormWrapper = styled.div `
    width: 800px;
    margin-top: 20px;
  `,
  SubHeader = styled.div `
    font-weight: 600;
    font-size: 20px;
  `,
  Box = styled.div `
    border: 1px solid ${theme.color.border.primary};
    background: ${theme.color.background.primary};
    border-radius: 4px;
  `,
  Section = styled.div `
    margin-top: ${props => props.top ? 20 : 60}px;
  `,
  BodySubWrapper = styled.div `
    max-width: ${props => props.fullWidth ? 'auto' : `${props.maxWidth}px`};
    width: 100%;
    margin: 0 auto;
    padding: 20px 60px;
  `,
  BodyWrapper = styled.div `
    min-height: 100vh;
    background: ${props => props.white ? '#fff' : theme.color.background.primary};
  `,
  Wrapper = ({ children, fullWidth, maxWidth, ...props }) => <BodyWrapper {...props}>
    <BodySubWrapper fullWidth={fullWidth} maxWidth={maxWidth || 1070}>{children}</BodySubWrapper>
  </BodyWrapper>,
  PageHeader = ({ children, fullWidth }) => {
    return (
      <PageHeaderWrapper hasNoRightContent fullWidth={fullWidth}>
        <PageHeaderText noFlex>{children}</PageHeaderText>
      </PageHeaderWrapper>
    )
  },
  PageSubHeader = ({ text, subText }) => {
    return (
      <SubHeaderWrapper>
        <SubHeaderSmall>{text}</SubHeaderSmall>
        <SubHeaderFade>{subText}</SubHeaderFade>
      </SubHeaderWrapper>
    )
  }

Wrapper.propTypes = {
  children : PropTypes.node,
  fullWidth: PropTypes.bool,
  maxWidth : PropTypes.number
}

PageHeader.propTypes = {
  children : PropTypes.node,
  fullWidth: PropTypes.bool
}

PageHeaderWrapper.propTypes = {
  children         : PropTypes.node,
  fullWidth        : PropTypes.bool,
  hasNoRightContent: PropTypes.bool
}

PageSubHeader.propTypes = {
  subText: PropTypes.string,
  text   : PropTypes.string.isRequired
}
