/* Copyright (C) Go9, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Bryan Starbuck <bryan@go9.com>, October 2019
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useApolloClient } from 'react-apollo-hooks'

import cookie from 'utils/cookie'
import theme from 'constants/theme'
import logo from 'assets/images/goodvibes.jpg'

const Header = ({ showLogOutBtn, history }) => {
  // const client = useApolloClient();

  const logOut = () => {
    cookie.clearAll()
    // client.resetStore()
    history.push('/auth/login')
  }
  const isMasquerading = cookie.isImpersonating()

  return (
    <HeaderWrapper isMasquerading={isMasquerading}>
      <Logo>GOODVIBES</Logo>
      {showLogOutBtn && <LogOutWrapper onClick={logOut}>Log Out</LogOutWrapper>}
    </HeaderWrapper>
  )
}

export const HeaderFooterWrapper = `
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 0 50px;
  height: 80px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
  @media (max-width: 768px) {
      height: 60px;
      padding: 0 20px;
    }
`,
Logo=styled.div`
  font-weight: bolder;
  font-size: 18px;
`

const LogOutWrapper = styled.div `
    font-weight: 600;
    font-size: 18px;
    color: ${theme.color.text.primaryFade};
    cursor: pointer;
  `,
  HeaderWrapper = styled.div `
    ${HeaderFooterWrapper}
    top: ${props => props.isMasquerading ? '48px' : 0};
  `

Header.propTypes = {
  history      : PropTypes.object,
  showLogOutBtn: PropTypes.bool
}

export default Header
